import { NotFoundException } from "@force-dev/utils";
import { injectable } from "inversify";
import { Includeable, Transaction, WhereOptions } from "sequelize";

import { sequelize } from "../../db";
import { Issue } from "../issue/issue.model";
import { Workflow, WorkflowStatus } from "../workflow/workflow.model";
import {
  IStatusCreateRequest,
  IStatusUpdateRequest,
  Status,
} from "./status.model";

@injectable()
export class StatusService {
  async getStatuses(
    offset?: number,
    limit?: number,
    where?: WhereOptions<Status>,
  ) {
    return Status.findAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: StatusService.include,
    });
  }

  async getStatusById(id: string) {
    const status = await Status.findByPk(id, {
      include: StatusService.include,
    });

    if (!status) throw new NotFoundException("Status not found");

    return status;
  }

  async getStatusByName(name: string) {
    const status = await Status.findOne({
      where: { name },
      include: StatusService.include,
    });

    if (!status) throw new NotFoundException("Status not found");

    return status;
  }

  async createStatus(data: IStatusCreateRequest) {
    return Status.create({
      ...data,
      color: data.color || "#DDD",
      isInitial: !!data.isInitial,
      isFinal: !!data.isFinal,
    });
  }

  async updateStatus(id: string, data: IStatusUpdateRequest) {
    const status = await this.getStatusById(id);

    await status.update(data);

    return this.getStatusById(id);
  }

  async deleteStatus(id: string) {
    return sequelize.transaction(async (t: Transaction) => {
      const status = await this.getStatusById(id);

      // Проверяем использование статуса в workflow через junction-таблицу
      const workflowStatusCount = await WorkflowStatus.count({
        where: { statusId: id },
        transaction: t,
      });

      if (workflowStatusCount > 0) {
        throw new Error("Cannot delete status used in workflows");
      }

      // Дополнительная проверка - используется ли статус в задачах
      const issuesCount = await Issue.count({
        where: { statusId: id },
        transaction: t,
      });

      if (issuesCount > 0) {
        throw new Error("Cannot delete status assigned to issues");
      }

      await status.destroy({ transaction: t });

      return id;
    });
  }

  static get include(): Includeable[] {
    return [
      { model: Issue, as: "issues" },
      { model: Workflow, as: "workflows" },
    ];
  }
}
