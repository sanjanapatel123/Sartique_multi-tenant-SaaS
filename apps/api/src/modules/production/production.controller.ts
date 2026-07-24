import type { Context } from "hono";
import type { AppBindings } from "../../types/hono.js";

import productionService from "./production.service.js";

import {
  createProductionJobSchema,
  productionQuerySchema,
  updateProductionJobSchema,
} from "./production.schema.js";

class ProductionController {
  async create(c: Context<AppBindings>) {
    try {
      const body = await c.req.json();

      const data = createProductionJobSchema.parse(body);
      const user = c.get("user");

      const job = await productionService.create(data, user.organizationId);

      return c.json(
        {
          success: true,
          message: "Production job created successfully",
          data: job,
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

      const query = productionQuerySchema.parse({
        page: c.req.query("page"),
        limit: c.req.query("limit"),
        search: c.req.query("search"),
        status: c.req.query("status"),
        priority: c.req.query("priority"),
        assignedEmployeeId: c.req.query("assignedEmployeeId"),
        orderId: c.req.query("orderId"),
      });

      const result = await productionService.findAll(
        user.organizationId,
        query,
      );

      return c.json({
        success: true,
        message: "Production jobs fetched successfully",
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

      const job = await productionService.findById(id, user.organizationId);

      return c.json({
        success: true,
        message: "Production job fetched successfully",
        data: job,
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

      const data = updateProductionJobSchema.parse(body);
      const user = c.get("user");

      const job = await productionService.update(id, data, user.organizationId);

      return c.json({
        success: true,
        message: "Production job updated successfully",
        data: job,
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

      const job = await productionService.cancel(id, user.organizationId);

      return c.json({
        success: true,
        message: "Production job cancelled successfully",
        data: job,
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

export default new ProductionController();
