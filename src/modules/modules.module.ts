import "./modules.associations";

import { Container } from "inversify";

import { Module } from "../app.module";
import { AuditFieldChangeModule } from "./audit-field-change";
import { AuditLogModule } from "./audit-log";
import { AuthModule } from "./auth";
import { BacklogModule } from "./backlog";
import { BiometricModule } from "./biometric";
import { BoardModule } from "./board";
import { FileModule } from "./file";
import { IssueModule } from "./issue";
import { IssueTypeModule } from "./issue-type";
import { MailerModule } from "./mailer";
import { OtpModule } from "./otp";
import { PasskeysModule } from "./passkeys";
import { PermissionModule } from "./permission";
import { PriorityModule } from "./priority";
import { ProfileModule } from "./profile";
import { ProjectModule } from "./project";
import { ResetPasswordTokensModule } from "./reset-password-tokens";
import { RoleModule } from "./role";
import { SocketModule } from "./socket";
import { SprintModule } from "./sprint";
import { SprintPlanningModule } from "./sprint-planning";
import { StatusModule } from "./status";
import { TeamModule } from "./team";
import { UserModule } from "./user";
import { UtilsModule } from "./utils";
import { WorkflowModule } from "./workflow";
// IMPORT MODULE HERE

export class ModulesModule implements Module {
  Configure(ioc: Container) {
    new AuthModule().Configure(ioc);
    new FileModule().Configure(ioc);
    new PasskeysModule().Configure(ioc);
    new UserModule().Configure(ioc);
    new ProfileModule().Configure(ioc);
    new RoleModule().Configure(ioc);
    new PermissionModule().Configure(ioc);
    new SocketModule().Configure(ioc);
    new UtilsModule().Configure(ioc);
    new MailerModule().Configure(ioc);
    new OtpModule().Configure(ioc);
    new ResetPasswordTokensModule().Configure(ioc);
    new BiometricModule().Configure(ioc);
    new AuditFieldChangeModule().Configure(ioc);
    new AuditLogModule().Configure(ioc);
    new BacklogModule().Configure(ioc);
    new BoardModule().Configure(ioc);
    new IssueModule().Configure(ioc);
    new IssueTypeModule().Configure(ioc);
    new PriorityModule().Configure(ioc);
    new ProjectModule().Configure(ioc);
    new SprintModule().Configure(ioc);
    new SprintPlanningModule().Configure(ioc);
    new StatusModule().Configure(ioc);
    new TeamModule().Configure(ioc);
    new WorkflowModule().Configure(ioc);
    // CONFIGURE MODULE HERE
  }
}
