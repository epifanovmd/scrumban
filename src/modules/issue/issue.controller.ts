import { inject, injectable } from "inversify";
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Query,
  Route,
  Security,
  Tags,
} from "tsoa";

import {
  IIssueCreateRequest,
  IIssueDto,
  IIssueListDto,
  IIssueOrderUpdateRequest,
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
  async getIssues(
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
    @Query("projectId") projectId?: string,
    @Query("includeRelations") includeRelations?: boolean,
  ): Promise<IIssueListDto> {
    const result = await this._issueService.getIssues(
      offset,
      limit,
      includeRelations,
      projectId ? { projectId } : undefined,
    );

    return {
      offset,
      limit,
      count: result.length,
      data: result.map(res => res.toJSON()),
    };
  }

  @Security("jwt")
  @Get("{id}")
  async getIssueById(
    id: string,
    @Query("includeRelations") includeRelations?: boolean,
  ): Promise<IIssueDto> {
    const res = await this._issueService.getIssueById(id, { includeRelations });

    return res.toJSON();
  }

  @Security("jwt")
  @Post()
  async createIssue(@Body() body: IIssueCreateRequest): Promise<IIssueDto> {
    const res = await this._issueService.createIssue(body);

    return res.toJSON();
  }

  @Security("jwt")
  @Patch("{id}")
  async updateIssue(
    id: string,
    @Body() body: IIssueUpdateRequest,
  ): Promise<IIssueDto> {
    const res = await this._issueService.updateIssue(id, body);

    return res.toJSON();
  }

  @Security("jwt", ["role:admin"])
  @Delete("{id}")
  deleteIssue(id: string): Promise<string> {
    return this._issueService.deleteIssue(id);
  }

  @Security("jwt")
  @Post("{issueId}/assign/{userId}")
  async assignIssue(issueId: string, userId: string): Promise<IIssueDto> {
    const res = await this._issueService.assignIssue(issueId, userId);

    return res.toJSON();
  }

  @Security("jwt")
  @Post("{issueId}/status/{statusId}")
  async changeStatus(issueId: string, statusId: string): Promise<IIssueDto> {
    const res = await this._issueService.changeStatus(issueId, statusId);

    return res.toJSON();
  }

  @Security("jwt")
  @Put("{id}/order")
  async updateIssueOrder(
    @Query("id") id: string,
    @Body() body: IIssueOrderUpdateRequest,
  ): Promise<IIssueDto> {
    return this._issueService
      .updateIssueOrder(id, body)
      .then(res => res.toJSON());
  }
}
