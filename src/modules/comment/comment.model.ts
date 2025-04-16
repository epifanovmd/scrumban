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
import { IIssueDto, Issue } from "../issue/issue.model";
import { User } from "../user/user.model";
import { IUserDto } from "../user/user.model";

export interface ICommentCreateRequest {
  text: string;
  issueId: string;
}

export interface ICommentUpdateRequest {
  text: string;
}

export interface ICommentDto {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  author?: IUserDto;
  issue?: IIssueDto;
}

export interface ICommentListDto extends ListResponse<ICommentDto[]> {}

export type CommentModel = InferAttributes<Comment>;
export type CommentCreateModel = InferCreationAttributes<
  Comment,
  { omit: "id" | "createdAt" | "updatedAt" }
>;

export class Comment extends Model<CommentModel, CommentCreateModel> {
  declare id: string;
  declare text: string;

  // Foreign keys
  declare issueId: string;
  declare authorId: string;

  // Timestamps
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Associations
  declare issue?: NonAttribute<Issue>;
  declare author?: NonAttribute<User>;

  // Methods
  declare getIssue: BelongsToGetAssociationMixin<Issue>;
  declare getAuthor: BelongsToGetAssociationMixin<User>;

  toJSON(): ICommentDto {
    return {
      id: this.id,
      text: this.text,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      issue: this.issue?.toJSON(),
      author: this.author,
    };
  }
}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    issueId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "issues",
        key: "id",
      },
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
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
    modelName: "comments",
    name: {
      singular: "comment",
      plural: "comments",
    },
    indexes: [
      {
        fields: ["issueId"],
      },
      {
        fields: ["authorId"],
      },
    ],
  },
);
