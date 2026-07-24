-- CreateTable
CREATE TABLE "MeasurementTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MeasurementTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeasurementTemplateField" (
    "id" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "templateId" TEXT NOT NULL,
    "measurementDefinitionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MeasurementTemplateField_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MeasurementTemplate_organizationId_idx" ON "MeasurementTemplate"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "MeasurementTemplate_organizationId_name_key" ON "MeasurementTemplate"("organizationId", "name");

-- CreateIndex
CREATE INDEX "MeasurementTemplateField_templateId_idx" ON "MeasurementTemplateField"("templateId");

-- CreateIndex
CREATE INDEX "MeasurementTemplateField_measurementDefinitionId_idx" ON "MeasurementTemplateField"("measurementDefinitionId");

-- CreateIndex
CREATE UNIQUE INDEX "MeasurementTemplateField_templateId_measurementDefinitionId_key" ON "MeasurementTemplateField"("templateId", "measurementDefinitionId");

-- AddForeignKey
ALTER TABLE "MeasurementTemplate" ADD CONSTRAINT "MeasurementTemplate_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeasurementTemplateField" ADD CONSTRAINT "MeasurementTemplateField_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "MeasurementTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeasurementTemplateField" ADD CONSTRAINT "MeasurementTemplateField_measurementDefinitionId_fkey" FOREIGN KEY ("measurementDefinitionId") REFERENCES "MeasurementDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
