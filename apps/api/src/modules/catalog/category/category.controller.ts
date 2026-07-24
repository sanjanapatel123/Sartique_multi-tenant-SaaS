import type { Context } from "hono";
import type { AppBindings } from "../../../types/hono.js";

import categoryService from "./category.service.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "./category.schema.js";

class CategoryController {
  async create(c: Context<AppBindings>) {
    try {
      const body = await c.req.json();

      const data = createCategorySchema.parse(body);
      const user = c.get("user");

      const category = await categoryService.create(data, user.organizationId);

      return c.json(
        {
          success: true,
          message: "Category created successfully",
          data: category,
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

      const categories = await categoryService.findAll(user.organizationId);

      return c.json({
        success: true,
        message: "Categories fetched successfully",
        data: categories,
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
      const data = updateCategorySchema.parse(body);

      const category = await categoryService.update(
        id,
        data,
        user.organizationId,
      );

      return c.json({
        success: true,
        message: "Category updated successfully",
        data: category,
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

      const category = await categoryService.deactivate(
        id,
        user.organizationId,
      );

      return c.json({
        success: true,
        message: "Category deactivated successfully",
        data: category,
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

export default new CategoryController();
