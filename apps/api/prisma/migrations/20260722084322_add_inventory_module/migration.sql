-- CreateEnum
CREATE TYPE "StockMovementType" AS ENUM ('STOCK_IN', 'STOCK_OUT', 'ADJUSTMENT_IN', 'ADJUSTMENT_OUT', 'RESERVE', 'RELEASE');

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "description" TEXT,
    "lowStockThreshold" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Warehouse" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "address" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Warehouse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryStock" (
    "id" TEXT NOT NULL,
    "quantity" DECIMAL(12,3) NOT NULL DEFAULT 0,
    "reserved" DECIMAL(12,3) NOT NULL DEFAULT 0,
    "inventoryItemId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockMovement" (
    "id" TEXT NOT NULL,
    "type" "StockMovementType" NOT NULL,
    "quantity" DECIMAL(12,3) NOT NULL,
    "referenceType" TEXT,
    "referenceId" TEXT,
    "note" TEXT,
    "inventoryItemId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StockMovement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InventoryItem_organizationId_idx" ON "InventoryItem"("organizationId");

-- CreateIndex
CREATE INDEX "InventoryItem_category_idx" ON "InventoryItem"("category");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryItem_organizationId_sku_key" ON "InventoryItem"("organizationId", "sku");

-- CreateIndex
CREATE INDEX "Warehouse_organizationId_idx" ON "Warehouse"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Warehouse_organizationId_code_key" ON "Warehouse"("organizationId", "code");

-- CreateIndex
CREATE INDEX "InventoryStock_warehouseId_idx" ON "InventoryStock"("warehouseId");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryStock_inventoryItemId_warehouseId_key" ON "InventoryStock"("inventoryItemId", "warehouseId");

-- CreateIndex
CREATE INDEX "StockMovement_organizationId_idx" ON "StockMovement"("organizationId");

-- CreateIndex
CREATE INDEX "StockMovement_inventoryItemId_idx" ON "StockMovement"("inventoryItemId");

-- CreateIndex
CREATE INDEX "StockMovement_warehouseId_idx" ON "StockMovement"("warehouseId");

-- CreateIndex
CREATE INDEX "StockMovement_createdAt_idx" ON "StockMovement"("createdAt");

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse" ADD CONSTRAINT "Warehouse_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryStock" ADD CONSTRAINT "InventoryStock_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryStock" ADD CONSTRAINT "InventoryStock_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
