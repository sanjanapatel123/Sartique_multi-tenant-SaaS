import { z } from "zod";

export const createEmployeeSchema = z.object({
  employeeCode: z.string().min(1).max(50),

  name: z.string().min(2).max(100),

  email: z.string().email().optional(),

  phone: z.string().min(7).max(20).optional(),

  designation: z.string().max(100).optional(),

  department: z.string().max(100).optional(),

  joiningDate: z.coerce.date().optional(),
});

export const updateEmployeeSchema = z.object({
  employeeCode: z.string().min(1).max(50).optional(),

  name: z.string().min(2).max(100).optional(),

  email: z.string().email().nullable().optional(),

  phone: z.string().min(7).max(20).nullable().optional(),

  designation: z.string().max(100).nullable().optional(),

  department: z.string().max(100).nullable().optional(),

  joiningDate: z.coerce.date().nullable().optional(),

  isActive: z.boolean().optional(),
});

export const employeeQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),

  limit: z.coerce.number().int().positive().max(100).default(10),

  search: z.string().optional(),

  department: z.string().optional(),

  isActive: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .optional(),
});
