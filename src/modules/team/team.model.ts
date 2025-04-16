import {
  BelongsToGetAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  DataTypes,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";

import { sequelize } from "../../db";
import { ListResponse } from "../../dto/ListResponse";
import { Project } from "../project/project.model";
import { User } from "../user/user.model";
import { IUserDto } from "../user/user.model";

export interface ITeamCreateRequest {
  name: string;
  description?: string;
  userIds?: string[];
}

export interface ITeamUpdateRequest extends Partial<ITeamCreateRequest> {}

export interface ITeamDto {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  members?: ITeamMemberDto[];
}

export interface ITeamMemberDto {
  id: string;
  user?: IUserDto;
  role: ETeamRole;
}

export interface ITeamListDto extends ListResponse<ITeamDto[]> {}

export enum ETeamRole {
  LEADER = "leader",
  MEMBER = "member",
}

export type TeamModel = InferAttributes<Team>;
export type TeamCreateModel = InferCreationAttributes<
  Team,
  { omit: "id" | "createdAt" | "updatedAt" }
>;

export class Team extends Model<TeamModel, TeamCreateModel> {
  declare id: string;
  declare name: string;
  declare description?: string;

  // Timestamps
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Associations
  declare members?: NonAttribute<TeamMember[]>;
  declare projects?: NonAttribute<Project[]>;

  // Methods
  declare getMembers: HasManyGetAssociationsMixin<TeamMember>;
  declare getProjects: BelongsToManyGetAssociationsMixin<Project>;
  declare setProjects: BelongsToManySetAssociationsMixin<Project, string>;
  declare addProjects: BelongsToManyAddAssociationsMixin<Project, string>;
  declare removeProjects: BelongsToManyRemoveAssociationsMixin<Project, string>;

  toDTO(): ITeamDto {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      members: this.members?.map(item => ({
        id: item.id,
        user: item.user?.toDTO(),
        role: item.role,
      })),
    };
  }
}

Team.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "teams",
    name: {
      singular: "team",
      plural: "teams",
    },
  },
);

// TeamMember model
export class TeamMember extends Model {
  declare id: string;
  declare teamId: string;
  declare userId: string;
  declare role: ETeamRole;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare user?: NonAttribute<User>;
  declare team?: NonAttribute<Team>;

  declare getUser: BelongsToGetAssociationMixin<User>;
  declare getTeam: BelongsToGetAssociationMixin<Team>;

  toDTO(): ITeamMemberDto {
    return {
      id: this.id,
      user: this.user?.toDTO(),
      role: this.role,
    };
  }
}

TeamMember.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    teamId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "teams",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    role: {
      type: DataTypes.ENUM(...Object.values(ETeamRole)),
      defaultValue: ETeamRole.MEMBER,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "team-members",
    name: {
      singular: "team-member",
      plural: "team-members",
    },
    indexes: [
      {
        unique: true,
        fields: ["teamId", "userId"],
      },
    ],
  },
);
