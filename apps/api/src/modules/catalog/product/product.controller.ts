import type { Context } from "hono";
import type { AppBindings } from "../../../types/hono.js";

import productService from "./product.service.js";
import {
  createProductSchema,
  productQuerySchema,
  updateProductSchema,
} from "./product.schema.js";
import { ProductQueryDto } from "./product.types.js";

class ProductController {
  async create(c: Context<AppBindings>) {
    try {
      const body = await c.req.json();

      const data = createProductSchema.parse(body);
      const user = c.get("user");

      const product = await productService.create(data, user.organizationId);

      return c.json(
        {
          success: true,
          message: "Product created successfully",
          data: product,
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

      const query = productQuerySchema.parse(c.req.query());

      const result = await productService.findAll(user.organizationId, query);

      return c.json({
        success: true,
        message: "Products fetched successfully",
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

      const product = await productService.findById(id, user.organizationId);

      return c.json({
        success: true,
        message: "Product fetched successfully",
        data: product,
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

      const data = updateProductSchema.parse(body);

      const product = await productService.update(
        id,
        data,
        user.organizationId,
      );

      return c.json({
        success: true,
        message: "Product updated successfully",
        data: product,
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

      const product = await productService.deactivate(id, user.organizationId);

      return c.json({
        success: true,
        message: "Product deactivated successfully",
        data: product,
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

export default new ProductController();
