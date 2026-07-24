import { z } from "zod";

const productionStatusSchema = z.enum([
  "PENDING",
  "CUTTING",
  "STITCHING",
  "FINISHING",
  "QC",
  "COMPLETED",
  "ON_HOLD",
  "CANCELLED",
]);

const productionPrioritySchema = z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]);

export const createProductionJobSchema = z.object({
  jobNumber: z.string().min(1).max(50),

  orderId: z.string().min(1, "Order is required"),

  assignedEmployeeId: z.string().min(1).optional(),

  priority: productionPrioritySchema.optional().default("NORMAL"),

  startDate: z.coerce.date().optional(),

  dueDate: z.coerce.date().optional(),

  notes: z.string().max(1000).optional(),
});

export const updateProductionJobSchema = z.object({
  assignedEmployeeId: z.string().min(1).nullable().optional(),

  status: productionStatusSchema.optional(),

  priority: productionPrioritySchema.optional(),

  startDate: z.coerce.date().nullable().optional(),

  dueDate: z.coerce.date().nullable().optional(),

  notes: z.string().max(1000).nullable().optional(),
});

export const productionQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),

  limit: z.coerce.number().int().positive().max(100).default(10),

  search: z.string().optional(),

  status: productionStatusSchema.optional(),

  priority: productionPrioritySchema.optional(),

  assignedEmployeeId: z.string().optional(),

  orderId: z.string().optional(),
});
