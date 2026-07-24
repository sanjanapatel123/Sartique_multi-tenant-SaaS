import { z } from "zod";

const measurementValuesSchema = z.record(
  z.string(),
  z.number().positive("Measurement value must be greater than 0"),
);

export const createProfileSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),

  templateId: z.string().min(1, "Measurement template is required"),

  name: z.string().min(2).max(150),

  values: measurementValuesSchema,

  note: z.string().max(500).optional(),
});

export const createMeasurementVersionSchema = z.object({
  values: measurementValuesSchema,

  note: z.string().max(500).optional(),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(150).optional(),

  isActive: z.boolean().optional(),
});
