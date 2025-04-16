import { Container } from "inversify";

import { Module } from "../../app.module";
import { SprintPlanningController } from "./sprint-planning.controller";
import { SprintPlanningService } from "./sprint-planning.service";

export class SprintPlanningModule implements Module {
  Configure(ioc: Container) {
    ioc
      .bind(SprintPlanningController)
      .to(SprintPlanningController)
      .inSingletonScope();
    ioc
      .bind(SprintPlanningService)
      .to(SprintPlanningService)
      .inSingletonScope();
  }
}
