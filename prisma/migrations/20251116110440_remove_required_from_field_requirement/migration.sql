/*
  Warnings:

  - The values [REQUIRED] on the enum `FieldRequirement` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FieldRequirement_new" AS ENUM ('MANDATORY', 'OPTIONAL', 'OFF');
ALTER TABLE "public"."job_form_fields" ALTER COLUMN "requirement" DROP DEFAULT;
ALTER TABLE "job_form_fields" ALTER COLUMN "requirement" TYPE "FieldRequirement_new" USING ("requirement"::text::"FieldRequirement_new");
ALTER TYPE "FieldRequirement" RENAME TO "FieldRequirement_old";
ALTER TYPE "FieldRequirement_new" RENAME TO "FieldRequirement";
DROP TYPE "public"."FieldRequirement_old";
ALTER TABLE "job_form_fields" ALTER COLUMN "requirement" SET DEFAULT 'OPTIONAL';
COMMIT;
