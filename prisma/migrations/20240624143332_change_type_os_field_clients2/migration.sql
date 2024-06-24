/*
  Warnings:

  - The `contacts` column on the `Client` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "contacts",
ADD COLUMN     "contacts" JSONB[];
