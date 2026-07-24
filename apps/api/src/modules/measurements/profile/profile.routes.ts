import { Hono } from "hono";
import type { AppBindings } from "../../../types/hono.js";

import profileController from "./profile.controller.js";

import { authMiddleware } from "../../../middleware/auth.middleware.js";
import { roleMiddleware } from "../../../middleware/role.middleware.js";

const profileRoutes = new Hono<AppBindings>();

profileRoutes.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => profileController.create(c),
);

profileRoutes.get("/", authMiddleware, (c) => profileController.findAll(c));

profileRoutes.post(
  "/:id/versions",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => profileController.createVersion(c),
);

profileRoutes.get("/:id", authMiddleware, (c) => profileController.findById(c));

profileRoutes.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "MANAGER"),
  (c) => profileController.update(c),
);

profileRoutes.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), (c) =>
  profileController.deactivate(c),
);

export default profileRoutes;
