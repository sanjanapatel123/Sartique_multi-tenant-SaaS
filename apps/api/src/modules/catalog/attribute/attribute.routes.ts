import { Hono } from "hono";
import type { AppBindings } from "../../../types/hono.js";

import attributeController from "./attribute.controller.js";

import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { roleMiddleware } from "../../../middleware/role.middleware.js";

const attributeRoutes = new Hono<AppBindings>();

attributeRoutes.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => attributeController.create(c),
);

attributeRoutes.get("/", authMiddleware, (c) => attributeController.findAll(c));

export default attributeRoutes;
