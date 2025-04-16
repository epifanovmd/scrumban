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
import { Board, IBoardDto } from "../board/board.model";
import { IIssueDto, Issue } from "../issue/issue.model";
import {
  ISprintPlanningDto,
  SprintPlanning,
} from "../sprint-planning/sprint-planning.model";

export enum ESprintStatus {
  FUTURE = "future",
  ACTIVE = "active",
  CLOSED = "closed",
}

export interface ISprintDto {
  id: string;
  name: string;
  goal?: string;
  startDate: Date;
  endDate: Date;
  status: ESprintStatus;
  createdAt: Date;
  updatedAt: Date;
  board?: IBoardDto;
  planning?: ISprintPlanningDto;
  issues?: IIssueDto[];
}

export type ISprintListDto = ISprintDto[];

export interface ISprintCreateRequest {
  name: string;
  goal?: string;
  startDate: Date;
  endDate: Date;
  boardId: string;
}

export interface ISprintUpdateRequest extends Partial<ISprintCreateRequest> {
  status?: ESprintStatus;
}

export type SprintModel = InferAttributes<Sprint>;
export type SprintCreateModel = InferCreationAttributes<
  Sprint,
  { omit: "id" | "status" | "createdAt" | "updatedAt" }
>;

export class Sprint extends Model<SprintModel, SprintCreateModel> {
  declare id: string;
  declare name: string;
  declare goal?: string;
  declare startDate: Date;
  declare endDate: Date;
  declare status: ESprintStatus;

  // Board association
  declare boardId: string;
  declare getBoard: BelongsToGetAssociationMixin<Board>;
  declare setBoard: BelongsToSetAssociationMixin<Board, string>;

  // Timestamps
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Associations
  declare board?: NonAttribute<Board>;
  declare planning?: NonAttribute<SprintPlanning>;
  declare issues?: NonAttribute<Issue[]>;

  // Methods
  declare getIssues: HasManyGetAssociationsMixin<Issue>;

  toJSON(): ISprintDto {
    return {
      id: this.id,
      name: this.name,
      goal: this.goal,
      startDate: this.startDate,
      endDate: this.endDate,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      board: this.board?.toJSON(),
      planning: this.planning?.toJSON(),
      issues: (this.issues ?? []).map(item => item.toJSON()),
    };
  }
}

Sprint.init(
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
    goal: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(ESprintStatus)),
      defaultValue: ESprintStatus.FUTURE,
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
    modelName: "sprints",
    name: {
      singular: "sprint",
      plural: "sprints",
    },
    indexes: [
      {
        fields: ["boardId"],
      },
      {
        fields: ["status"],
      },
    ],
  },
);
