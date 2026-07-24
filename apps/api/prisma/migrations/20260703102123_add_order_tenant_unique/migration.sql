/*
  Warnings:

  - A unique constraint covering the columns `[orderNumber,organizationId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Order_id_organizationId_key";

-- DropIndex
DROP INDEX "Order_orderNumber_key";

-- CreateIndex
CREATE INDEX "Order_organizationId_idx" ON "Order"("organizationId");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");

-- CreateIndex
CREATE INDEX "Order_customerId_idx" ON "Order"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNumber_organizationId_key" ON "Order"("orderNumber", "organizationId");
