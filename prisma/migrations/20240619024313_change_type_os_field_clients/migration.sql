/*
  Warnings:

  - The `address` column on the `Client` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `companyName` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cnpj` on table `Client` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "companyName" SET NOT NULL,
ALTER COLUMN "cnpj" SET NOT NULL,
DROP COLUMN "address",
ADD COLUMN     "address" JSONB;
