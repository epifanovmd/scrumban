import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";

import { sequelize } from "../../db";
import { IStatusDto, Status } from "../status/status.model";

export interface IStatusTransitionDto {
  id: string;
  workflowId: string;
  fromStatus?: IStatusDto;
  toStatus?: IStatusDto;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStatusTransitionCreateRequest {
  fromStatusId: string;
  toStatusId: string;
}

export interface IStatusTransitionsGraph {
  from: string;
  to: string;
}

export type StatusTransitionModel = InferAttributes<StatusTransition>;
export type StatusTransitionCreateModel = InferCreationAttributes<
  StatusTransition,
  { omit: "id" | "createdAt" | "updatedAt" }
>;

export class StatusTransition extends Model<
  StatusTransitionModel,
  StatusTransitionCreateModel
> {
  declare id: string;
  declare fromStatusId: string;
  declare toStatusId: string;
  declare workflowId: string;

  // Associations
  declare fromStatus: NonAttribute<Status>;
  declare toStatus: NonAttribute<Status>;

  // Timestamps
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  toJSON(): IStatusTransitionDto {
    return {
      id: this.id,
      workflowId: this.workflowId,
      fromStatus: this.fromStatus,
      toStatus: this.toStatus,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

StatusTransition.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fromStatusId: DataTypes.UUID,
    toStatusId: DataTypes.UUID,
    workflowId: DataTypes.UUID,

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { sequelize },
);
