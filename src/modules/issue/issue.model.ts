import {
  BelongsToGetAssociationMixin,
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
import { Comment, ICommentDto } from "../comment/comment.model";
import { IIssueTypeDto, IssueType } from "../issue-type/issue-type.model";
import { IPriorityDto, Priority } from "../priority/priority.model";
import { IProjectDto, Project } from "../project/project.model";
import { ISprintDto, Sprint } from "../sprint/sprint.model";
import { IStatusDto, Status } from "../status/status.model";
import { User } from "../user/user.model";
import { IUserDto } from "../user/user.model";

export interface IIssueCreateRequest {
  title: string;
  description?: string;
  typeId: string;
  priorityId: string;
  statusId?: string;
  projectId: string;
  boardId?: string;
  sprintId?: string;
  assigneeId?: string;
  reporterId: string;
  parentId?: string;
  estimate?: number;
}

export interface IIssueUpdateRequest extends Partial<IIssueCreateRequest> {
  statusId?: string;
}

export interface IIssueDto {
  id: string;
  key: string;
  title: string;
  description?: string;
  estimate?: number;
  createdAt: Date;
  updatedAt: Date;
  type?: IIssueTypeDto;
  priority?: IPriorityDto;
  status?: IStatusDto;
  project?: IProjectDto;
  board?: IBoardDto;
  sprint?: ISprintDto;
  assignee?: IUserDto;
  reporter?: IUserDto;
  parent?: IIssueDto;
  comments?: ICommentDto[];
}

export interface IIssueOrderUpdateRequest {
  statusId: string;
  order: number;
  boardId: string;
}

export interface IIssueListDto extends ListResponse<IIssueDto[]> {}

export type IssueModel = InferAttributes<Issue>;
export type IssueCreateModel = InferCreationAttributes<
  Issue,
  { omit: "id" | "key" | "createdAt" | "updatedAt" }
>;

export class Issue extends Model<IssueModel, IssueCreateModel> {
  declare id: string;
  declare key: string;
  declare title: string;
  declare description?: string;
  declare estimate?: number;

  // Foreign keys
  declare typeId: string;
  declare priorityId: string;
  declare statusId: string;
  declare projectId: string;
  declare boardId?: string;
  declare sprintId?: string;
  declare assigneeId?: string;
  declare reporterId: string;
  declare parentId?: string;

  // Timestamps
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Associations
  declare type?: NonAttribute<IssueType>;
  declare priority?: NonAttribute<Priority>;
  declare status?: NonAttribute<Status>;
  declare project?: NonAttribute<Project>;
  declare board?: NonAttribute<Board>;
  declare sprint?: NonAttribute<Sprint>;
  declare assignee?: NonAttribute<User>;
  declare reporter?: NonAttribute<User>;
  declare parent?: NonAttribute<Issue>;
  declare children?: NonAttribute<Issue[]>;
  declare comments?: NonAttribute<Comment[]>;

  // Methods
  declare getType: BelongsToGetAssociationMixin<IssueType>;
  declare getPriority: BelongsToGetAssociationMixin<Priority>;
  declare getStatus: BelongsToGetAssociationMixin<Status>;
  declare getProject: BelongsToGetAssociationMixin<Project>;
  declare getBoard: BelongsToGetAssociationMixin<Board>;
  declare getSprint: BelongsToGetAssociationMixin<Sprint>;
  declare getAssignee: BelongsToGetAssociationMixin<User>;
  declare getReporter: BelongsToGetAssociationMixin<User>;
  declare getParent: BelongsToGetAssociationMixin<Issue>;
  declare getChildren: HasManyGetAssociationsMixin<Issue>;
  declare getComments: HasManyGetAssociationsMixin<Comment>;

  toJSON(): IIssueDto {
    return {
      id: this.id,
      key: this.key,
      title: this.title,
      description: this.description,
      estimate: this.estimate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      type: this.type?.toJSON(),
      priority: this.priority?.toJSON(),
      status: this.status?.toJSON(),
      project: this.project?.toJSON(),
      board: this.board?.toJSON(),
      sprint: this.sprint?.toJSON(),
      assignee: this.assignee,
      reporter: this.reporter,
      parent: this.parent?.toJSON(),
      comments: (this.comments ?? []).map(item => item.toJSON()),
    };
  }
}

Issue.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    key: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    estimate: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Estimate in story points or hours",
    },
    typeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "issue_types",
        key: "id",
      },
    },
    priorityId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "priorities",
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
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "projects",
        key: "id",
      },
    },
    boardId: {
      type: DataTypes.UUID,
      allowNull: true, // Разрешаем NULL
      references: {
        model: "boards",
        key: "id",
      },
    },
    sprintId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "sprints",
        key: "id",
      },
    },
    assigneeId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    reporterId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    parentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "issues",
        key: "id",
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "issues",
    name: {
      singular: "issue",
      plural: "issues",
    },
    indexes: [
      {
        fields: ["projectId"],
      },
      {
        fields: ["boardId"],
      },
      {
        fields: ["sprintId"],
      },
      {
        fields: ["statusId"],
      },
      {
        fields: ["assigneeId"],
      },
      {
        fields: ["reporterId"],
      },
      {
        fields: ["parentId"],
      },
      {
        fields: ["projectId", "statusId"], // Добавить составной индекс
      },
    ],
  },
);

Issue.beforeValidate(async (issue, options) => {
  if (!issue.key) {
    const project = await Project.findByPk(issue.projectId);

    if (project) {
      const lastIssue = await Issue.findOne({
        where: { projectId: issue.projectId },
        order: [["createdAt", "DESC"]],
      });

      let seqNumber = 1;

      if (lastIssue?.key) {
        const lastSeq = parseInt(lastIssue.key.split("-")[1], 10);

        if (!isNaN(lastSeq)) {
          seqNumber = lastSeq + 1;
        }
      }

      issue.key = `${project.key}-${seqNumber}`;
    }
  }
});
