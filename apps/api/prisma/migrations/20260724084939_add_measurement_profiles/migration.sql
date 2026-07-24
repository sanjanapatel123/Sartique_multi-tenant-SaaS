-- CreateTable
CREATE TABLE "MeasurementProfile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "customerId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MeasurementProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeasurementVersion" (
    "id" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "note" TEXT,
    "profileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MeasurementVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeasurementValue" (
    "id" TEXT NOT NULL,
    "value" DECIMAL(10,3) NOT NULL,
    "versionId" TEXT NOT NULL,
    "measurementDefinitionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MeasurementValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MeasurementProfile_organizationId_idx" ON "MeasurementProfile"("organizationId");

-- CreateIndex
CREATE INDEX "MeasurementProfile_customerId_idx" ON "MeasurementProfile"("customerId");

-- CreateIndex
CREATE INDEX "MeasurementProfile_templateId_idx" ON "MeasurementProfile"("templateId");

-- CreateIndex
CREATE INDEX "MeasurementVersion_profileId_idx" ON "MeasurementVersion"("profileId");

-- CreateIndex
CREATE INDEX "MeasurementVersion_createdAt_idx" ON "MeasurementVersion"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "MeasurementVersion_profileId_version_key" ON "MeasurementVersion"("profileId", "version");

-- CreateIndex
CREATE INDEX "MeasurementValue_versionId_idx" ON "MeasurementValue"("versionId");

-- CreateIndex
CREATE INDEX "MeasurementValue_measurementDefinitionId_idx" ON "MeasurementValue"("measurementDefinitionId");

-- CreateIndex
CREATE UNIQUE INDEX "MeasurementValue_versionId_measurementDefinitionId_key" ON "MeasurementValue"("versionId", "measurementDefinitionId");

-- AddForeignKey
ALTER TABLE "MeasurementProfile" ADD CONSTRAINT "MeasurementProfile_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeasurementProfile" ADD CONSTRAINT "MeasurementProfile_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "MeasurementTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeasurementProfile" ADD CONSTRAINT "MeasurementProfile_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeasurementVersion" ADD CONSTRAINT "MeasurementVersion_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "MeasurementProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeasurementValue" ADD CONSTRAINT "MeasurementValue_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "MeasurementVersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeasurementValue" ADD CONSTRAINT "MeasurementValue_measurementDefinitionId_fkey" FOREIGN KEY ("measurementDefinitionId") REFERENCES "MeasurementDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
