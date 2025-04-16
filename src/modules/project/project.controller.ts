import { inject, injectable } from "inversify";
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Request,
  Route,
  Security,
  Tags,
} from "tsoa";

import { getContextUser } from "../../common";
import { ApiResponse } from "../../dto/ApiResponse";
import { KoaRequest } from "../../types/koa";
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

  /**
   * Создать новый проект
   */
  @Security("jwt")
  @Post()
  public async createProject(
    @Request() req: KoaRequest,
    @Body() body: IProjectCreateRequest,
  ): Promise<IProjectDto> {
    const user = getContextUser(req);

    // Можно добавить user.id как создателя проекта при необходимости
    return this._projectService.createProject(body).then(res => res.toDTO());
  }

  /**
   * Получить список проектов
   */
  @Security("jwt")
  @Get("list")
  public async getProjects(
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
  ): Promise<IProjectListDto> {
    const result = await this._projectService.getProjects(offset, limit);

    return {
      offset,
      limit,
      count: result.length,
      data: result.map(value => value.toDTO()),
    };
  }

  /**
   * Получить проект по ID
   */
  @Security("jwt")
  @Get("{id}")
  public async getProjectById(id: string): Promise<IProjectDto> {
    return this._projectService.getProjectById(id).then(res => res.toDTO());
  }

  /**
   * Обновить проект
   */
  @Security("jwt")
  @Patch("{id}")
  public async updateProject(
    @Request() req: KoaRequest,
    id: string,
    @Body() body: IProjectUpdateRequest,
  ): Promise<IProjectDto> {
    const user = getContextUser(req);

    // Можно добавить проверку прав на редактирование
    return this._projectService
      .updateProject(id, body)
      .then(res => res.toDTO());
  }

  /**
   * Удалить проект
   */
  @Security("jwt")
  @Delete("{id}")
  public async deleteProject(
    @Request() req: KoaRequest,
    id: string,
  ): Promise<ApiResponse> {
    const user = getContextUser(req);

    await this._projectService.deleteProject(id);

    return new ApiResponse({ message: "Проект успешно удален" });
  }

  /**
   * Получить проекты команды
   */
  @Security("jwt")
  @Get("team/{teamId}")
  public async getProjectsByTeam(
    @Request() req: KoaRequest,
    teamId: string,
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
  ): Promise<IProjectListDto> {
    const result = await this._projectService.getProjectsByTeam(
      teamId,
      offset,
      limit,
    );

    return {
      offset,
      limit,
      count: result.length,
      data: result.map(item => item.toDTO()),
    };
  }

  /**
   * Назначить лидера проекта
   */
  @Security("jwt")
  @Patch("{projectId}/assign-lead/{userId}")
  public async setProjectLead(
    @Request() req: KoaRequest,
    projectId: string,
    userId: string,
  ): Promise<IProjectDto> {
    return this._projectService
      .setProjectLead(projectId, userId)
      .then(res => res.toDTO());
  }

  /**
   * Добавить команду к проекту
   */
  @Security("jwt")
  @Post("{projectId}/add-team/{teamId}")
  public async addTeamToProject(
    @Request() req: KoaRequest,
    projectId: string,
    teamId: string,
  ): Promise<IProjectDto> {
    return this._projectService
      .addTeamToProject(projectId, teamId)
      .then(res => res.toDTO());
  }

  /**
   * Удалить команду из проекта
   */
  @Security("jwt")
  @Delete("{projectId}/remove-team/{teamId}")
  public async removeTeamFromProject(
    @Request() req: KoaRequest,
    projectId: string,
    teamId: string,
  ): Promise<IProjectDto> {
    return this._projectService
      .removeTeamFromProject(projectId, teamId)
      .then(res => res.toDTO());
  }
}
