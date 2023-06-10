/*
  Warnings:

  - You are about to drop the column `event_id` on the `riders` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `fk_event` ON `riders`;

-- AlterTable
ALTER TABLE `riders` DROP COLUMN `event_id`;
