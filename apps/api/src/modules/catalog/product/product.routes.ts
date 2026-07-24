import { Hono } from "hono";
import type { AppBindings } from "../../../types/hono.js";

import productController from "./product.controller.js";

import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { roleMiddleware } from "../../../middleware/role.middleware.js";

const productRoutes = new Hono<AppBindings>();

productRoutes.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => productController.create(c),
);

productRoutes.get("/", authMiddleware, (c) => productController.findAll(c));

productRoutes.get("/:id", authMiddleware, (c) => productController.findById(c));

productRoutes.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => productController.update(c),
);

productRoutes.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), (c) =>
  productController.deactivate(c),
);

export default productRoutes;
