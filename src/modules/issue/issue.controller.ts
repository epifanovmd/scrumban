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
  IIssueCreateRequest,
  IIssueDto,
  IIssueListDto,
  IIssueUpdateRequest,
} from "./issue.model";
import { IssueService } from "./issue.service";

@injectable()
@Tags("Issue")
@Route("api/issue")
export class IssueController extends Controller {
  constructor(@inject(IssueService) private _issueService: IssueService) {
    super();
  }

  @Security("jwt")
  @Get("list")
  getIssues(
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
    @Query("projectId") projectId?: string,
  ): Promise<IIssueListDto> {
    return this._issueService
      .getIssues(offset, limit, projectId ? { projectId } : undefined)
      .then(result => ({
        offset,
        limit,
        count: result.length,
        data: result.map(res => res.toDTO()),
      }));
  }

  @Security("jwt")
  @Get("{id}")
  getIssueById(id: string): Promise<IIssueDto> {
    return this._issueService.getIssueById(id).then(res => res.toDTO());
  }

  @Security("jwt")
  @Post()
  createIssue(@Body() body: IIssueCreateRequest): Promise<IIssueDto> {
    return this._issueService.createIssue(body).then(res => res.toDTO());
  }

  @Security("jwt")
  @Patch("{id}")
  updateIssue(
    id: string,
    @Body() body: IIssueUpdateRequest,
  ): Promise<IIssueDto> {
    return this._issueService.updateIssue(id, body).then(res => res.toDTO());
  }

  @Security("jwt", ["role:admin"])
  @Delete("{id}")
  deleteIssue(id: string): Promise<string> {
    return this._issueService.deleteIssue(id);
  }

  @Security("jwt")
  @Post("{issueId}/assign/{userId}")
  assignIssue(issueId: string, userId: string): Promise<IIssueDto> {
    return this._issueService
      .assignIssue(issueId, userId)
      .then(res => res.toDTO());
  }

  @Security("jwt")
  @Post("{issueId}/status/{statusId}")
  changeStatus(issueId: string, statusId: string): Promise<IIssueDto> {
    return this._issueService
      .changeStatus(issueId, statusId)
      .then(res => res.toDTO());
  }
}
