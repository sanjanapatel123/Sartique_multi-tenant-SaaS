-- CreateEnum
CREATE TYPE "Feature" AS ENUM ('CUSTOMERS', 'ORDERS', 'INVENTORY', 'PRODUCTS', 'MEASUREMENTS', 'PRODUCTION', 'TASKS', 'EMPLOYEES', 'VENDORS', 'PURCHASES', 'POS', 'PAYMENTS', 'INVOICES', 'REPORTS');

-- CreateTable
CREATE TABLE "OrganizationFeature" (
    "id" TEXT NOT NULL,
    "feature" "Feature" NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizationFeature_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OrganizationFeature_organizationId_idx" ON "OrganizationFeature"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationFeature_organizationId_feature_key" ON "OrganizationFeature"("organizationId", "feature");

-- AddForeignKey
ALTER TABLE "OrganizationFeature" ADD CONSTRAINT "OrganizationFeature_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
