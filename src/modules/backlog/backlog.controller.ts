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
  IBacklogCreateRequest,
  IBacklogDto,
  IBacklogListDto,
  IBacklogUpdateRequest,
} from "./backlog.model";
import { BacklogService } from "./backlog.service";

@injectable()
@Tags("Backlog")
@Route("api/backlog")
export class BacklogController extends Controller {
  constructor(@inject(BacklogService) private _backlogService: BacklogService) {
    super();
  }

  @Security("jwt")
  @Get("list")
  getBacklogs(
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
    @Query("projectId") projectId?: string,
  ): Promise<IBacklogListDto> {
    return this._backlogService
      .getBacklogs(offset, limit, projectId ? { projectId } : undefined)
      .then(result => ({
        offset,
        limit,
        count: result.length,
        data: result.map(res => res.toDTO()),
      }));
  }

  @Security("jwt")
  @Get("{id}")
  getBacklogById(id: string): Promise<IBacklogDto> {
    return this._backlogService.getBacklogById(id).then(res => res.toDTO());
  }

  @Security("jwt", ["role:admin"])
  @Post()
  createBacklog(@Body() body: IBacklogCreateRequest): Promise<IBacklogDto> {
    return this._backlogService.createBacklog(body).then(res => res.toDTO());
  }

  @Security("jwt", ["role:admin"])
  @Patch("{id}")
  updateBacklog(
    id: string,
    @Body() body: IBacklogUpdateRequest,
  ): Promise<IBacklogDto> {
    return this._backlogService
      .updateBacklog(id, body)
      .then(res => res.toDTO());
  }

  @Security("jwt", ["role:admin"])
  @Delete("{id}")
  deleteBacklog(id: string): Promise<string> {
    return this._backlogService.deleteBacklog(id);
  }

  @Security("jwt")
  @Post("{backlogId}/issues/{issueId}")
  addIssueToBacklog(
    backlogId: string,
    issueId: string,
    @Query("order") order?: number,
  ): Promise<IBacklogDto> {
    return this._backlogService
      .addIssueToBacklog(backlogId, issueId, order)
      .then(res => res.toDTO());
  }

  @Security("jwt")
  @Delete("{backlogId}/issues/{issueId}")
  removeIssueFromBacklog(
    backlogId: string,
    issueId: string,
  ): Promise<IBacklogDto> {
    return this._backlogService
      .removeIssueFromBacklog(backlogId, issueId)
      .then(res => res.toDTO());
  }
}
