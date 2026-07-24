import { Hono } from "hono";

import customerController from "./customer.controller.js";

import { authMiddleware } from "../../middleware/auth.middleware.js";

const customerRoutes = new Hono();

customerRoutes.post("/", authMiddleware, (c) => customerController.create(c));

customerRoutes.get("/", authMiddleware, (c) => customerController.findAll(c));

customerRoutes.get("/:id", authMiddleware, (c) =>
  customerController.findById(c),
);

customerRoutes.put("/:id", authMiddleware, (c) => customerController.update(c));

customerRoutes.delete("/:id", authMiddleware, (c) =>
  customerController.delete(c),
);

export default customerRoutes;
