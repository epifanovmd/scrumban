import { NotFoundException } from "@force-dev/utils";
import { inject, injectable } from "inversify";
import { Includeable, Transaction, WhereOptions } from "sequelize";

import { sequelize } from "../../db";
import { BoardService } from "../board";
import { Board } from "../board/board.model";
import { Issue } from "../issue/issue.model";
import { SprintPlanning } from "../sprint-planning/sprint-planning.model";
import {
  ESprintStatus,
  ISprintCreateRequest,
  ISprintUpdateRequest,
  Sprint,
} from "./sprint.model";

@injectable()
export class SprintService {
  constructor(@inject(BoardService) private _boardService: BoardService) {}

  async getSprints(
    offset?: number,
    limit?: number,
    where?: WhereOptions<Sprint>,
  ) {
    return Sprint.findAll({
      where,
      limit,
      offset,
      order: [["startDate", "DESC"]],
      include: SprintService.include,
    });
  }

  async getSprintById(id: string) {
    const sprint = await Sprint.findByPk(id, {
      include: SprintService.include,
    });

    if (!sprint) throw new NotFoundException("Sprint not found");

    return sprint;
  }

  async getSprintsByBoard(boardId: string, offset?: number, limit?: number) {
    await this._boardService.getBoardById(boardId);

    return this.getSprints(offset, limit, { boardId });
  }

  async createSprint(data: ISprintCreateRequest) {
    await this._boardService.getBoardById(data.boardId);

    return Sprint.create(data);
  }

  async updateSprint(id: string, data: ISprintUpdateRequest) {
    const sprint = await this.getSprintById(id);

    if (data.boardId) {
      await this._boardService.getBoardById(data.boardId);
    }

    await sprint.update(data);

    return this.getSprintById(id);
  }

  async deleteSprint(id: string) {
    return sequelize.transaction(async (t: Transaction) => {
      const sprint = await this.getSprintById(id);

      // Clean up related data
      await Board.destroy({ where: { activeSprintId: id }, transaction: t });

      await sprint.destroy({ transaction: t });

      return id;
    });
  }

  async startSprint(id: string) {
    const sprint = await this.getSprintById(id);

    await sprint.update({
      status: ESprintStatus.ACTIVE,
      startDate: new Date(),
    });

    return this.getSprintById(id);
  }

  async completeSprint(id: string) {
    const sprint = await this.getSprintById(id);

    await sprint.update({ status: ESprintStatus.CLOSED, endDate: new Date() });

    return this.getSprintById(id);
  }

  static get include(): Includeable[] {
    return [
      { model: Board, as: "board" },
      { model: Issue, as: "issues" },
      { model: SprintPlanning, as: "planning" },
    ];
  }
}
