/*
  Warnings:

  - Made the column `bigImg` on table `Stream` required. This step will fail if there are existing NULL values in that column.
  - Made the column `smallImg` on table `Stream` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Stream` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Stream" ALTER COLUMN "bigImg" SET NOT NULL,
ALTER COLUMN "smallImg" SET NOT NULL,
ALTER COLUMN "title" SET NOT NULL;
