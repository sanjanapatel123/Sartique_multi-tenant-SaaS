import { Hono } from "hono";
import type { AppBindings } from "../../types/hono.js";

import inventoryController from "./inventory.controller.js";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { roleMiddleware } from "../../middleware/role.middleware.js";

const inventoryRoutes = new Hono<AppBindings>();

inventoryRoutes.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => inventoryController.create(c),
);

inventoryRoutes.get("/low-stock", authMiddleware, (c) =>
  inventoryController.lowStock(c),
);

inventoryRoutes.get("/movements", authMiddleware, (c) =>
  inventoryController.movements(c),
);

inventoryRoutes.get("/", authMiddleware, (c) => inventoryController.findAll(c));

inventoryRoutes.get("/:id", authMiddleware, (c) =>
  inventoryController.findById(c),
);
inventoryRoutes.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => inventoryController.update(c),
);

inventoryRoutes.post(
  "/stock-in",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => inventoryController.stockIn(c),
);

inventoryRoutes.post(
  "/stock-out",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => inventoryController.stockOut(c),
);

inventoryRoutes.post(
  "/reserve",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => inventoryController.reserveStock(c),
);

inventoryRoutes.post(
  "/release",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => inventoryController.releaseStock(c),
);

inventoryRoutes.post(
  "/adjust",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => inventoryController.adjustStock(c),
);

inventoryRoutes.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), (c) =>
  inventoryController.deactivate(c),
);

export default inventoryRoutes;
