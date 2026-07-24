import type { Context } from "hono";
import type { AppBindings } from "../../../types/hono.js";

import templateService from "./template.service.js";

import {
  createTemplateSchema,
  updateTemplateSchema,
} from "./template.schema.js";

class TemplateController {
  async create(c: Context<AppBindings>) {
    try {
      const body = await c.req.json();

      const data = createTemplateSchema.parse(body);
      const user = c.get("user");

      const template = await templateService.create(data, user.organizationId);

      return c.json(
        {
          success: true,
          message: "Measurement template created successfully",
          data: template,
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

      const templates = await templateService.findAll(user.organizationId);

      return c.json({
        success: true,
        message: "Measurement templates fetched successfully",
        data: templates,
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

      const template = await templateService.findById(id, user.organizationId);

      return c.json({
        success: true,
        message: "Measurement template fetched successfully",
        data: template,
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

      const data = updateTemplateSchema.parse(body);
      const user = c.get("user");

      const template = await templateService.update(
        id,
        data,
        user.organizationId,
      );

      return c.json({
        success: true,
        message: "Measurement template updated successfully",
        data: template,
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

      const template = await templateService.deactivate(
        id,
        user.organizationId,
      );

      return c.json({
        success: true,
        message: "Measurement template deactivated successfully",
        data: template,
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

export default new TemplateController();
