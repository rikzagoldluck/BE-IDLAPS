/*
  Warnings:

  - You are about to drop the column `event_id` on the `race_results` table. All the data in the column will be lost.
  - You are about to drop the column `lap_no` on the `riders` table. All the data in the column will be lost.
  - You are about to drop the column `run_lap` on the `riders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `race_results` DROP FOREIGN KEY `race_results_ibfk_1`;

-- AlterTable
ALTER TABLE `race_results` DROP COLUMN `event_id`,
    MODIFY `lap_number` INTEGER NULL DEFAULT 0,
    MODIFY `finish_time` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `riders` DROP COLUMN `lap_no`,
    DROP COLUMN `run_lap`,
    ADD COLUMN `total_waktu` INTEGER NOT NULL DEFAULT 0;
