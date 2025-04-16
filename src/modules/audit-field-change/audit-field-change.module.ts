import { Container } from "inversify";

import { Module } from "../../app.module";
import { AuditFieldChangeService } from "./audit-field-change.service";

export class AuditFieldChangeModule implements Module {
  Configure(ioc: Container) {
    ioc
      .bind(AuditFieldChangeService)
      .to(AuditFieldChangeService)
      .inSingletonScope();
  }
}
