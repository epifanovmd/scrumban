import { Container } from "inversify";

import { Module } from "../../app.module";
import { IssueService } from "./issue.service";

export class IssueModule implements Module {
  Configure(ioc: Container) {
    ioc.bind(IssueService).to(IssueService).inSingletonScope();
  }
}
