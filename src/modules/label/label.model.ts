import {
  BelongsToManyGetAssociationsMixin,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";

import { sequelize } from "../../db";
import { ListResponse } from "../../dto/ListResponse";
import { Issue } from "../issue/issue.model";

export interface ILabelDto {
  id: string;
  name: string;
  color: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILabelListDto extends ListResponse<ILabelDto[]> {}

export type LabelModel = InferAttributes<Label>;
export type LabelCreateModel = InferCreationAttributes<
  Label,
  { omit: "id" | "createdAt" | "updatedAt" }
>;

export class Label extends Model<LabelModel, LabelCreateModel> {
  declare id: string;
  declare name: string;
  declare color: string;
  declare description?: string;

  // Timestamps
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Associations
  declare issues?: NonAttribute<Issue[]>;

  // Methods
  declare getIssues: BelongsToManyGetAssociationsMixin<Issue>;

  toDTO(): ILabelDto {
    return {
      id: this.id,
      name: this.name,
      color: this.color,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

Label.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    color: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "#DDD",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "labels",
    name: {
      singular: "label",
      plural: "labels",
    },
  },
);
