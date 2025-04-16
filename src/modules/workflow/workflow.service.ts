import { NotFoundException } from "@force-dev/utils";
import { inject, injectable } from "inversify";
import { Includeable, Transaction, WhereOptions } from "sequelize";

import { sequelize } from "../../db";
import { BoardService } from "../board";
import { Board } from "../board/board.model";
import { StatusService } from "../status";
import { Status } from "../status/status.model";
import {
  IWorkflowCreateRequest,
  IWorkflowUpdateRequest,
  Workflow,
  WorkflowStatus,
} from "./workflow.model";

@injectable()
export class WorkflowService {
  constructor(
    @inject(BoardService) private _boardService: BoardService,
    @inject(StatusService) private _statusService: StatusService,
  ) {}

  async getWorkflows(
    offset?: number,
    limit?: number,
    where?: WhereOptions<Workflow>,
  ) {
    return Workflow.findAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: WorkflowService.include,
    });
  }

  async getWorkflowById(id: string) {
    const workflow = await Workflow.findByPk(id, {
      include: WorkflowService.include,
    });

    if (!workflow) throw new NotFoundException("Workflow not found");

    return workflow;
  }

  async getWorkflowsByBoard(boardId: string, offset?: number, limit?: number) {
    await this._boardService.getBoardById(boardId);

    return this.getWorkflows(offset, limit, { boardId });
  }

  async createWorkflow(data: IWorkflowCreateRequest) {
    await this._boardService.getBoardById(data.boardId);

    return Workflow.create(data);
  }

  async updateWorkflow(id: string, data: IWorkflowUpdateRequest) {
    const workflow = await this.getWorkflowById(id);

    if (data.boardId) {
      await this._boardService.getBoardById(data.boardId);
    }

    await workflow.update(data);

    return this.getWorkflowById(id);
  }

  async deleteWorkflow(id: string) {
    const workflow = await this.getWorkflowById(id);

    await workflow.destroy();

    return id;
  }

  async addStatusToWorkflow(
    workflowId: string,
    statusId: string,
    order?: number,
  ) {
    return sequelize.transaction(async (t: Transaction) => {
      await this._statusService.getStatusById(statusId);

      const currentOrder =
        order ??
        (await WorkflowStatus.count({
          where: { workflowId },
          transaction: t,
        })) + 1;

      await WorkflowStatus.create(
        {
          workflowId,
          statusId,
          order: currentOrder,
        },
        { transaction: t },
      );

      return this.getWorkflowById(workflowId);
    });
  }

  async removeStatusFromWorkflow(workflowId: string, statusId: string) {
    await WorkflowStatus.destroy({ where: { workflowId, statusId } });

    return this.getWorkflowById(workflowId);
  }

  async reorderWorkflowStatuses(workflowId: string, statusIds: string[]) {
    return sequelize.transaction(async (t: Transaction) => {
      await WorkflowStatus.destroy({ where: { workflowId }, transaction: t });

      const workflowStatuses = statusIds.map((statusId, index) => ({
        workflowId,
        statusId,
        order: index + 1,
      }));

      await WorkflowStatus.bulkCreate(workflowStatuses, { transaction: t });

      return this.getWorkflowById(workflowId);
    });
  }

  static get include(): Includeable[] {
    return [
      { model: Board, as: "board" },
      {
        model: Status,
        as: "statuses",
        through: {
          attributes: ["order"],
        },
        order: [
          [{ model: WorkflowStatus, as: "workflowStatuses" }, "order", "ASC"],
        ],
      },
    ];
  }
}
