import { Container } from "inversify";

import { Module } from "../../app.module";
import { TeamController } from "./team.controller";
import { TeamService } from "./team.service";

export class TeamModule implements Module {
  Configure(ioc: Container) {
    ioc.bind(TeamController).to(TeamController).inSingletonScope();
    ioc.bind(TeamService).to(TeamService).inSingletonScope();
  }
}
