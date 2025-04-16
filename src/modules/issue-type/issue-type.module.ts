import { Container } from "inversify";

import { Module } from "../../app.module";
import { IssueTypeService } from "./issue-type.service";

export class IssueTypeModule implements Module {
  Configure(ioc: Container) {
    ioc.bind(IssueTypeService).to(IssueTypeService).inSingletonScope();
  }
}
