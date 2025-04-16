import { inject, injectable } from "inversify";
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
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
  async getPlannings(
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
    @Query("sprintId") sprintId?: string,
  ): Promise<ISprintPlanningListDto> {
    const result = await this._sprintPlanningService.getPlannings(
      offset,
      limit,
      sprintId ? { sprintId } : undefined,
    );

    return result.map(res => res.toJSON());
  }

  @Security("jwt")
  @Get("{id}")
  async getPlanningById(id: string): Promise<ISprintPlanningDto> {
    const planning = await this._sprintPlanningService.getPlanningById(id);

    return planning.toJSON();
  }

  @Security("jwt")
  @Post()
  async createPlanning(
    @Body() body: ISprintPlanningCreateRequest,
  ): Promise<ISprintPlanningDto> {
    const planning = await this._sprintPlanningService.createPlanning(body);

    return planning.toJSON();
  }

  @Security("jwt")
  @Patch("{id}")
  async updatePlanning(
    id: string,
    @Body() body: ISprintPlanningUpdateRequest,
  ): Promise<ISprintPlanningDto> {
    const planning = await this._sprintPlanningService.updatePlanning(id, body);

    return planning.toJSON();
  }

  @Security("jwt", ["role:admin"])
  @Delete("{id}")
  async deletePlanning(id: string): Promise<string> {
    return this._sprintPlanningService.deletePlanning(id);
  }

  @Security("jwt")
  @Post("{planningId}/participants/{userId}")
  async addParticipant(
    @Path("planningId") planningId: string,
    @Path("userId") userId: string,
    @Query("isScrumMaster") isScrumMaster: boolean = false,
    @Query("isProductOwner") isProductOwner: boolean = false,
  ): Promise<ISprintPlanningDto> {
    const planning = await this._sprintPlanningService.addParticipant(
      planningId,
      userId,
      {
        isScrumMaster,
        isProductOwner,
      },
    );

    return planning.toJSON();
  }

  @Security("jwt")
  @Delete("{planningId}/participants/{userId}")
  async removeParticipant(
    @Path("planningId") planningId: string,
    @Path("userId") userId: string,
  ): Promise<ISprintPlanningDto> {
    const planning = await this._sprintPlanningService.removeParticipant(
      planningId,
      userId,
    );

    return planning.toJSON();
  }

  @Security("jwt")
  @Post("{planningId}/items/{issueId}")
  async addPlanningItem(
    @Path("planningId") planningId: string,
    @Path("issueId") issueId: string,
    @Query("suggestedById") suggestedById: string,
    @Query("estimate") estimate?: number,
  ): Promise<ISprintPlanningDto> {
    const planning = await this._sprintPlanningService.addPlanningItem(
      planningId,
      issueId,
      suggestedById,
      estimate,
    );

    return planning.toJSON();
  }

  @Security("jwt")
  @Post("{planningId}/status/{status}")
  async updatePlanningItemStatus(
    @Path("planningId") planningId: string,
    @Query("status") status: EPlanningItemStatus,
  ): Promise<ISprintPlanningDto> {
    const planning = await this._sprintPlanningService.updatePlanningItemStatus(
      planningId,
      status,
    );

    return planning.toJSON();
  }
}
