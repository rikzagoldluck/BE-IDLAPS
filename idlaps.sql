-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 21 Bulan Mei 2023 pada 12.20
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 7.4.33

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
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `sex` varchar(100) DEFAULT NULL,
  `distance` int(9) DEFAULT NULL,
  `lap` int(5) DEFAULT NULL,
  `run` tinyint(1) DEFAULT 0,
  `event_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `start_time`, `end_time`, `sex`, `distance`, `lap`, `run`, `event_id`) VALUES
(1, 'Women Open', 'Race For 18-20', '13:28:01', '13:28:01', 'Women', 3000, 20, 1, 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `start_datetime` datetime DEFAULT NULL,
  `end_datetime` datetime DEFAULT NULL,
  `location` varchar(70) DEFAULT NULL,
  `desc_1` varchar(100) DEFAULT NULL,
  `desc_2` varchar(100) DEFAULT NULL,
  `commisioner` varchar(70) DEFAULT NULL,
  `race_director` varchar(70) DEFAULT NULL,
  `distance` int(9) DEFAULT NULL,
  `type` varchar(30) DEFAULT NULL,
  `registration_fee` int(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `events`
--

INSERT INTO `events` (`id`, `name`, `start_datetime`, `end_datetime`, `location`, `desc_1`, `desc_2`, `commisioner`, `race_director`, `distance`, `type`, `registration_fee`) VALUES
(2, 'MTB 1', '2023-05-20 12:58:00', '2023-05-20 12:58:00', 'Cihuni Hills', 'desc 1', 'Desc 2', 'Rikza', 'Rikza', 300, 'Mountain Bike', 300),
(3, 'MTB 1', '2023-05-20 12:00:00', '2023-05-20 12:58:00', 'Cihuni Hills', 'desc 1', 'desc2', 'Rikza', 'Rikza', 300, 'Mountain Bike', 300),
(4, 'MTB XCO HDR', '2023-05-20 12:58:54', '2023-05-20 12:58:54', 'Cihuni, BSD', '', '', 'Rikza', 'Rikza', 3000, 'Mountain Bike', 200);

-- --------------------------------------------------------

--
-- Struktur dari tabel `event_participants`
--

CREATE TABLE `event_participants` (
  `event_id` int(11) DEFAULT NULL,
  `rider_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `registration_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `race_results`
--

CREATE TABLE `race_results` (
  `result_id` int(11) NOT NULL,
  `event_id` int(11) DEFAULT NULL,
  `rider_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `lap_number` int(11) DEFAULT NULL,
  `finish_time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `race_start`
--

CREATE TABLE `race_start` (
  `race_start_id` int(11) NOT NULL,
  `event_id` int(11) DEFAULT NULL,
  `rider_id` int(11) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `riders`
--

CREATE TABLE `riders` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `age` int(3) DEFAULT NULL,
  `nationality` varchar(5) DEFAULT NULL,
  `team_name` varchar(50) DEFAULT NULL,
  `bib` varchar(5) DEFAULT NULL,
  `vci_num` varchar(10) DEFAULT NULL,
  `id_b` int(11) DEFAULT NULL,
  `mac_no` varchar(20) DEFAULT NULL,
  `note` varchar(20) DEFAULT NULL,
  `note_1` varchar(100) DEFAULT NULL,
  `run_lap` int(3) DEFAULT NULL,
  `lap_no` int(3) DEFAULT NULL,
  `run` tinyint(1) DEFAULT 1,
  `event_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indeks untuk tabel `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `event_participants`
--
ALTER TABLE `event_participants`
  ADD KEY `event_id` (`event_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `rider_id` (`rider_id`);

--
-- Indeks untuk tabel `race_results`
--
ALTER TABLE `race_results`
  ADD PRIMARY KEY (`result_id`),
  ADD KEY `event_id` (`event_id`),
  ADD KEY `rider_id` (`rider_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indeks untuk tabel `race_start`
--
ALTER TABLE `race_start`
  ADD PRIMARY KEY (`race_start_id`),
  ADD KEY `event_id` (`event_id`),
  ADD KEY `rider_id` (`rider_id`);

--
-- Indeks untuk tabel `riders`
--
ALTER TABLE `riders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_event` (`event_id`),
  ADD KEY `fk_category` (`category_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `race_results`
--
ALTER TABLE `race_results`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `race_start`
--
ALTER TABLE `race_start`
  MODIFY `race_start_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `riders`
--
ALTER TABLE `riders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

--
-- Ketidakleluasaan untuk tabel `event_participants`
--
ALTER TABLE `event_participants`
  ADD CONSTRAINT `event_participants_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`),
  ADD CONSTRAINT `event_participants_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `event_participants_ibfk_3` FOREIGN KEY (`rider_id`) REFERENCES `riders` (`id`);

--
-- Ketidakleluasaan untuk tabel `race_results`
--
ALTER TABLE `race_results`
  ADD CONSTRAINT `race_results_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`),
  ADD CONSTRAINT `race_results_ibfk_2` FOREIGN KEY (`rider_id`) REFERENCES `riders` (`id`),
  ADD CONSTRAINT `race_results_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Ketidakleluasaan untuk tabel `race_start`
--
ALTER TABLE `race_start`
  ADD CONSTRAINT `race_start_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`),
  ADD CONSTRAINT `race_start_ibfk_2` FOREIGN KEY (`rider_id`) REFERENCES `riders` (`id`);

--
-- Ketidakleluasaan untuk tabel `riders`
--
ALTER TABLE `riders`
  ADD CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `fk_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
