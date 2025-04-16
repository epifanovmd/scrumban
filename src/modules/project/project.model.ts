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
import { ITeamDto, Team } from "../team/team.model";
import { User } from "../user/user.model";
import { IUserDto } from "../user/user.model";

export enum EProjectVisibility {
  PRIVATE = "private",
  TEAM = "team",
  PUBLIC = "public",
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

  toDTO(): IProjectDto {
    return {
      id: this.id,
      name: this.name,
      key: this.key,
      description: this.description,
      visibility: this.visibility,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      teams: (this.teams ?? [])?.map(item => item.toDTO()),
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

// Хук для автоматического создания дефолтного бэклога при создании проекта
Project.afterCreate(async (project, options) => {
  try {
    await Backlog.create(
      {
        name: "Default Backlog",
        isDefault: true,
        projectId: project.id,
      },
      { transaction: options.transaction },
    );
  } catch (error) {
    console.error("Failed to create default backlog:", error);
  }
});
