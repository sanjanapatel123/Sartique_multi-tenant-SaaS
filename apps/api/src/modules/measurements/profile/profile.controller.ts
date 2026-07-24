import type { Context } from "hono";
import type { AppBindings } from "../../../types/hono.js";

import profileService from "./profile.service.js";

import { createMeasurementVersionSchema, createProfileSchema, updateProfileSchema } from "./profile.schema.js";

class ProfileController {
  async create(c: Context<AppBindings>) {
    try {
      const body = await c.req.json();

      const data = createProfileSchema.parse(body);
      const user = c.get("user");

      const profile = await profileService.create(data, user.organizationId);

      return c.json(
        {
          success: true,
          message: "Measurement profile created successfully",
          data: profile,
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

      const profiles = await profileService.findAll(user.organizationId);

      return c.json({
        success: true,
        message: "Measurement profiles fetched successfully",
        data: profiles,
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

      const profile = await profileService.findById(id, user.organizationId);

      return c.json({
        success: true,
        message: "Measurement profile fetched successfully",
        data: profile,
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

      const data = updateProfileSchema.parse(body);
      const user = c.get("user");

      const profile = await profileService.update(
        id,
        data,
        user.organizationId,
      );

      return c.json({
        success: true,
        message: "Measurement profile updated successfully",
        data: profile,
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

      const profile = await profileService.deactivate(id, user.organizationId);

      return c.json({
        success: true,
        message: "Measurement profile deactivated successfully",
        data: profile,
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

  async createVersion(c: Context<AppBindings>) {
    try {
      const profileId = c.req.param("id");
      const body = await c.req.json();

      const data = createMeasurementVersionSchema.parse(body);
      const user = c.get("user");

      const version = await profileService.createVersion(
        profileId,
        data,
        user.organizationId,
      );

      return c.json(
        {
          success: true,
          message: "Measurement version created successfully",
          data: version,
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
}

export default new ProfileController();
