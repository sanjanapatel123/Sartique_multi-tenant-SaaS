import { Hono } from "hono";
import type { AppBindings } from "../../types/hono.js";

import productionController from "./production.controller.js";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { roleMiddleware } from "../../middleware/role.middleware.js";

const productionRoutes = new Hono<AppBindings>();

productionRoutes.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => productionController.create(c),
);

productionRoutes.get("/", authMiddleware, (c) =>
  productionController.findAll(c),
);

productionRoutes.get("/:id", authMiddleware, (c) =>
  productionController.findById(c),
);

productionRoutes.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => productionController.update(c),
);

productionRoutes.patch(
  "/:id/cancel",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => productionController.cancel(c),
);

export default productionRoutes;
