import { z } from "zod";

export const createInventoryItemSchema = z.object({
  name: z.string().min(2).max(150),

  sku: z
    .string()
    .min(2)
    .max(50)
    .trim()
    .transform((value) => value.toUpperCase()),

  category: z
    .string()
    .min(2)
    .max(50)
    .trim()
    .transform((value) => value.toUpperCase()),

  unit: z
    .string()
    .min(1)
    .max(30)
    .trim()
    .transform((value) => value.toUpperCase()),

  description: z.string().max(500).optional(),

  lowStockThreshold: z.number().min(0).default(0),
});

export const inventoryQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),

  search: z.string().trim().optional(),

  category: z
    .string()
    .trim()
    .transform((value) => value.toUpperCase())
    .optional(),

  unit: z
    .string()
    .trim()
    .transform((value) => value.toUpperCase())
    .optional(),
});

export const stockInSchema = z.object({
  inventoryItemId: z.string().cuid(),

  warehouseId: z.string().cuid(),

  quantity: z.number().positive(),

  referenceType: z.string().max(50).optional(),

  referenceId: z.string().max(100).optional(),

  note: z.string().max(500).optional(),
});

export const stockOutSchema = z.object({
  inventoryItemId: z.string().cuid(),

  warehouseId: z.string().cuid(),

  quantity: z.number().positive(),

  referenceType: z.string().max(50).optional(),

  referenceId: z.string().max(100).optional(),

  note: z.string().max(500).optional(),
});

export const reserveStockSchema = z.object({
  inventoryItemId: z.string().cuid(),
  warehouseId: z.string().cuid(),

  quantity: z.number().positive(),

  referenceType: z.string().max(50).optional(),
  referenceId: z.string().max(100).optional(),
  note: z.string().max(500).optional(),
});

export const releaseStockSchema = z.object({
  inventoryItemId: z.string().cuid(),
  warehouseId: z.string().cuid(),

  quantity: z.number().positive(),

  referenceType: z.string().max(50).optional(),
  referenceId: z.string().max(100).optional(),
  note: z.string().max(500).optional(),
});

export const stockMovementQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),

  inventoryItemId: z.string().cuid().optional(),

  warehouseId: z.string().cuid().optional(),

  type: z
    .enum([
      "STOCK_IN",
      "STOCK_OUT",
      "ADJUSTMENT_IN",
      "ADJUSTMENT_OUT",
      "RESERVE",
      "RELEASE",
    ])
    .optional(),

  referenceId: z.string().trim().optional(),
});

export const updateInventoryItemSchema = z.object({
  name: z.string().min(2).max(150).optional(),

  sku: z
    .string()
    .min(2)
    .max(50)
    .trim()
    .transform((value) => value.toUpperCase())
    .optional(),

  category: z
    .string()
    .min(2)
    .max(50)
    .trim()
    .transform((value) => value.toUpperCase())
    .optional(),

  unit: z
    .string()
    .min(1)
    .max(30)
    .trim()
    .transform((value) => value.toUpperCase())
    .optional(),

  description: z.string().max(500).optional(),

  lowStockThreshold: z.number().min(0).optional(),
});

export const adjustStockSchema = z.object({
  inventoryItemId: z.string().cuid(),
  warehouseId: z.string().cuid(),

  type: z.enum(["ADJUSTMENT_IN", "ADJUSTMENT_OUT"]),

  quantity: z.number().positive(),

  note: z.string().min(3).max(500),
});
