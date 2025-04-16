import { Container } from "inversify";

import { Module } from "../../app.module";
import { PriorityController } from "./priority.controller";
import { PriorityService } from "./priority.service";

export class PriorityModule implements Module {
  Configure(ioc: Container) {
    ioc.bind(PriorityController).to(PriorityController).inSingletonScope();
    ioc.bind(PriorityService).to(PriorityService).inSingletonScope();
  }
}
