import { Hono } from "hono";
import type { AppBindings } from "../../types/hono.js";

import warehouseController from "./warehouse.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { roleMiddleware } from "../../middleware/role.middleware.js";

const warehouseRoutes = new Hono<AppBindings>();

warehouseRoutes.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => warehouseController.create(c),
);

warehouseRoutes.get("/", authMiddleware, (c) => warehouseController.findAll(c));

warehouseRoutes.get("/:id", authMiddleware, (c) =>
  warehouseController.findById(c),
);

warehouseRoutes.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => warehouseController.update(c),
);

warehouseRoutes.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), (c) =>
  warehouseController.deactivate(c),
);

export default warehouseRoutes;
