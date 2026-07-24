import type { Context } from "hono";
import type { AppBindings } from "../../types/hono.js";

import authService from "./auth.service.js";
import { loginSchema, registerSchema } from "./auth.schema.js";

class AuthController {
  async register(c: Context<AppBindings>) {
    try {
      const body = await c.req.json();

      const data = registerSchema.parse(body);

      const result = await authService.register(data);

      return c.json(
        {
          success: true,
          message: "User registered successfully",
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

  async login(c: Context<AppBindings>) {
    try {
      const body = await c.req.json();

      const data = loginSchema.parse(body);

      const result = await authService.login(data);

      return c.json({
        success: true,
        message: "Login successful",
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

  async me(c: Context<AppBindings>) {
    try {
      const payload = c.get("user");

      const user = await authService.me(payload.id);

      return c.json({
        success: true,
        data: user,
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

export default new AuthController();
