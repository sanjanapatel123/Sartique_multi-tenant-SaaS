import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2).max(100).trim(),
  description: z.string().max(500).optional(),
});

export const updateCategorySchema = z.object({
  name: z.string().min(2).max(100).trim().optional(),
  description: z.string().max(500).optional(),
  isActive: z.boolean().optional(),
});
