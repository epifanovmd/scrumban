import { Container } from "inversify";

import { Module } from "../../app.module";
import { BacklogController } from "./backlog.controller";
import { BacklogService } from "./backlog.service";

export class BacklogModule implements Module {
  Configure(ioc: Container) {
    ioc.bind(BacklogController).to(BacklogController).inSingletonScope();
    ioc.bind(BacklogService).to(BacklogService).inSingletonScope();
  }
}
