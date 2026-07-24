import type { Context } from "hono";

import customerService from "./customer.service.js";

import {
  createCustomerSchema,
  updateCustomerSchema,
} from "./customer.schema.js";

class CustomerController {
  async create(c: Context) {
    try {
      const body = await c.req.json();
      const user = c.get("user");

      const data = createCustomerSchema.parse(body);

      const result = await customerService.create(data, user.organizationId);

      return c.json(
        {
          success: true,
          message: "Customer created successfully",
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

  async findAll(c: Context) {
    try {
      const user = c.get("user");

      const result = await customerService.findAll(user.organizationId);

      return c.json({
        success: true,
        message: "Customers fetched successfully",
        data: result,
      });
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

  async findById(c: Context) {
    try {
      const user = c.get("user");
      const id = c.req.param("id");

      const result = await customerService.findById(id, user.organizationId);

      return c.json({
        success: true,
        message: "Customer fetched successfully",
        data: result,
      });
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

  async update(c: Context) {
    try {
      const user = c.get("user");
      const id = c.req.param("id");
      const body = await c.req.json();

      const data = updateCustomerSchema.parse(body);

      const result = await customerService.update(
        id,
        user.organizationId,
        data,
      );

      return c.json({
        success: true,
        message: "Customer updated successfully",
        data: result,
      });
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

  async delete(c: Context) {
    try {
      const user = c.get("user");
      const id = c.req.param("id");

      await customerService.delete(id, user.organizationId);

      return c.json({
        success: true,
        message: "Customer deleted successfully",
      });
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
}

export default new CustomerController();
