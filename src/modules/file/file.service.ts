import { NotFoundException } from "@force-dev/utils";
import fs from "fs";
import { injectable } from "inversify";
import path from "path";
import { File } from "tsoa";
import { v4 } from "uuid";

import { config } from "../../../config";
import { Files, IFileDto } from "./file.model";

@injectable()
export class FileService {
  async getFileById(id: string): Promise<IFileDto> {
    const file = await Files.findByPk(id);

    if (!file) {
      throw new NotFoundException("Файл не найден");
    }

    return file;
  }

  uploadFile(files: File[]) {
    return Promise.all(
      files.map(file => {
        const name = file.originalname;
        const type = file.mimetype;
        const url = file.path;
        const size = file.size;

        const id = v4();

        return Files.create({
          id,
          name,
          type,
          url,
          size,
        });
      }),
    );
  }

  async deleteFile(id: string): Promise<number> {
    const { url } = await this.getFileById(id);

    await this._deleteFileFromServer(url);

    return Files.destroy({ where: { id } });
  }

  private _deleteFileFromServer(url: string) {
    try {
      fs.readdir(config.SERVER_FILES_FOLDER_PATH, err => {
        if (err) {
          throw Promise.resolve(err);
        }

        const file = url.split("/")?.[1];

        fs.unlink(path.join(config.SERVER_FILES_FOLDER_PATH, file), err => {
          if (err) {
            throw Promise.resolve(err);
          }
        });
      });
    } catch (e) {
      return Promise.resolve(e);
    }
  }
}
