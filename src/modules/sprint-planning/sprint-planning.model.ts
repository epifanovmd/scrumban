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
import { Board } from "../board/board.model";
import {
  EPlanningItemStatus,
  PlanningItem,
} from "../planning-item/planning-item.model";
import { Project } from "../project/project.model";
import { ISprintDto, Sprint } from "../sprint/sprint.model";
import { IUserDto, User } from "../user/user.model";

export enum ESprintPlanningStatus {
  PLANNING = "planning",
  PLANNED = "planned",
  ACTIVE = "active",
  CLOSED = "closed",
}

export interface ISprintPlanningDto {
  id: string;
  name: string;
  description?: string;
  status: ESprintPlanningStatus;
  plannedVelocity?: number;
  actualVelocity?: number;
  createdAt: Date;
  updatedAt: Date;
  sprint?: ISprintDto;
  participants: IUserDto[];
}

export interface ISprintPlanningListDto
  extends ListResponse<ISprintPlanningDto[]> {}

export interface ISprintPlanningCreateRequest {
  name: string;
  description?: string;
  sprintId: string;
  plannedVelocity?: number;
}

export interface ISprintPlanningUpdateRequest
  extends Partial<ISprintPlanningCreateRequest> {
  actualVelocity?: number;
  status?: ESprintPlanningStatus;
}

export type SprintPlanningModel = InferAttributes<SprintPlanning>;
export type SprintPlanningCreateModel = InferCreationAttributes<
  SprintPlanning,
  { omit: "id" | "status" | "createdAt" | "updatedAt" }
>;

export class SprintPlanning extends Model<
  SprintPlanningModel,
  SprintPlanningCreateModel
> {
  declare id: string;
  declare name: string;
  declare description?: string;
  declare status: ESprintPlanningStatus;
  declare plannedVelocity?: number;
  declare actualVelocity?: number;

  // Sprint association
  declare sprintId: string;
  declare getSprint: BelongsToGetAssociationMixin<Sprint>;
  declare setSprint: BelongsToSetAssociationMixin<Sprint, string>;

  // Timestamps
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Associations
  declare sprint?: NonAttribute<Sprint>;
  declare participants?: NonAttribute<User[]>;

  // Methods
  declare getParticipants: HasManyGetAssociationsMixin<User>;

  toDTO(): ISprintPlanningDto {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      status: this.status,
      plannedVelocity: this.plannedVelocity,
      actualVelocity: this.actualVelocity,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      sprint: this.sprint?.toDTO(),
      participants: (this.participants ?? []).map(item => item.toDTO()),
    };
  }
}

SprintPlanning.init(
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
    status: {
      type: DataTypes.ENUM(...Object.values(ESprintPlanningStatus)),
      defaultValue: ESprintPlanningStatus.PLANNING,
    },
    plannedVelocity: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "Planned velocity in story points or hours",
    },
    actualVelocity: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "Actual velocity in story points or hours",
    },
    sprintId: {
      type: DataTypes.UUID,
      allowNull: false,
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
    modelName: "sprint_plannings",
    name: {
      singular: "sprint_planning",
      plural: "sprint_plannings",
    },
    indexes: [
      {
        fields: ["sprintId"],
        unique: true, // Одно планирование на спринт
      },
    ],
  },
);

// Хук для обновления velocity при изменении статуса планирования
SprintPlanning.beforeUpdate(async (planning, options) => {
  if (
    planning.changed("status") &&
    planning.status === ESprintPlanningStatus.PLANNED
  ) {
    const items = await PlanningItem.findAll({
      where: {
        planningId: planning.id,
        status: EPlanningItemStatus.COMMITTED,
      },
    });

    planning.plannedVelocity = items.reduce(
      (sum, item) => sum + (item.estimate || 0),
      0,
    );
  }
});

// Хук для автоматического добавления Product Owner и Scrum Master в участники планирования
SprintPlanning.afterCreate(async (planning, options) => {
  const board = await Board.findByPk(planning.sprintId, {
    include: [Project],
  });

  if (board?.project) {
    // Добавляем лида проекта (обычно Product Owner)
    await SprintPlanningParticipant.create({
      sprintPlanningId: planning.id,
      userId: board.project.leadId,
      isProductOwner: true,
    });

    // Можно добавить дополнительную логику для поиска Scrum Master
  }
});

// SprintPlanningParticipant junction model
export class SprintPlanningParticipant extends Model {
  declare id: string;
  declare sprintPlanningId: string;
  declare userId: string;
  declare isScrumMaster: boolean;
  declare isProductOwner: boolean;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare sprintPlanning?: NonAttribute<SprintPlanning>;
  declare user?: NonAttribute<User>;

  declare getSprintPlanning: BelongsToGetAssociationMixin<SprintPlanning>;
  declare getUser: BelongsToGetAssociationMixin<User>;
}

SprintPlanningParticipant.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    sprintPlanningId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "sprint_plannings",
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
    isScrumMaster: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isProductOwner: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "sprint_planning_participants",
    name: {
      singular: "sprint_planning_participant",
      plural: "sprint_planning_participants",
    },
    indexes: [
      {
        unique: true,
        fields: ["sprintPlanningId", "userId"],
      },
    ],
  },
);
