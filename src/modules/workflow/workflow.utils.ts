import { Transaction } from "sequelize";

import { sequelize } from "../../db";
import { Status } from "../status/status.model";
import { Workflow, WorkflowStatus } from "./workflow.model";

export async function createDefaultKanbanWorkflow(
  boardId: string,
  transaction?: Transaction | null,
): Promise<Workflow> {
  return sequelize.transaction(async t => {
    const currentTransaction = transaction || t;

    try {
      // 1. Создаем workflow для Kanban
      const workflow = await Workflow.create(
        {
          name: "Kanban Workflow",
          boardId,
          isDefault: true,
        },
        { transaction: currentTransaction },
      );

      // 2. Стандартные статусы для Kanban с WIP-лимитами
      const [
        backlogStatus,
        readyStatus,
        inProgressStatus,
        reviewStatus,
        doneStatus,
      ] = await Promise.all([
        Status.findOrCreate({
          where: { name: "Backlog", isSystem: true },
          defaults: {
            name: "Backlog",
            color: "#A5A5A5",
            isInitial: true,
            isFinal: false,
            isSystem: true,
          },
          transaction: currentTransaction,
        }),
        Status.findOrCreate({
          where: { name: "Ready", isSystem: true },
          defaults: {
            name: "Ready",
            color: "#FFCC00",
            isInitial: false,
            isFinal: false,
            isSystem: true,
          },
          transaction: currentTransaction,
        }),
        Status.findOrCreate({
          where: { name: "In Progress", isSystem: true },
          defaults: {
            name: "In Progress",
            color: "#3366FF",
            isInitial: false,
            isFinal: false,
            isSystem: true,
          },
          transaction: currentTransaction,
        }),
        Status.findOrCreate({
          where: { name: "Review", isSystem: true },
          defaults: {
            name: "Review",
            color: "#9933FF",
            isInitial: false,
            isFinal: false,
            isSystem: true,
          },
          transaction: currentTransaction,
        }),
        Status.findOrCreate({
          where: { name: "Done", isSystem: true },
          defaults: {
            name: "Done",
            color: "#00CC66",
            isInitial: false,
            isFinal: true,
            isSystem: true,
          },
          transaction: currentTransaction,
        }),
      ]);

      // 3. Связываем статусы с workflow (с WIP-лимитами для Kanban)
      await WorkflowStatus.bulkCreate(
        [
          {
            workflowId: workflow.id,
            statusId: backlogStatus[0].id,
            order: 1,
            wipLimit: null, // Без лимита для бэклога
          },
          {
            workflowId: workflow.id,
            statusId: readyStatus[0].id,
            order: 2,
            wipLimit: 10, // Лимит для "Ready"
          },
          {
            workflowId: workflow.id,
            statusId: inProgressStatus[0].id,
            order: 3,
            wipLimit: 5, // Строгий лимит для "In Progress"
          },
          {
            workflowId: workflow.id,
            statusId: reviewStatus[0].id,
            order: 4,
            wipLimit: 7, // Лимит для "Review"
          },
          {
            workflowId: workflow.id,
            statusId: doneStatus[0].id,
            order: 5,
            wipLimit: null, // Без лимита для завершенных
          },
        ],
        { transaction: currentTransaction },
      );

      return workflow;
    } catch (error) {
      console.error("Failed to create default Kanban workflow:", error);
      throw error;
    }
  });
}

export async function createDefaultScrumWorkflow(
  boardId: string,
  transaction?: Transaction | null,
): Promise<Workflow> {
  return sequelize.transaction(async t => {
    // Используем переданную транзакцию или создаем новую
    const currentTransaction = transaction || t;

    try {
      // 1. Создаем workflow для Scrum
      const workflow = await Workflow.create(
        {
          name: "Scrum Workflow",
          boardId,
          isDefault: true,
        },
        { transaction: currentTransaction },
      );

      // 2. Получаем или создаем стандартные статусы для Scrum
      const [todoStatus, inProgressStatus, doneStatus] = await Promise.all([
        Status.findOrCreate({
          where: { name: "To Do", isSystem: true },
          defaults: {
            name: "To Do",
            color: "#FF9900",
            isInitial: true,
            isFinal: false,
            isSystem: true,
          },
          transaction: currentTransaction,
        }),
        Status.findOrCreate({
          where: { name: "In Progress", isSystem: true },
          defaults: {
            name: "In Progress",
            color: "#2196F3",
            isSystem: true,
            isInitial: false,
            isFinal: false,
          },
          transaction: currentTransaction,
        }),
        Status.findOrCreate({
          where: { name: "Done", isSystem: true },
          defaults: {
            name: "Done",
            color: "#00CC66",
            isSystem: true,
            isInitial: false,
            isFinal: true,
          },
          transaction: currentTransaction,
        }),
      ]);

      // 3. Связываем статусы с workflow
      await WorkflowStatus.bulkCreate(
        [
          {
            workflowId: workflow.id,
            statusId: todoStatus[0].id,
            order: 1,
            wipLimit: null, // Для Scrum обычно не используется WIP limit
          },
          {
            workflowId: workflow.id,
            statusId: inProgressStatus[0].id,
            order: 2,
            wipLimit: null,
          },
          {
            workflowId: workflow.id,
            statusId: doneStatus[0].id,
            order: 3,
            wipLimit: null,
          },
        ],
        { transaction: currentTransaction },
      );

      return workflow;
    } catch (error) {
      console.error("Failed to create default Scrum workflow:", error);
      throw error; // Пробрасываем ошибку для отмены транзакции
    }
  });
}
