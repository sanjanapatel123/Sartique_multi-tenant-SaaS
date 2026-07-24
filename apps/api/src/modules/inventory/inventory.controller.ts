import type { Context } from "hono";
import type { AppBindings } from "../../types/hono.js";

import inventoryService from "./inventory.service.js";
import {
  adjustStockSchema,
  createInventoryItemSchema,
  inventoryQuerySchema,
  releaseStockSchema,
  reserveStockSchema,
  stockInSchema,
  stockMovementQuerySchema,
  stockOutSchema,
  updateInventoryItemSchema,
} from "./inventory.schema.js";

class InventoryController {
  async create(c: Context<AppBindings>) {
    try {
      const body = await c.req.json();

      const data = createInventoryItemSchema.parse(body);

      const user = c.get("user");

      const item = await inventoryService.create(data, user.organizationId);

      return c.json(
        {
          success: true,
          message: "Inventory item created successfully",
          data: item,
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

      const query = inventoryQuerySchema.parse({
        page: c.req.query("page"),
        limit: c.req.query("limit"),
        search: c.req.query("search"),
        category: c.req.query("category"),
        unit: c.req.query("unit"),
      });

      const result = await inventoryService.findAll(user.organizationId, query);

      return c.json({
        success: true,
        data: result.items,
        pagination: result.pagination,
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

      const item = await inventoryService.findById(id, user.organizationId);

      return c.json({
        success: true,
        data: item,
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

  async stockIn(c: Context<AppBindings>) {
    try {
      const body = await c.req.json();

      const data = stockInSchema.parse(body);

      const user = c.get("user");

      const result = await inventoryService.stockIn(data, user.organizationId);

      return c.json(
        {
          success: true,
          message: "Stock added successfully",
          data: result,
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

  async stockOut(c: Context<AppBindings>) {
    try {
      const body = await c.req.json();

      const data = stockOutSchema.parse(body);

      const user = c.get("user");

      const result = await inventoryService.stockOut(data, user.organizationId);

      return c.json({
        success: true,
        message: "Stock removed successfully",
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

  async reserveStock(c: Context<AppBindings>) {
    try {
      const body = await c.req.json();

      const data = reserveStockSchema.parse(body);

      const user = c.get("user");

      const result = await inventoryService.reserveStock(
        data,
        user.organizationId,
      );

      return c.json({
        success: true,
        message: "Stock reserved successfully",
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

  async releaseStock(c: Context<AppBindings>) {
    try {
      const body = await c.req.json();

      const data = releaseStockSchema.parse(body);

      const user = c.get("user");

      const result = await inventoryService.releaseStock(
        data,
        user.organizationId,
      );

      return c.json({
        success: true,
        message: "Reserved stock released successfully",
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

  async lowStock(c: Context<AppBindings>) {
    try {
      const user = c.get("user");

      const items = await inventoryService.findLowStock(user.organizationId);

      return c.json({
        success: true,
        data: items,
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

  async movements(c: Context<AppBindings>) {
    try {
      const user = c.get("user");

      const query = stockMovementQuerySchema.parse({
        page: c.req.query("page"),
        limit: c.req.query("limit"),
        inventoryItemId: c.req.query("inventoryItemId"),
        warehouseId: c.req.query("warehouseId"),
        type: c.req.query("type"),
        referenceId: c.req.query("referenceId"),
      });

      const result = await inventoryService.findMovements(
        user.organizationId,
        query,
      );

      return c.json({
        success: true,
        data: result.movements,
        pagination: result.pagination,
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
      const data = updateInventoryItemSchema.parse(body);

      const item = await inventoryService.update(id, data, user.organizationId);

      return c.json({
        success: true,
        message: "Inventory item updated successfully",
        data: item,
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

  async adjustStock(c: Context<AppBindings>) {
    try {
      const body = await c.req.json();

      const data = adjustStockSchema.parse(body);

      const user = c.get("user");

      const result = await inventoryService.adjustStock(
        data,
        user.organizationId,
      );

      return c.json({
        success: true,
        message: "Stock adjusted successfully",
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

  async deactivate(c: Context<AppBindings>) {
    try {
      const id = c.req.param("id");
      const user = c.get("user");

      const item = await inventoryService.deactivate(id, user.organizationId);

      return c.json({
        success: true,
        message: "Inventory item deactivated successfully",
        data: item,
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

export default new InventoryController();
