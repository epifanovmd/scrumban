import { NotFoundException } from "@force-dev/utils";
import { injectable } from "inversify";
import { Includeable, WhereOptions } from "sequelize";

import { Issue } from "../issue/issue.model";
import {
  IPriorityCreateRequest,
  IPriorityUpdateRequest,
  Priority,
} from "./priority.model";

@injectable()
export class PriorityService {
  async getPriorities(
    offset?: number,
    limit?: number,
    where?: WhereOptions<Priority>,
  ) {
    return Priority.findAll({
      where,
      limit,
      offset,
      order: [
        ["order", "ASC"],
        ["createdAt", "DESC"],
      ],
      include: PriorityService.include,
    });
  }

  async getPriorityById(id: string) {
    const priority = await Priority.findByPk(id, {
      include: PriorityService.include,
    });

    if (!priority) throw new NotFoundException("Priority not found");

    return priority;
  }

  async getPriorityByName(name: string) {
    const priority = await Priority.findOne({
      where: { name },
      include: PriorityService.include,
    });

    if (!priority) throw new NotFoundException("Priority not found");

    return priority;
  }

  async createPriority(data: IPriorityCreateRequest) {
    return Priority.create(data);
  }

  async updatePriority(id: string, data: IPriorityUpdateRequest) {
    const priority = await this.getPriorityById(id);

    await priority.update(data);

    return this.getPriorityById(id);
  }

  async deletePriority(id: string) {
    const priority = await this.getPriorityById(id);

    await priority.destroy();

    return id;
  }

  static get include(): Includeable[] {
    return [{ model: Issue, as: "issues" }];
  }
}
