import { Container } from "inversify";

import { Module } from "../../app.module";
import { WorkflowService } from "./workflow.service";

export class WorkflowModule implements Module {
  Configure(ioc: Container) {
    ioc.bind(WorkflowService).to(WorkflowService).inSingletonScope();
  }
}
