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

import { ApiResponse } from "../../dto/ApiResponse";
import {
  ISprintCreateRequest,
  ISprintDto,
  ISprintListDto,
  ISprintUpdateRequest,
} from "./sprint.model";
import { SprintService } from "./sprint.service";

@injectable()
@Tags("Sprint")
@Route("api/sprint")
export class SprintController extends Controller {
  constructor(@inject(SprintService) private _sprintService: SprintService) {
    super();
  }

  @Security("jwt")
  @Get("list")
  getSprints(
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
    @Query("boardId") boardId?: string,
  ): Promise<ISprintListDto> {
    return this._sprintService
      .getSprints(offset, limit, boardId ? { boardId } : undefined)
      .then(result => ({
        offset,
        limit,
        count: result.length,
        data: result.map(res => res.toDTO()),
      }));
  }

  @Security("jwt")
  @Get("{id}")
  getSprintById(id: string): Promise<ISprintDto> {
    return this._sprintService.getSprintById(id).then(res => res.toDTO());
  }

  @Security("jwt")
  @Post()
  createSprint(@Body() body: ISprintCreateRequest): Promise<ISprintDto> {
    return this._sprintService.createSprint(body).then(res => res.toDTO());
  }

  @Security("jwt")
  @Patch("{id}")
  updateSprint(
    id: string,
    @Body() body: ISprintUpdateRequest,
  ): Promise<ISprintDto> {
    return this._sprintService.updateSprint(id, body).then(res => res.toDTO());
  }

  @Security("jwt", ["role:admin"])
  @Delete("{id}")
  deleteSprint(id: string): Promise<string> {
    return this._sprintService.deleteSprint(id);
  }

  @Security("jwt")
  @Post("{id}/start")
  startSprint(id: string): Promise<ISprintDto> {
    return this._sprintService.startSprint(id).then(res => res.toDTO());
  }

  @Security("jwt")
  @Post("{id}/complete")
  completeSprint(id: string): Promise<ISprintDto> {
    return this._sprintService.completeSprint(id).then(res => res.toDTO());
  }
}
