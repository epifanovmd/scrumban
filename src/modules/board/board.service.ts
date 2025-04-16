import { NotFoundException } from "@force-dev/utils";
import { inject, injectable } from "inversify";
import { Includeable, Transaction, WhereOptions } from "sequelize";

import { sequelize } from "../../db";
import { Issue } from "../issue/issue.model";
import { ProjectService } from "../project";
import { Project } from "../project/project.model";
import { Sprint } from "../sprint/sprint.model";
import { Workflow } from "../workflow/workflow.model";
import { Board, IBoardCreateRequest, IBoardUpdateRequest } from "./board.model";

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
