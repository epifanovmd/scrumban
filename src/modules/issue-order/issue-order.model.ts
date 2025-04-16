import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../../db";

export type IssueOrderModel = InferAttributes<IssueOrder>;
export type IssueOrderCreateModel = InferCreationAttributes<
  IssueOrder,
  { omit: "id" | "createdAt" | "updatedAt" }
>;

export class IssueOrder extends Model<IssueOrderModel, IssueOrderCreateModel> {
  declare id: string;
  declare issueId: string;
  declare statusId: string;
  declare boardId: string;
  declare order: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

IssueOrder.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    issueId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "issues",
        key: "id",
      },
    },
    statusId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "statuses",
        key: "id",
      },
    },
    boardId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "boards",
        key: "id",
      },
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "issue_orders",
    name: {
      singular: "issue_order",
      plural: "issue_orders",
    },
    indexes: [
      {
        unique: true,
        fields: ["boardId", "statusId", "issueId"],
      },
      {
        fields: ["boardId", "statusId", "order"],
      },
    ],
  },
);
