import { Hono } from "hono";
import type { AppBindings } from "../../types/hono.js";

import authController from "./auth.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { roleMiddleware } from "../../middleware/role.middleware.js";

const authRoutes = new Hono<AppBindings>();

authRoutes.post("/register", (c) => authController.register(c));

authRoutes.post("/login", (c) => authController.login(c));

authRoutes.get("/me", authMiddleware, (c) => authController.me(c));

authRoutes.get("/admin", authMiddleware, roleMiddleware("ADMIN"), (c) =>
  c.json({
    success: true,
    message: "Welcome Admin",
  }),
);

authRoutes.get(
  "/manager",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) =>
    c.json({
      success: true,
      message: "Welcome Manager",
    }),
);

export default authRoutes;
