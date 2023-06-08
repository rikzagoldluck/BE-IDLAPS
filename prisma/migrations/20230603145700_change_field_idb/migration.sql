/*
  Warnings:

  - You are about to drop the column `id_b` on the `riders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `riders` DROP COLUMN `id_b`,
    ADD COLUMN `id_beacon` INTEGER NULL;
