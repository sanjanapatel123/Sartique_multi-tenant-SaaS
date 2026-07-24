import type { StockMovementType } from "@prisma/client";

export interface CreateInventoryItemDto {
  name: string;
  sku: string;
  category: string;
  unit: string;
  description?: string;
  lowStockThreshold?: number;
}

export interface InventoryQueryDto {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  unit?: string;
}

export interface StockInDto {
  inventoryItemId: string;
  warehouseId: string;
  quantity: number;
  referenceType?: string;
  referenceId?: string;
  note?: string;
}

export interface StockOutDto {
  inventoryItemId: string;
  warehouseId: string;
  quantity: number;
  referenceType?: string;
  referenceId?: string;
  note?: string;
}

export interface ReserveStockDto {
  inventoryItemId: string;
  warehouseId: string;
  quantity: number;
  referenceType?: string;
  referenceId?: string;
  note?: string;
}

export interface ReleaseStockDto {
  inventoryItemId: string;
  warehouseId: string;
  quantity: number;
  referenceType?: string;
  referenceId?: string;
  note?: string;
}

export interface StockMovementQueryDto {
  page: number;
  limit: number;
  inventoryItemId?: string;
  warehouseId?: string;
  type?: StockMovementType;
  referenceId?: string;
}

export interface UpdateInventoryItemDto {
  name?: string;
  sku?: string;
  category?: string;
  unit?: string;
  description?: string;
  lowStockThreshold?: number;
}

export interface AdjustStockDto {
  inventoryItemId: string;
  warehouseId: string;
  type: "ADJUSTMENT_IN" | "ADJUSTMENT_OUT";
  quantity: number;
  note: string;
}
