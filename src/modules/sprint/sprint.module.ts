import { Container } from "inversify";

import { Module } from "../../app.module";
import { SprintController } from "./sprint.controller";
import { SprintService } from "./sprint.service";

export class SprintModule implements Module {
  Configure(ioc: Container) {
    ioc.bind(SprintController).to(SprintController).inSingletonScope();
    ioc.bind(SprintService).to(SprintService).inSingletonScope();
  }
}
