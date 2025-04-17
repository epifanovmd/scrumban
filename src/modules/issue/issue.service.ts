import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from "@force-dev/utils";
import { inject, injectable } from "inversify";
import { Includeable, Op, Transaction, WhereOptions } from "sequelize";

import { sequelize } from "../../db";
import { Board, EBoardType } from "../board/board.model";
import { Comment } from "../comment/comment.model";
import { IssueOrder } from "../issue-order/issue-order.model";
import { IssueType } from "../issue-type/issue-type.model";
import { Priority } from "../priority/priority.model";
import { ProjectService } from "../project";
import { Project } from "../project/project.model";
import { ESprintStatus, Sprint } from "../sprint/sprint.model";
import { Status } from "../status/status.model";
import { StatusTransition } from "../status-transition/status-transition.model";
import { UserService } from "../user";
import { User } from "../user/user.model";
import { Workflow, WorkflowStatus } from "../workflow/workflow.model";
import {
  IIssueCreateRequest,
  IIssueOrderUpdateRequest,
  IIssueUpdateRequest,
  Issue,
} from "./issue.model";

@injectable()
export class IssueService {
  constructor(
    @inject(UserService) private _userService: UserService,
    @inject(ProjectService) private _projectService: ProjectService,
  ) {}

  async getIssues(
    offset?: number,
    limit?: number,
    includeRelations?: boolean,
    where?: WhereOptions<Issue>,
  ) {
    return Issue.findAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: IssueService.getIncludes(includeRelations),
    });
  }

  async getIssueById(
    id: string,
    options?: { includeRelations?: boolean; transaction?: Transaction },
  ) {
    const issue = await Issue.findByPk(id, {
      include: IssueService.getIncludes(options?.includeRelations),
      transaction: options?.transaction,
    });

    if (!issue) throw new NotFoundException("Issue not found");

    return issue;
  }

  async getIssuesByProject(
    projectId: string,
    offset?: number,
    limit?: number,
    includeRelations?: boolean,
  ) {
    await this._projectService.getProjectById(projectId);

    return this.getIssues(offset, limit, includeRelations, { projectId });
  }

  async createIssue(data: IIssueCreateRequest) {
    return sequelize
      .transaction(async (t: Transaction) => {
        await this._validateIssueDependencies(data, t);

        // Получаем начальный статус, если не указан
        let statusId = data.statusId;

        if (!statusId) {
          const initialStatus = await Status.findOne({
            where: { isInitial: true },
            transaction: t,
          });

          if (!initialStatus)
            throw new BadRequestException("Initial status not configured");
          statusId = initialStatus.id;
        }

        if (data.boardId) {
          const board = await Board.findByPk(data.boardId, { transaction: t });

          if (board?.type === EBoardType.KANBAN) {
            await this._checkWipLimit(statusId, t);
          }
        }

        return await Issue.create(
          {
            ...data,
            statusId,
          },
          {
            transaction: t,
            hooks: true,
          },
        );
      })
      .then(issue => this.getIssueById(issue.id, { includeRelations: true }));
  }

  async updateIssue(
    id: string,
    { includeRelations, ...data }: IIssueUpdateRequest,
  ) {
    return sequelize.transaction(async (t: Transaction) => {
      await this._validateIssueDependencies(data, t);

      const issue = await this.getIssueById(id);

      if (data.statusId) {
        const issue = await this.getIssueById(id, {
          transaction: t,
          includeRelations,
        });

        if (issue.boardId) {
          const board = await Board.findByPk(issue.boardId, { transaction: t });

          if (board?.type === EBoardType.KANBAN) {
            await this._checkWipLimit(data.statusId, t);
          }
        }
      }

      await issue.update(data, { transaction: t });

      return this.getIssueById(id, { transaction: t, includeRelations });
    });
  }

  async deleteIssue(id: string) {
    const issue = await this.getIssueById(id);

    await issue.destroy();

    return id;
  }

  async assignIssue(issueId: string, userId: string) {
    await this._userService.getUser(userId);
    await Issue.update({ assigneeId: userId }, { where: { id: issueId } });

    return this.getIssueById(issueId);
  }

  async changeStatus(issueId: string, statusId: string) {
    return sequelize.transaction(async t => {
      const issue = await this.getIssueById(issueId);
      const board = await Board.findByPk(issue.boardId);

      // 1. Проверка WIP-лимитов для Kanban
      if (board?.type === EBoardType.KANBAN) {
        await this._checkWipLimit(statusId, t);
      }

      // 2. Проверка закрытых спринтов для Scrum
      if (issue.sprintId) {
        const sprint = await Sprint.findByPk(issue.sprintId, {
          transaction: t,
        });

        if (sprint?.status === ESprintStatus.CLOSED) {
          throw new ForbiddenException("Cannot change status in closed sprint");
        }
      }

      // 3. Проверка допустимости перехода статусов
      const workflow = await Workflow.findOne({
        where: { boardId: issue.boardId },
        include: [
          {
            model: StatusTransition,
            as: "transitions",
            where: {
              fromStatusId: issue.statusId,
              toStatusId: statusId,
            },
          },
        ],
        transaction: t,
      });

      if (!workflow) {
        throw new BadRequestException(
          `Transition from ${issue.statusId} to ${statusId} is not allowed`,
        );
      }

      return issue.update({ statusId }, { transaction: t });
    });
  }

  async updateIssueOrder(
    issueId: string,
    { order, boardId, includeRelations, statusId }: IIssueOrderUpdateRequest,
  ) {
    return sequelize.transaction(async (t: Transaction) => {
      const issue = await this.getIssueById(issueId, {
        transaction: t,
        includeRelations,
      });
      const board = await Board.findByPk(boardId, { transaction: t });

      if (!board) throw new NotFoundException("Board not found");

      const status = await Status.findByPk(statusId, { transaction: t });

      if (!status) throw new NotFoundException("Status not found");

      // Удаляем старую запись о порядке (если есть)
      await IssueOrder.destroy({
        where: { issueId },
        transaction: t,
      });

      // Обновляем порядок всех задач после новой позиции
      await IssueOrder.increment("order", {
        by: 1,
        where: {
          boardId,
          statusId: statusId,
          order: { [Op.gte]: order },
        },
        transaction: t,
      });

      // Создаем новую запись о порядке
      await IssueOrder.create(
        {
          issueId,
          statusId,
          boardId,
          order,
        },
        { transaction: t },
      );

      // Обновляем статус задачи
      await issue.update({ statusId }, { transaction: t });

      return this.getIssueById(issueId, { transaction: t, includeRelations });
    });
  }

  private async _validateIssueDependencies(
    data: {
      projectId?: string;
      typeId?: string;
      priorityId?: string;
      statusId?: string;
      assigneeId?: string;
      reporterId?: string;
    },
    t?: Transaction,
  ) {
    const options = t ? { transaction: t } : {};

    if (data.projectId) {
      await this._projectService.getProjectById(data.projectId);
    }
    if (data.typeId) {
      const type = await IssueType.findByPk(data.typeId, options);

      if (!type) throw new NotFoundException("Issue type not found");
    }
    if (data.priorityId) {
      const priority = await Priority.findByPk(data.priorityId, options);

      if (!priority) throw new NotFoundException("Priority not found");
    }
    if (data.statusId) {
      const status = await Status.findByPk(data.statusId, options);

      if (!status) throw new NotFoundException("Status not found");
    }
    if (data.assigneeId) {
      await this._userService.getUser(data.assigneeId);
    }
    if (data.reporterId) {
      await this._userService.getUser(data.reporterId);
    }
  }

  private async _checkWipLimit(statusId: string, transaction?: Transaction) {
    const workflowStatus = await WorkflowStatus.findOne({
      where: { statusId },
      include: [Workflow],
      transaction,
    });

    if (workflowStatus?.wipLimit) {
      const currentCount = await Issue.count({
        where: { statusId },
        transaction,
      });

      if (currentCount >= workflowStatus.wipLimit) {
        throw new ConflictException(
          `WIP limit exceeded for this status. Current: ${currentCount}/${workflowStatus.wipLimit}`,
        );
      }
    }
  }

  static getIncludes(includeAll: boolean = false): Includeable[] {
    const baseIncludes = [
      { model: IssueType, as: "type" },
      {
        model: User,
        as: "assignee",
      },
      { model: Priority },
    ];

    if (includeAll) {
      return [
        ...baseIncludes,
        Status,
        Project,
        Board,
        Sprint,
        {
          model: User,
          as: "reporter",
        },
        {
          model: Issue,
          as: "parent",
        },
        {
          model: Issue,
          as: "children",
        },
        Comment,
      ];
    }

    return baseIncludes;
  }
}
