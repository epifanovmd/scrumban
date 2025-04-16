import { Container } from "inversify";

import { Module } from "../../app.module";
import { WorkflowController } from "./workflow.controller";
import { WorkflowService } from "./workflow.service";

export class WorkflowModule implements Module {
  Configure(ioc: Container) {
    ioc.bind(WorkflowController).to(WorkflowController).inSingletonScope();
    ioc.bind(WorkflowService).to(WorkflowService).inSingletonScope();
  }
}
