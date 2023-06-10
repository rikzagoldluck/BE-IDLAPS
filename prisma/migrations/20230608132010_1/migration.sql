-- DropForeignKey
ALTER TABLE `categories` DROP FOREIGN KEY `categories_ibfk_1`;

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
