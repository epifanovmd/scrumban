/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './modules/user/user.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './modules/auth/auth.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TeamController } from './modules/team/team.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProjectController } from './modules/project/project.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { IssueController } from './modules/issue/issue.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BacklogController } from './modules/backlog/backlog.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BiometricController } from './modules/biometric/biometric.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BoardController } from './modules/board/board.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FileController } from './modules/file/file.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { IssueTypeController } from './modules/issue-type/issue-type.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PasskeysController } from './modules/passkeys/passkeys.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PriorityController } from './modules/priority/priority.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProfileController } from './modules/profile/profile.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SprintController } from './modules/sprint/sprint.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SprintPlanningController } from './modules/sprint-planning/sprint-planning.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StatusController } from './modules/status/status.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { WorkflowController } from './modules/workflow/workflow.controller';
import { koaAuthentication } from './middleware/authenticate.middleware';
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
import { iocContainer } from './app.module';
import { IocContainer, IocContainerFactory } from '@tsoa/runtime';
import type { Middleware } from 'koa';
import * as KoaRouter from '@koa/router';
const multer = require('@koa/multer');
import multerOpts from '../multerOpts';
const upload = multer(multerOpts);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "ERole": {
        "dataType": "refEnum",
        "enums": ["admin","user","guest"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EPermissions": {
        "dataType": "refEnum",
        "enums": ["read","write","delete"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPermissionDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"ref":"EPermissions","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IRoleDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"ref":"ERole","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "permissions": {"dataType":"array","array":{"dataType":"refObject","ref":"IPermissionDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUserDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "email": {"dataType":"string"},
            "emailVerified": {"dataType":"boolean"},
            "phone": {"dataType":"string"},
            "challenge": {"dataType":"string"},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "role": {"ref":"IRoleDto"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUserUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "firstName": {"dataType":"string"},
            "lastName": {"dataType":"string"},
            "email": {"dataType":"string"},
            "phone": {"dataType":"string"},
            "roleId": {"dataType":"string"},
            "challenge": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUserListDto": {
        "dataType": "refObject",
        "properties": {
            "count": {"dataType":"double"},
            "offset": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IUserDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUserPrivilegesRequest": {
        "dataType": "refObject",
        "properties": {
            "roleName": {"ref":"ERole","required":true},
            "permissions": {"dataType":"array","array":{"dataType":"refEnum","ref":"EPermissions"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string"},
            "data": {"dataType":"any"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUserPassword": {
        "dataType": "refObject",
        "properties": {
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITokensDto": {
        "dataType": "refObject",
        "properties": {
            "accessToken": {"dataType":"string","required":true},
            "refreshToken": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUserWithTokensDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "email": {"dataType":"string"},
            "emailVerified": {"dataType":"boolean"},
            "phone": {"dataType":"string"},
            "challenge": {"dataType":"string"},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "role": {"ref":"IRoleDto"},
            "tokens": {"ref":"ITokensDto","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TSignUpRequest": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"intersection","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{"password":{"dataType":"string","required":true},"lastName":{"dataType":"string"},"firstName":{"dataType":"string"}}},{"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{"phone":{"dataType":"string","required":true},"email":{"dataType":"string"}}},{"dataType":"nestedObjectLiteral","nestedProperties":{"phone":{"dataType":"string"},"email":{"dataType":"string","required":true}}}]}]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISignInRequest": {
        "dataType": "refObject",
        "properties": {
            "login": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUserLogin": {
        "dataType": "refObject",
        "properties": {
            "login": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUserResetPasswordRequest": {
        "dataType": "refObject",
        "properties": {
            "password": {"dataType":"string","required":true},
            "token": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ETeamRole": {
        "dataType": "refEnum",
        "enums": ["leader","member"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITeamMemberDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "user": {"ref":"IUserDto"},
            "role": {"ref":"ETeamRole","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITeamDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "members": {"dataType":"array","array":{"dataType":"refObject","ref":"ITeamMemberDto"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITeamListDto": {
        "dataType": "refObject",
        "properties": {
            "count": {"dataType":"double"},
            "offset": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"ITeamDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITeamCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "userIds": {"dataType":"array","array":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITeamUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "description": {"dataType":"string"},
            "userIds": {"dataType":"array","array":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EProjectVisibility": {
        "dataType": "refEnum",
        "enums": ["private","team","public"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProjectDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "key": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "visibility": {"ref":"EProjectVisibility","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "teams": {"dataType":"array","array":{"dataType":"refObject","ref":"ITeamDto"},"required":true},
            "lead": {"ref":"IUserDto"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProjectListDto": {
        "dataType": "refObject",
        "properties": {
            "count": {"dataType":"double"},
            "offset": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IProjectDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EProjectType": {
        "dataType": "refEnum",
        "enums": ["scrum","kanban"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProjectCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "key": {"dataType":"string","required":true},
            "type": {"ref":"EProjectType","required":true},
            "description": {"dataType":"string"},
            "visibility": {"ref":"EProjectVisibility"},
            "leadId": {"dataType":"string"},
            "teamIds": {"dataType":"array","array":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProjectUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "key": {"dataType":"string"},
            "type": {"ref":"EProjectType"},
            "description": {"dataType":"string"},
            "visibility": {"ref":"EProjectVisibility"},
            "leadId": {"dataType":"string"},
            "teamIds": {"dataType":"array","array":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IIssueTypeDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "icon": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EPriority": {
        "dataType": "refEnum",
        "enums": ["highest","high","medium","low","lowest"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPriorityDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"ref":"EPriority","required":true},
            "icon": {"dataType":"string","required":true},
            "color": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IStatusDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "color": {"dataType":"string","required":true},
            "isInitial": {"dataType":"boolean","required":true},
            "isFinal": {"dataType":"boolean","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EBoardType": {
        "dataType": "refEnum",
        "enums": ["scrum","kanban"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ESprintStatus": {
        "dataType": "refEnum",
        "enums": ["future","active","closed"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBoardDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "type": {"ref":"EBoardType","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "project": {"ref":"IProjectDto"},
            "sprints": {"dataType":"array","array":{"dataType":"refObject","ref":"ISprintDto"}},
            "activeSprint": {"ref":"ISprintDto"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ESprintPlanningStatus": {
        "dataType": "refEnum",
        "enums": ["planning","planned","active","closed"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISprintDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "goal": {"dataType":"string"},
            "startDate": {"dataType":"datetime","required":true},
            "endDate": {"dataType":"datetime","required":true},
            "status": {"ref":"ESprintStatus","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "board": {"ref":"IBoardDto"},
            "planning": {"ref":"ISprintPlanningDto"},
            "issues": {"dataType":"array","array":{"dataType":"refObject","ref":"IIssueDto"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISprintPlanningDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "status": {"ref":"ESprintPlanningStatus","required":true},
            "plannedVelocity": {"dataType":"double"},
            "actualVelocity": {"dataType":"double"},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "sprint": {"ref":"ISprintDto"},
            "participants": {"dataType":"array","array":{"dataType":"refObject","ref":"IUserDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IIssueDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "key": {"dataType":"string","required":true},
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "estimate": {"dataType":"double"},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "type": {"ref":"IIssueTypeDto"},
            "priority": {"ref":"IPriorityDto"},
            "status": {"ref":"IStatusDto"},
            "project": {"ref":"IProjectDto"},
            "board": {"ref":"IBoardDto"},
            "sprint": {"ref":"ISprintDto"},
            "assignee": {"ref":"IUserDto"},
            "reporter": {"ref":"IUserDto"},
            "parent": {"ref":"IIssueDto"},
            "comments": {"dataType":"array","array":{"dataType":"refObject","ref":"ICommentDto"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICommentDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "text": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "author": {"ref":"IUserDto"},
            "issue": {"ref":"IIssueDto"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IIssueListDto": {
        "dataType": "refObject",
        "properties": {
            "count": {"dataType":"double"},
            "offset": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IIssueDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IIssueCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "typeId": {"dataType":"string","required":true},
            "priorityId": {"dataType":"string","required":true},
            "statusId": {"dataType":"string"},
            "projectId": {"dataType":"string","required":true},
            "boardId": {"dataType":"string"},
            "sprintId": {"dataType":"string"},
            "assigneeId": {"dataType":"string"},
            "reporterId": {"dataType":"string","required":true},
            "parentId": {"dataType":"string"},
            "estimate": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IIssueUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string"},
            "description": {"dataType":"string"},
            "typeId": {"dataType":"string"},
            "priorityId": {"dataType":"string"},
            "statusId": {"dataType":"string"},
            "projectId": {"dataType":"string"},
            "boardId": {"dataType":"string"},
            "sprintId": {"dataType":"string"},
            "assigneeId": {"dataType":"string"},
            "reporterId": {"dataType":"string"},
            "parentId": {"dataType":"string"},
            "estimate": {"dataType":"double"},
            "includeRelations": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IIssueOrderUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "statusId": {"dataType":"string","required":true},
            "order": {"dataType":"double","required":true},
            "boardId": {"dataType":"string","required":true},
            "includeRelations": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBacklogDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "isDefault": {"dataType":"boolean","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "project": {"ref":"IProjectDto"},
            "board": {"ref":"IBoardDto"},
            "issues": {"dataType":"array","array":{"dataType":"refObject","ref":"IIssueDto"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBacklogListDto": {
        "dataType": "refObject",
        "properties": {
            "count": {"dataType":"double"},
            "offset": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IBacklogDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBacklogCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "projectId": {"dataType":"string","required":true},
            "boardId": {"dataType":"string"},
            "isDefault": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBacklogUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "description": {"dataType":"string"},
            "projectId": {"dataType":"string"},
            "boardId": {"dataType":"string"},
            "isDefault": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IRegisterBiometricResponse": {
        "dataType": "refObject",
        "properties": {
            "registered": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IRegisterBiometricRequest": {
        "dataType": "refObject",
        "properties": {
            "userId": {"dataType":"string","required":true},
            "deviceId": {"dataType":"string","required":true},
            "deviceName": {"dataType":"string","required":true},
            "publicKey": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IGenerateNonceResponse": {
        "dataType": "refObject",
        "properties": {
            "nonce": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IGenerateNonceRequest": {
        "dataType": "refObject",
        "properties": {
            "userId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IVerifyBiometricSignatureResponse": {
        "dataType": "refObject",
        "properties": {
            "verified": {"dataType":"boolean","required":true},
            "tokens": {"dataType":"nestedObjectLiteral","nestedProperties":{"refreshToken":{"dataType":"string","required":true},"accessToken":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IVerifyBiometricSignatureRequest": {
        "dataType": "refObject",
        "properties": {
            "userId": {"dataType":"string","required":true},
            "deviceId": {"dataType":"string","required":true},
            "signature": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBoardListDto": {
        "dataType": "refObject",
        "properties": {
            "count": {"dataType":"double"},
            "offset": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IBoardDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IStatusWithIssuesDto": {
        "dataType": "refObject",
        "properties": {
            "status": {"ref":"IStatusDto","required":true},
            "issues": {"dataType":"array","array":{"dataType":"refObject","ref":"IIssueDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBoardWithStatusesDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "type": {"ref":"EBoardType","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "project": {"ref":"IProjectDto"},
            "sprints": {"dataType":"array","array":{"dataType":"refObject","ref":"ISprintDto"}},
            "activeSprint": {"ref":"ISprintDto"},
            "statuses": {"dataType":"array","array":{"dataType":"refObject","ref":"IStatusWithIssuesDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBoardCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "type": {"ref":"EBoardType","required":true},
            "projectId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBoardUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "type": {"ref":"EBoardType"},
            "projectId": {"dataType":"string"},
            "activeSprintId": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IFileDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "type": {"dataType":"string","required":true},
            "url": {"dataType":"string","required":true},
            "size": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IIssueTypeListDto": {
        "dataType": "refObject",
        "properties": {
            "count": {"dataType":"double"},
            "offset": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IIssueTypeDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IIssueTypeCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "icon": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IIssueTypeUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "icon": {"dataType":"string"},
            "description": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Base64URLString": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PublicKeyCredentialType": {
        "dataType": "refAlias",
        "type": {"dataType":"enum","enums":["public-key"],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuthenticatorTransportFuture": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["ble"]},{"dataType":"enum","enums":["cable"]},{"dataType":"enum","enums":["hybrid"]},{"dataType":"enum","enums":["internal"]},{"dataType":"enum","enums":["nfc"]},{"dataType":"enum","enums":["smart-card"]},{"dataType":"enum","enums":["usb"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PublicKeyCredentialDescriptorJSON": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"Base64URLString","required":true},
            "type": {"ref":"PublicKeyCredentialType","required":true},
            "transports": {"dataType":"array","array":{"dataType":"refAlias","ref":"AuthenticatorTransportFuture"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserVerificationRequirement": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["discouraged"]},{"dataType":"enum","enums":["preferred"]},{"dataType":"enum","enums":["required"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuthenticationExtensionsClientInputs": {
        "dataType": "refObject",
        "properties": {
            "appid": {"dataType":"string"},
            "credProps": {"dataType":"boolean"},
            "hmacCreateSecret": {"dataType":"boolean"},
            "minPinLength": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PublicKeyCredentialRequestOptionsJSON": {
        "dataType": "refObject",
        "properties": {
            "challenge": {"ref":"Base64URLString","required":true},
            "timeout": {"dataType":"double"},
            "rpId": {"dataType":"string"},
            "allowCredentials": {"dataType":"array","array":{"dataType":"refObject","ref":"PublicKeyCredentialDescriptorJSON"}},
            "userVerification": {"ref":"UserVerificationRequirement"},
            "extensions": {"ref":"AuthenticationExtensionsClientInputs"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "COSEAlgorithmIdentifier": {
        "dataType": "refAlias",
        "type": {"dataType":"double","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuthenticatorAttestationResponseJSON": {
        "dataType": "refObject",
        "properties": {
            "clientDataJSON": {"ref":"Base64URLString","required":true},
            "attestationObject": {"ref":"Base64URLString","required":true},
            "authenticatorData": {"ref":"Base64URLString"},
            "transports": {"dataType":"array","array":{"dataType":"refAlias","ref":"AuthenticatorTransportFuture"}},
            "publicKeyAlgorithm": {"ref":"COSEAlgorithmIdentifier"},
            "publicKey": {"ref":"Base64URLString"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuthenticatorAttachment": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["cross-platform"]},{"dataType":"enum","enums":["platform"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialPropertiesOutput": {
        "dataType": "refObject",
        "properties": {
            "rk": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuthenticationExtensionsClientOutputs": {
        "dataType": "refObject",
        "properties": {
            "appid": {"dataType":"boolean"},
            "credProps": {"ref":"CredentialPropertiesOutput"},
            "hmacCreateSecret": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RegistrationResponseJSON": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"Base64URLString","required":true},
            "rawId": {"ref":"Base64URLString","required":true},
            "response": {"ref":"AuthenticatorAttestationResponseJSON","required":true},
            "authenticatorAttachment": {"ref":"AuthenticatorAttachment"},
            "clientExtensionResults": {"ref":"AuthenticationExtensionsClientOutputs","required":true},
            "type": {"ref":"PublicKeyCredentialType","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IVerifyRegistrationRequest": {
        "dataType": "refObject",
        "properties": {
            "userId": {"dataType":"string","required":true},
            "data": {"ref":"RegistrationResponseJSON","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IVerifyAuthenticationResponse": {
        "dataType": "refObject",
        "properties": {
            "verified": {"dataType":"boolean","required":true},
            "tokens": {"ref":"ITokensDto"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuthenticatorAssertionResponseJSON": {
        "dataType": "refObject",
        "properties": {
            "clientDataJSON": {"ref":"Base64URLString","required":true},
            "authenticatorData": {"ref":"Base64URLString","required":true},
            "signature": {"ref":"Base64URLString","required":true},
            "userHandle": {"ref":"Base64URLString"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuthenticationResponseJSON": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"Base64URLString","required":true},
            "rawId": {"ref":"Base64URLString","required":true},
            "response": {"ref":"AuthenticatorAssertionResponseJSON","required":true},
            "authenticatorAttachment": {"ref":"AuthenticatorAttachment"},
            "clientExtensionResults": {"ref":"AuthenticationExtensionsClientOutputs","required":true},
            "type": {"ref":"PublicKeyCredentialType","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IVerifyAuthenticationRequest": {
        "dataType": "refObject",
        "properties": {
            "userId": {"dataType":"string","required":true},
            "data": {"ref":"AuthenticationResponseJSON","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPriorityListDto": {
        "dataType": "refAlias",
        "type": {"dataType":"array","array":{"dataType":"refObject","ref":"IPriorityDto"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPriorityCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"ref":"EPriority","required":true},
            "icon": {"dataType":"string","required":true},
            "color": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPriorityUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"ref":"EPriority"},
            "icon": {"dataType":"string"},
            "color": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProfileDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "firstName": {"dataType":"string"},
            "lastName": {"dataType":"string"},
            "birthDate": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "gender": {"dataType":"string"},
            "status": {"dataType":"string"},
            "lastOnline": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "avatar": {"dataType":"union","subSchemas":[{"ref":"IFileDto"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProfileUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "firstName": {"dataType":"string"},
            "lastName": {"dataType":"string"},
            "bio": {"dataType":"string"},
            "birthDate": {"dataType":"datetime"},
            "gender": {"dataType":"string"},
            "status": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProfileListDto": {
        "dataType": "refObject",
        "properties": {
            "count": {"dataType":"double"},
            "offset": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IProfileDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISprintListDto": {
        "dataType": "refAlias",
        "type": {"dataType":"array","array":{"dataType":"refObject","ref":"ISprintDto"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISprintCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "goal": {"dataType":"string"},
            "startDate": {"dataType":"datetime","required":true},
            "endDate": {"dataType":"datetime","required":true},
            "boardId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISprintUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "goal": {"dataType":"string"},
            "startDate": {"dataType":"datetime"},
            "endDate": {"dataType":"datetime"},
            "boardId": {"dataType":"string"},
            "status": {"ref":"ESprintStatus"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISprintPlanningListDto": {
        "dataType": "refAlias",
        "type": {"dataType":"array","array":{"dataType":"refObject","ref":"ISprintPlanningDto"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISprintPlanningCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "sprintId": {"dataType":"string","required":true},
            "plannedVelocity": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISprintPlanningUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "description": {"dataType":"string"},
            "sprintId": {"dataType":"string"},
            "plannedVelocity": {"dataType":"double"},
            "actualVelocity": {"dataType":"double"},
            "status": {"ref":"ESprintPlanningStatus"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EPlanningItemStatus": {
        "dataType": "refEnum",
        "enums": ["proposed","approved","rejected","committed"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IStatusListDto": {
        "dataType": "refAlias",
        "type": {"dataType":"array","array":{"dataType":"refObject","ref":"IStatusDto"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IStatusCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "color": {"dataType":"string"},
            "isInitial": {"dataType":"boolean"},
            "isFinal": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IStatusUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "description": {"dataType":"string"},
            "color": {"dataType":"string"},
            "isInitial": {"dataType":"boolean"},
            "isFinal": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IWorkflowDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "isDefault": {"dataType":"boolean","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "board": {"ref":"IBoardDto"},
            "statuses": {"dataType":"array","array":{"dataType":"refObject","ref":"IStatusDto"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IWorkflowListDto": {
        "dataType": "refObject",
        "properties": {
            "count": {"dataType":"double"},
            "offset": {"dataType":"double"},
            "limit": {"dataType":"double"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"IWorkflowDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IStatusTransitionsGraph": {
        "dataType": "refObject",
        "properties": {
            "from": {"dataType":"string","required":true},
            "to": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IWorkflowCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "boardId": {"dataType":"string","required":true},
            "isDefault": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IWorkflowUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "description": {"dataType":"string"},
            "boardId": {"dataType":"string"},
            "isDefault": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IStatusTransitionDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "workflowId": {"dataType":"string","required":true},
            "fromStatus": {"ref":"IStatusDto"},
            "toStatus": {"ref":"IStatusDto"},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IStatusTransitionCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "fromStatusId": {"dataType":"string","required":true},
            "toStatusId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(router: KoaRouter) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        router.get('/api/user/my',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(UserController)),
            ...(fetchMiddlewares<Middleware>(UserController.prototype.getMyUser)),

            async function UserController_getMyUser(context: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<UserController>(UserController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getMyUser.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.patch('/api/user/my/update',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(UserController)),
            ...(fetchMiddlewares<Middleware>(UserController.prototype.updateMyUser)),

            async function UserController_updateMyUser(context: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    body: {"in":"body","name":"body","required":true,"ref":"IUserUpdateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<UserController>(UserController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.updateMyUser.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.delete('/api/user/my/delete',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(UserController)),
            ...(fetchMiddlewares<Middleware>(UserController.prototype.deleteMyUser)),

            async function UserController_deleteMyUser(context: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<UserController>(UserController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.deleteMyUser.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/user/list',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(UserController)),
            ...(fetchMiddlewares<Middleware>(UserController.prototype.getUsers)),

            async function UserController_getUsers(context: any, next: any) {
            const args = {
                    offset: {"in":"query","name":"offset","dataType":"double"},
                    limit: {"in":"query","name":"limit","dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<UserController>(UserController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getUsers.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/user/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(UserController)),
            ...(fetchMiddlewares<Middleware>(UserController.prototype.getUserById)),

            async function UserController_getUserById(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<UserController>(UserController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getUserById.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.patch('/api/user/setPrivileges/:id',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(UserController)),
            ...(fetchMiddlewares<Middleware>(UserController.prototype.setPrivileges)),

            async function UserController_setPrivileges(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IUserPrivilegesRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<UserController>(UserController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.setPrivileges.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/user/requestVerifyEmail',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(UserController)),
            ...(fetchMiddlewares<Middleware>(UserController.prototype.requestVerifyEmail)),

            async function UserController_requestVerifyEmail(context: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<UserController>(UserController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.requestVerifyEmail.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/user/verifyEmail/:code',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(UserController)),
            ...(fetchMiddlewares<Middleware>(UserController.prototype.verifyEmail)),

            async function UserController_verifyEmail(context: any, next: any) {
            const args = {
                    code: {"in":"path","name":"code","required":true,"dataType":"string"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<UserController>(UserController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.verifyEmail.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.patch('/api/user/update/:id',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(UserController)),
            ...(fetchMiddlewares<Middleware>(UserController.prototype.updateUser)),

            async function UserController_updateUser(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IUserUpdateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<UserController>(UserController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.updateUser.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/user/changePassword',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(UserController)),
            ...(fetchMiddlewares<Middleware>(UserController.prototype.changePassword)),

            async function UserController_changePassword(context: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    body: {"in":"body","name":"body","required":true,"ref":"IUserPassword"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<UserController>(UserController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.changePassword.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.delete('/api/user/delete/:id',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(UserController)),
            ...(fetchMiddlewares<Middleware>(UserController.prototype.deleteUser)),

            async function UserController_deleteUser(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<UserController>(UserController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.deleteUser.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/auth/sign-up',
            ...(fetchMiddlewares<Middleware>(AuthController)),
            ...(fetchMiddlewares<Middleware>(AuthController.prototype.signUp)),

            async function AuthController_signUp(context: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"TSignUpRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<AuthController>(AuthController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.signUp.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/auth/sign-in',
            ...(fetchMiddlewares<Middleware>(AuthController)),
            ...(fetchMiddlewares<Middleware>(AuthController.prototype.signIn)),

            async function AuthController_signIn(context: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"ISignInRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<AuthController>(AuthController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.signIn.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/auth/request-reset-password',
            ...(fetchMiddlewares<Middleware>(AuthController)),
            ...(fetchMiddlewares<Middleware>(AuthController.prototype.requestResetPassword)),

            async function AuthController_requestResetPassword(context: any, next: any) {
            const args = {
                    undefined: {"in":"body","required":true,"ref":"IUserLogin"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<AuthController>(AuthController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.requestResetPassword.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/auth/reset-password',
            ...(fetchMiddlewares<Middleware>(AuthController)),
            ...(fetchMiddlewares<Middleware>(AuthController.prototype.resetPassword)),

            async function AuthController_resetPassword(context: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"IUserResetPasswordRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<AuthController>(AuthController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.resetPassword.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/auth/refresh',
            ...(fetchMiddlewares<Middleware>(AuthController)),
            ...(fetchMiddlewares<Middleware>(AuthController.prototype.refresh)),

            async function AuthController_refresh(context: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"refreshToken":{"dataType":"string","required":true}}},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<AuthController>(AuthController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.refresh.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/team/list',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(TeamController)),
            ...(fetchMiddlewares<Middleware>(TeamController.prototype.getTeams)),

            async function TeamController_getTeams(context: any, next: any) {
            const args = {
                    offset: {"in":"query","name":"offset","dataType":"double"},
                    limit: {"in":"query","name":"limit","dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<TeamController>(TeamController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getTeams.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/team/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(TeamController)),
            ...(fetchMiddlewares<Middleware>(TeamController.prototype.getTeamById)),

            async function TeamController_getTeamById(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<TeamController>(TeamController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getTeamById.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/team',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(TeamController)),
            ...(fetchMiddlewares<Middleware>(TeamController.prototype.createTeam)),

            async function TeamController_createTeam(context: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"ITeamCreateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<TeamController>(TeamController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.createTeam.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.patch('/api/team/:id',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(TeamController)),
            ...(fetchMiddlewares<Middleware>(TeamController.prototype.updateTeam)),

            async function TeamController_updateTeam(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"ITeamUpdateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<TeamController>(TeamController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.updateTeam.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.delete('/api/team/:id',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(TeamController)),
            ...(fetchMiddlewares<Middleware>(TeamController.prototype.deleteTeam)),

            async function TeamController_deleteTeam(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<TeamController>(TeamController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.deleteTeam.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/team/:teamId/members/:userId',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(TeamController)),
            ...(fetchMiddlewares<Middleware>(TeamController.prototype.addMember)),

            async function TeamController_addMember(context: any, next: any) {
            const args = {
                    teamId: {"in":"path","name":"teamId","required":true,"dataType":"string"},
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
                    role: {"default":"member","in":"query","name":"role","dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<TeamController>(TeamController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.addMember.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.delete('/api/team/:teamId/members/:userId',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(TeamController)),
            ...(fetchMiddlewares<Middleware>(TeamController.prototype.removeMember)),

            async function TeamController_removeMember(context: any, next: any) {
            const args = {
                    teamId: {"in":"path","name":"teamId","required":true,"dataType":"string"},
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<TeamController>(TeamController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.removeMember.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/project/list',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(ProjectController)),
            ...(fetchMiddlewares<Middleware>(ProjectController.prototype.getProjects)),

            async function ProjectController_getProjects(context: any, next: any) {
            const args = {
                    offset: {"in":"query","name":"offset","dataType":"double"},
                    limit: {"in":"query","name":"limit","dataType":"double"},
                    teamId: {"in":"query","name":"teamId","dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<ProjectController>(ProjectController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getProjects.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/project/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(ProjectController)),
            ...(fetchMiddlewares<Middleware>(ProjectController.prototype.getProjectById)),

            async function ProjectController_getProjectById(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<ProjectController>(ProjectController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getProjectById.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/project',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(ProjectController)),
            ...(fetchMiddlewares<Middleware>(ProjectController.prototype.createProject)),

            async function ProjectController_createProject(context: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"IProjectCreateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<ProjectController>(ProjectController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.createProject.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.patch('/api/project/:id',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(ProjectController)),
            ...(fetchMiddlewares<Middleware>(ProjectController.prototype.updateProject)),

            async function ProjectController_updateProject(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IProjectUpdateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<ProjectController>(ProjectController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.updateProject.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.delete('/api/project/:id',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(ProjectController)),
            ...(fetchMiddlewares<Middleware>(ProjectController.prototype.deleteProject)),

            async function ProjectController_deleteProject(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<ProjectController>(ProjectController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.deleteProject.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/project/:projectId/lead/:userId',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(ProjectController)),
            ...(fetchMiddlewares<Middleware>(ProjectController.prototype.setProjectLead)),

            async function ProjectController_setProjectLead(context: any, next: any) {
            const args = {
                    projectId: {"in":"path","name":"projectId","required":true,"dataType":"string"},
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<ProjectController>(ProjectController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.setProjectLead.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/project/:projectId/teams/:teamId',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(ProjectController)),
            ...(fetchMiddlewares<Middleware>(ProjectController.prototype.addTeamToProject)),

            async function ProjectController_addTeamToProject(context: any, next: any) {
            const args = {
                    projectId: {"in":"path","name":"projectId","required":true,"dataType":"string"},
                    teamId: {"in":"path","name":"teamId","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<ProjectController>(ProjectController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.addTeamToProject.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.delete('/api/project/:projectId/teams/:teamId',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(ProjectController)),
            ...(fetchMiddlewares<Middleware>(ProjectController.prototype.removeTeamFromProject)),

            async function ProjectController_removeTeamFromProject(context: any, next: any) {
            const args = {
                    projectId: {"in":"path","name":"projectId","required":true,"dataType":"string"},
                    teamId: {"in":"path","name":"teamId","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<ProjectController>(ProjectController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.removeTeamFromProject.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/issue/list',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(IssueController)),
            ...(fetchMiddlewares<Middleware>(IssueController.prototype.getIssues)),

            async function IssueController_getIssues(context: any, next: any) {
            const args = {
                    offset: {"in":"query","name":"offset","dataType":"double"},
                    limit: {"in":"query","name":"limit","dataType":"double"},
                    projectId: {"in":"query","name":"projectId","dataType":"string"},
                    includeRelations: {"in":"query","name":"includeRelations","dataType":"boolean"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<IssueController>(IssueController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getIssues.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/issue/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(IssueController)),
            ...(fetchMiddlewares<Middleware>(IssueController.prototype.getIssueById)),

            async function IssueController_getIssueById(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    includeRelations: {"in":"query","name":"includeRelations","dataType":"boolean"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<IssueController>(IssueController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getIssueById.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/issue',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(IssueController)),
            ...(fetchMiddlewares<Middleware>(IssueController.prototype.createIssue)),

            async function IssueController_createIssue(context: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"IIssueCreateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<IssueController>(IssueController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.createIssue.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.patch('/api/issue/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(IssueController)),
            ...(fetchMiddlewares<Middleware>(IssueController.prototype.updateIssue)),

            async function IssueController_updateIssue(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IIssueUpdateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<IssueController>(IssueController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.updateIssue.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.delete('/api/issue/:id',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(IssueController)),
            ...(fetchMiddlewares<Middleware>(IssueController.prototype.deleteIssue)),

            async function IssueController_deleteIssue(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<IssueController>(IssueController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.deleteIssue.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/issue/:issueId/assign/:userId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(IssueController)),
            ...(fetchMiddlewares<Middleware>(IssueController.prototype.assignIssue)),

            async function IssueController_assignIssue(context: any, next: any) {
            const args = {
                    issueId: {"in":"path","name":"issueId","required":true,"dataType":"string"},
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<IssueController>(IssueController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.assignIssue.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/issue/:issueId/status/:statusId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(IssueController)),
            ...(fetchMiddlewares<Middleware>(IssueController.prototype.changeStatus)),

            async function IssueController_changeStatus(context: any, next: any) {
            const args = {
                    issueId: {"in":"path","name":"issueId","required":true,"dataType":"string"},
                    statusId: {"in":"path","name":"statusId","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<IssueController>(IssueController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.changeStatus.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.put('/api/issue/:id/order',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(IssueController)),
            ...(fetchMiddlewares<Middleware>(IssueController.prototype.updateIssueOrder)),

            async function IssueController_updateIssueOrder(context: any, next: any) {
            const args = {
                    id: {"in":"query","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IIssueOrderUpdateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<IssueController>(IssueController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.updateIssueOrder.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/backlog/list',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(BacklogController)),
            ...(fetchMiddlewares<Middleware>(BacklogController.prototype.getBacklogs)),

            async function BacklogController_getBacklogs(context: any, next: any) {
            const args = {
                    offset: {"in":"query","name":"offset","dataType":"double"},
                    limit: {"in":"query","name":"limit","dataType":"double"},
                    projectId: {"in":"query","name":"projectId","dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<BacklogController>(BacklogController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getBacklogs.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/backlog/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(BacklogController)),
            ...(fetchMiddlewares<Middleware>(BacklogController.prototype.getBacklogById)),

            async function BacklogController_getBacklogById(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<BacklogController>(BacklogController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getBacklogById.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/backlog',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(BacklogController)),
            ...(fetchMiddlewares<Middleware>(BacklogController.prototype.createBacklog)),

            async function BacklogController_createBacklog(context: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"IBacklogCreateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<BacklogController>(BacklogController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.createBacklog.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.patch('/api/backlog/:id',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(BacklogController)),
            ...(fetchMiddlewares<Middleware>(BacklogController.prototype.updateBacklog)),

            async function BacklogController_updateBacklog(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IBacklogUpdateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<BacklogController>(BacklogController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.updateBacklog.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.delete('/api/backlog/:id',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(BacklogController)),
            ...(fetchMiddlewares<Middleware>(BacklogController.prototype.deleteBacklog)),

            async function BacklogController_deleteBacklog(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<BacklogController>(BacklogController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.deleteBacklog.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/backlog/:backlogId/issues/:issueId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(BacklogController)),
            ...(fetchMiddlewares<Middleware>(BacklogController.prototype.addIssueToBacklog)),

            async function BacklogController_addIssueToBacklog(context: any, next: any) {
            const args = {
                    backlogId: {"in":"path","name":"backlogId","required":true,"dataType":"string"},
                    issueId: {"in":"path","name":"issueId","required":true,"dataType":"string"},
                    order: {"in":"query","name":"order","dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<BacklogController>(BacklogController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.addIssueToBacklog.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.delete('/api/backlog/:backlogId/issues/:issueId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(BacklogController)),
            ...(fetchMiddlewares<Middleware>(BacklogController.prototype.removeIssueFromBacklog)),

            async function BacklogController_removeIssueFromBacklog(context: any, next: any) {
            const args = {
                    backlogId: {"in":"path","name":"backlogId","required":true,"dataType":"string"},
                    issueId: {"in":"path","name":"issueId","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<BacklogController>(BacklogController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.removeIssueFromBacklog.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/biometric/register',
            ...(fetchMiddlewares<Middleware>(BiometricController)),
            ...(fetchMiddlewares<Middleware>(BiometricController.prototype.registerBiometric)),

            async function BiometricController_registerBiometric(context: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"IRegisterBiometricRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<BiometricController>(BiometricController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.registerBiometric.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/biometric/generate-nonce',
            ...(fetchMiddlewares<Middleware>(BiometricController)),
            ...(fetchMiddlewares<Middleware>(BiometricController.prototype.generateNonce)),

            async function BiometricController_generateNonce(context: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"IGenerateNonceRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<BiometricController>(BiometricController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.generateNonce.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/biometric/verify-signature',
            ...(fetchMiddlewares<Middleware>(BiometricController)),
            ...(fetchMiddlewares<Middleware>(BiometricController.prototype.verifySignature)),

            async function BiometricController_verifySignature(context: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"IVerifyBiometricSignatureRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<BiometricController>(BiometricController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.verifySignature.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/board/list',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(BoardController)),
            ...(fetchMiddlewares<Middleware>(BoardController.prototype.getBoards)),

            async function BoardController_getBoards(context: any, next: any) {
            const args = {
                    offset: {"in":"query","name":"offset","dataType":"double"},
                    limit: {"in":"query","name":"limit","dataType":"double"},
                    projectId: {"in":"query","name":"projectId","dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<BoardController>(BoardController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getBoards.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/board/:id/issued',
            ...(fetchMiddlewares<Middleware>(BoardController)),
            ...(fetchMiddlewares<Middleware>(BoardController.prototype.getFullBoard)),

            async function BoardController_getFullBoard(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<BoardController>(BoardController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getFullBoard.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/board/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(BoardController)),
            ...(fetchMiddlewares<Middleware>(BoardController.prototype.getBoardById)),

            async function BoardController_getBoardById(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<BoardController>(BoardController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getBoardById.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/board',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(BoardController)),
            ...(fetchMiddlewares<Middleware>(BoardController.prototype.createBoard)),

            async function BoardController_createBoard(context: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"IBoardCreateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<BoardController>(BoardController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.createBoard.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.patch('/api/board/:id',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(BoardController)),
            ...(fetchMiddlewares<Middleware>(BoardController.prototype.updateBoard)),

            async function BoardController_updateBoard(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IBoardUpdateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<BoardController>(BoardController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.updateBoard.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.delete('/api/board/:id',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(BoardController)),
            ...(fetchMiddlewares<Middleware>(BoardController.prototype.deleteBoard)),

            async function BoardController_deleteBoard(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<BoardController>(BoardController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.deleteBoard.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/board/:boardId/sprints/:sprintId/activate',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(BoardController)),
            ...(fetchMiddlewares<Middleware>(BoardController.prototype.setActiveSprint)),

            async function BoardController_setActiveSprint(context: any, next: any) {
            const args = {
                    boardId: {"in":"path","name":"boardId","required":true,"dataType":"string"},
                    sprintId: {"in":"path","name":"sprintId","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<BoardController>(BoardController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.setActiveSprint.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/file',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(FileController)),
            ...(fetchMiddlewares<Middleware>(FileController.prototype.getFileById)),

            async function FileController_getFileById(context: any, next: any) {
            const args = {
                    id: {"in":"query","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<FileController>(FileController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getFileById.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/file',
            authenticateMiddleware([{"jwt":[]}]),
            upload.single('file'),
            ...(fetchMiddlewares<Middleware>(FileController)),
            ...(fetchMiddlewares<Middleware>(FileController.prototype.uploadFile)),

            async function FileController_uploadFile(context: any, next: any) {
            const args = {
                    file: {"in":"formData","name":"file","required":true,"dataType":"file"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<FileController>(FileController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.uploadFile.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.delete('/api/file/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(FileController)),
            ...(fetchMiddlewares<Middleware>(FileController.prototype.deleteFile)),

            async function FileController_deleteFile(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<FileController>(FileController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.deleteFile.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/issue-type/list',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(IssueTypeController)),
            ...(fetchMiddlewares<Middleware>(IssueTypeController.prototype.getIssueTypes)),

            async function IssueTypeController_getIssueTypes(context: any, next: any) {
            const args = {
                    offset: {"in":"query","name":"offset","dataType":"double"},
                    limit: {"in":"query","name":"limit","dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<IssueTypeController>(IssueTypeController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getIssueTypes.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/issue-type/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(IssueTypeController)),
            ...(fetchMiddlewares<Middleware>(IssueTypeController.prototype.getIssueTypeById)),

            async function IssueTypeController_getIssueTypeById(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<IssueTypeController>(IssueTypeController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getIssueTypeById.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/issue-type/name/:name',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(IssueTypeController)),
            ...(fetchMiddlewares<Middleware>(IssueTypeController.prototype.getIssueTypeByName)),

            async function IssueTypeController_getIssueTypeByName(context: any, next: any) {
            const args = {
                    name: {"in":"path","name":"name","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<IssueTypeController>(IssueTypeController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getIssueTypeByName.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/issue-type',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(IssueTypeController)),
            ...(fetchMiddlewares<Middleware>(IssueTypeController.prototype.createIssueType)),

            async function IssueTypeController_createIssueType(context: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"IIssueTypeCreateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<IssueTypeController>(IssueTypeController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.createIssueType.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.patch('/api/issue-type/:id',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(IssueTypeController)),
            ...(fetchMiddlewares<Middleware>(IssueTypeController.prototype.updateIssueType)),

            async function IssueTypeController_updateIssueType(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IIssueTypeUpdateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<IssueTypeController>(IssueTypeController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.updateIssueType.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.delete('/api/issue-type/:id',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(IssueTypeController)),
            ...(fetchMiddlewares<Middleware>(IssueTypeController.prototype.deleteIssueType)),

            async function IssueTypeController_deleteIssueType(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<IssueTypeController>(IssueTypeController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.deleteIssueType.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/passkeys/generate-registration-options',
            ...(fetchMiddlewares<Middleware>(PasskeysController)),
            ...(fetchMiddlewares<Middleware>(PasskeysController.prototype.generateRegistrationOptions)),

            async function PasskeysController_generateRegistrationOptions(context: any, next: any) {
            const args = {
                    undefined: {"in":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"userId":{"dataType":"string","required":true}}},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<PasskeysController>(PasskeysController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.generateRegistrationOptions.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/passkeys/verify-registration',
            ...(fetchMiddlewares<Middleware>(PasskeysController)),
            ...(fetchMiddlewares<Middleware>(PasskeysController.prototype.verifyRegistration)),

            async function PasskeysController_verifyRegistration(context: any, next: any) {
            const args = {
                    undefined: {"in":"body","required":true,"ref":"IVerifyRegistrationRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<PasskeysController>(PasskeysController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.verifyRegistration.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/passkeys/generate-authentication-options',
            ...(fetchMiddlewares<Middleware>(PasskeysController)),
            ...(fetchMiddlewares<Middleware>(PasskeysController.prototype.generateAuthenticationOptions)),

            async function PasskeysController_generateAuthenticationOptions(context: any, next: any) {
            const args = {
                    undefined: {"in":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"userId":{"dataType":"string","required":true}}},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<PasskeysController>(PasskeysController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.generateAuthenticationOptions.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/passkeys/verify-authentication',
            ...(fetchMiddlewares<Middleware>(PasskeysController)),
            ...(fetchMiddlewares<Middleware>(PasskeysController.prototype.verifyAuthentication)),

            async function PasskeysController_verifyAuthentication(context: any, next: any) {
            const args = {
                    undefined: {"in":"body","required":true,"ref":"IVerifyAuthenticationRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<PasskeysController>(PasskeysController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.verifyAuthentication.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/priority/list',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(PriorityController)),
            ...(fetchMiddlewares<Middleware>(PriorityController.prototype.getPriorities)),

            async function PriorityController_getPriorities(context: any, next: any) {
            const args = {
                    offset: {"in":"query","name":"offset","dataType":"double"},
                    limit: {"in":"query","name":"limit","dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<PriorityController>(PriorityController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getPriorities.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/priority/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(PriorityController)),
            ...(fetchMiddlewares<Middleware>(PriorityController.prototype.getPriorityById)),

            async function PriorityController_getPriorityById(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<PriorityController>(PriorityController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getPriorityById.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/priority/name/:name',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(PriorityController)),
            ...(fetchMiddlewares<Middleware>(PriorityController.prototype.getPriorityByName)),

            async function PriorityController_getPriorityByName(context: any, next: any) {
            const args = {
                    name: {"in":"path","name":"name","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<PriorityController>(PriorityController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getPriorityByName.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/priority',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(PriorityController)),
            ...(fetchMiddlewares<Middleware>(PriorityController.prototype.createPriority)),

            async function PriorityController_createPriority(context: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"IPriorityCreateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<PriorityController>(PriorityController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.createPriority.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.patch('/api/priority/:id',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(PriorityController)),
            ...(fetchMiddlewares<Middleware>(PriorityController.prototype.updatePriority)),

            async function PriorityController_updatePriority(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IPriorityUpdateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<PriorityController>(PriorityController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.updatePriority.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.delete('/api/priority/:id',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(PriorityController)),
            ...(fetchMiddlewares<Middleware>(PriorityController.prototype.deletePriority)),

            async function PriorityController_deletePriority(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<PriorityController>(PriorityController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.deletePriority.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/profile/my',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(ProfileController)),
            ...(fetchMiddlewares<Middleware>(ProfileController.prototype.getMyProfile)),

            async function ProfileController_getMyProfile(context: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<ProfileController>(ProfileController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getMyProfile.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.patch('/api/profile/my/update',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(ProfileController)),
            ...(fetchMiddlewares<Middleware>(ProfileController.prototype.updateMyProfile)),

            async function ProfileController_updateMyProfile(context: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    body: {"in":"body","name":"body","required":true,"ref":"IProfileUpdateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<ProfileController>(ProfileController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.updateMyProfile.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.delete('/api/profile/my/delete',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(ProfileController)),
            ...(fetchMiddlewares<Middleware>(ProfileController.prototype.deleteMyProfile)),

            async function ProfileController_deleteMyProfile(context: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<ProfileController>(ProfileController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.deleteMyProfile.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/profile/list',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(ProfileController)),
            ...(fetchMiddlewares<Middleware>(ProfileController.prototype.getProfiles)),

            async function ProfileController_getProfiles(context: any, next: any) {
            const args = {
                    offset: {"in":"query","name":"offset","dataType":"double"},
                    limit: {"in":"query","name":"limit","dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<ProfileController>(ProfileController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getProfiles.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/profile/:userId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(ProfileController)),
            ...(fetchMiddlewares<Middleware>(ProfileController.prototype.getProfileById)),

            async function ProfileController_getProfileById(context: any, next: any) {
            const args = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<ProfileController>(ProfileController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getProfileById.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.patch('/api/profile/update/:userId',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(ProfileController)),
            ...(fetchMiddlewares<Middleware>(ProfileController.prototype.updateProfile)),

            async function ProfileController_updateProfile(context: any, next: any) {
            const args = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IProfileUpdateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<ProfileController>(ProfileController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.updateProfile.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/profile/avatar/upload',
            authenticateMiddleware([{"jwt":[]}]),
            upload.single('file'),
            ...(fetchMiddlewares<Middleware>(ProfileController)),
            ...(fetchMiddlewares<Middleware>(ProfileController.prototype.addAvatar)),

            async function ProfileController_addAvatar(context: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    file: {"in":"formData","name":"file","required":true,"dataType":"file"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<ProfileController>(ProfileController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.addAvatar.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.delete('/api/profile/avatar',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(ProfileController)),
            ...(fetchMiddlewares<Middleware>(ProfileController.prototype.removeAvatar)),

            async function ProfileController_removeAvatar(context: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<ProfileController>(ProfileController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.removeAvatar.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.delete('/api/profile/delete/:userId',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(ProfileController)),
            ...(fetchMiddlewares<Middleware>(ProfileController.prototype.deleteProfile)),

            async function ProfileController_deleteProfile(context: any, next: any) {
            const args = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<ProfileController>(ProfileController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.deleteProfile.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/sprint/list',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(SprintController)),
            ...(fetchMiddlewares<Middleware>(SprintController.prototype.getSprints)),

            async function SprintController_getSprints(context: any, next: any) {
            const args = {
                    offset: {"in":"query","name":"offset","dataType":"double"},
                    limit: {"in":"query","name":"limit","dataType":"double"},
                    boardId: {"in":"query","name":"boardId","dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<SprintController>(SprintController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getSprints.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/sprint/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(SprintController)),
            ...(fetchMiddlewares<Middleware>(SprintController.prototype.getSprintById)),

            async function SprintController_getSprintById(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<SprintController>(SprintController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getSprintById.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/sprint',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(SprintController)),
            ...(fetchMiddlewares<Middleware>(SprintController.prototype.createSprint)),

            async function SprintController_createSprint(context: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"ISprintCreateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<SprintController>(SprintController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.createSprint.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.patch('/api/sprint/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(SprintController)),
            ...(fetchMiddlewares<Middleware>(SprintController.prototype.updateSprint)),

            async function SprintController_updateSprint(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"ISprintUpdateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<SprintController>(SprintController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.updateSprint.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.delete('/api/sprint/:id',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(SprintController)),
            ...(fetchMiddlewares<Middleware>(SprintController.prototype.deleteSprint)),

            async function SprintController_deleteSprint(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<SprintController>(SprintController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.deleteSprint.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/sprint/:id/start',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(SprintController)),
            ...(fetchMiddlewares<Middleware>(SprintController.prototype.startSprint)),

            async function SprintController_startSprint(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<SprintController>(SprintController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.startSprint.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/sprint/:id/complete',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(SprintController)),
            ...(fetchMiddlewares<Middleware>(SprintController.prototype.completeSprint)),

            async function SprintController_completeSprint(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<SprintController>(SprintController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.completeSprint.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/sprint-planning/list',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(SprintPlanningController)),
            ...(fetchMiddlewares<Middleware>(SprintPlanningController.prototype.getPlannings)),

            async function SprintPlanningController_getPlannings(context: any, next: any) {
            const args = {
                    offset: {"in":"query","name":"offset","dataType":"double"},
                    limit: {"in":"query","name":"limit","dataType":"double"},
                    sprintId: {"in":"query","name":"sprintId","dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<SprintPlanningController>(SprintPlanningController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getPlannings.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/sprint-planning/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(SprintPlanningController)),
            ...(fetchMiddlewares<Middleware>(SprintPlanningController.prototype.getPlanningById)),

            async function SprintPlanningController_getPlanningById(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<SprintPlanningController>(SprintPlanningController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getPlanningById.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/sprint-planning',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(SprintPlanningController)),
            ...(fetchMiddlewares<Middleware>(SprintPlanningController.prototype.createPlanning)),

            async function SprintPlanningController_createPlanning(context: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"ISprintPlanningCreateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<SprintPlanningController>(SprintPlanningController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.createPlanning.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.patch('/api/sprint-planning/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(SprintPlanningController)),
            ...(fetchMiddlewares<Middleware>(SprintPlanningController.prototype.updatePlanning)),

            async function SprintPlanningController_updatePlanning(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"ISprintPlanningUpdateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<SprintPlanningController>(SprintPlanningController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.updatePlanning.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.delete('/api/sprint-planning/:id',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(SprintPlanningController)),
            ...(fetchMiddlewares<Middleware>(SprintPlanningController.prototype.deletePlanning)),

            async function SprintPlanningController_deletePlanning(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<SprintPlanningController>(SprintPlanningController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.deletePlanning.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/sprint-planning/:planningId/participants/:userId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(SprintPlanningController)),
            ...(fetchMiddlewares<Middleware>(SprintPlanningController.prototype.addParticipant)),

            async function SprintPlanningController_addParticipant(context: any, next: any) {
            const args = {
                    planningId: {"in":"path","name":"planningId","required":true,"dataType":"string"},
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
                    isScrumMaster: {"default":false,"in":"query","name":"isScrumMaster","dataType":"boolean"},
                    isProductOwner: {"default":false,"in":"query","name":"isProductOwner","dataType":"boolean"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<SprintPlanningController>(SprintPlanningController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.addParticipant.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.delete('/api/sprint-planning/:planningId/participants/:userId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(SprintPlanningController)),
            ...(fetchMiddlewares<Middleware>(SprintPlanningController.prototype.removeParticipant)),

            async function SprintPlanningController_removeParticipant(context: any, next: any) {
            const args = {
                    planningId: {"in":"path","name":"planningId","required":true,"dataType":"string"},
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<SprintPlanningController>(SprintPlanningController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.removeParticipant.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/sprint-planning/:planningId/items/:issueId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(SprintPlanningController)),
            ...(fetchMiddlewares<Middleware>(SprintPlanningController.prototype.addPlanningItem)),

            async function SprintPlanningController_addPlanningItem(context: any, next: any) {
            const args = {
                    planningId: {"in":"path","name":"planningId","required":true,"dataType":"string"},
                    issueId: {"in":"path","name":"issueId","required":true,"dataType":"string"},
                    suggestedById: {"in":"query","name":"suggestedById","required":true,"dataType":"string"},
                    estimate: {"in":"query","name":"estimate","dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<SprintPlanningController>(SprintPlanningController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.addPlanningItem.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/sprint-planning/:planningId/status/:status',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(SprintPlanningController)),
            ...(fetchMiddlewares<Middleware>(SprintPlanningController.prototype.updatePlanningItemStatus)),

            async function SprintPlanningController_updatePlanningItemStatus(context: any, next: any) {
            const args = {
                    planningId: {"in":"path","name":"planningId","required":true,"dataType":"string"},
                    status: {"in":"query","name":"status","required":true,"ref":"EPlanningItemStatus"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<SprintPlanningController>(SprintPlanningController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.updatePlanningItemStatus.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/status/list',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(StatusController)),
            ...(fetchMiddlewares<Middleware>(StatusController.prototype.getStatuses)),

            async function StatusController_getStatuses(context: any, next: any) {
            const args = {
                    offset: {"in":"query","name":"offset","dataType":"double"},
                    limit: {"in":"query","name":"limit","dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<StatusController>(StatusController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getStatuses.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/status/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(StatusController)),
            ...(fetchMiddlewares<Middleware>(StatusController.prototype.getStatusById)),

            async function StatusController_getStatusById(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<StatusController>(StatusController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getStatusById.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/status',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(StatusController)),
            ...(fetchMiddlewares<Middleware>(StatusController.prototype.createStatus)),

            async function StatusController_createStatus(context: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"IStatusCreateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<StatusController>(StatusController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.createStatus.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.patch('/api/status/:id',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(StatusController)),
            ...(fetchMiddlewares<Middleware>(StatusController.prototype.updateStatus)),

            async function StatusController_updateStatus(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IStatusUpdateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<StatusController>(StatusController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.updateStatus.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.delete('/api/status/:id',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(StatusController)),
            ...(fetchMiddlewares<Middleware>(StatusController.prototype.deleteStatus)),

            async function StatusController_deleteStatus(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<StatusController>(StatusController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.deleteStatus.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/workflow/list',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(WorkflowController)),
            ...(fetchMiddlewares<Middleware>(WorkflowController.prototype.getWorkflows)),

            async function WorkflowController_getWorkflows(context: any, next: any) {
            const args = {
                    offset: {"in":"query","name":"offset","dataType":"double"},
                    limit: {"in":"query","name":"limit","dataType":"double"},
                    boardId: {"in":"query","name":"boardId","dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<WorkflowController>(WorkflowController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getWorkflows.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/workflow/:workflowId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(WorkflowController)),
            ...(fetchMiddlewares<Middleware>(WorkflowController.prototype.getWorkflowById)),

            async function WorkflowController_getWorkflowById(context: any, next: any) {
            const args = {
                    workflowId: {"in":"path","name":"workflowId","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<WorkflowController>(WorkflowController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getWorkflowById.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/workflow/:workflowId/graph',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(WorkflowController)),
            ...(fetchMiddlewares<Middleware>(WorkflowController.prototype.getWorkflowGraph)),

            async function WorkflowController_getWorkflowGraph(context: any, next: any) {
            const args = {
                    workflowId: {"in":"path","name":"workflowId","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<WorkflowController>(WorkflowController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getWorkflowGraph.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/workflow',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(WorkflowController)),
            ...(fetchMiddlewares<Middleware>(WorkflowController.prototype.createWorkflow)),

            async function WorkflowController_createWorkflow(context: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"IWorkflowCreateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<WorkflowController>(WorkflowController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.createWorkflow.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.patch('/api/workflow/:id',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(WorkflowController)),
            ...(fetchMiddlewares<Middleware>(WorkflowController.prototype.updateWorkflow)),

            async function WorkflowController_updateWorkflow(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"IWorkflowUpdateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<WorkflowController>(WorkflowController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.updateWorkflow.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.delete('/api/workflow/:id',
            authenticateMiddleware([{"jwt":["role:admin"]}]),
            ...(fetchMiddlewares<Middleware>(WorkflowController)),
            ...(fetchMiddlewares<Middleware>(WorkflowController.prototype.deleteWorkflow)),

            async function WorkflowController_deleteWorkflow(context: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<WorkflowController>(WorkflowController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.deleteWorkflow.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.patch('/api/workflow/:workflowId/statuses/:statusId/wip-limit',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(WorkflowController)),
            ...(fetchMiddlewares<Middleware>(WorkflowController.prototype.setWipLimit)),

            async function WorkflowController_setWipLimit(context: any, next: any) {
            const args = {
                    workflowId: {"in":"path","name":"workflowId","required":true,"dataType":"string"},
                    statusId: {"in":"path","name":"statusId","required":true,"dataType":"string"},
                    limit: {"in":"query","name":"limit","required":true,"dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<WorkflowController>(WorkflowController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.setWipLimit.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/workflow/:workflowId/statuses/:statusId/wip-check',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(WorkflowController)),
            ...(fetchMiddlewares<Middleware>(WorkflowController.prototype.checkWipLimit)),

            async function WorkflowController_checkWipLimit(context: any, next: any) {
            const args = {
                    workflowId: {"in":"path","name":"workflowId","required":true,"dataType":"string"},
                    statusId: {"in":"path","name":"statusId","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<WorkflowController>(WorkflowController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.checkWipLimit.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/workflow/transition/:workflowId/status/:statusId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(WorkflowController)),
            ...(fetchMiddlewares<Middleware>(WorkflowController.prototype.getAvailableTransitions)),

            async function WorkflowController_getAvailableTransitions(context: any, next: any) {
            const args = {
                    workflowId: {"in":"path","name":"workflowId","required":true,"dataType":"string"},
                    statusId: {"in":"path","name":"statusId","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<WorkflowController>(WorkflowController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.getAvailableTransitions.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/workflow/transition/:workflowId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(WorkflowController)),
            ...(fetchMiddlewares<Middleware>(WorkflowController.prototype.addTransition)),

            async function WorkflowController_addTransition(context: any, next: any) {
            const args = {
                    workflowId: {"in":"path","name":"workflowId","required":true,"dataType":"string"},
                    params: {"in":"body","name":"params","required":true,"ref":"IStatusTransitionCreateRequest"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<WorkflowController>(WorkflowController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.addTransition.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.delete('/api/workflow/transition/:transitionId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(WorkflowController)),
            ...(fetchMiddlewares<Middleware>(WorkflowController.prototype.removeTransition)),

            async function WorkflowController_removeTransition(context: any, next: any) {
            const args = {
                    transitionId: {"in":"path","name":"transitionId","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<WorkflowController>(WorkflowController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.removeTransition.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.post('/api/workflow/:workflowId/statuses/:statusId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(WorkflowController)),
            ...(fetchMiddlewares<Middleware>(WorkflowController.prototype.addStatusToWorkflow)),

            async function WorkflowController_addStatusToWorkflow(context: any, next: any) {
            const args = {
                    workflowId: {"in":"path","name":"workflowId","required":true,"dataType":"string"},
                    statusId: {"in":"path","name":"statusId","required":true,"dataType":"string"},
                    order: {"in":"query","name":"order","dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<WorkflowController>(WorkflowController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.addStatusToWorkflow.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.delete('/api/workflow/:workflowId/statuses/:statusId',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<Middleware>(WorkflowController)),
            ...(fetchMiddlewares<Middleware>(WorkflowController.prototype.removeStatusFromWorkflow)),

            async function WorkflowController_removeStatusFromWorkflow(context: any, next: any) {
            const args = {
                    workflowId: {"in":"path","name":"workflowId","required":true,"dataType":"string"},
                    statusId: {"in":"path","name":"statusId","required":true,"dataType":"string"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(context.request) : iocContainer;

            const controller: any = await container.get<WorkflowController>(WorkflowController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }

            const promise = controller.removeStatusFromWorkflow.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(context: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            koaAuthentication(context.request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            koaAuthentication(context.request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let success;
            try {
                const user = await promiseAny(secMethodOrPromises);
                success = true;
                context.request['user'] = user;
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                context.status = error.status || 401;
                context.throw(context.status, error.message, error);
            }

            if (success) {
                await next();
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function isController(object: any): object is Controller {
      return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function promiseHandler(controllerObj: any, promise: Promise<any>, context: any, successStatus: any, next?: () => Promise<any>) {
      return Promise.resolve(promise)
        .then((data: any) => {
            let statusCode = successStatus;
            let headers;

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            if (isController(controllerObj)) {
                headers = controllerObj.getHeaders();
                statusCode = controllerObj.getStatus() || statusCode;
            }
            return returnHandler(context, next, statusCode, data, headers);
        })
        .catch((error: any) => {
            context.status = error.status || 500;
            context.throw(context.status, error.message, error);
        });
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(context: any, next?: () => any, statusCode?: number, data?: any, headers: any={}) {
        if (!context.headerSent && !context.response.__tsoaResponded) {
            if (data !== null && data !== undefined) {
                context.body = data;
                context.status = 200;
            } else {
                context.status = 204;
            }

            if (statusCode) {
                context.status = statusCode;
            }

            context.set(headers);
            context.response.__tsoaResponded = true;
            return next ? next() : context;
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, context: any, next: () => any): any[] {
        const errorFields: FieldErrors = {};
        const values = Object.keys(args).map(key => {
            const name = args[key].name;
            switch (args[key].in) {
            case 'request':
                return context.request;
            case 'query':
                return validationService.ValidateParam(args[key], context.request.query[name], name, errorFields, undefined, {"noImplicitAdditionalProperties":"silently-remove-extras"});
            case 'path':
                return validationService.ValidateParam(args[key], context.params[name], name, errorFields, undefined, {"noImplicitAdditionalProperties":"silently-remove-extras"});
            case 'header':
                return validationService.ValidateParam(args[key], context.request.headers[name], name, errorFields, undefined, {"noImplicitAdditionalProperties":"silently-remove-extras"});
            case 'body':
                return validationService.ValidateParam(args[key], context.request.body, name, errorFields, undefined, {"noImplicitAdditionalProperties":"silently-remove-extras"});
            case 'body-prop':
                return validationService.ValidateParam(args[key], context.request.body[name], name, errorFields, 'body.', {"noImplicitAdditionalProperties":"silently-remove-extras"});
            case 'formData':
                if (args[key].dataType === 'file') {
                  return validationService.ValidateParam(args[key], context.request.file, name, errorFields, undefined, {"noImplicitAdditionalProperties":"silently-remove-extras"});
                } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                  return validationService.ValidateParam(args[key], context.request.files, name, errorFields, undefined, {"noImplicitAdditionalProperties":"silently-remove-extras"});
                } else {
                  return validationService.ValidateParam(args[key], context.request.body[name], name, errorFields, undefined, {"noImplicitAdditionalProperties":"silently-remove-extras"});
                }
            case 'res':
                return responder(context, next);
            }
        });
        if (Object.keys(errorFields).length > 0) {
            throw new ValidateError(errorFields, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(context: any, next: () => any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
           returnHandler(context, next, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
