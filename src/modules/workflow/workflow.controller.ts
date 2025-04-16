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
  IWorkflowCreateRequest,
  IWorkflowDto,
  IWorkflowListDto,
  IWorkflowUpdateRequest,
} from "./workflow.model";
import { WorkflowService } from "./workflow.service";

@injectable()
@Tags("Workflow")
@Route("api/workflow")
export class WorkflowController extends Controller {
  constructor(
    @inject(WorkflowService) private _workflowService: WorkflowService,
  ) {
    super();
  }

  @Security("jwt")
  @Get("list")
  getWorkflows(
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
    @Query("boardId") boardId?: string,
  ): Promise<IWorkflowListDto> {
    return this._workflowService
      .getWorkflows(offset, limit, boardId ? { boardId } : undefined)
      .then(result => ({
        offset,
        limit,
        count: result.length,
        data: result.map(res => res.toDTO()),
      }));
  }

  @Security("jwt")
  @Get("{id}")
  getWorkflowById(id: string): Promise<IWorkflowDto> {
    return this._workflowService.getWorkflowById(id).then(res => res.toDTO());
  }

  @Security("jwt", ["role:admin"])
  @Post()
  createWorkflow(@Body() body: IWorkflowCreateRequest): Promise<IWorkflowDto> {
    return this._workflowService.createWorkflow(body).then(res => res.toDTO());
  }

  @Security("jwt", ["role:admin"])
  @Patch("{id}")
  updateWorkflow(
    id: string,
    @Body() body: IWorkflowUpdateRequest,
  ): Promise<IWorkflowDto> {
    return this._workflowService
      .updateWorkflow(id, body)
      .then(res => res.toDTO());
  }

  @Security("jwt", ["role:admin"])
  @Delete("{id}")
  deleteWorkflow(id: string): Promise<string> {
    return this._workflowService.deleteWorkflow(id);
  }

  @Security("jwt")
  @Post("{workflowId}/statuses/{statusId}")
  addStatusToWorkflow(
    workflowId: string,
    statusId: string,
    @Query("order") order?: number,
  ): Promise<IWorkflowDto> {
    return this._workflowService
      .addStatusToWorkflow(workflowId, statusId, order)
      .then(res => res.toDTO());
  }

  @Security("jwt")
  @Delete("{workflowId}/statuses/{statusId}")
  removeStatusFromWorkflow(
    workflowId: string,
    statusId: string,
  ): Promise<IWorkflowDto> {
    return this._workflowService
      .removeStatusFromWorkflow(workflowId, statusId)
      .then(res => res.toDTO());
  }
}
