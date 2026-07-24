-- CreateEnum
CREATE TYPE "BusinessType" AS ENUM ('FASHION', 'JEWELRY', 'TAILORING', 'ACCESSORIES', 'OTHER');

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "businessType" "BusinessType" NOT NULL DEFAULT 'FASHION';
