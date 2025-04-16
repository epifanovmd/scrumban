import { Container } from "inversify";

import { Module } from "../../app.module";
import { TeamService } from "./team.service";

export class TeamModule implements Module {
  Configure(ioc: Container) {
    ioc.bind(TeamService).to(TeamService).inSingletonScope();
  }
}
