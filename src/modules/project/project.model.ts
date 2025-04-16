import {
  BelongsToGetAssociationMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";

import { sequelize } from "../../db";
import { ListResponse } from "../../dto/ListResponse";
import { Backlog } from "../backlog/backlog.model";
import { Board, EBoardType } from "../board/board.model";
import { ITeamDto, Team } from "../team/team.model";
import { IUserDto, User } from "../user/user.model";

export enum EProjectVisibility {
  PRIVATE = "private",
  TEAM = "team",
  PUBLIC = "public",
}

export enum EProjectType {
  SCRUM = "scrum",
  KANBAN = "kanban",
}

export interface IProjectDto {
  id: string;
  name: string;
  key: string;
  description?: string;
  visibility: EProjectVisibility;
  createdAt: Date;
  updatedAt: Date;
  teams: ITeamDto[];
  lead?: IUserDto;
}

export interface IProjectListDto extends ListResponse<IProjectDto[]> {}

export interface IProjectCreateRequest {
  name: string;
  key: string;
  type: EProjectType;
  description?: string;
  visibility?: EProjectVisibility;
  leadId?: string;
  teamIds?: string[];
}

export interface IProjectUpdateRequest extends Partial<IProjectCreateRequest> {}

export type ProjectModel = InferAttributes<Project>;
export type ProjectCreateModel = InferCreationAttributes<
  Project,
  { omit: "id" | "createdAt" | "updatedAt" }
>;

export class Project extends Model<ProjectModel, ProjectCreateModel> {
  declare id: string;
  declare name: string;
  declare key: string;
  declare type: EProjectType;
  declare description?: string;
  declare visibility: EProjectVisibility;

  // Lead user
  declare leadId?: string;
  declare getLead: BelongsToGetAssociationMixin<User>;
  declare setLead: BelongsToSetAssociationMixin<User, string>;

  // Timestamps
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Associations
  declare teams?: NonAttribute<Team[]>;
  declare projectLead?: NonAttribute<User>;

  // Methods
  declare getTeams: BelongsToManyGetAssociationsMixin<Team>;
  declare setTeams: BelongsToManySetAssociationsMixin<Team, string>;
  declare addTeams: BelongsToManyAddAssociationsMixin<Team, string>;
  declare removeTeams: BelongsToManyRemoveAssociationsMixin<Team, string>;
  declare addTeam: BelongsToManyAddAssociationMixin<Team, string>;
  declare removeTeam: BelongsToManyRemoveAssociationMixin<Team, string>;
  declare hasTeam: BelongsToManyHasAssociationMixin<Team, string>;
  declare countTeams: BelongsToManyCountAssociationsMixin;

  toJSON(): IProjectDto {
    return {
      id: this.id,
      name: this.name,
      key: this.key,
      description: this.description,
      visibility: this.visibility,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      teams: (this.teams ?? [])?.map(item => item.toJSON()),
    };
  }
}

Project.init(
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
    key: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
      validate: {
        isUppercase: true,
      },
    },
    type: {
      type: DataTypes.ENUM(...Object.values(EProjectType)),
      defaultValue: EProjectType.KANBAN,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    visibility: {
      type: DataTypes.ENUM(...Object.values(EProjectVisibility)),
      defaultValue: EProjectVisibility.TEAM,
    },
    leadId: {
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
    modelName: "projects",
    name: {
      singular: "project",
      plural: "projects",
    },
    indexes: [
      {
        unique: true,
        fields: ["key"],
      },
    ],
  },
);

Project.afterCreate(async (project, options) => {
  const { transaction } = options;

  // 1. Создаем бэклог для любого проекта
  await Backlog.create(
    {
      name: "Default Backlog",
      projectId: project.id,
      isDefault: true,
    },
    { transaction },
  );

  if (project.type === EProjectType.KANBAN) {
    await Board.create(
      {
        name: `${project.name} Kanban Board`,
        type: EBoardType.KANBAN,
        projectId: project.id,
      },
      { transaction },
    );
  } else if (project.type === EProjectType.SCRUM) {
    await Board.create(
      {
        name: `${project.name} Scrum Board`,
        type: EBoardType.SCRUM,
        projectId: project.id,
      },
      { transaction },
    );
  }
});
