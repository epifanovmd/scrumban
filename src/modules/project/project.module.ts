import { Container } from "inversify";

import { Module } from "../../app.module";
import { ProjectController } from "./project.controller";
import { ProjectService } from "./project.service";

export class ProjectModule implements Module {
  Configure(ioc: Container) {
    ioc.bind(ProjectController).to(ProjectController).inSingletonScope();
    ioc.bind(ProjectService).to(ProjectService).inSingletonScope();
  }
}
