import { z } from "zod";
import { OrderStatus } from "@prisma/client";

// ✅ CREATE ORDER
export const createOrderSchema = z.object({
  title: z.string().min(3).max(100).trim(),

  description: z.string().trim().max(500).optional(),

  // FIX: safer numeric handling
  totalAmount: z.coerce.number().positive().finite(),

  // FIX: allow uuid/cuid flexibility
  customerId: z.string().min(10).max(50),
});

// ✅ UPDATE ORDER
export const updateOrderSchema = z.object({
  title: z.string().min(3).max(100).trim().optional(),

  description: z.string().trim().max(500).optional(),

  totalAmount: z.coerce.number().positive().finite().optional(),

  status: z.nativeEnum(OrderStatus).optional(),
});

// ✅ QUERY (IMPORTANT FIXES HERE)
export const orderQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),

  // FIX: prevent abuse (VERY IMPORTANT)
  limit: z.coerce.number().min(1).max(50).default(10),

  search: z.string().trim().optional(),

  status: z.nativeEnum(OrderStatus).optional(),
});
