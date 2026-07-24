/*
  Warnings:

  - A unique constraint covering the columns `[organizationId,email]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organizationId,phone]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Employee_organizationId_email_key" ON "Employee"("organizationId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_organizationId_phone_key" ON "Employee"("organizationId", "phone");
