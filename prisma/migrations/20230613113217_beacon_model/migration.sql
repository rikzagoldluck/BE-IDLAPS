-- DropForeignKey
ALTER TABLE `riders` DROP FOREIGN KEY `riders_id_beacon_fkey`;

-- AddForeignKey
ALTER TABLE `riders` ADD CONSTRAINT `fk_beacon` FOREIGN KEY (`id_beacon`) REFERENCES `beacon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RedefineIndex
CREATE INDEX `fk_beacon` ON `riders`(`id_beacon`);
DROP INDEX `riders_id_beacon_fkey` ON `riders`;
