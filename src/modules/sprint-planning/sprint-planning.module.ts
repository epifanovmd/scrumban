import { Container } from "inversify";

import { Module } from "../../app.module";
import { SprintPlanningService } from "./sprint-planning.service";

export class SprintPlanningModule implements Module {
  Configure(ioc: Container) {
    ioc
      .bind(SprintPlanningService)
      .to(SprintPlanningService)
      .inSingletonScope();
  }
}
