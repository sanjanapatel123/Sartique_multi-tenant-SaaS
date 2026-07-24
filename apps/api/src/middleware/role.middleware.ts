import type { Context, Next } from "hono";
import { AppBindings } from "../types/hono.js";

export function roleMiddleware(...roles: string[]) {
  return async (c: Context<AppBindings>, next: Next) => {
    const user = c.get("user");

    if (!user) {
      return c.json(
        {
          success: false,
          message: "Unauthorized",
        },
        401,
      );
    }

    if (!roles.includes(user.role)) {
      return c.json(
        {
          success: false,
          message: "Forbidden",
        },
        403,
      );
    }

    await next();
  };
}
