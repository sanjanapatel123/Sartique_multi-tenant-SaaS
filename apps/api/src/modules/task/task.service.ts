import taskRepository from "./task.repository.js";

import type {
  CreateTaskDto,
  TaskQueryDto,
  UpdateTaskDto,
} from "./task.types.js";

class TaskService {
  async create(data: CreateTaskDto, organizationId: string) {
    // Production job validation
    if (data.productionJobId) {
      const job = await taskRepository.findProductionJob(
        data.productionJobId,
        organizationId,
      );

      if (!job) {
        throw new Error("Production job not found");
      }

      if (job.status === "CANCELLED") {
        throw new Error("Cannot create task for cancelled production job");
      }

      if (job.status === "COMPLETED") {
        throw new Error("Cannot create task for completed production job");
      }
    }

    // Employee validation
    if (data.assignedEmployeeId) {
      const employee = await taskRepository.findEmployee(
        data.assignedEmployeeId,
        organizationId,
      );

      if (!employee) {
        throw new Error("Assigned employee not found or inactive");
      }
    }

    return taskRepository.create(data, organizationId);
  }

  async findAll(organizationId: string, query: TaskQueryDto) {
    const { tasks, total } = await taskRepository.findAll(
      organizationId,
      query,
    );

    return {
      tasks,

      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
      },
    };
  }

  async findById(id: string, organizationId: string) {
    const task = await taskRepository.findById(id, organizationId);

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  }

  async update(id: string, data: UpdateTaskDto, organizationId: string) {
    const task = await taskRepository.findById(id, organizationId);

    if (!task) {
      throw new Error("Task not found");
    }

    // Production job validation
    if (data.productionJobId) {
      const job = await taskRepository.findProductionJob(
        data.productionJobId,
        organizationId,
      );

      if (!job) {
        throw new Error("Production job not found");
      }

      if (job.status === "CANCELLED") {
        throw new Error("Production job is cancelled");
      }

      if (job.status === "COMPLETED") {
        throw new Error("Production job is already completed");
      }
    }

    // Employee validation
    if (data.assignedEmployeeId) {
      const employee = await taskRepository.findEmployee(
        data.assignedEmployeeId,
        organizationId,
      );

      if (!employee) {
        throw new Error("Assigned employee not found or inactive");
      }
    }

    return taskRepository.update(id, data);
  }

  async cancel(id: string, organizationId: string) {
    const task = await taskRepository.findById(id, organizationId);

    if (!task) {
      throw new Error("Task not found");
    }

    if (task.status === "CANCELLED") {
      throw new Error("Task is already cancelled");
    }

    if (task.status === "COMPLETED") {
      throw new Error("Completed task cannot be cancelled");
    }

    return taskRepository.cancel(id);
  }
}

export default new TaskService();
