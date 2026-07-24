import { z } from "zod";

export const createMeasurementDefinitionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),

  key: z
    .string()
    .min(2, "Key must be at least 2 characters")
    .max(100)
    .regex(/^[a-z][a-zA-Z0-9]*$/, "Key must be camelCase, e.g. chestWidth"),

  unit: z.enum(["INCH", "CM"]).optional().default("INCH"),

  description: z.string().max(500).optional(),
});

export const updateMeasurementDefinitionSchema = z.object({
  name: z.string().min(2).max(100).optional(),

  unit: z.enum(["INCH", "CM"]).optional(),

  description: z.string().max(500).nullable().optional(),

  isActive: z.boolean().optional(),
});

export type CreateMeasurementDefinitionBody = z.infer<
  typeof createMeasurementDefinitionSchema
>;

export type UpdateMeasurementDefinitionBody = z.infer<
  typeof updateMeasurementDefinitionSchema
>;
