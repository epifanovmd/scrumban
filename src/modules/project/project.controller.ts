import { inject, injectable } from "inversify";
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Route,
  Security,
  Tags,
} from "tsoa";

import {
  IProjectCreateRequest,
  IProjectDto,
  IProjectListDto,
  IProjectUpdateRequest,
} from "./project.model";
import { ProjectService } from "./project.service";

@injectable()
@Tags("Project")
@Route("api/project")
export class ProjectController extends Controller {
  constructor(@inject(ProjectService) private _projectService: ProjectService) {
    super();
  }

  @Security("jwt")
  @Get("list")
  getProjects(
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
    @Query("teamId") teamId?: string,
  ): Promise<IProjectListDto> {
    return (
      teamId
        ? this._projectService.getProjectsByTeam(teamId, offset, limit)
        : this._projectService.getProjects(offset, limit)
    ).then(result => ({
      offset,
      limit,
      count: result.length,
      data: result.map(res => res.toJSON()),
    }));
  }

  @Security("jwt")
  @Get("{id}")
  getProjectById(id: string): Promise<IProjectDto> {
    return this._projectService.getProjectById(id).then(res => res.toJSON());
  }

  @Security("jwt", ["role:admin"])
  @Post()
  createProject(@Body() body: IProjectCreateRequest): Promise<IProjectDto> {
    return this._projectService.createProject(body).then(res => res.toJSON());
  }

  @Security("jwt", ["role:admin"])
  @Patch("{id}")
  updateProject(
    id: string,
    @Body() body: IProjectUpdateRequest,
  ): Promise<IProjectDto> {
    return this._projectService
      .updateProject(id, body)
      .then(res => res.toJSON());
  }

  @Security("jwt", ["role:admin"])
  @Delete("{id}")
  deleteProject(id: string): Promise<string> {
    return this._projectService.deleteProject(id);
  }

  @Security("jwt", ["role:admin"])
  @Post("{projectId}/lead/{userId}")
  setProjectLead(projectId: string, userId: string): Promise<IProjectDto> {
    return this._projectService
      .setProjectLead(projectId, userId)
      .then(res => res.toJSON());
  }

  @Security("jwt", ["role:admin"])
  @Post("{projectId}/teams/{teamId}")
  addTeamToProject(projectId: string, teamId: string): Promise<IProjectDto> {
    return this._projectService
      .addTeamToProject(projectId, teamId)
      .then(res => res.toJSON());
  }

  @Security("jwt", ["role:admin"])
  @Delete("{projectId}/teams/{teamId}")
  removeTeamFromProject(
    projectId: string,
    teamId: string,
  ): Promise<IProjectDto> {
    return this._projectService
      .removeTeamFromProject(projectId, teamId)
      .then(res => res.toJSON());
  }
}
