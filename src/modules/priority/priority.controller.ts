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
  IPriorityCreateRequest,
  IPriorityDto,
  IPriorityListDto,
  IPriorityUpdateRequest,
} from "./priority.model";
import { PriorityService } from "./priority.service";

@injectable()
@Tags("Priority")
@Route("api/priority")
export class PriorityController extends Controller {
  constructor(
    @inject(PriorityService) private _priorityService: PriorityService,
  ) {
    super();
  }

  @Security("jwt")
  @Get("list")
  getPriorities(
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
  ): Promise<IPriorityListDto> {
    return this._priorityService.getPriorities(offset, limit);
  }

  @Security("jwt")
  @Get("{id}")
  getPriorityById(id: string): Promise<IPriorityDto> {
    return this._priorityService.getPriorityById(id);
  }

  @Security("jwt")
  @Get("name/{name}")
  getPriorityByName(name: string): Promise<IPriorityDto> {
    return this._priorityService.getPriorityByName(name);
  }

  @Security("jwt", ["role:admin"])
  @Post()
  createPriority(@Body() body: IPriorityCreateRequest): Promise<IPriorityDto> {
    return this._priorityService.createPriority(body);
  }

  @Security("jwt", ["role:admin"])
  @Patch("{id}")
  updatePriority(
    id: string,
    @Body() body: IPriorityUpdateRequest,
  ): Promise<IPriorityDto> {
    return this._priorityService.updatePriority(id, body);
  }

  @Security("jwt", ["role:admin"])
  @Delete("{id}")
  deletePriority(id: string): Promise<string> {
    return this._priorityService.deletePriority(id);
  }
}
