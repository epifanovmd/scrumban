import { Container } from "inversify";

import { Module } from "../../app.module";
import { BacklogService } from "./backlog.service";

export class BacklogModule implements Module {
  Configure(ioc: Container) {
    ioc.bind(BacklogService).to(BacklogService).inSingletonScope();
  }
}
