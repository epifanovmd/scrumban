import {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasOneGetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";

import { sequelize } from "../../db";
import { ListResponse } from "../../dto/ListResponse";
import { IIssueDto } from "../issue/issue.model";
import { IProjectDto, Project } from "../project/project.model";
import { ISprintDto, Sprint } from "../sprint/sprint.model";
import { IStatusDto } from "../status/status.model";

export enum EBoardType {
  SCRUM = "scrum",
  KANBAN = "kanban",
}

export interface IBoardDto {
  id: string;
  name: string;
  type: EBoardType;
  createdAt: Date;
  updatedAt: Date;
  project?: IProjectDto;
  sprints?: ISprintDto[];
  activeSprint?: ISprintDto;
}

export interface IBoardListDto extends ListResponse<IBoardDto[]> {}

export interface IBoardWithStatusesDto extends IBoardDto {
  statuses: IStatusWithIssuesDto[];
}

export interface IStatusWithIssuesDto {
  status: IStatusDto;
  issues: IIssueDto[];
}

export interface IBoardCreateRequest {
  name: string;
  type: EBoardType;
  projectId: string;
}

export interface IBoardUpdateRequest extends Partial<IBoardCreateRequest> {
  activeSprintId?: string;
}

export type BoardModel = InferAttributes<Board>;
export type BoardCreateModel = InferCreationAttributes<
  Board,
  { omit: "id" | "createdAt" | "updatedAt" }
>;

export class Board extends Model<BoardModel, BoardCreateModel> {
  declare id: string;
  declare name: string;
  declare type: EBoardType;

  // Project association
  declare projectId: string;
  declare getProject: BelongsToGetAssociationMixin<Project>;
  declare setProject: BelongsToSetAssociationMixin<Project, string>;

  // Active sprint
  declare activeSprintId?: string;
  declare getActiveSprint: HasOneGetAssociationMixin<Sprint>;
  declare setActiveSprint: BelongsToSetAssociationMixin<Sprint, string>;

  // Timestamps
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Associations
  declare project?: NonAttribute<Project>;
  declare sprints?: NonAttribute<Sprint[]>;
  declare activeSprint?: NonAttribute<Sprint>;

  // Methods
  declare getSprints: HasManyGetAssociationsMixin<Sprint>;

  toJSON(): IBoardDto {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      project: this.project?.toJSON(),
      sprints: this.sprints?.map(item => item.toJSON()),
      activeSprint: this.activeSprint?.toJSON(),
    };
  }
}

Board.init(
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
    type: {
      type: DataTypes.ENUM(...Object.values(EBoardType)),
      allowNull: false,
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "projects",
        key: "id",
      },
    },
    activeSprintId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "sprints",
        key: "id",
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "boards",
    name: {
      singular: "board",
      plural: "boards",
    },
    indexes: [
      {
        fields: ["projectId"],
      },
    ],
  },
);
