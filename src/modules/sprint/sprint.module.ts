import { Container } from "inversify";

import { Module } from "../../app.module";
import { SprintService } from "./sprint.service";

export class SprintModule implements Module {
  Configure(ioc: Container) {
    ioc.bind(SprintService).to(SprintService).inSingletonScope();
  }
}
