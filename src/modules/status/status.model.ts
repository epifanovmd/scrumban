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
import { Workflow } from "../workflow/workflow.model";

export interface IStatusDto {
  id: string;
  name: string;
  description?: string;
  color: string;
  isInitial: boolean;
  isFinal: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IStatusListDto = IStatusDto[];

export interface IStatusCreateRequest {
  name: string;
  description?: string;
  color?: string;
  isInitial?: boolean;
  isFinal?: boolean;
}

export interface IStatusUpdateRequest extends Partial<IStatusCreateRequest> {}

export type StatusModel = InferAttributes<Status>;
export type StatusCreateModel = InferCreationAttributes<
  Status,
  { omit: "id" | "createdAt" | "updatedAt" }
>;

export class Status extends Model<StatusModel, StatusCreateModel> {
  declare id: string;
  declare name: string;
  declare description?: string;
  declare color: string;
  declare isInitial: boolean;
  declare isFinal: boolean;
  declare isSystem?: boolean;

  // Timestamps
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Associations
  declare issues?: NonAttribute<Issue[]>;
  declare workflows?: NonAttribute<Workflow[]>;

  // Methods
  declare getIssues: HasManyGetAssociationsMixin<Issue>;

  toJSON(): IStatusDto {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      color: this.color,
      isInitial: this.isInitial,
      isFinal: this.isFinal,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

Status.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "#DDD",
    },
    isInitial: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isFinal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isSystem: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "statuses",
    name: {
      singular: "status",
      plural: "statuses",
    },
  },
);

Status.afterSync(async () => {
  const count = await Status.count();

  try {
    if (count === 0) {
      await Status.bulkCreate([
        {
          name: "Open",
          color: "#4CAF50",
          isSystem: true,
          isInitial: true,
          isFinal: false,
        },
        {
          name: "In Progress",
          color: "#2196F3",
          isSystem: true,
          isInitial: false,
          isFinal: false,
        },
        {
          name: "Done",
          color: "#9E9E9E",
          isSystem: true,
          isInitial: false,
          isFinal: true,
        },
      ]);
    }
  } catch (error) {
    console.error("Failed to initialize default statuses:", error);
  }
});
