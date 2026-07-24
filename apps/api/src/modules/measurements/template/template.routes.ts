import { Hono } from "hono";
import type { AppBindings } from "../../../types/hono.js";

import templateController from "./template.controller.js";

import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { roleMiddleware } from "../../../middleware/role.middleware.js";

const templateRoutes = new Hono<AppBindings>();

templateRoutes.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => templateController.create(c),
);

templateRoutes.get("/", authMiddleware, (c) => templateController.findAll(c));

templateRoutes.get("/:id", authMiddleware, (c) =>
  templateController.findById(c),
);

templateRoutes.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => templateController.update(c),
);

templateRoutes.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), (c) =>
  templateController.deactivate(c),
);

export default templateRoutes;
