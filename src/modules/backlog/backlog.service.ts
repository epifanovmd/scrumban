import { NotFoundException } from "@force-dev/utils";
import { inject, injectable } from "inversify";
import { Includeable, Transaction, WhereOptions } from "sequelize";

import { sequelize } from "../../db";
import { BacklogItem } from "../backlog-item/backlog-item.model";
import { IssueService } from "../issue";
import { Issue } from "../issue/issue.model";
import { ProjectService } from "../project";
import { Project } from "../project/project.model";
import {
  Backlog,
  IBacklogCreateRequest,
  IBacklogUpdateRequest,
} from "./backlog.model";

@injectable()
export class BacklogService {
  constructor(
    @inject(ProjectService) private _projectService: ProjectService,
    @inject(IssueService) private _issueService: IssueService,
  ) {}

  async getBacklogs(
    offset?: number,
    limit?: number,
    where?: WhereOptions<Backlog>,
  ) {
    return Backlog.findAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: BacklogService.include,
    });
  }

  async getBacklogById(id: string) {
    const backlog = await Backlog.findByPk(id, {
      include: BacklogService.include,
    });

    if (!backlog) throw new NotFoundException("Backlog not found");

    return backlog;
  }

  async getBacklogsByProject(
    projectId: string,
    offset?: number,
    limit?: number,
  ) {
    await this._projectService.getProjectById(projectId);

    return this.getBacklogs(offset, limit, { projectId });
  }

  async createBacklog(data: IBacklogCreateRequest) {
    return sequelize.transaction(async (t: Transaction) => {
      // Проверяем существование проекта
      await this._projectService.getProjectById(data.projectId, t);

      // Если бэклог создается как дефолтный, снимаем флаг с других
      if (data.isDefault) {
        await Backlog.update(
          { isDefault: false },
          {
            where: {
              projectId: data.projectId,
              isDefault: true,
            },
            transaction: t,
          },
        );
      }

      // Создаем бэклог с явным указанием isDefault (или false по умолчанию)
      return Backlog.create(
        {
          ...data,
          isDefault: data.isDefault ?? false,
        },
        { transaction: t },
      );
    });
  }

  async updateBacklog(id: string, data: IBacklogUpdateRequest) {
    const backlog = await this.getBacklogById(id);

    if (data.projectId) {
      await this._projectService.getProjectById(data.projectId);
    }

    await backlog.update(data);

    return this.getBacklogById(id);
  }

  async deleteBacklog(id: string) {
    const backlog = await this.getBacklogById(id);

    await backlog.destroy();

    return id;
  }

  async addIssueToBacklog(backlogId: string, issueId: string, order?: number) {
    return sequelize.transaction(async (t: Transaction) => {
      await this._issueService.getIssueById(issueId);

      const currentOrder =
        order ??
        (await BacklogItem.count({ where: { backlogId }, transaction: t })) + 1;

      await BacklogItem.create(
        {
          backlogId,
          issueId,
          order: currentOrder,
        },
        { transaction: t },
      );

      return this.getBacklogById(backlogId);
    });
  }

  async removeIssueFromBacklog(backlogId: string, issueId: string) {
    await BacklogItem.destroy({ where: { backlogId, issueId } });

    return this.getBacklogById(backlogId);
  }

  async reorderBacklogItems(backlogId: string, issueIds: string[]) {
    return sequelize.transaction(async (t: Transaction) => {
      await BacklogItem.destroy({ where: { backlogId }, transaction: t });

      const backlogItems = issueIds.map((issueId, index) => ({
        backlogId,
        issueId,
        order: index + 1,
      }));

      await BacklogItem.bulkCreate(backlogItems, { transaction: t });

      return this.getBacklogById(backlogId);
    });
  }

  static get include(): Includeable[] {
    return [
      Project,
      {
        model: Issue,
        as: "backlogIssues",
        through: {
          attributes: ["order"], // Включаем поле order из junction таблицы
          as: "backlogItem", // Указываем псевдоним для junction модели
        },
        order: [[{ model: BacklogItem, as: "backlogItem" }, "order", "ASC"]],
      },
    ];
  }
}
