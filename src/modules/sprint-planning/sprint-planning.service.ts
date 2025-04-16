import { NotFoundException } from "@force-dev/utils";
import { inject, injectable } from "inversify";
import { Includeable, Transaction, WhereOptions } from "sequelize";

import { sequelize } from "../../db";
import { IssueService } from "../issue";
import { Issue } from "../issue/issue.model";
import {
  EPlanningItemStatus,
  PlanningItem,
} from "../planning-item/planning-item.model";
import { SprintService } from "../sprint";
import { Sprint } from "../sprint/sprint.model";
import { UserService } from "../user";
import { User } from "../user/user.model";
import {
  ISprintPlanningCreateRequest,
  ISprintPlanningUpdateRequest,
  SprintPlanning,
  SprintPlanningParticipant,
} from "./sprint-planning.model";

@injectable()
export class SprintPlanningService {
  constructor(
    @inject(SprintService) private _sprintService: SprintService,
    @inject(UserService) private _userService: UserService,
    @inject(IssueService) private _issueService: IssueService,
  ) {}

  async getPlannings(
    offset?: number,
    limit?: number,
    where?: WhereOptions<SprintPlanning>,
  ) {
    return SprintPlanning.findAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: SprintPlanningService.include,
    });
  }

  async getPlanningById(id: string) {
    const planning = await SprintPlanning.findByPk(id, {
      include: SprintPlanningService.include,
    });

    if (!planning) throw new NotFoundException("Planning not found");

    return planning;
  }

  async getPlanningsBySprint(
    sprintId: string,
    offset?: number,
    limit?: number,
  ) {
    await this._sprintService.getSprintById(sprintId);

    return this.getPlannings(offset, limit, { sprintId });
  }

  async createPlanning(data: ISprintPlanningCreateRequest) {
    await this._sprintService.getSprintById(data.sprintId);

    return SprintPlanning.create(data);
  }

  async updatePlanning(id: string, data: ISprintPlanningUpdateRequest) {
    const planning = await this.getPlanningById(id);

    if (data.sprintId) {
      await this._sprintService.getSprintById(data.sprintId);
    }

    await planning.update(data);

    return this.getPlanningById(id);
  }

  async deletePlanning(id: string) {
    return sequelize.transaction(async (t: Transaction) => {
      const planning = await this.getPlanningById(id);

      // Clean up related data
      await PlanningItem.destroy({
        where: { planningId: id },
        transaction: t,
      });

      await SprintPlanningParticipant.destroy({
        where: { sprintPlanningId: id },
        transaction: t,
      });

      await planning.destroy({ transaction: t });

      return id;
    });
  }

  async addParticipant(
    planningId: string,
    userId: string,
    roles: { isScrumMaster?: boolean; isProductOwner?: boolean },
  ) {
    return sequelize.transaction(async (t: Transaction) => {
      await this._userService.getUser(userId);

      await SprintPlanningParticipant.create(
        {
          sprintPlanningId: planningId,
          userId,
          isScrumMaster: roles.isScrumMaster ?? false,
          isProductOwner: roles.isProductOwner ?? false,
        },
        { transaction: t },
      );

      return this.getPlanningById(planningId);
    });
  }

  async removeParticipant(planningId: string, userId: string) {
    await SprintPlanningParticipant.destroy({
      where: { sprintPlanningId: planningId, userId },
    });

    return this.getPlanningById(planningId);
  }

  async addPlanningItem(
    planningId: string,
    issueId: string,
    suggestedById: string,
    estimate?: number,
  ) {
    return sequelize.transaction(async (t: Transaction) => {
      await this._issueService.getIssueById(issueId);
      await this._userService.getUser(suggestedById);

      const order =
        (await PlanningItem.count({
          where: { planningId },
          transaction: t,
        })) + 1;

      await PlanningItem.create(
        {
          planningId,
          issueId,
          suggestedById,
          estimate,
          order,
        },
        { transaction: t },
      );

      return this.getPlanningById(planningId);
    });
  }

  async updatePlanningItemStatus(
    planningItemId: string,
    status: EPlanningItemStatus,
  ) {
    const planningItem = await PlanningItem.findByPk(planningItemId);

    if (!planningItem) throw new NotFoundException("Planning item not found");

    await planningItem.update({ status });

    return this.getPlanningById(planningItem.planningId);
  }

  static get include(): Includeable[] {
    return [
      { model: Sprint, as: "sprint" },
      {
        model: SprintPlanningParticipant,
        as: "participants",
        include: [{ model: User, as: "user" }],
      },
      {
        model: PlanningItem,
        as: "items",
        include: [
          { model: Issue, as: "issue" },
          { model: User, as: "suggestedBy" },
        ],
        order: [["order", "ASC"]],
      },
    ];
  }
}
