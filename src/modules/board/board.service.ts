import { NotFoundException } from "@force-dev/utils";
import { inject, injectable } from "inversify";
import { Includeable, Transaction, WhereOptions } from "sequelize";

import { sequelize } from "../../db";
import { Issue } from "../issue/issue.model";
import { IssueOrder } from "../issue-order/issue-order.model";
import { ProjectService } from "../project";
import { Project } from "../project/project.model";
import { Sprint } from "../sprint/sprint.model";
import { Status } from "../status/status.model";
import { Workflow, WorkflowStatus } from "../workflow/workflow.model";
import {
  Board,
  IBoardCreateRequest,
  IBoardUpdateRequest,
  IStatusWithIssuesDto,
} from "./board.model";

@injectable()
export class BoardService {
  constructor(
    @inject(ProjectService) private _projectService: ProjectService,
  ) {}

  async getBoards(
    offset?: number,
    limit?: number,
    where?: WhereOptions<Board>,
  ) {
    return Board.findAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: BoardService.include,
    });
  }

  async getBoardById(id: string) {
    const board = await Board.findByPk(id, {
      include: BoardService.include,
    });

    if (!board) throw new NotFoundException("Board not found");

    return board;
  }

  async getBoardWithIssues(boardId: string) {
    const board = await this.getBoardById(boardId);
    const workflow = await Workflow.findOne({
      where: { boardId },
      include: [
        {
          model: Status,
          as: "statuses",
          through: { attributes: ["order"] },
          order: [[WorkflowStatus, "order", "ASC"]],
          include: [
            {
              model: Issue,
              as: "issues",
              include: [{ model: IssueOrder, as: "orderEntries" }],
              where: { boardId },
              order: [
                [{ model: IssueOrder, as: "orderEntries" }, "order", "ASC"],
              ],
              required: false,
            },
          ],
        },
      ],
    });

    return {
      board,
      statuses: workflow?.statuses?.map(status => ({
        status,
        issues: status.issues || [],
      })),
    };
  }

  async getBoardsByProject(projectId: string, offset?: number, limit?: number) {
    await this._projectService.getProjectById(projectId);

    return this.getBoards(offset, limit, { projectId });
  }

  async createBoard(data: IBoardCreateRequest) {
    await this._projectService.getProjectById(data.projectId);

    return Board.create(data);
  }

  async updateBoard(id: string, data: IBoardUpdateRequest) {
    const board = await this.getBoardById(id);

    if (data.projectId) {
      await this._projectService.getProjectById(data.projectId);
    }

    await board.update(data);

    return this.getBoardById(id);
  }

  async deleteBoard(id: string) {
    return sequelize.transaction(async (t: Transaction) => {
      const board = await this.getBoardById(id);

      // 1. Сначала удаляем все связанные спринты
      await Sprint.destroy({
        where: { boardId: id },
        transaction: t,
      });

      // 2. Удаляем саму доску
      await board.destroy({ transaction: t });

      return id;
    });
  }

  async setActiveSprint(boardId: string, sprintId: string) {
    const sprint = await Sprint.findByPk(sprintId);

    if (!sprint) throw new NotFoundException("Sprint not found");

    await Board.update(
      { activeSprintId: sprintId },
      { where: { id: boardId } },
    );

    return this.getBoardById(boardId);
  }

  static get include(): Includeable[] {
    return [
      { model: Project, as: "project" },
      { model: Sprint, as: "sprints" },
      { model: Sprint, as: "activeSprint" },
      { model: Issue, as: "issues" },
      { model: Workflow, as: "workflows" },
    ];
  }
}
