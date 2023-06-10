/*
  Warnings:

  - You are about to drop the `event_participants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `race_start` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `event_participants` DROP FOREIGN KEY `event_participants_ibfk_1`;

-- DropForeignKey
ALTER TABLE `event_participants` DROP FOREIGN KEY `event_participants_ibfk_2`;

-- DropForeignKey
ALTER TABLE `event_participants` DROP FOREIGN KEY `event_participants_ibfk_3`;

-- DropForeignKey
ALTER TABLE `race_start` DROP FOREIGN KEY `race_start_ibfk_1`;

-- DropForeignKey
ALTER TABLE `race_start` DROP FOREIGN KEY `race_start_ibfk_2`;

-- DropForeignKey
ALTER TABLE `riders` DROP FOREIGN KEY `fk_event`;

-- DropTable
DROP TABLE `event_participants`;

-- DropTable
DROP TABLE `race_start`;
