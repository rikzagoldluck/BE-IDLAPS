/*
  Warnings:

  - Made the column `id_beacon` on table `riders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `riders` MODIFY `id_beacon` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `beacon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tag_id` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `riders` ADD CONSTRAINT `riders_id_beacon_fkey` FOREIGN KEY (`id_beacon`) REFERENCES `beacon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
