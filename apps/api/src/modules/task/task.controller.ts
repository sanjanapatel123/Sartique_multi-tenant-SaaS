import type { Context } from "hono";
import type { AppBindings } from "../../types/hono.js";

import taskService from "./task.service.js";

import {
  createTaskSchema,
  taskQuerySchema,
  updateTaskSchema,
} from "./task.schema.js";

class TaskController {
  async create(c: Context<AppBindings>) {
    try {
      const body = await c.req.json();

      const data = createTaskSchema.parse(body);
      const user = c.get("user");

      const task = await taskService.create(data, user.organizationId);

      return c.json(
        {
          success: true,
          message: "Task created successfully",
          data: task,
        },
        201,
      );
    } catch (error) {
      return c.json(
        {
          success: false,
          message:
            error instanceof Error ? error.message : "Internal Server Error",
        },
        400,
      );
    }
  }

  async findAll(c: Context<AppBindings>) {
    try {
      const user = c.get("user");

      const query = taskQuerySchema.parse({
        page: c.req.query("page"),
        limit: c.req.query("limit"),
        search: c.req.query("search"),
        status: c.req.query("status"),
        priority: c.req.query("priority"),
        productionJobId: c.req.query("productionJobId"),
        assignedEmployeeId: c.req.query("assignedEmployeeId"),
      });

      const result = await taskService.findAll(user.organizationId, query);

      return c.json({
        success: true,
        message: "Tasks fetched successfully",
        data: result,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message:
            error instanceof Error ? error.message : "Internal Server Error",
        },
        400,
      );
    }
  }

  async findById(c: Context<AppBindings>) {
    try {
      const id = c.req.param("id");
      const user = c.get("user");

      const task = await taskService.findById(id, user.organizationId);

      return c.json({
        success: true,
        message: "Task fetched successfully",
        data: task,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message:
            error instanceof Error ? error.message : "Internal Server Error",
        },
        404,
      );
    }
  }

  async update(c: Context<AppBindings>) {
    try {
      const id = c.req.param("id");
      const body = await c.req.json();

      const data = updateTaskSchema.parse(body);
      const user = c.get("user");

      const task = await taskService.update(id, data, user.organizationId);

      return c.json({
        success: true,
        message: "Task updated successfully",
        data: task,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message:
            error instanceof Error ? error.message : "Internal Server Error",
        },
        400,
      );
    }
  }

  async cancel(c: Context<AppBindings>) {
    try {
      const id = c.req.param("id");
      const user = c.get("user");

      const task = await taskService.cancel(id, user.organizationId);

      return c.json({
        success: true,
        message: "Task cancelled successfully",
        data: task,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message:
            error instanceof Error ? error.message : "Internal Server Error",
        },
        400,
      );
    }
  }
}

export default new TaskController();
