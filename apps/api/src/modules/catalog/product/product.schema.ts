import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2).max(150).trim(),

  sku: z
    .string()
    .min(2)
    .max(50)
    .trim()
    .transform((value) => value.toUpperCase()),

  description: z.string().max(1000).optional(),

  price: z.number().positive(),

  categoryId: z.string().cuid().optional(),

  attributes: z
    .record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
    .optional(),
});

export const productQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),

  search: z.string().trim().optional(),

  categoryId: z.string().cuid().optional(),

  isActive: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .optional(),
});

export const updateProductSchema = z.object({
  name: z.string().min(2).max(150).trim().optional(),

  sku: z
    .string()
    .min(2)
    .max(50)
    .trim()
    .transform((value) => value.toUpperCase())
    .optional(),

  description: z.string().max(1000).optional(),

  price: z.number().positive().optional(),

  categoryId: z.string().cuid().optional(),

  attributes: z
    .record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
    .optional(),
});
