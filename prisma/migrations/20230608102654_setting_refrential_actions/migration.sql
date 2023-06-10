/*
  Warnings:

  - Made the column `rider_id` on table `race_results` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category_id` on table `race_results` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `categories` DROP FOREIGN KEY `categories_ibfk_1`;

-- DropForeignKey
ALTER TABLE `event_participants` DROP FOREIGN KEY `event_participants_ibfk_1`;

-- DropForeignKey
ALTER TABLE `event_participants` DROP FOREIGN KEY `event_participants_ibfk_2`;

-- DropForeignKey
ALTER TABLE `event_participants` DROP FOREIGN KEY `event_participants_ibfk_3`;

-- DropForeignKey
ALTER TABLE `race_results` DROP FOREIGN KEY `race_results_ibfk_2`;

-- DropForeignKey
ALTER TABLE `race_results` DROP FOREIGN KEY `race_results_ibfk_3`;

-- DropForeignKey
ALTER TABLE `riders` DROP FOREIGN KEY `fk_category`;

-- DropForeignKey
ALTER TABLE `riders` DROP FOREIGN KEY `fk_event`;

-- DropForeignKey
ALTER TABLE `riders` DROP FOREIGN KEY `fk_team`;

-- AlterTable
ALTER TABLE `race_results` MODIFY `rider_id` INTEGER NOT NULL,
    MODIFY `category_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_participants` ADD CONSTRAINT `event_participants_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_participants` ADD CONSTRAINT `event_participants_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_participants` ADD CONSTRAINT `event_participants_ibfk_3` FOREIGN KEY (`rider_id`) REFERENCES `riders`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `race_results` ADD CONSTRAINT `race_results_ibfk_2` FOREIGN KEY (`rider_id`) REFERENCES `riders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `race_results` ADD CONSTRAINT `race_results_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `riders` ADD CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `riders` ADD CONSTRAINT `fk_event` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `riders` ADD CONSTRAINT `fk_team` FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
