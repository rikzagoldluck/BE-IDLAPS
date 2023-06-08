-- AlterTable
ALTER TABLE `categories` MODIFY `start_time` VARCHAR(100) NOT NULL DEFAULT '0',
    MODIFY `end_time` VARCHAR(100) NOT NULL DEFAULT '0',
    MODIFY `end_sch` VARCHAR(100) NOT NULL DEFAULT '0',
    MODIFY `start_sch` VARCHAR(100) NOT NULL DEFAULT '0';

-- AlterTable
ALTER TABLE `events` MODIFY `start_datetime` VARCHAR(100) NOT NULL DEFAULT '0',
    MODIFY `end_datetime` VARCHAR(100) NOT NULL DEFAULT '0';

-- AlterTable
ALTER TABLE `race_results` MODIFY `finish_time` VARCHAR(100) NOT NULL DEFAULT '0';

-- AlterTable
ALTER TABLE `riders` MODIFY `total_waktu` VARCHAR(100) NOT NULL DEFAULT '0';
