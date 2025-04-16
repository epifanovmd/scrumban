import { Container } from "inversify";

import { Module } from "../../app.module";
import { AuditLogService } from "./audit-log.service";

export class AuditLogModule implements Module {
  Configure(ioc: Container) {
    ioc.bind(AuditLogService).to(AuditLogService).inSingletonScope();
  }
}
