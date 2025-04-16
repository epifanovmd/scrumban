import {
  BelongsToGetAssociationMixin,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";

import { sequelize } from "../../db";
import { ListResponse } from "../../dto/ListResponse";
import { IIssueDto, Issue } from "../issue/issue.model";
import {
  ISprintPlanningDto,
  SprintPlanning,
} from "../sprint-planning/sprint-planning.model";
import { User } from "../user/user.model";
import { IUserDto } from "../user/user.model";

export enum EPlanningItemStatus {
  PROPOSED = "proposed",
  APPROVED = "approved",
  REJECTED = "rejected",
  COMMITTED = "committed",
}

export interface IPlanningItemDto {
  id: string;
  order: number;
  status: EPlanningItemStatus;
  estimate?: number;
  createdAt: Date;
  updatedAt: Date;
  planning?: ISprintPlanningDto;
  issue?: IIssueDto;
  suggestedBy?: IUserDto;
}

export interface IPlanningItemListDto
  extends ListResponse<IPlanningItemDto[]> {}

export type PlanningItemModel = InferAttributes<PlanningItem>;
export type PlanningItemCreateModel = InferCreationAttributes<
  PlanningItem,
  { omit: "id" | "status" | "createdAt" | "updatedAt" }
>;

export class PlanningItem extends Model<
  PlanningItemModel,
  PlanningItemCreateModel
> {
  declare id: string;
  declare order: number;
  declare status: EPlanningItemStatus;
  declare estimate?: number;

  // Foreign keys
  declare planningId: string;
  declare issueId: string;
  declare suggestedById?: string;

  // Timestamps
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Associations
  declare planning?: NonAttribute<SprintPlanning>;
  declare issue?: NonAttribute<Issue>;
  declare suggestedBy?: NonAttribute<User>;

  // Methods
  declare getPlanning: BelongsToGetAssociationMixin<SprintPlanning>;
  declare getIssue: BelongsToGetAssociationMixin<Issue>;
  declare getSuggestedBy: BelongsToGetAssociationMixin<User>;

  toJSON(): IPlanningItemDto {
    return {
      id: this.id,
      order: this.order,
      status: this.status,
      estimate: this.estimate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      planning: this.planning?.toJSON(),
      issue: this.issue?.toJSON(),
      suggestedBy: this.suggestedBy,
    };
  }
}

PlanningItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(EPlanningItemStatus)),
      defaultValue: EPlanningItemStatus.PROPOSED,
    },
    estimate: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "Final estimate after planning",
    },
    planningId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "sprint_plannings",
        key: "id",
      },
    },
    issueId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "issues",
        key: "id",
      },
    },
    suggestedById: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "planning_items",
    name: {
      singular: "planning_item",
      plural: "planning_items",
    },
    indexes: [
      {
        fields: ["planningId"],
      },
      {
        fields: ["issueId"],
        unique: true, // Одна задача может быть только в одном планировании
      },
      {
        fields: ["planningId", "order"],
      },
      {
        fields: ["status"],
      },
    ],
  },
);
