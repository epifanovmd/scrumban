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
  ITeamCreateRequest,
  ITeamDto,
  ITeamListDto,
  ITeamUpdateRequest,
} from "./team.model";
import { TeamService } from "./team.service";

@injectable()
@Tags("Team")
@Route("api/team")
export class TeamController extends Controller {
  constructor(@inject(TeamService) private _teamService: TeamService) {
    super();
  }

  @Security("jwt")
  @Get("list")
  getTeams(
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
  ): Promise<ITeamListDto> {
    return this._teamService.getTeams(offset, limit).then(result => ({
      offset,
      limit,
      count: result.length,
      data: result,
    }));
  }

  @Security("jwt")
  @Get("{id}")
  getTeamById(id: string): Promise<ITeamDto> {
    return this._teamService.getTeamById(id);
  }

  @Security("jwt", ["role:admin"])
  @Post()
  createTeam(@Body() body: ITeamCreateRequest): Promise<ITeamDto> {
    return this._teamService.createTeam(body);
  }

  @Security("jwt", ["role:admin"])
  @Patch("{id}")
  updateTeam(id: string, @Body() body: ITeamUpdateRequest): Promise<ITeamDto> {
    return this._teamService.updateTeam(id, body);
  }

  @Security("jwt", ["role:admin"])
  @Delete("{id}")
  deleteTeam(id: string): Promise<string> {
    return this._teamService.deleteTeam(id);
  }

  @Security("jwt", ["role:admin"])
  @Post("{teamId}/members/{userId}")
  addMember(
    teamId: string,
    userId: string,
    @Query("role") role: string = "member",
  ): Promise<ITeamDto> {
    return this._teamService.addMember(teamId, userId, role);
  }

  @Security("jwt", ["role:admin"])
  @Delete("{teamId}/members/{userId}")
  removeMember(teamId: string, userId: string): Promise<ITeamDto> {
    return this._teamService.removeMember(teamId, userId);
  }
}
