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
import { AuditLog } from "../audit-log/audit-log.model";
import { IAuditLogDto } from "../audit-log/audit-log.model";

export interface IAuditFieldChangeDto {
  id: string;
  fieldName: string;
  oldValue?: string;
  newValue?: string;
  createdAt: Date;
  updatedAt: Date;
  auditLog?: IAuditLogDto;
}

export interface IAuditFieldChangeListDto
  extends ListResponse<IAuditFieldChangeDto[]> {}

export interface IAuditFieldChangeCreateRequest {
  fieldName: string;
  oldValue?: string;
  newValue?: string;
  auditLogId: string;
}

export type AuditFieldChangeModel = InferAttributes<AuditFieldChange>;
export type AuditFieldChangeCreateModel = InferCreationAttributes<
  AuditFieldChange,
  { omit: "id" | "createdAt" | "updatedAt" }
>;

export class AuditFieldChange extends Model<
  AuditFieldChangeModel,
  AuditFieldChangeCreateModel
> {
  declare id: string;
  declare fieldName: string;
  declare oldValue?: string;
  declare newValue?: string;

  // Timestamps
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Foreign keys
  declare auditLogId: string;

  // Associations
  declare auditLog?: NonAttribute<AuditLog>;
  declare getAuditLog: BelongsToGetAssociationMixin<AuditLog>;

  toDTO(): IAuditFieldChangeDto {
    return {
      id: this.id,
      fieldName: this.fieldName,
      oldValue: this.oldValue,
      newValue: this.newValue,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      auditLog: this.auditLog?.toDTO(),
    };
  }
}

AuditFieldChange.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    fieldName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    oldValue: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    newValue: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    auditLogId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "audit_logs",
        key: "id",
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "audit_field_changes",
    name: {
      singular: "audit_field_change",
      plural: "audit_field_changes",
    },
    indexes: [
      {
        fields: ["auditLogId"],
      },
      {
        fields: ["fieldName"],
      },
    ],
  },
);
