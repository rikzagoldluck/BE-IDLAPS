/*
  Warnings:

  - The `start_datetime` column on the `events` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `end_datetime` column on the `events` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `start_time` column on the `race_start` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `categories` MODIFY `start_time` INTEGER NULL,
    MODIFY `end_time` INTEGER NULL;

-- AlterTable
ALTER TABLE `event_participants` MODIFY `registration_date` INTEGER NULL;

-- AlterTable
ALTER TABLE `events` DROP COLUMN `start_datetime`,
    ADD COLUMN `start_datetime` INTEGER NULL,
    DROP COLUMN `end_datetime`,
    ADD COLUMN `end_datetime` INTEGER NULL;

-- AlterTable
ALTER TABLE `race_results` MODIFY `finish_time` INTEGER NULL;

-- AlterTable
ALTER TABLE `race_start` DROP COLUMN `start_time`,
    ADD COLUMN `start_time` INTEGER NULL;
