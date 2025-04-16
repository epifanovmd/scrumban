import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../../db";

export interface IFileDto {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  createdAt: Date;
  updatedAt: Date;
}

export type FileModel = InferAttributes<Files>;
export type TFileCreateModel = InferCreationAttributes<
  Files,
  { omit: "createdAt" | "updatedAt" }
>;

export class Files
  extends Model<FileModel, TFileCreateModel>
  implements IFileDto
{
  declare id: string;

  declare name: string;
  declare type: string;
  declare url: string;
  declare size: number;

  // timestamps!
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // associations
}

Files.init(
  {
    id: {
      type: DataTypes.UUID(),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
    },
    type: {
      type: DataTypes.STRING(40),
    },
    url: {
      type: DataTypes.STRING(120),
    },
    size: {
      type: DataTypes.INTEGER(),
    },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "file",
    name: {
      singular: "file",
      plural: "files",
    },
  },
);
