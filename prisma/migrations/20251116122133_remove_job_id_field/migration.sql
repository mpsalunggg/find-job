/*
  Warnings:

  - You are about to drop the column `jobId` on the `jobs` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "jobs_jobId_key";

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "jobId";
