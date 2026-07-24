import { Hono } from "hono";
import type { AppBindings } from "../../types/hono.js";

import employeeController from "./employee.controller.js";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { roleMiddleware } from "../../middleware/role.middleware.js";

const employeeRoutes = new Hono<AppBindings>();

employeeRoutes.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => employeeController.create(c),
);

employeeRoutes.get("/", authMiddleware, (c) => employeeController.findAll(c));

employeeRoutes.get("/:id", authMiddleware, (c) =>
  employeeController.findById(c),
);

employeeRoutes.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => employeeController.update(c),
);

employeeRoutes.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), (c) =>
  employeeController.deactivate(c),
);

export default employeeRoutes;
