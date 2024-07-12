/*
  Warnings:

  - You are about to drop the column `employeeEmail` on the `EmployeeFile` table. All the data in the column will be lost.
  - You are about to drop the column `employeeEmail` on the `EmployeeImage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employeeId]` on the table `EmployeeImage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employeeId` to the `EmployeeFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `EmployeeImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EmployeeFile" DROP CONSTRAINT "EmployeeFile_employeeEmail_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeImage" DROP CONSTRAINT "EmployeeImage_employeeEmail_fkey";

-- DropIndex
DROP INDEX "EmployeeFile_employeeEmail_key";

-- DropIndex
DROP INDEX "EmployeeImage_employeeEmail_key";

-- AlterTable
ALTER TABLE "EmployeeFile" DROP COLUMN "employeeEmail",
ADD COLUMN     "employeeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "EmployeeImage" DROP COLUMN "employeeEmail",
ADD COLUMN     "employeeId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeImage_employeeId_key" ON "EmployeeImage"("employeeId");

-- AddForeignKey
ALTER TABLE "EmployeeFile" ADD CONSTRAINT "EmployeeFile_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeImage" ADD CONSTRAINT "EmployeeImage_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
