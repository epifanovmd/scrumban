import { BadRequestException, NotFoundException } from "@force-dev/utils";
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

import { Issue } from "../issue/issue.model";
import {
  IStatusTransitionCreateRequest,
  IStatusTransitionDto,
  IStatusTransitionsGraph,
} from "../status-transition/status-transition.model";
import {
  IWorkflowCreateRequest,
  IWorkflowDto,
  IWorkflowListDto,
  IWorkflowUpdateRequest,
  WorkflowStatus,
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
        data: result.map(res => res.toJSON()),
      }));
  }

  @Security("jwt")
  @Get("{workflowId}")
  async getWorkflowById(workflowId: string): Promise<IWorkflowDto> {
    const res = await this._workflowService.getWorkflowById(workflowId);

    return res.toJSON();
  }

  @Security("jwt")
  @Get("{workflowId}/graph")
  getWorkflowGraph(workflowId: string): Promise<IStatusTransitionsGraph[]> {
    return this._workflowService.getWorkflowGraph(workflowId);
  }

  @Security("jwt", ["role:admin"])
  @Post()
  createWorkflow(@Body() body: IWorkflowCreateRequest): Promise<IWorkflowDto> {
    return this._workflowService.createWorkflow(body).then(res => res.toJSON());
  }

  @Security("jwt", ["role:admin"])
  @Patch("{id}")
  updateWorkflow(
    id: string,
    @Body() body: IWorkflowUpdateRequest,
  ): Promise<IWorkflowDto> {
    return this._workflowService
      .updateWorkflow(id, body)
      .then(res => res.toJSON());
  }

  @Security("jwt", ["role:admin"])
  @Delete("{id}")
  deleteWorkflow(id: string): Promise<string> {
    return this._workflowService.deleteWorkflow(id);
  }

  @Security("jwt")
  @Patch("{workflowId}/statuses/{statusId}/wip-limit")
  async setWipLimit(
    workflowId: string,
    statusId: string,
    @Query("limit") limit: number,
  ): Promise<IWorkflowDto> {
    if (limit < 0) {
      throw new BadRequestException("WIP limit cannot be negative");
    }

    await WorkflowStatus.update(
      { wipLimit: limit },
      {
        where: {
          workflowId,
          statusId,
        },
      },
    );

    return this._workflowService
      .getWorkflowById(workflowId)
      .then(res => res.toJSON());
  }

  @Security("jwt")
  @Get("{workflowId}/statuses/{statusId}/wip-check")
  async checkWipLimit(
    workflowId: string,
    statusId: string,
  ): Promise<{ current: number; limit?: number; exceeded: boolean }> {
    const status = await WorkflowStatus.findOne({
      where: {
        workflowId,
        statusId,
      },
    });

    if (!status) {
      throw new NotFoundException("Workflow status not found");
    }

    const current = await Issue.count({ where: { statusId } });

    return {
      current,
      limit: status.wipLimit,
      exceeded: status.wipLimit ? current >= status.wipLimit : false,
    };
  }

  @Security("jwt")
  @Get("transition/{workflowId}/status/{statusId}")
  getAvailableTransitions(
    workflowId: string,
    statusId: string,
  ): Promise<IStatusTransitionDto[]> {
    return this._workflowService.getAvailableTransitions(workflowId, statusId);
  }

  @Security("jwt")
  @Post("transition/{workflowId}")
  addTransition(
    workflowId: string,
    @Body() params: IStatusTransitionCreateRequest,
  ): Promise<IStatusTransitionDto> {
    return this._workflowService.addTransition(
      workflowId,
      params.fromStatusId,
      params.toStatusId,
    );
  }

  @Security("jwt")
  @Delete("transition/{transitionId}")
  removeTransition(transitionId: string): Promise<number> {
    return this._workflowService.removeTransition(transitionId);
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
      .then(res => res.toJSON());
  }

  @Security("jwt")
  @Delete("{workflowId}/statuses/{statusId}")
  removeStatusFromWorkflow(
    workflowId: string,
    statusId: string,
  ): Promise<IWorkflowDto> {
    return this._workflowService
      .removeStatusFromWorkflow(workflowId, statusId)
      .then(res => res.toJSON());
  }
}
