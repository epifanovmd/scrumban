import { NotFoundException } from "@force-dev/utils";
import { inject, injectable } from "inversify";
import { Includeable, Transaction, WhereOptions } from "sequelize";

import { sequelize } from "../../db";
import { TeamService } from "../team";
import { Team } from "../team/team.model";
import { UserService } from "../user";
import { User } from "../user/user.model";
import {
  EProjectVisibility,
  IProjectCreateRequest,
  IProjectUpdateRequest,
  Project,
} from "./project.model";

@injectable()
export class ProjectService {
  constructor(
    @inject(UserService) private _userService: UserService,
    @inject(TeamService) private _teamService: TeamService,
  ) {}

  getProjects = (
    offset?: number,
    limit?: number,
    where?: WhereOptions<Project>,
  ) =>
    Project.findAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: ProjectService.include,
    });

  getProjectById = (id: string, t?: Transaction) =>
    Project.findByPk(id, {
      include: ProjectService.include,
      transaction: t,
    }).then(project => {
      if (!project) throw new NotFoundException("Project not found");

      return project;
    });

  async getProjectsByTeam(teamId: string, offset?: number, limit?: number) {
    const team = await this._teamService.getTeamById(teamId);

    return team.getProjects({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: ProjectService.include,
    });
  }

  createProject = async (data: IProjectCreateRequest) => {
    return sequelize
      .transaction(async (t: Transaction) => {
        // Устанавливаем значение по умолчанию для visibility
        const projectData = {
          ...data,
          visibility: data.visibility ?? EProjectVisibility.TEAM, // Значение по умолчанию
        };

        const project = await Project.create(projectData, { transaction: t });

        if (data.teamIds?.length) {
          await project.setTeams(data.teamIds, { transaction: t });
        }

        return project;
      })
      .then(project => this.getProjectById(project.id));
  };

  updateProject = async (id: string, data: IProjectUpdateRequest) => {
    const project = await this.getProjectById(id);

    await Project.update(data, { where: { id } });

    if (data.teamIds) {
      await project.setTeams(data.teamIds);
    }

    return this.getProjectById(id);
  };

  deleteProject = (id: string) =>
    Project.destroy({ where: { id } }).then(() => id);

  setProjectLead = async (projectId: string, userId: string) => {
    await this._userService.getUser(userId);
    await Project.update({ leadId: userId }, { where: { id: projectId } });

    return this.getProjectById(projectId);
  };

  addTeamToProject = async (projectId: string, teamId: string) => {
    const project = await this.getProjectById(projectId);

    await this._teamService.getTeamById(teamId);
    await project.addTeam(teamId);

    return this.getProjectById(projectId);
  };

  removeTeamFromProject = async (projectId: string, teamId: string) => {
    const project = await this.getProjectById(projectId);

    await project.removeTeam(teamId);

    return this.getProjectById(projectId);
  };

  static get include(): Includeable[] {
    return [
      { model: User, as: "projectLead" },
      { model: Team, as: "teams" },
    ];
  }
}
