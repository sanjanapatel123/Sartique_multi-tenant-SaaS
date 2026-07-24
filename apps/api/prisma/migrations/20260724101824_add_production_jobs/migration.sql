-- CreateEnum
CREATE TYPE "ProductionStatus" AS ENUM ('PENDING', 'CUTTING', 'STITCHING', 'FINISHING', 'QC', 'COMPLETED', 'ON_HOLD', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ProductionPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- CreateTable
CREATE TABLE "ProductionJob" (
    "id" TEXT NOT NULL,
    "jobNumber" TEXT NOT NULL,
    "status" "ProductionStatus" NOT NULL DEFAULT 'PENDING',
    "priority" "ProductionPriority" NOT NULL DEFAULT 'NORMAL',
    "startDate" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "notes" TEXT,
    "orderId" TEXT NOT NULL,
    "assignedEmployeeId" TEXT,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductionJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductionJob_organizationId_idx" ON "ProductionJob"("organizationId");

-- CreateIndex
CREATE INDEX "ProductionJob_orderId_idx" ON "ProductionJob"("orderId");

-- CreateIndex
CREATE INDEX "ProductionJob_assignedEmployeeId_idx" ON "ProductionJob"("assignedEmployeeId");

-- CreateIndex
CREATE INDEX "ProductionJob_status_idx" ON "ProductionJob"("status");

-- CreateIndex
CREATE INDEX "ProductionJob_dueDate_idx" ON "ProductionJob"("dueDate");

-- CreateIndex
CREATE UNIQUE INDEX "ProductionJob_organizationId_jobNumber_key" ON "ProductionJob"("organizationId", "jobNumber");

-- AddForeignKey
ALTER TABLE "ProductionJob" ADD CONSTRAINT "ProductionJob_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionJob" ADD CONSTRAINT "ProductionJob_assignedEmployeeId_fkey" FOREIGN KEY ("assignedEmployeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionJob" ADD CONSTRAINT "ProductionJob_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
