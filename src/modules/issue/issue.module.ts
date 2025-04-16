import { Container } from "inversify";

import { Module } from "../../app.module";
import { IssueController } from "./issue.controller";
import { IssueService } from "./issue.service";

export class IssueModule implements Module {
  Configure(ioc: Container) {
    ioc.bind(IssueController).to(IssueController).inSingletonScope();
    ioc.bind(IssueService).to(IssueService).inSingletonScope();
  }
}
