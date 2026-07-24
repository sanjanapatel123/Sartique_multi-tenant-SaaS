import type { Context, Next } from "hono";
import type { AppBindings } from "../types/hono.js";

export async function tenant(c: Context<AppBindings>, next: Next) {
  const user = c.get("user");

  if (!user?.organizationId) {
    return c.json(
      {
        success: false,
        message: "Organization missing",
      },
      400,
    );
  }

  c.set("tenantId", user.organizationId);

  await next();
}
