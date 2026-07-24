/*
  Warnings:

  - A unique constraint covering the columns `[organizationId,phone]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Customer_organizationId_idx" ON "Customer"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_organizationId_phone_key" ON "Customer"("organizationId", "phone");
