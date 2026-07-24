import { Hono } from "hono";
import type { AppBindings } from "../../types/hono.js";

import taskController from "./task.controller.js";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { roleMiddleware } from "../../middleware/role.middleware.js";

const taskRoutes = new Hono<AppBindings>();

taskRoutes.post("/", authMiddleware, roleMiddleware("ADMIN", "MANAGER"), (c) =>
  taskController.create(c),
);

taskRoutes.get("/", authMiddleware, (c) => taskController.findAll(c));

taskRoutes.get("/:id", authMiddleware, (c) => taskController.findById(c));

taskRoutes.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => taskController.update(c),
);

taskRoutes.patch(
  "/:id/cancel",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => taskController.cancel(c),
);

export default taskRoutes;
