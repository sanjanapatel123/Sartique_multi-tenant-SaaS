import type { Context } from "hono";
import type { AppBindings } from "../../types/hono.js";

import warehouseService from "./warehouse.service.js";
import {
  createWarehouseSchema,
  updateWarehouseSchema,
} from "./warehouse.schema.js";

class WarehouseController {
  async create(c: Context<AppBindings>) {
    try {
      const body = await c.req.json();

      const data = createWarehouseSchema.parse(body);

      const user = c.get("user");

      const warehouse = await warehouseService.create(
        data,
        user.organizationId,
      );

      return c.json(
        {
          success: true,
          message: "Warehouse created successfully",
          data: warehouse,
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

      const warehouses = await warehouseService.findAll(user.organizationId);

      return c.json({
        success: true,
        data: warehouses,
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

      const warehouse = await warehouseService.findById(
        id,
        user.organizationId,
      );

      return c.json({
        success: true,
        data: warehouse,
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

  async update(c: Context<AppBindings>) {
    try {
      const id = c.req.param("id");
      const user = c.get("user");

      const body = await c.req.json();
      const data = updateWarehouseSchema.parse(body);

      const warehouse = await warehouseService.update(
        id,
        data,
        user.organizationId,
      );

      return c.json({
        success: true,
        message: "Warehouse updated successfully",
        data: warehouse,
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

      const warehouse = await warehouseService.deactivate(
        id,
        user.organizationId,
      );

      return c.json({
        success: true,
        message: "Warehouse deactivated successfully",
        data: warehouse,
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

export default new WarehouseController();
