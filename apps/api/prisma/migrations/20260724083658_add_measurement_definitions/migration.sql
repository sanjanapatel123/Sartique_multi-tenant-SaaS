-- CreateEnum
CREATE TYPE "MeasurementUnit" AS ENUM ('INCH', 'CM');

-- CreateTable
CREATE TABLE "MeasurementDefinition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "unit" "MeasurementUnit" NOT NULL DEFAULT 'INCH',
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MeasurementDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MeasurementDefinition_organizationId_idx" ON "MeasurementDefinition"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "MeasurementDefinition_organizationId_key_key" ON "MeasurementDefinition"("organizationId", "key");

-- AddForeignKey
ALTER TABLE "MeasurementDefinition" ADD CONSTRAINT "MeasurementDefinition_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
