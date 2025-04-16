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
import { Backlog, IBacklogDto } from "../backlog/backlog.model";
import { IIssueDto, Issue } from "../issue/issue.model";

export interface IBacklogItemDto {
  id: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  backlog?: IBacklogDto;
  issue?: IIssueDto;
}

export interface IBacklogItemListDto extends ListResponse<IBacklogItemDto[]> {}

export type BacklogItemModel = InferAttributes<BacklogItem>;
export type BacklogItemCreateModel = InferCreationAttributes<
  BacklogItem,
  { omit: "id" | "createdAt" | "updatedAt" }
>;

export class BacklogItem extends Model<
  BacklogItemModel,
  BacklogItemCreateModel
> {
  declare id: string;
  declare order: number;

  // Foreign keys
  declare backlogId: string;
  declare issueId: string;

  // Timestamps
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Associations
  declare backlog?: NonAttribute<Backlog>;
  declare issue?: NonAttribute<Issue>;

  // Methods
  declare getBacklog: BelongsToGetAssociationMixin<Backlog>;
  declare getIssue: BelongsToGetAssociationMixin<Issue>;

  toDTO(): IBacklogItemDto {
    return {
      id: this.id,
      order: this.order,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      backlog: this.backlog?.toDTO(),
      issue: this.issue?.toDTO(),
    };
  }
}

BacklogItem.init(
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
    backlogId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "backlogs",
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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "backlog_items",
    name: {
      singular: "backlog_item",
      plural: "backlog_items",
    },
    indexes: [
      {
        fields: ["backlogId"],
      },
      {
        fields: ["issueId"],
        unique: true, // Одна задача может быть только в одном бэклоге
      },
      {
        fields: ["backlogId", "order"],
      },
    ],
  },
);
