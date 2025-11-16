/*
  Warnings:

  - You are about to drop the column `closedAt` on the `jobs` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "FieldRequirement" ADD VALUE 'REQUIRED';

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "closedAt",
ADD COLUMN     "startedOn" TIMESTAMP(3);
