import { NotFoundException } from "@force-dev/utils";
import { inject, injectable } from "inversify";
import { Includeable, Transaction, WhereOptions } from "sequelize";

import { iocContainer } from "../../app.module";
import { sequelize } from "../../db";
import { ListResponse } from "../../dto/ListResponse";
import { AuditFieldChange } from "../audit-field-change/audit-field-change.model";
import { AuditFieldChangeService } from "../audit-field-change/audit-field-change.service";
import { Board } from "../board/board.model";
import { Issue } from "../issue/issue.model";
import { Project } from "../project/project.model";
import { Sprint } from "../sprint/sprint.model";
import { Team } from "../team/team.model";
import { User } from "../user/user.model";
import { AuditLog, EAuditAction, EAuditTargetType } from "./audit-log.model";
import { IAuditLogDto } from "./audit-log.model";

export interface IAuditLogCreateRequest {
  action: EAuditAction;
  targetType: EAuditTargetType;
  targetId: string;
  userId: string;
  previousData?: Record<string, unknown>;
  newData?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

@injectable()
export class AuditLogService {
  constructor(
    @inject(AuditFieldChangeService)
    private _auditFieldChangeService: AuditFieldChangeService,
  ) {}

  async getAuditLogs(
    offset?: number,
    limit?: number,
    where?: WhereOptions<AuditLog>,
  ) {
    return AuditLog.findAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: AuditLogService.include,
    });
  }

  async getAuditLogById(id: string) {
    const auditLog = await AuditLog.findByPk(id, {
      include: AuditLogService.include,
    });

    if (!auditLog) {
      throw new NotFoundException("Audit log not found");
    }

    return auditLog;
  }

  async createAuditLog(data: IAuditLogCreateRequest) {
    return sequelize.transaction(async t => {
      const auditLog = await AuditLog.create(
        {
          ...data,
          previousData: data.previousData
            ? JSON.stringify(data.previousData)
            : undefined,
          newData: data.newData ? JSON.stringify(data.newData) : undefined,
        },
        { transaction: t },
      );

      return this._toDto(auditLog);
    });
  }

  async logAction(
    params: {
      action: EAuditAction;
      targetType: EAuditTargetType;
      targetId: string;
      userId: string;
      previousData?: Record<string, unknown>;
      newData?: Record<string, unknown>;
      ipAddress?: string;
      userAgent?: string;
    },
    fieldChanges?: Array<{
      fieldName: string;
      oldValue?: string;
      newValue?: string;
    }>,
    t?: Transaction,
  ) {
    const auditLog = await AuditLog.create(
      {
        action: params.action,
        targetType: params.targetType,
        targetId: params.targetId,
        previousData: params.previousData
          ? JSON.stringify(params.previousData)
          : undefined,
        newData: params.newData ? JSON.stringify(params.newData) : undefined,
        changedFields:
          params.previousData && params.newData
            ? Object.keys(params.newData).filter(
                key =>
                  JSON.stringify(params.previousData?.[key]) !==
                  JSON.stringify(params.newData?.[key]),
              )
            : undefined,
        userId: params.userId,
        ipAddress: params.ipAddress,
        userAgent: params.userAgent,
      },
      { transaction: t },
    );

    if (fieldChanges?.length) {
      await this._auditFieldChangeService.createFieldChanges(
        auditLog.id,
        fieldChanges,
        t,
      );
    }

    return this._toDto(auditLog);
  }

  async findByTarget(
    targetType: EAuditTargetType,
    targetId: string,
    page: number = 1,
    pageSize: number = 20,
  ) {
    const { count, rows } = await AuditLog.findAndCountAll({
      where: { targetType, targetId },
      order: [["createdAt", "DESC"]],
      limit: pageSize,
      offset: (page - 1) * pageSize,
      include: AuditLogService.include,
    });

    return {
      data: rows.map(this._toDto),
      count,
      offset: (page - 1) * pageSize,
      limit: pageSize,
    };
  }

  private _toDto(auditLog: AuditLog): IAuditLogDto {
    return {
      id: auditLog.id,
      action: auditLog.action,
      targetType: auditLog.targetType,
      targetId: auditLog.targetId,
      previousData: auditLog.previousData
        ? JSON.parse(auditLog.previousData)
        : undefined,
      newData: auditLog.newData ? JSON.parse(auditLog.newData) : undefined,
      changedFields: auditLog.changedFields,
      createdAt: auditLog.createdAt,
      updatedAt: auditLog.updatedAt,
      user: auditLog.user,
      ipAddress: auditLog.ipAddress,
      userAgent: auditLog.userAgent,
    };
  }

  static get include(): Includeable[] {
    return [
      { model: User, as: "user" },
      { model: AuditFieldChange, as: "fieldChanges" },
    ];
  }
}

export async function setupAuditHooks(
  model: any,
  targetType: EAuditTargetType,
) {
  model.addHook("afterCreate", async (instance: any, options: any) => {
    const auditService = iocContainer.get<AuditLogService>(AuditLogService);
    const context = options.context || {};

    await auditService.logAction(
      {
        action: EAuditAction.CREATE,
        targetType,
        targetId: instance.id,
        userId:
          context.userId ||
          instance.reporterId ||
          instance.userId ||
          "a1ad143e-c9a8-4e0d-8273-3165e1d1ded7",
        newData: instance.get({ plain: true }),
        ipAddress: context.ipAddress,
        userAgent: context.userAgent,
      },
      undefined,
      options.transaction,
    );
  });

  model.addHook("afterUpdate", async (instance: any, options: any) => {
    const auditService = iocContainer.get<AuditLogService>(AuditLogService);
    const context = options.context || {};
    const previousData = instance.previous();
    const newData = instance.get({ plain: true });

    const changedFields = Object.keys(newData)
      .filter(
        key =>
          JSON.stringify(previousData[key]) !== JSON.stringify(newData[key]),
      )
      .map(fieldName => ({
        fieldName,
        oldValue:
          previousData[fieldName] !== undefined
            ? JSON.stringify(previousData[fieldName])
            : undefined,
        newValue:
          newData[fieldName] !== undefined
            ? JSON.stringify(newData[fieldName])
            : undefined,
      }));

    await auditService.logAction(
      {
        action: EAuditAction.UPDATE,
        targetType,
        targetId: instance.id,
        userId:
          context.userId ||
          instance.reporterId ||
          instance.userId ||
          "a1ad143e-c9a8-4e0d-8273-3165e1d1ded7",
        previousData,
        newData,
        ipAddress: context.ipAddress,
        userAgent: context.userAgent,
      },
      changedFields,
      options.transaction,
    );
  });

  model.addHook("afterDestroy", async (instance: any, options: any) => {
    const auditService = iocContainer.get<AuditLogService>(AuditLogService);
    const context = options.context || {};

    await auditService.logAction(
      {
        action: EAuditAction.DELETE,
        targetType,
        targetId: instance.id,
        userId:
          context.userId ||
          instance.reporterId ||
          instance.userId ||
          "a1ad143e-c9a8-4e0d-8273-3165e1d1ded7",
        previousData: instance.get({ plain: true }),
        ipAddress: context.ipAddress,
        userAgent: context.userAgent,
      },
      undefined,
      options.transaction,
    );
  });
}

// Применение хуков к моделям
setupAuditHooks(Issue, EAuditTargetType.ISSUE).then();
setupAuditHooks(Project, EAuditTargetType.PROJECT).then();
setupAuditHooks(Sprint, EAuditTargetType.SPRINT).then();
setupAuditHooks(Board, EAuditTargetType.BOARD).then();
setupAuditHooks(User, EAuditTargetType.USER).then();
setupAuditHooks(Team, EAuditTargetType.TEAM).then();
