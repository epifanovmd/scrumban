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

import { EPlanningItemStatus } from "../planning-item/planning-item.model";
import {
  ISprintPlanningCreateRequest,
  ISprintPlanningDto,
  ISprintPlanningListDto,
  ISprintPlanningUpdateRequest,
} from "./sprint-planning.model";
import { SprintPlanningService } from "./sprint-planning.service";

@injectable()
@Tags("SprintPlanning")
@Route("api/sprint-planning")
export class SprintPlanningController extends Controller {
  constructor(
    @inject(SprintPlanningService)
    private _sprintPlanningService: SprintPlanningService,
  ) {
    super();
  }

  @Security("jwt")
  @Get("list")
  getPlannings(
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
    @Query("sprintId") sprintId?: string,
  ): Promise<ISprintPlanningListDto> {
    return this._sprintPlanningService
      .getPlannings(offset, limit, sprintId ? { sprintId } : undefined)
      .then(result => ({
        offset,
        limit,
        count: result.length,
        data: result.map(res => res.toJSON()),
      }));
  }

  @Security("jwt")
  @Get("{id}")
  getPlanningById(id: string): Promise<ISprintPlanningDto> {
    return this._sprintPlanningService
      .getPlanningById(id)
      .then(res => res.toJSON());
  }

  @Security("jwt")
  @Post()
  createPlanning(
    @Body() body: ISprintPlanningCreateRequest,
  ): Promise<ISprintPlanningDto> {
    return this._sprintPlanningService
      .createPlanning(body)
      .then(res => res.toJSON());
  }

  @Security("jwt")
  @Patch("{id}")
  updatePlanning(
    id: string,
    @Body() body: ISprintPlanningUpdateRequest,
  ): Promise<ISprintPlanningDto> {
    return this._sprintPlanningService
      .updatePlanning(id, body)
      .then(res => res.toJSON());
  }

  @Security("jwt", ["role:admin"])
  @Delete("{id}")
  deletePlanning(id: string): Promise<string> {
    return this._sprintPlanningService.deletePlanning(id);
  }

  @Security("jwt")
  @Post("{planningId}/participants/{userId}")
  addParticipant(
    planningId: string,
    userId: string,
    @Query("isScrumMaster") isScrumMaster: boolean = false,
    @Query("isProductOwner") isProductOwner: boolean = false,
  ): Promise<ISprintPlanningDto> {
    return this._sprintPlanningService
      .addParticipant(planningId, userId, {
        isScrumMaster,
        isProductOwner,
      })
      .then(res => res.toJSON());
  }

  @Security("jwt")
  @Delete("{planningId}/participants/{userId}")
  removeParticipant(
    planningId: string,
    userId: string,
  ): Promise<ISprintPlanningDto> {
    return this._sprintPlanningService
      .removeParticipant(planningId, userId)
      .then(res => res.toJSON());
  }

  @Security("jwt")
  @Post("{planningId}/items/{issueId}")
  addPlanningItem(
    planningId: string,
    issueId: string,
    @Query("suggestedById") suggestedById: string,
    @Query("estimate") estimate?: number,
  ): Promise<ISprintPlanningDto> {
    return this._sprintPlanningService
      .addPlanningItem(planningId, issueId, suggestedById, estimate)
      .then(res => res.toJSON());
  }

  @Security("jwt")
  @Post("{planningId}/items/{itemId}/status/{status}")
  updatePlanningItemStatus(
    itemId: string,
    @Query("status") status: EPlanningItemStatus,
  ): Promise<ISprintPlanningDto> {
    return this._sprintPlanningService
      .updatePlanningItemStatus(itemId, status)
      .then(res => res.toJSON());
  }
}
