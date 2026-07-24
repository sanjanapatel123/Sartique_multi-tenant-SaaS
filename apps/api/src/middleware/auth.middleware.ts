import type { Context, Next } from "hono";
import type { AppBindings } from "../types/hono.js";
import { verifyToken } from "../lib/jwt.js";
import { AppError } from "../utils/errors.js";

export async function authMiddleware(c: Context<AppBindings>, next: Next) {
  const authHeader = c.req.header("Authorization");

  if (!authHeader) {
    return c.json(
      {
        success: false,
        message: "Authorization header missing",
      },
      401,
    );
  }
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return c.json(
      {
        success: false,
        message: "Invalid authorization header format",
      },
      401,
    );
  }
  try {
    const decoded = verifyToken(token);
    c.set("user", decoded);
    await next();
  } catch (error) {
    throw new AppError(401, "Invalid or expired token");
  }
}
