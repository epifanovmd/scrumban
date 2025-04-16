import { Container } from "inversify";

import { Module } from "../../app.module";
import { IssueTypeController } from "./issue-type.controller";
import { IssueTypeService } from "./issue-type.service";

export class IssueTypeModule implements Module {
  Configure(ioc: Container) {
    ioc.bind(IssueTypeController).to(IssueTypeController).inSingletonScope();
    ioc.bind(IssueTypeService).to(IssueTypeService).inSingletonScope();
  }
}
