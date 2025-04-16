import {
  BelongsToGetAssociationMixin,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";

import { sequelize } from "../../db";
import { ListResponse } from "../../dto/ListResponse";
import { User } from "../user/user.model";
import { IUserDto } from "../user/user.model";

export enum EAuditAction {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  RESTORE = "restore",
}

export enum EAuditTargetType {
  ISSUE = "issue",
  PROJECT = "project",
  SPRINT = "sprint",
  BOARD = "board",
  USER = "user",
  TEAM = "team",
}

export interface IAuditLogDto {
  id: string;
  action: EAuditAction;
  targetType: EAuditTargetType;
  targetId: string;
  previousData?: Record<string, unknown>;
  newData?: Record<string, unknown>;
  changedFields?: string[];
  createdAt: Date;
  updatedAt: Date;
  user?: IUserDto;
  ipAddress?: string;
  userAgent?: string;
}

export interface IAuditLogListDto extends ListResponse<IAuditLogDto[]> {}

export interface IAuditLogCreateRequest {
  action: EAuditAction;
  targetType: EAuditTargetType;
  targetId: string;
  previousData?: Record<string, unknown>;
  newData?: Record<string, unknown>;
  changedFields?: string[];
  userId: string;
  ipAddress?: string;
  userAgent?: string;
}

export type AuditLogModel = InferAttributes<AuditLog>;
export type AuditLogCreateModel = InferCreationAttributes<
  AuditLog,
  { omit: "id" | "createdAt" | "updatedAt" }
>;

export class AuditLog extends Model<AuditLogModel, AuditLogCreateModel> {
  declare id: string;
  declare action: EAuditAction;
  declare targetType: EAuditTargetType;
  declare targetId: string;
  declare previousData?: string;
  declare newData?: string;
  declare changedFields?: string[];
  declare ipAddress?: string;
  declare userAgent?: string;

  // Timestamps
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Foreign keys
  declare userId: string;

  // Associations
  declare user?: NonAttribute<User>;
  declare getUser: BelongsToGetAssociationMixin<User>;

  toJSON(): IAuditLogDto {
    return {
      id: this.id,
      action: this.action,
      targetType: this.targetType,
      targetId: this.targetId,
      previousData: this.previousData
        ? JSON.parse(this.previousData)
        : undefined,
      newData: this.newData ? JSON.parse(this.newData) : undefined,
      changedFields: this.changedFields,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      user: this.user,
      ipAddress: this.ipAddress,
      userAgent: this.userAgent,
    };
  }
}

AuditLog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    action: {
      type: DataTypes.ENUM(...Object.values(EAuditAction)),
      allowNull: false,
    },
    targetType: {
      type: DataTypes.ENUM(...Object.values(EAuditTargetType)),
      allowNull: false,
    },
    targetId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    previousData: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    newData: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    changedFields: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    ipAddress: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "audit_logs",
    name: {
      singular: "audit_log",
      plural: "audit_logs",
    },
    indexes: [
      {
        fields: ["targetType", "targetId"],
      },
      {
        fields: ["userId"],
      },
      {
        fields: ["createdAt"],
      },
    ],
  },
);
