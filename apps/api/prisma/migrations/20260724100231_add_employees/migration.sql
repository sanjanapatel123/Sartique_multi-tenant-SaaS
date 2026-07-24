-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "employeeCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "designation" TEXT,
    "department" TEXT,
    "joiningDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Employee_organizationId_idx" ON "Employee"("organizationId");

-- CreateIndex
CREATE INDEX "Employee_department_idx" ON "Employee"("department");

-- CreateIndex
CREATE INDEX "Employee_isActive_idx" ON "Employee"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_organizationId_employeeCode_key" ON "Employee"("organizationId", "employeeCode");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
