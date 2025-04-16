import { NotFoundException } from "@force-dev/utils";
import { inject, injectable } from "inversify";
import { Includeable, Transaction, WhereOptions } from "sequelize";

import { sequelize } from "../../db";
import { Project } from "../project/project.model";
import { UserService } from "../user";
import { User } from "../user/user.model";
import {
  ITeamCreateRequest,
  ITeamUpdateRequest,
  Team,
  TeamMember,
} from "./team.model";

@injectable()
export class TeamService {
  constructor(@inject(UserService) private _userService: UserService) {}

  async getTeams(offset?: number, limit?: number, where?: WhereOptions<Team>) {
    return Team.findAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: TeamService.include,
    });
  }

  async getTeamById(id: string) {
    const team = await Team.findByPk(id, {
      include: TeamService.include,
    });

    if (!team) throw new NotFoundException("Team not found");

    return team;
  }

  async createTeam(data: ITeamCreateRequest) {
    return sequelize.transaction(async (t: Transaction) => {
      const team = await Team.create(data, { transaction: t });

      if (data.userIds?.length) {
        await this._addMembers(team.id, data.userIds, t);
      }

      return team;
    });
  }

  async updateTeam(id: string, data: ITeamUpdateRequest) {
    return sequelize.transaction(async (t: Transaction) => {
      const team = await this.getTeamById(id);

      await team.update(data, { transaction: t });

      if (data.userIds) {
        await TeamMember.destroy({ where: { teamId: id }, transaction: t });
        await this._addMembers(id, data.userIds, t);
      }

      return this.getTeamById(id);
    });
  }

  async deleteTeam(id: string) {
    return sequelize.transaction(async (t: Transaction) => {
      await TeamMember.destroy({ where: { teamId: id }, transaction: t });
      await Team.destroy({ where: { id }, transaction: t });

      return id;
    });
  }

  async addMember(teamId: string, userId: string, role = "member") {
    return sequelize.transaction(async (t: Transaction) => {
      await this._userService.getUser(userId);
      await TeamMember.create({ teamId, userId, role }, { transaction: t });

      return this.getTeamById(teamId);
    });
  }

  async removeMember(teamId: string, userId: string) {
    return sequelize.transaction(async (t: Transaction) => {
      await TeamMember.destroy({
        where: { teamId, userId },
        transaction: t,
      });

      return this.getTeamById(teamId);
    });
  }

  private async _addMembers(teamId: string, userIds: string[], t: Transaction) {
    const members = userIds.map(userId => ({
      teamId,
      userId,
      role: "member",
    }));

    await TeamMember.bulkCreate(members, { transaction: t });
  }

  static get include(): Includeable[] {
    return [
      {
        model: TeamMember,
        as: "members",
        include: [{ model: User, as: "user" }],
      },
      { model: Project, as: "projects" },
    ];
  }
}
