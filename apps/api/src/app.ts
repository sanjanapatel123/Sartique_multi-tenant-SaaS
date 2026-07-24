import { Hono } from "hono";
import { logger } from "hono/logger";
import type { AppBindings } from "./types/hono.js";

import authRoutes from "./modules/auth/auth.routes.js";
import orderRoutes from "./modules/order/order.routes.js";
import warehouseRoutes from "./modules/warehouse/warehouse.routes.js";
import inventoryRoutes from "./modules/inventory/inventory.routes.js";
import categoryRoutes from "./modules/catalog/category/category.routes.js";
import attributeRoutes from "./modules/catalog/attribute/attribute.routes.js";
import productRoutes from "./modules/catalog/product/product.routes.js";
import measurementDefinitionRoutes from "./modules/measurements/definition/measurement-definition.routes.js";
import templateRoutes from "./modules/measurements/template/template.routes.js";
import profileRoutes from "./modules/measurements/profile/profile.routes.js";
import customerRoutes from "./modules/customer/customer.routes.js";
import employeeRoutes from "./modules/employee/employee.routes.js";
import productionRoutes from "./modules/production/production.routes.js";
import taskRoutes from "./modules/task/task.routes.js";

const app = new Hono<AppBindings>();

app.use("*", logger());

app.get("/", (c) => {
  return c.json({
    success: true,
    message: "Bespokible API Running 🚀",
  });
});

// Auth Routes
app.route("/api/measurement-profiles", profileRoutes);
app.route("/api/measurement-templates", templateRoutes);
app.route("/api/measurement-definitions", measurementDefinitionRoutes);
app.route("/api/products", productRoutes);
app.route("/api/attributes", attributeRoutes);
app.route("/api/customers", customerRoutes);
app.route("/api/auth", authRoutes);
app.route("/api/orders", orderRoutes);
app.route("/api/warehouses", warehouseRoutes);
app.route("/api/inventory", inventoryRoutes);
app.route("/api/categories", categoryRoutes);
app.route("/api/employees", employeeRoutes);
app.route("/api/production", productionRoutes);
app.route("/api/tasks", taskRoutes);
export default app;
