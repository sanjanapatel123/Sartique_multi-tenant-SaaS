import { Hono } from "hono";
import type { AppBindings } from "../../../types/hono.js";

import categoryController from "./category.controller.js";

import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { roleMiddleware } from "../../../middleware/role.middleware.js";

const categoryRoutes = new Hono<AppBindings>();

categoryRoutes.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => categoryController.create(c),
);

categoryRoutes.get("/", authMiddleware, (c) => categoryController.findAll(c));

categoryRoutes.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => categoryController.update(c),
);

categoryRoutes.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), (c) =>
  categoryController.deactivate(c),
);

export default categoryRoutes;
