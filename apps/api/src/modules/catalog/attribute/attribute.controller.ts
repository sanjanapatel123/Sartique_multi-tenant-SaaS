import type { Context } from "hono";
import type { AppBindings } from "../../../types/hono.js";

import attributeService from "./attribute.service.js";
import { createAttributeSchema } from "./attribute.schema.js";

class AttributeController {
  async create(c: Context<AppBindings>) {
    try {
      const body = await c.req.json();

      const data = createAttributeSchema.parse(body);

      const user = c.get("user");

      const attribute = await attributeService.create(
        data,
        user.organizationId,
      );

      return c.json(
        {
          success: true,
          message: "Attribute created successfully",
          data: attribute,
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

      const attributes = await attributeService.findAll(user.organizationId);

      return c.json({
        success: true,
        data: attributes,
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

export default new AttributeController();
