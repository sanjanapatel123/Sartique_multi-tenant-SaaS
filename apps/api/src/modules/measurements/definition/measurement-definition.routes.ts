import { Hono } from "hono";
import type { AppBindings } from "../../../types/hono.js";

import measurementDefinitionController from "./measurement-definition.controller.js";

import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { roleMiddleware } from "../../../middleware/role.middleware.js";

const measurementDefinitionRoutes = new Hono<AppBindings>();

measurementDefinitionRoutes.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => measurementDefinitionController.create(c),
);

measurementDefinitionRoutes.get("/", authMiddleware, (c) =>
  measurementDefinitionController.findAll(c),
);

measurementDefinitionRoutes.get("/:id", authMiddleware, (c) =>
  measurementDefinitionController.findById(c),
);

measurementDefinitionRoutes.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => measurementDefinitionController.update(c),
);

measurementDefinitionRoutes.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  (c) => measurementDefinitionController.deactivate(c),
);

export default measurementDefinitionRoutes;
