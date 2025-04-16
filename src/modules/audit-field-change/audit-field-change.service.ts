import { NotFoundException } from "@force-dev/utils";
import { injectable } from "inversify";
import { Transaction } from "sequelize";

import { AuditLog } from "../audit-log/audit-log.model";
import { AuditFieldChange } from "./audit-field-change.model";
import { IAuditFieldChangeCreateRequest } from "./audit-field-change.model";

@injectable()
export class AuditFieldChangeService {
  constructor() {}

  async createFieldChange(
    data: IAuditFieldChangeCreateRequest,
    t?: Transaction,
  ) {
    const auditLog = await AuditLog.findByPk(data.auditLogId);

    if (!auditLog) {
      throw new NotFoundException("Audit log not found");
    }

    return AuditFieldChange.create(data, { transaction: t });
  }

  async createFieldChanges(
    auditLogId: string,
    changes: Array<{
      fieldName: string;
      oldValue?: string;
      newValue?: string;
    }>,
    t?: Transaction,
  ) {
    return AuditFieldChange.bulkCreate(
      changes.map(change => ({
        ...change,
        auditLogId,
      })),
      { transaction: t },
    );
  }

  async getFieldChangesByAuditLog(auditLogId: string) {
    const auditLog = await AuditLog.findByPk(auditLogId);

    if (!auditLog) {
      throw new NotFoundException("Audit log not found");
    }

    return AuditFieldChange.findAll({
      where: { auditLogId },
      order: [["createdAt", "ASC"]],
    });
  }
}
