import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from "@force-dev/utils";
import { inject, injectable } from "inversify";
import { Includeable, Op, Transaction, WhereOptions } from "sequelize";

import { sequelize } from "../../db";
import { BoardService } from "../board";
import { Board, EBoardType } from "../board/board.model";
import { IssueOrder } from "../issue-order/issue-order.model";
import { IssueType } from "../issue-type/issue-type.model";
import { Priority } from "../priority/priority.model";
import { ProjectService } from "../project";
import { Project } from "../project/project.model";
import { ESprintStatus, Sprint } from "../sprint/sprint.model";
import { Status } from "../status/status.model";
import { UserService } from "../user";
import { User } from "../user/user.model";
import { WorkflowService } from "../workflow";
import { Workflow, WorkflowStatus } from "../workflow/workflow.model";
import { IIssueCreateRequest, IIssueUpdateRequest, Issue } from "./issue.model";

@injectable()
export class IssueService {
  constructor(
    @inject(UserService) private _userService: UserService,
    @inject(ProjectService) private _projectService: ProjectService,
    @inject(BoardService) private _boardService: BoardService,
    @inject(WorkflowService) private _workflowService: WorkflowService,
  ) {}

  async getIssues(
    offset?: number,
    limit?: number,
    where?: WhereOptions<Issue>,
  ) {
    return Issue.findAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: IssueService.include,
    });
  }

  async getIssueById(id: string, transaction?: Transaction) {
    const issue = await Issue.findByPk(id, {
      include: IssueService.include,
      transaction,
    });

    if (!issue) throw new NotFoundException("Issue not found");

    return issue;
  }

  async getIssuesByProject(projectId: string, offset?: number, limit?: number) {
    await this._projectService.getProjectById(projectId);

    return this.getIssues(offset, limit, { projectId });
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

          if (!initialStatus) throw new Error("Initial status not configured");
          statusId = initialStatus.id;
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
      .then(issue => this.getIssueById(issue.id));
  }

  async updateIssue(id: string, data: IIssueUpdateRequest) {
    return sequelize.transaction(async (t: Transaction) => {
      await this._validateIssueDependencies(data, t);

      const issue = await this.getIssueById(id);

      await issue.update(data, { transaction: t });

      return this.getIssueById(id);
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
    const issue = await this.getIssueById(issueId);
    const board = await Board.findByPk(issue.boardId);

    // Для Kanban проверяем WIP-лимиты
    if (board?.type === EBoardType.KANBAN) {
      const workflowStatus = await WorkflowStatus.findOne({
        where: { statusId },
        include: [Workflow],
      });

      if (workflowStatus?.wipLimit) {
        const currentCount = await Issue.count({ where: { statusId } });

        if (currentCount >= workflowStatus.wipLimit) {
          throw new ConflictException(
            `WIP limit exceeded for status ${statusId}`,
          );
        }
      }
    }

    // Для Scrum нельзя менять статусы задач в закрытом спринте
    if (issue.sprintId) {
      const sprint = await Sprint.findByPk(issue.sprintId);

      if (sprint?.status === ESprintStatus.CLOSED) {
        throw new ForbiddenException("Cannot change status in closed sprint");
      }
    }

    return issue.update({ statusId });
  }

  async updateIssueOrder(
    issueId: string,
    newStatusId: string,
    newOrder: number,
    boardId: string,
  ) {
    return sequelize.transaction(async (t: Transaction) => {
      const issue = await this.getIssueById(issueId, t);
      const board = await Board.findByPk(boardId, { transaction: t });

      if (!board) throw new NotFoundException("Board not found");

      const status = await Status.findByPk(newStatusId, { transaction: t });

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
          statusId: newStatusId,
          order: { [Op.gte]: newOrder },
        },
        transaction: t,
      });

      // Создаем новую запись о порядке
      await IssueOrder.create(
        {
          issueId,
          statusId: newStatusId,
          boardId,
          order: newOrder,
        },
        { transaction: t },
      );

      // Обновляем статус задачи
      await issue.update({ statusId: newStatusId }, { transaction: t });

      return this.getIssueById(issueId, t);
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

  static get include(): Includeable[] {
    return [
      { model: IssueType, as: "type" },
      { model: Priority, as: "priority" },
      { model: Status, as: "status" },
      { model: Project, as: "project" },
      { model: User, as: "assignee" },
      { model: User, as: "reporter" },
    ];
  }
}
