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
  IStatusCreateRequest,
  IStatusDto,
  IStatusListDto,
  IStatusUpdateRequest,
} from "./status.model";
import { StatusService } from "./status.service";

@injectable()
@Tags("Status")
@Route("api/status")
export class StatusController extends Controller {
  constructor(@inject(StatusService) private _statusService: StatusService) {
    super();
  }

  @Security("jwt")
  @Get("list")
  getStatuses(
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
  ): Promise<IStatusListDto> {
    return this._statusService.getStatuses(offset, limit).then(result => ({
      offset,
      limit,
      count: result.length,
      data: result,
    }));
  }

  @Security("jwt")
  @Get("{id}")
  getStatusById(id: string): Promise<IStatusDto> {
    return this._statusService.getStatusById(id);
  }

  @Security("jwt", ["role:admin"])
  @Post()
  createStatus(@Body() body: IStatusCreateRequest): Promise<IStatusDto> {
    return this._statusService.createStatus(body);
  }

  @Security("jwt", ["role:admin"])
  @Patch("{id}")
  updateStatus(
    id: string,
    @Body() body: IStatusUpdateRequest,
  ): Promise<IStatusDto> {
    return this._statusService.updateStatus(id, body);
  }

  @Security("jwt", ["role:admin"])
  @Delete("{id}")
  deleteStatus(id: string): Promise<string> {
    return this._statusService.deleteStatus(id);
  }
}
