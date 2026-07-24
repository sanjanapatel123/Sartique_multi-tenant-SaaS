import { z } from "zod";

const templateFieldSchema = z.object({
  measurementDefinitionId: z.string().min(1),

  required: z.boolean().optional().default(true),

  sortOrder: z.number().int().min(0).optional().default(0),
});

export const createTemplateSchema = z.object({
  name: z.string().min(2).max(100),

  description: z.string().max(500).optional(),

  fields: z
    .array(templateFieldSchema)
    .min(1, "At least one measurement field is required"),
});

export const updateTemplateSchema = z.object({
  name: z.string().min(2).max(100).optional(),

  description: z.string().max(500).optional(),

  isActive: z.boolean().optional(),

  fields: z.array(templateFieldSchema).min(1).optional(),
});
