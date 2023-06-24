-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2023 at 08:59 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `idlaps`
--

-- --------------------------------------------------------

--
-- Table structure for table `beacon`
--

CREATE TABLE `beacon` (
  `id` int(11) NOT NULL,
  `tag_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `beacon`
--

INSERT INTO `beacon` (`id`, `tag_id`) VALUES
(1, '4C5BB3110C66'),
(2, '4C5BB3110AD2'),
(3, '4C5BB3110F71'),
(4, '4C5BB3110F5B'),
(5, '4C5BB3110C3B');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `start_time` varchar(100) NOT NULL DEFAULT '0',
  `end_time` varchar(100) NOT NULL DEFAULT '0',
  `sex` varchar(100) DEFAULT NULL,
  `distance` int(11) DEFAULT NULL,
  `lap` int(11) DEFAULT NULL,
  `run` tinyint(1) DEFAULT 0,
  `event_id` int(11) DEFAULT NULL,
  `end_sch` varchar(100) NOT NULL DEFAULT '0',
  `race_today` tinyint(1) DEFAULT 0,
  `start_sch` varchar(100) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `start_time`, `end_time`, `sex`, `distance`, `lap`, `run`, `event_id`, `end_sch`, `race_today`, `start_sch`) VALUES
(1, 'Man Open', 'Description', '1687576390654', '0', 'Man', 10, 5, 1, 2, '1686988380000', 0, '1686988320000'),
(2, 'Woman Open', 'Description', '0', '0', 'Woman', 10, 11, 0, 2, '1686989700000', 0, '1686989640000'),
(3, 'Man Junior Open', 'Description', '0', '0', 'Man', 10, 1, 0, 2, '1686989760000', 0, '1686989700000'),
(4, 'Woman Junior Open', 'Description', '0', '0', 'Woman', 100, 100, 0, 2, '1686989880000', 0, '1686989880000'),
(5, 'Test', 'Description', '0', '0', 'Man', 1, 1, 0, 1, '1686990000000', 0, '1686990000000'),
(7, 'Test', 'Description', '0', '0', 'Man', 1, 1, 0, 1, '1686990600000', 0, '1686990540000'),
(8, 'Woman Junior Open', 'Description', '0', '0', 'Woman', 1, 1, 0, 1, '1686995940000', 0, '1686995880000'),
(10, 'Woman Junior Open 2', 'Description', '0', '0', 'Woman', 2, 1, 0, 2, '1687015140000', 0, '1687015140000'),
(14, 'Man Junior Open', 'Description', '0', '0', 'Man', 1, 1, 0, 1, '1687087800000', 0, '1687087740000'),
(15, 'Woman Junior Open 2', 'Des', '0', '0', 'Woman', 1, 1, 0, 1, '1687088100000', 0, '1687088160000'),
(16, 'Man Open', 'Description', '0', '0', 'Man', 2, 1, 0, 3, '1687088040000', 0, '1687088040000');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `location` varchar(70) DEFAULT NULL,
  `desc_1` varchar(100) DEFAULT NULL,
  `desc_2` varchar(100) DEFAULT NULL,
  `commisioner` varchar(70) DEFAULT NULL,
  `race_director` varchar(70) DEFAULT NULL,
  `distance` int(11) DEFAULT NULL,
  `type` varchar(30) DEFAULT NULL,
  `registration_fee` int(11) DEFAULT NULL,
  `start_datetime` varchar(100) NOT NULL DEFAULT '0',
  `end_datetime` varchar(100) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `name`, `location`, `desc_1`, `desc_2`, `commisioner`, `race_director`, `distance`, `type`, `registration_fee`, `start_datetime`, `end_datetime`) VALUES
(1, 'MTB HDR Updaetd', 'BSD', 'Decs 1', 'Desc 2', 'Rikza', 'Rikza', 10, 'Mountain Bike', 300, '1686984840000', '1686984960000'),
(2, 'MTB HDR 2', 'BSD', 'Desc 1', 'Description', 'Rikza', 'Rikza', 100, 'Mountain Bike', 300, '1686985200000', '1686985200000'),
(3, 'MTB HDR 3', 'BSD', 'Description', 'Description', 'Rikza', 'Rikza', 1, 'Mountain Bike', 1, '1686990660000', '1687011900000');

-- --------------------------------------------------------

--
-- Table structure for table `race_results`
--

CREATE TABLE `race_results` (
  `result_id` int(11) NOT NULL,
  `rider_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `lap_number` int(11) DEFAULT 0,
  `finish_time` varchar(100) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `race_results`
--

INSERT INTO `race_results` (`result_id`, `rider_id`, `category_id`, `lap_number`, `finish_time`) VALUES
(280, 6, 1, 0, '1687586152002'),
(281, 5, 1, 0, '1687586364324'),
(282, 5, 1, 0, '1687586432606');

-- --------------------------------------------------------

--
-- Table structure for table `riders`
--

CREATE TABLE `riders` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `nationality` varchar(5) DEFAULT NULL,
  `bib` varchar(5) DEFAULT NULL,
  `vci_num` varchar(10) DEFAULT NULL,
  `mac_no` varchar(20) DEFAULT NULL,
  `note` varchar(20) DEFAULT NULL,
  `note_1` varchar(100) DEFAULT NULL,
  `run` tinyint(1) DEFAULT 0,
  `category_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `total_waktu` varchar(100) NOT NULL DEFAULT '0',
  `id_beacon` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `riders`
--

INSERT INTO `riders` (`id`, `name`, `age`, `nationality`, `bib`, `vci_num`, `mac_no`, `note`, `note_1`, `run`, `category_id`, `team_id`, `total_waktu`, `id_beacon`) VALUES
(5, 'Rikza', 20, 'INA', '001', '0', '123', NULL, 'ZZ', 1, 1, 1, '1687586432606', 5),
(6, 'Rider 2', 1, 'INA', '001', '0', '123', NULL, 'Note', 1, 1, 1, '1687586152002', 2);

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `nationality` varchar(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`id`, `name`, `province`, `nationality`) VALUES
(1, 'Rikza Team', 'JKT', 'INA'),
(2, 'Rikza Team 2', 'JKT', 'INA');

-- --------------------------------------------------------

--
-- Table structure for table `utilities`
--

CREATE TABLE `utilities` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `value` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `utilities`
--

INSERT INTO `utilities` (`id`, `name`, `value`) VALUES
(2, 'interval', '1');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('0ed56ca2-5ed5-4597-b1db-da6319e26fd0', 'aa4565620fcbc4850f3e8ebc482b0eadcfe520297422d6d0601d1ed655ea8980', '2023-06-17 06:03:41.213', '20230608102654_setting_refrential_actions', NULL, NULL, '2023-06-17 06:03:38.937', 1),
('1b7a6de4-07c9-4563-824f-d209221aead2', '231e6c9dba20f56e7995cdc8759e491c7f541f14d52089e606890ef105731a1e', NULL, '20230613113217_beacon_model', 'A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20230613113217_beacon_model\n\nDatabase error code: 1091\n\nDatabase error:\nCan\'t DROP INDEX `riders_id_beacon_fkey`; check that it exists\n\nPlease check the query number 4 from the migration file.\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name=\"20230613113217_beacon_model\"\n             at schema-engine\\connectors\\sql-schema-connector\\src\\apply_migration.rs:106\n   1: schema_core::commands::apply_migrations::Applying migration\n           with migration_name=\"20230613113217_beacon_model\"\n             at schema-engine\\core\\src\\commands\\apply_migrations.rs:91\n   2: schema_core::state::ApplyMigrations\n             at schema-engine\\core\\src\\state.rs:197', NULL, '2023-06-17 06:03:42.973', 0),
('38f346da-3381-40f9-9a9c-22135fa28d57', '12c5b8e54d54c4ab1060fa30e3d2b9e366bbdeed6751aed50c603b80f0703aaf', '2023-06-17 06:03:38.082', '20230603164447_bigint', NULL, NULL, '2023-06-17 06:03:37.828', 1),
('4c9c829c-84df-4120-9573-96ee93e32904', 'fbb8cdb8572f1fe54dd45c415bf6518a7af4d00618c37e091f90e5cc44866f3b', '2023-06-17 06:03:42.036', '20230608132010_1', NULL, NULL, '2023-06-17 06:03:41.584', 1),
('8d6e1edf-411c-410f-86e1-d421aec4f9f8', '755fd98ac1c0b4240d013181588bd9e43818bedb50a535379aae21cabbc8dad2', '2023-06-17 06:03:36.428', '20230523115117_change_date_column_to_int', NULL, NULL, '2023-06-17 06:03:35.816', 1),
('ad9f836c-3fd3-4666-850c-72661bda7eb5', '1b51ae04c4ea65256cadc270be721db34f61a55ffb71e84a55d505229ecdc849', '2023-06-17 06:03:38.932', '20230603170129_bigint', NULL, NULL, '2023-06-17 06:03:38.094', 1),
('b61721db-dd47-4a00-bed9-86af683e1a18', 'daed2b44c8baa138a7703a5c7072bae0ed69c74e4a7494d1c95abdde6906d021', '2023-06-17 06:03:37.152', '20230527124634_fixing_model_race_results', NULL, NULL, '2023-06-17 06:03:36.953', 1),
('b7c01cb6-df68-4504-899a-61b111ea41fc', '0316217a0253b3410effb9bf968a30091180d3a0233a58e31bf8415f6ca758a2', '2023-06-17 06:03:37.323', '20230603145700_change_field_idb', NULL, NULL, '2023-06-17 06:03:37.160', 1),
('bc3361d4-aa11-4c9e-9a47-17a066046a13', '5b68b0f66c9a734d93b7a26d5e938752b66243f74e29b20b6b1a5de9c27ee2c6', '2023-06-17 06:03:35.808', '0_init', NULL, NULL, '2023-06-17 06:03:32.792', 1),
('d1741a9f-0ca9-4194-9766-eb45aa4a8f3e', '98cbc09fe474139f810a7d685612a8a6eabbe1aafa92e7e2910bd76235627265', '2023-06-17 06:03:37.825', '20230603164233_bigint', NULL, NULL, '2023-06-17 06:03:37.344', 1),
('d369a116-5477-48e5-831c-236613336a88', 'b736fde0b79c73d4a2f63390a76b29b31de4191fdf0fda6c0675323c653a695f', '2023-06-17 06:03:36.948', '20230527013314_add_column_race_today', NULL, NULL, '2023-06-17 06:03:36.810', 1),
('dcf89dc2-79d6-4472-ba2a-e2c73f2999c7', 'b2fce7f362c4385b05f6b807e63108191d6e63d21ef1aa4976658fa8cbfad02c', '2023-06-17 06:03:41.534', '20230608103437_setting_refrential_actions_finishing', NULL, NULL, '2023-06-17 06:03:41.217', 1),
('eccc3b80-b069-4c41-b040-7f9a1f01b3bb', 'ddc5cc9266a3ee8de7799f7afbbf79098ec0db5b72dcc30ebff5f66bf1c2c391', '2023-06-17 06:03:42.919', '20230613113000_beacon_model', NULL, NULL, '2023-06-17 06:03:42.232', 1),
('fbb44b83-ad94-47a4-8579-d39e98894e02', '9311fc93ef08d82ca8ca1812fcfd59ebf330a81deabf1ee69a07d9e029adb38b', '2023-06-17 06:03:42.230', '20230608143853_2', NULL, NULL, '2023-06-17 06:03:42.041', 1),
('fd5ae4a9-5b6c-4174-ab32-54c38ba10a70', '440194bd90e02b01a199240512b1c29c5368d58f0d5b6f57abc503bf11d2db74', '2023-06-17 06:03:36.806', '20230525134932_add_model_teams', NULL, NULL, '2023-06-17 06:03:36.473', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `beacon`
--
ALTER TABLE `beacon`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `race_results`
--
ALTER TABLE `race_results`
  ADD PRIMARY KEY (`result_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `rider_id` (`rider_id`);

--
-- Indexes for table `riders`
--
ALTER TABLE `riders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_category` (`category_id`),
  ADD KEY `fk_team` (`team_id`),
  ADD KEY `id_beacon` (`id_beacon`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `utilities`
--
ALTER TABLE `utilities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `beacon`
--
ALTER TABLE `beacon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `race_results`
--
ALTER TABLE `race_results`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=283;

--
-- AUTO_INCREMENT for table `riders`
--
ALTER TABLE `riders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `utilities`
--
ALTER TABLE `utilities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `race_results`
--
ALTER TABLE `race_results`
  ADD CONSTRAINT `race_results_ibfk_2` FOREIGN KEY (`rider_id`) REFERENCES `riders` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `race_results_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `riders`
--
ALTER TABLE `riders`
  ADD CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_team` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `riders_ibfk_1` FOREIGN KEY (`id_beacon`) REFERENCES `beacon` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
