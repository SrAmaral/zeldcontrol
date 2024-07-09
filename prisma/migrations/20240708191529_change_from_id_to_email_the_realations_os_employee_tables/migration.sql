/*
  Warnings:

  - You are about to drop the column `employeeId` on the `EmployeeFile` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `EmployeeImage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contactEmail]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[employeeEmail]` on the table `EmployeeFile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[employeeEmail]` on the table `EmployeeImage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employeeEmail` to the `EmployeeFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeEmail` to the `EmployeeImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EmployeeFile" DROP CONSTRAINT "EmployeeFile_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeImage" DROP CONSTRAINT "EmployeeImage_employeeId_fkey";

-- DropIndex
DROP INDEX "EmployeeImage_employeeId_key";

-- AlterTable
ALTER TABLE "EmployeeFile" DROP COLUMN "employeeId",
ADD COLUMN     "employeeEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "EmployeeImage" DROP COLUMN "employeeId",
ADD COLUMN     "employeeEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_contactEmail_key" ON "Employee"("contactEmail");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeFile_employeeEmail_key" ON "EmployeeFile"("employeeEmail");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeImage_employeeEmail_key" ON "EmployeeImage"("employeeEmail");

-- AddForeignKey
ALTER TABLE "EmployeeFile" ADD CONSTRAINT "EmployeeFile_employeeEmail_fkey" FOREIGN KEY ("employeeEmail") REFERENCES "Employee"("contactEmail") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeImage" ADD CONSTRAINT "EmployeeImage_employeeEmail_fkey" FOREIGN KEY ("employeeEmail") REFERENCES "Employee"("contactEmail") ON DELETE RESTRICT ON UPDATE CASCADE;
