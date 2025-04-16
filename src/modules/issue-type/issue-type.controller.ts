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
  IIssueTypeCreateRequest,
  IIssueTypeDto,
  IIssueTypeListDto,
  IIssueTypeUpdateRequest,
} from "./issue-type.model";
import { IssueTypeService } from "./issue-type.service";

@injectable()
@Tags("IssueType")
@Route("api/issue-type")
export class IssueTypeController extends Controller {
  constructor(
    @inject(IssueTypeService) private _issueTypeService: IssueTypeService,
  ) {
    super();
  }

  @Security("jwt")
  @Get("list")
  getIssueTypes(
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
  ): Promise<IIssueTypeListDto> {
    return this._issueTypeService.getIssueTypes(offset, limit).then(result => ({
      offset,
      limit,
      count: result.length,
      data: result,
    }));
  }

  @Security("jwt")
  @Get("{id}")
  getIssueTypeById(id: string): Promise<IIssueTypeDto> {
    return this._issueTypeService.getIssueTypeById(id);
  }

  @Security("jwt")
  @Get("name/{name}")
  getIssueTypeByName(name: string): Promise<IIssueTypeDto> {
    return this._issueTypeService.getIssueTypeByName(name);
  }

  @Security("jwt", ["role:admin"])
  @Post()
  createIssueType(
    @Body() body: IIssueTypeCreateRequest,
  ): Promise<IIssueTypeDto> {
    return this._issueTypeService.createIssueType(body);
  }

  @Security("jwt", ["role:admin"])
  @Patch("{id}")
  updateIssueType(
    id: string,
    @Body() body: IIssueTypeUpdateRequest,
  ): Promise<IIssueTypeDto> {
    return this._issueTypeService.updateIssueType(id, body);
  }

  @Security("jwt", ["role:admin"])
  @Delete("{id}")
  deleteIssueType(id: string): Promise<string> {
    return this._issueTypeService.deleteIssueType(id);
  }
}
