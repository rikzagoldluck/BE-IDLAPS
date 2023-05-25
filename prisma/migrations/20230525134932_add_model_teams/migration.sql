/*
  Warnings:

  - You are about to drop the column `team_name` on the `riders` table. All the data in the column will be lost.
  - Added the required column `team_id` to the `riders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `riders` DROP COLUMN `team_name`,
    ADD COLUMN `team_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `teams` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `province` VARCHAR(100) NULL,
    `nationality` VARCHAR(5) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `fk_team` ON `riders`(`team_id`);

-- AddForeignKey
ALTER TABLE `riders` ADD CONSTRAINT `fk_team` FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
