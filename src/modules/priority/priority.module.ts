import { Container } from "inversify";

import { Module } from "../../app.module";
import { PriorityService } from "./priority.service";

export class PriorityModule implements Module {
  Configure(ioc: Container) {
    ioc.bind(PriorityService).to(PriorityService).inSingletonScope();
  }
}
