import { Hono } from "hono";

import orderController from "./order.controller.js";

import { authMiddleware } from "../../middleware/auth.middleware.js";

const orderRoutes = new Hono();

orderRoutes.post("/", authMiddleware, (c) => orderController.create(c));

orderRoutes.get("/", authMiddleware, (c) => orderController.findAll(c));

orderRoutes.get("/:id", authMiddleware, (c) => orderController.findById(c));

orderRoutes.put("/:id", authMiddleware, (c) => orderController.update(c));

orderRoutes.delete("/:id", authMiddleware, (c) => orderController.delete(c));

export default orderRoutes;
