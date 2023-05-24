-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `description` VARCHAR(100) NULL,
    `start_time` TIME(0) NULL,
    `end_time` TIME(0) NULL,
    `sex` VARCHAR(100) NULL,
    `distance` INTEGER NULL,
    `lap` INTEGER NULL,
    `run` BOOLEAN NULL DEFAULT false,
    `event_id` INTEGER NULL,

    INDEX `event_id`(`event_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_participants` (
    `event_id` INTEGER NULL,
    `rider_id` INTEGER NULL,
    `category_id` INTEGER NULL,
    `registration_date` DATE NULL,

    INDEX `category_id`(`category_id`),
    INDEX `event_id`(`event_id`),
    INDEX `rider_id`(`rider_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `start_datetime` DATETIME(0) NULL,
    `end_datetime` DATETIME(0) NULL,
    `location` VARCHAR(70) NULL,
    `desc_1` VARCHAR(100) NULL,
    `desc_2` VARCHAR(100) NULL,
    `commisioner` VARCHAR(70) NULL,
    `race_director` VARCHAR(70) NULL,
    `distance` INTEGER NULL,
    `type` VARCHAR(30) NULL,
    `registration_fee` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `race_results` (
    `result_id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_id` INTEGER NULL,
    `rider_id` INTEGER NULL,
    `category_id` INTEGER NULL,
    `lap_number` INTEGER NULL,
    `finish_time` TIME(0) NULL,

    INDEX `category_id`(`category_id`),
    INDEX `event_id`(`event_id`),
    INDEX `rider_id`(`rider_id`),
    PRIMARY KEY (`result_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `race_start` (
    `race_start_id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_id` INTEGER NULL,
    `rider_id` INTEGER NULL,
    `start_time` DATETIME(0) NULL,

    INDEX `event_id`(`event_id`),
    INDEX `rider_id`(`rider_id`),
    PRIMARY KEY (`race_start_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `riders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `age` INTEGER NULL,
    `nationality` VARCHAR(5) NULL,
    `team_name` VARCHAR(50) NULL,
    `bib` VARCHAR(5) NULL,
    `vci_num` VARCHAR(10) NULL,
    `id_b` INTEGER NULL,
    `mac_no` VARCHAR(20) NULL,
    `note` VARCHAR(20) NULL,
    `note_1` VARCHAR(100) NULL,
    `run_lap` INTEGER NULL,
    `lap_no` INTEGER NULL,
    `run` BOOLEAN NULL DEFAULT true,
    `event_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,

    INDEX `fk_category`(`category_id`),
    INDEX `fk_event`(`event_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `event_participants` ADD CONSTRAINT `event_participants_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `event_participants` ADD CONSTRAINT `event_participants_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `event_participants` ADD CONSTRAINT `event_participants_ibfk_3` FOREIGN KEY (`rider_id`) REFERENCES `riders`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `race_results` ADD CONSTRAINT `race_results_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `race_results` ADD CONSTRAINT `race_results_ibfk_2` FOREIGN KEY (`rider_id`) REFERENCES `riders`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `race_results` ADD CONSTRAINT `race_results_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `race_start` ADD CONSTRAINT `race_start_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `race_start` ADD CONSTRAINT `race_start_ibfk_2` FOREIGN KEY (`rider_id`) REFERENCES `riders`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `riders` ADD CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `riders` ADD CONSTRAINT `fk_event` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

