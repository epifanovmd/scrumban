import { AuditFieldChange } from "./audit-field-change/audit-field-change.model";
import { AuditLog } from "./audit-log/audit-log.model";
import { Backlog } from "./backlog/backlog.model";
import { BacklogItem } from "./backlog-item/backlog-item.model";
import { Biometric } from "./biometric/biometric.model";
import { Board } from "./board/board.model";
import { Comment } from "./comment/comment.model";
import { Files } from "./file/file.model";
import { Issue } from "./issue/issue.model";
import { IssueOrder } from "./issue-order/issue-order.model";
import { IssueType } from "./issue-type/issue-type.model";
import { Otp } from "./otp/otp.model";
import { Passkeys } from "./passkeys/passkeys.model";
import { Permission } from "./permission/permission.model";
import { PlanningItem } from "./planning-item/planning-item.model";
import { Priority } from "./priority/priority.model";
import { Profile } from "./profile/profile.model";
import { Project } from "./project/project.model";
import { ResetPasswordTokens } from "./reset-password-tokens/reset-password-tokens.model";
import { Role } from "./role/role.model";
import { Sprint } from "./sprint/sprint.model";
import {
  SprintPlanning,
  SprintPlanningParticipant,
} from "./sprint-planning/sprint-planning.model";
import { Status } from "./status/status.model";
import { Team, TeamMember } from "./team/team.model";
import { User } from "./user/user.model";
import { Workflow, WorkflowStatus } from "./workflow/workflow.model";

// Пользователь и роли
User.belongsTo(Role, { foreignKey: "roleId" });
Role.hasMany(User, { onDelete: "CASCADE" });

// Пользователь и профиль
User.hasOne(Profile, {
  foreignKey: "userId",
  as: "profile",
  onDelete: "CASCADE",
});
Profile.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
  onDelete: "CASCADE",
});
Profile.belongsTo(Files, {
  foreignKey: "avatarId",
  as: "avatar",
});

// Пользователь и passkeys
User.hasMany(Passkeys, { onDelete: "CASCADE" });
Passkeys.belongsTo(User);

// Пользователь и biometric
User.hasMany(Biometric, { onDelete: "CASCADE" });
Biometric.belongsTo(User);

// Пользователь и OTP
User.hasMany(Otp, { onDelete: "CASCADE" });
Otp.belongsTo(User);

// Пользователь и токены сброса пароля
User.hasMany(ResetPasswordTokens, { onDelete: "CASCADE" });
ResetPasswordTokens.belongsTo(User);

// Пользователь и avatar
User.belongsTo(Files, {
  foreignKey: "avatarId", // Поле в User, хранящее ID файла
  as: "avatar", // Алиас
});

// Роли и разрешения (многие ко многим)
Role.belongsToMany(Permission, {
  through: "role-permissions",
  onDelete: "CASCADE",
});
Permission.belongsToMany(Role, {
  through: "role-permissions",
  onDelete: "CASCADE",
});

/* _______________________________________________________________________ */

// Пользователи и профили
User.hasOne(Profile, { foreignKey: "userId" });
Profile.belongsTo(User, { foreignKey: "userId" });

// Роли и разрешения
User.belongsTo(Role, { foreignKey: "roleId" });
Role.hasMany(User, { foreignKey: "roleId" });

Role.belongsToMany(Permission, { through: "role_permissions" });
Permission.belongsToMany(Role, { through: "role_permissions" });

// Команды и участники
Team.hasMany(TeamMember, { foreignKey: "teamId" });
TeamMember.belongsTo(Team, { foreignKey: "teamId" });

TeamMember.belongsTo(User, { foreignKey: "userId" });
User.hasMany(TeamMember, { foreignKey: "userId" });

// Проекты
Project.belongsTo(User, {
  as: "projectLead",
  foreignKey: "leadId",
});
User.hasMany(Project, {
  as: "ledProjects",
  foreignKey: "leadId",
});

Project.belongsToMany(Team, { through: "project_teams" });
Team.belongsToMany(Project, { through: "project_teams" });

// Доски
Project.hasMany(Board, { foreignKey: "projectId" });
Board.belongsTo(Project, { foreignKey: "projectId" });

// Бэклог
Project.hasMany(Backlog, { foreignKey: "projectId" });
Backlog.belongsTo(Project, { foreignKey: "projectId" });

// Задачи
Issue.belongsTo(IssueType, {
  foreignKey: "typeId",
  as: "type", // Используем тот же алиас, что и в запросах
});

IssueType.hasMany(Issue, {
  foreignKey: "typeId",
  as: "issues",
});

Issue.belongsTo(Priority, { foreignKey: "priorityId" });
Priority.hasMany(Issue, { foreignKey: "priorityId" });

Issue.belongsTo(Status, { foreignKey: "statusId" });
Status.hasMany(Issue, { foreignKey: "statusId" });

Issue.belongsTo(Project, { foreignKey: "projectId" });
Project.hasMany(Issue, { foreignKey: "projectId" });

Issue.belongsTo(Board, { foreignKey: "boardId" });
Board.hasMany(Issue, { foreignKey: "boardId" });

Issue.belongsTo(Sprint, { foreignKey: "sprintId" });
Sprint.hasMany(Issue, { foreignKey: "sprintId" });

Issue.belongsTo(User, { as: "assignee", foreignKey: "assigneeId" });
User.hasMany(Issue, { as: "assignedIssues", foreignKey: "assigneeId" });

Issue.belongsTo(User, { as: "reporter", foreignKey: "reporterId" });
User.hasMany(Issue, { as: "reportedIssues", foreignKey: "reporterId" });

Issue.belongsTo(Issue, { as: "parent", foreignKey: "parentId" });
Issue.hasMany(Issue, { as: "children", foreignKey: "parentId" });

Issue.hasMany(IssueOrder, { foreignKey: "issueId", as: "orderEntries" });
IssueOrder.belongsTo(Issue, { foreignKey: "issueId" });

Status.hasMany(IssueOrder, { foreignKey: "statusId" });
IssueOrder.belongsTo(Status, { foreignKey: "statusId" });

Board.hasMany(IssueOrder, { foreignKey: "boardId" });
IssueOrder.belongsTo(Board, { foreignKey: "boardId" });

// Элементы бэклога
Backlog.belongsToMany(Issue, { through: BacklogItem, as: "backlogIssues" });
Issue.belongsToMany(Backlog, { through: BacklogItem, as: "issueBacklogs" });

// Спринты
Board.hasMany(Sprint, { foreignKey: "boardId" });
Sprint.belongsTo(Board, { foreignKey: "boardId" });

Board.belongsTo(Sprint, { as: "activeSprint", foreignKey: "activeSprintId" });
Sprint.hasOne(Board, { as: "activeBoard", foreignKey: "activeSprintId" });

// Планирование спринтов
Sprint.hasOne(SprintPlanning, { foreignKey: "sprintId" });
SprintPlanning.belongsTo(Sprint, { foreignKey: "sprintId" });

SprintPlanning.belongsToMany(User, {
  through: SprintPlanningParticipant,
  as: "planningParticipants",
});
User.belongsToMany(SprintPlanning, {
  through: SprintPlanningParticipant,
  as: "userPlannings",
});

// Элементы планирования
SprintPlanning.hasMany(PlanningItem, { foreignKey: "planningId" });
PlanningItem.belongsTo(SprintPlanning, { foreignKey: "planningId" });

PlanningItem.belongsTo(Issue, { foreignKey: "issueId" });
Issue.hasOne(PlanningItem, { foreignKey: "issueId" });

PlanningItem.belongsTo(User, {
  as: "suggestedBy",
  foreignKey: "suggestedById",
});
User.hasMany(PlanningItem, {
  as: "suggestedItems",
  foreignKey: "suggestedById",
});

// Workflow
Board.hasMany(Workflow, { foreignKey: "boardId" });
Workflow.belongsTo(Board, { foreignKey: "boardId" });

Workflow.belongsToMany(Status, {
  through: WorkflowStatus,
  as: "statuses",
});
Status.belongsToMany(Workflow, {
  through: WorkflowStatus,
  as: "workflows",
});

// Комментарии
Issue.hasMany(Comment, { foreignKey: "issueId" });
Comment.belongsTo(Issue, { foreignKey: "issueId" });

Comment.belongsTo(User, { as: "commentAuthor", foreignKey: "authorId" });
User.hasMany(Comment, { as: "userComments", foreignKey: "authorId" });

// Audit associations
AuditLog.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(AuditLog, { foreignKey: "userId", as: "auditLogs" });

AuditLog.hasMany(AuditFieldChange, {
  foreignKey: "auditLogId",
  as: "fieldChanges",
});
AuditFieldChange.belongsTo(AuditLog, {
  foreignKey: "auditLogId",
  as: "auditLog",
});
