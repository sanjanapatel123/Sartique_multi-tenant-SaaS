import type { Context } from "hono";

import orderService from "./order.service.js";

import {
  createOrderSchema,
  updateOrderSchema,
  orderQuerySchema,
} from "./order.schema.js";

class OrderController {
  // ✅ CREATE
  async create(c: Context) {
    try {
      const user = c.get("user");
      const body = await c.req.json();

      const parsed = createOrderSchema.safeParse(body);

      if (!parsed.success) {
        return c.json(
          {
            success: false,
            message: "Validation failed",
            errors: parsed.error.flatten(),
          },
          400,
        );
      }

      const result = await orderService.create(
        parsed.data,
        user.organizationId,
        user.id,
      );

      return c.json(
        {
          success: true,
          message: "Order created successfully",
          data: result,
        },
        201,
      );
    } catch (err: any) {
      return c.json(
        {
          success: false,
          message: err.message,
        },
        400,
      );
    }
  }

  // ✅ GET ALL
  async findAll(c: Context) {
    const user = c.get("user");

    const query = orderQuerySchema.parse(c.req.query());

    const result = await orderService.findAll(user.organizationId, query);

    return c.json({
      success: true,
      message: "Orders fetched successfully",
      data: result,
    });
  }

  // ✅ GET BY ID
  async findById(c: Context) {
    const user = c.get("user");
    const id = c.req.param("id");

    if (!id) {
      return c.json(
        {
          success: false,
          message: "Order ID required",
        },
        400,
      );
    }

    const result = await orderService.findById(id, user.organizationId);

    if (!result) {
      return c.json(
        {
          success: false,
          message: "Order not found",
        },
        404,
      );
    }

    return c.json({
      success: true,
      message: "Order fetched successfully",
      data: result,
    });
  }

  // ✅ UPDATE
  async update(c: Context) {
    const user = c.get("user");
    const id = c.req.param("id");
    const body = await c.req.json();

    const data = updateOrderSchema.parse(body);

    const result = await orderService.update(id, user.organizationId, data);

    return c.json({
      success: true,
      message: "Order updated successfully",
      data: result,
    });
  }

  // ✅ DELETE
  async delete(c: Context) {
    const user = c.get("user");
    const id = c.req.param("id");

    await orderService.delete(id, user.organizationId);

    return c.json({
      success: true,
      message: "Order deleted successfully",
    });
  }
}

export default new OrderController();
