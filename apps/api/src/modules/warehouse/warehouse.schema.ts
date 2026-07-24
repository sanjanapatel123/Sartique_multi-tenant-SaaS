import { z } from "zod";

export const createWarehouseSchema = z.object({
  name: z.string().min(2).max(100),

  code: z
    .string()
    .min(2)
    .max(20)
    .trim()
    .transform((value) => value.toUpperCase()),

  address: z.string().max(255).optional(),
});

export const updateWarehouseSchema = z.object({
  name: z.string().min(2).max(100).optional(),

  code: z
    .string()
    .min(2)
    .max(20)
    .trim()
    .transform((value) => value.toUpperCase())
    .optional(),

  address: z.string().max(255).optional(),

  isActive: z.boolean().optional(),
});
