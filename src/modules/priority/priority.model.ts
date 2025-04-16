import {
  DataTypes,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";

import { sequelize } from "../../db";
import { ListResponse } from "../../dto/ListResponse";
import { Issue } from "../issue/issue.model";

export enum EPriority {
  HIGHEST = "highest",
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
  LOWEST = "lowest",
}

export interface IPriorityDto {
  id: string;
  name: EPriority;
  icon: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPriorityListDto extends ListResponse<IPriorityDto[]> {}

export interface IPriorityCreateRequest {
  name: EPriority;
  icon: string;
  color: string;
}

export interface IPriorityUpdateRequest
  extends Partial<IPriorityCreateRequest> {}

export type PriorityModel = InferAttributes<Priority>;
export type PriorityCreateModel = InferCreationAttributes<
  Priority,
  { omit: "id" | "createdAt" | "updatedAt" }
>;

export class Priority extends Model<PriorityModel, PriorityCreateModel> {
  declare id: string;
  declare name: EPriority;
  declare icon: string;
  declare color: string;

  // Timestamps
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Associations
  declare issues?: NonAttribute<Issue[]>;
  declare getIssues: HasManyGetAssociationsMixin<Issue>;

  toJSON(): IPriorityDto {
    return {
      id: this.id,
      name: this.name,
      icon: this.icon,
      color: this.color,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

Priority.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.ENUM(...Object.values(EPriority)),
      allowNull: false,
      // unique: true,
    },
    icon: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "priorities",
    name: {
      singular: "priority",
      plural: "priorities",
    },
  },
);
