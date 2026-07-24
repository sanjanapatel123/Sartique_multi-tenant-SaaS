import type { Context } from "hono";
import type { AppBindings } from "../../../types/hono.js";

import measurementDefinitionService from "./measurement-definition.service.js";

import {
  createMeasurementDefinitionSchema,
  updateMeasurementDefinitionSchema,
} from "./measurement-definition.schema.js";

class MeasurementDefinitionController {
  async create(c: Context<AppBindings>) {
    try {
      const body = await c.req.json();

      const data = createMeasurementDefinitionSchema.parse(body);
      const user = c.get("user");

      const definition = await measurementDefinitionService.create(
        user.organizationId,
        data,
      );

      return c.json(
        {
          success: true,
          message: "Measurement definition created successfully",
          data: definition,
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

      const definitions = await measurementDefinitionService.findAll(
        user.organizationId,
      );

      return c.json({
        success: true,
        message: "Measurement definitions fetched successfully",
        data: definitions,
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

      const definition = await measurementDefinitionService.findById(
        id,
        user.organizationId,
      );

      return c.json({
        success: true,
        message: "Measurement definition fetched successfully",
        data: definition,
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

      const data = updateMeasurementDefinitionSchema.parse(body);
      const user = c.get("user");

      const definition = await measurementDefinitionService.update(
        id,
        user.organizationId,
        data,
      );

      return c.json({
        success: true,
        message: "Measurement definition updated successfully",
        data: definition,
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

      const definition = await measurementDefinitionService.deactivate(
        id,
        user.organizationId,
      );

      return c.json({
        success: true,
        message: "Measurement definition deactivated successfully",
        data: definition,
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

export default new MeasurementDefinitionController();
