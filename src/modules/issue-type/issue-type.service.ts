import { NotFoundException } from "@force-dev/utils";
import { injectable } from "inversify";
import { Includeable, WhereOptions } from "sequelize";

import { Issue } from "../issue/issue.model";
import {
  IIssueTypeCreateRequest,
  IIssueTypeUpdateRequest,
  IssueType,
} from "./issue-type.model";

@injectable()
export class IssueTypeService {
  async getIssueTypes(
    offset?: number,
    limit?: number,
    where?: WhereOptions<IssueType>,
  ) {
    return IssueType.findAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: IssueTypeService.include,
    });
  }

  async getIssueTypeById(id: string) {
    const issueType = await IssueType.findByPk(id, {
      include: IssueTypeService.include,
    });

    if (!issueType) throw new NotFoundException("Issue type not found");

    return issueType;
  }

  async getIssueTypeByName(name: string) {
    const issueType = await IssueType.findOne({
      where: { name },
      include: IssueTypeService.include,
    });

    if (!issueType) throw new NotFoundException("Issue type not found");

    return issueType;
  }

  async createIssueType(data: IIssueTypeCreateRequest) {
    return IssueType.create(data);
  }

  async updateIssueType(id: string, data: IIssueTypeUpdateRequest) {
    const issueType = await this.getIssueTypeById(id);

    await issueType.update(data);

    return this.getIssueTypeById(id);
  }

  async deleteIssueType(id: string) {
    const issueType = await this.getIssueTypeById(id);

    await issueType.destroy();

    return id;
  }

  static get include(): Includeable[] {
    return [{ model: Issue, as: "issues" }];
  }
}
