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
import { IStatusDto, Status } from "../status/status.model";

export interface IWorkflowDto {
  id: string;
  name: string;
  description?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
  board?: IBoardDto;
  statuses?: IStatusDto[];
}

export interface IWorkflowListDto extends ListResponse<IWorkflowDto[]> {}

export interface IWorkflowCreateRequest {
  name: string;
  description?: string;
  boardId: string;
  isDefault?: boolean;
}

export interface IWorkflowUpdateRequest
  extends Partial<IWorkflowCreateRequest> {}

export type WorkflowModel = InferAttributes<Workflow>;
export type WorkflowCreateModel = InferCreationAttributes<
  Workflow,
  { omit: "id" | "isDefault" | "createdAt" | "updatedAt" }
>;

export class Workflow extends Model<WorkflowModel, WorkflowCreateModel> {
  declare id: string;
  declare name: string;
  declare description?: string;
  declare isDefault: boolean;

  // Board association
  declare boardId: string;
  declare getBoard: BelongsToGetAssociationMixin<Board>;
  declare setBoard: BelongsToSetAssociationMixin<Board, string>;

  // Timestamps
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Associations
  declare board?: NonAttribute<Board>;
  declare statuses?: NonAttribute<Status[]>;

  // Methods
  declare getStatuses: HasManyGetAssociationsMixin<Status>;

  toDTO(): IWorkflowDto {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      isDefault: this.isDefault,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      board: this.board?.toDTO(),
      statuses: this.statuses?.map(item => item.toDTO()),
    };
  }
}

Workflow.init(
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
    isDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    boardId: {
      type: DataTypes.UUID,
      allowNull: false,
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
    modelName: "workflows",
    name: {
      singular: "workflow",
      plural: "workflows",
    },
    indexes: [
      {
        fields: ["boardId"],
      },
    ],
  },
);

// WorkflowStatus junction model
export class WorkflowStatus extends Model {
  declare id: string;
  declare workflowId: string;
  declare statusId: string;
  declare order: number;
  declare wipLimit?: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare workflow?: NonAttribute<Workflow>;
  declare status?: NonAttribute<Status>;

  declare getWorkflow: BelongsToGetAssociationMixin<Workflow>;
  declare getStatus: BelongsToGetAssociationMixin<Status>;
}

WorkflowStatus.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    workflowId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "workflows",
        key: "id",
      },
    },
    statusId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "statuses",
        key: "id",
      },
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    wipLimit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "workflow-statuses",
    name: {
      singular: "workflow-status",
      plural: "workflow-statuses",
    },
    indexes: [
      {
        unique: true,
        fields: ["workflowId", "statusId"],
      },
      {
        fields: ["order"],
      },
    ],
  },
);
