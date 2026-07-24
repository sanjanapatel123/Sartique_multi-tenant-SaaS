import { z } from "zod";

const taskStatusSchema = z.enum([
  "TODO",
  "IN_PROGRESS",
  "BLOCKED",
  "COMPLETED",
  "CANCELLED",
]);

const taskPrioritySchema = z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]);

export const createTaskSchema = z.object({
  title: z.string().min(2).max(150),

  description: z.string().max(1000).optional(),

  priority: taskPrioritySchema.optional().default("NORMAL"),

  dueDate: z.coerce.date().optional(),

  productionJobId: z.string().min(1).optional(),

  assignedEmployeeId: z.string().min(1).optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(2).max(150).optional(),

  description: z.string().max(1000).nullable().optional(),

  status: taskStatusSchema.optional(),

  priority: taskPrioritySchema.optional(),

  dueDate: z.coerce.date().nullable().optional(),

  productionJobId: z.string().min(1).nullable().optional(),

  assignedEmployeeId: z.string().min(1).nullable().optional(),
});

export const taskQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),

  limit: z.coerce.number().int().positive().max(100).default(10),

  search: z.string().optional(),

  status: taskStatusSchema.optional(),

  priority: taskPrioritySchema.optional(),

  productionJobId: z.string().optional(),

  assignedEmployeeId: z.string().optional(),
});
