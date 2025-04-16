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

export interface IIssueTypeDto {
  id: string;
  name: string;
  icon: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IIssueTypeListDto extends ListResponse<IIssueTypeDto[]> {}

export interface IIssueTypeCreateRequest {
  name: string;
  icon: string;
  description?: string;
}

export interface IIssueTypeUpdateRequest
  extends Partial<IIssueTypeCreateRequest> {}

export type IssueTypeModel = InferAttributes<IssueType>;
export type IssueTypeCreateModel = InferCreationAttributes<
  IssueType,
  { omit: "id" | "createdAt" | "updatedAt" }
>;

export class IssueType extends Model<IssueTypeModel, IssueTypeCreateModel> {
  declare id: string;
  declare name: string;
  declare icon: string;
  declare description?: string;

  // Timestamps
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Associations
  declare issues?: NonAttribute<Issue[]>;
  declare getIssues: HasManyGetAssociationsMixin<Issue>;

  toJSON(): IIssueTypeDto {
    return {
      id: this.id,
      name: this.name,
      icon: this.icon,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

IssueType.init(
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
    icon: {
      type: DataTypes.STRING(50),
      allowNull: false,
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
    modelName: "issue_types",
    name: {
      singular: "issue_type",
      plural: "issue_types",
    },
  },
);

IssueType.afterSync(async () => {
  const count = await IssueType.count();

  try {
    if (count === 0) {
      await IssueType.bulkCreate([
        {
          name: "Story",
          icon: "book",
          description: "User story or feature",
        },
        {
          name: "Task",
          icon: "check-square",
          description: "General task",
        },
        {
          name: "Bug",
          icon: "bug",
          description: "Something isn't working",
        },
        {
          name: "Epic",
          icon: "rocket",
          description: "Big feature containing many stories",
        },
        {
          name: "Subtask",
          icon: "list-check",
          description: "Part of a larger task",
        },
      ]);
    }
  } catch (error) {
    console.error("Failed to initialize default issue types:", error);
  }
});
