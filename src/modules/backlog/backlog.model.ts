import {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";

import { sequelize } from "../../db";
import { ListResponse } from "../../dto/ListResponse";
import { Board, IBoardDto } from "../board/board.model";
import { IIssueDto, Issue } from "../issue/issue.model";
import { IProjectDto, Project } from "../project/project.model";

export interface IBacklogDto {
  id: string;
  name: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
  project?: IProjectDto;
  board?: IBoardDto;
  issues?: IIssueDto[];
}

export interface IBacklogListDto extends ListResponse<IBacklogDto[]> {}

export interface IBacklogCreateRequest {
  name: string;
  description?: string;
  projectId: string;
  boardId?: string;
  isDefault?: boolean;
}

export interface IBacklogUpdateRequest extends Partial<IBacklogCreateRequest> {}

export type BacklogModel = InferAttributes<Backlog>;
export type BacklogCreateModel = InferCreationAttributes<
  Backlog,
  { omit: "id" | "createdAt" | "updatedAt" }
>;

export class Backlog extends Model<BacklogModel, BacklogCreateModel> {
  declare id: string;
  declare name: string;
  declare isDefault: boolean;

  // Project association
  declare projectId: string;
  declare getProject: BelongsToGetAssociationMixin<Project>;
  declare setProject: BelongsToSetAssociationMixin<Project, string>;

  // Board association (optional - for board-specific backlogs)
  declare boardId?: string;
  declare getBoard: BelongsToGetAssociationMixin<Board>;
  declare setBoard: BelongsToSetAssociationMixin<Board, string>;

  // Timestamps
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Associations
  declare project?: NonAttribute<Project>;
  declare board?: NonAttribute<Board>;
  declare issues?: NonAttribute<Issue[]>;

  // Methods
  declare getIssues: HasManyGetAssociationsMixin<Issue>;

  toDTO(): IBacklogDto {
    return {
      id: this.id,
      name: this.name,
      isDefault: this.isDefault,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      project: this.project?.toDTO(),
      board: this.board?.toDTO(),
      issues: this.issues?.map(item => item.toDTO()),
    };
  }
}

Backlog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "projects",
        key: "id",
      },
    },
    boardId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "boards",
        key: "id",
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "backlogs",
    name: {
      singular: "backlog",
      plural: "backlogs",
    },
    indexes: [
      {
        fields: ["projectId"],
      },
      {
        fields: ["boardId"],
      },
      {
        unique: true,
        fields: ["projectId", "isDefault"],
        where: {
          isDefault: true,
        },
      },
    ],
  },
);
