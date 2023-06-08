/*
  Warnings:

  - Made the column `start_datetime` on table `events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `end_datetime` on table `events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `finish_time` on table `race_results` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `events` MODIFY `start_datetime` BIGINT NOT NULL,
    MODIFY `end_datetime` BIGINT NOT NULL;

-- AlterTable
ALTER TABLE `race_results` MODIFY `finish_time` BIGINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `riders` MODIFY `total_waktu` BIGINT NOT NULL DEFAULT 0;
