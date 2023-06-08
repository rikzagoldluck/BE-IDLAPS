/*
  Warnings:

  - Made the column `start_time` on table `categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `end_time` on table `categories` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `categories` MODIFY `start_time` BIGINT NOT NULL DEFAULT 0,
    MODIFY `end_time` BIGINT NOT NULL DEFAULT 0;
