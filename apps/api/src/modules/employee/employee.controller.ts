import type { Context } from "hono";
import type { AppBindings } from "../../types/hono.js";

import employeeService from "./employee.service.js";

import {
  createEmployeeSchema,
  employeeQuerySchema,
  updateEmployeeSchema,
} from "./employee.schema.js";

class EmployeeController {
  async create(c: Context<AppBindings>) {
    try {
      const body = await c.req.json();

      const data = createEmployeeSchema.parse(body);
      const user = c.get("user");

      const employee = await employeeService.create(data, user.organizationId);

      return c.json(
        {
          success: true,
          message: "Employee created successfully",
          data: employee,
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

      const query = employeeQuerySchema.parse({
        page: c.req.query("page"),
        limit: c.req.query("limit"),
        search: c.req.query("search"),
        department: c.req.query("department"),
        isActive: c.req.query("isActive"),
      });

      const result = await employeeService.findAll(user.organizationId, query);

      return c.json({
        success: true,
        message: "Employees fetched successfully",
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

      const employee = await employeeService.findById(id, user.organizationId);

      return c.json({
        success: true,
        message: "Employee fetched successfully",
        data: employee,
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

      const data = updateEmployeeSchema.parse(body);
      const user = c.get("user");

      const employee = await employeeService.update(
        id,
        data,
        user.organizationId,
      );

      return c.json({
        success: true,
        message: "Employee updated successfully",
        data: employee,
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

  async deactivate(c: Context<AppBindings>) {
    try {
      const id = c.req.param("id");
      const user = c.get("user");

      const employee = await employeeService.deactivate(
        id,
        user.organizationId,
      );

      return c.json({
        success: true,
        message: "Employee deactivated successfully",
        data: employee,
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

export default new EmployeeController();
