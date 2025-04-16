import { Container } from "inversify";

import { Module } from "../../app.module";
import { StatusService } from "./status.service";

export class StatusModule implements Module {
  Configure(ioc: Container) {
    ioc.bind(StatusService).to(StatusService).inSingletonScope();
  }
}
