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
  IBoardCreateRequest,
  IBoardDto,
  IBoardListDto,
  IBoardUpdateRequest,
  IBoardWithStatusesDto,
} from "./board.model";
import { BoardService } from "./board.service";

@injectable()
@Tags("Board")
@Route("api/board")
export class BoardController extends Controller {
  constructor(@inject(BoardService) private _boardService: BoardService) {
    super();
  }

  @Security("jwt")
  @Get("list")
  getBoards(
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
    @Query("projectId") projectId?: string,
  ): Promise<IBoardListDto> {
    return this._boardService
      .getBoards(offset, limit, projectId ? { projectId } : undefined)
      .then(result => ({
        offset,
        limit,
        count: result.length,
        data: result.map(res => res.toJSON()),
      }));
  }

  @Get("{id}/issued")
  async getFullBoard(id: string): Promise<IBoardWithStatusesDto> {
    const { board, statuses } = await this._boardService.getBoardWithIssues(id);

    return {
      ...board.toJSON(),
      statuses: (statuses ?? []).map(({ status, issues }) => ({
        status: status.toJSON(),
        issues: issues.map(i => i.toJSON()),
      })),
    };
  }

  @Security("jwt")
  @Get("{id}")
  getBoardById(id: string): Promise<IBoardDto> {
    return this._boardService.getBoardById(id).then(res => res.toJSON());
  }

  @Security("jwt", ["role:admin"])
  @Post()
  createBoard(@Body() body: IBoardCreateRequest): Promise<IBoardDto> {
    return this._boardService.createBoard(body).then(res => res.toJSON());
  }

  @Security("jwt", ["role:admin"])
  @Patch("{id}")
  updateBoard(
    id: string,
    @Body() body: IBoardUpdateRequest,
  ): Promise<IBoardDto> {
    return this._boardService.updateBoard(id, body).then(res => res.toJSON());
  }

  @Security("jwt", ["role:admin"])
  @Delete("{id}")
  deleteBoard(id: string): Promise<string> {
    return this._boardService.deleteBoard(id);
  }

  @Security("jwt")
  @Post("{boardId}/sprints/{sprintId}/activate")
  setActiveSprint(boardId: string, sprintId: string): Promise<IBoardDto> {
    return this._boardService
      .setActiveSprint(boardId, sprintId)
      .then(res => res.toJSON());
  }
}
