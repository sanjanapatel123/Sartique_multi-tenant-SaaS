import { z } from "zod";

export const createCustomerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string().min(10),
});

export const updateCustomerSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).optional(),
});
