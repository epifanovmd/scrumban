import { Container } from "inversify";

import { Module } from "../../app.module";
import { StatusController } from "./status.controller";
import { StatusService } from "./status.service";

export class StatusModule implements Module {
  Configure(ioc: Container) {
    ioc.bind(StatusController).to(StatusController).inSingletonScope();
    ioc.bind(StatusService).to(StatusService).inSingletonScope();
  }
}
