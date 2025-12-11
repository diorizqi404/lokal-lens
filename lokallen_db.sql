-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 11, 2025 at 09:22 AM
-- Server version: 10.6.23-MariaDB-cll-lve
-- PHP Version: 8.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lokallen_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `excerpt` text NOT NULL,
  `content` longtext NOT NULL,
  `featured_image` varchar(191) NOT NULL,
  `author_id` int(11) NOT NULL,
  `tags` text DEFAULT NULL,
  `province` varchar(191) DEFAULT NULL,
  `read_time` int(11) NOT NULL DEFAULT 5,
  `views` int(11) NOT NULL DEFAULT 0,
  `status` enum('published','archive','draft') NOT NULL DEFAULT 'published',
  `is_highlight` tinyint(1) NOT NULL DEFAULT 0,
  `published_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `rejection_reason` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `author_id`, `tags`, `province`, `read_time`, `views`, `status`, `is_highlight`, `published_at`, `created_at`, `updated_at`, `category_id`, `rejection_reason`) VALUES
(1, 'Mengenal Wayang Kulit: Seni Pertunjukan Klasik Jawa', 'mengenal-wayang-kulit-seni-pertunjukan-klasik-jawa', 'Wayang kulit adalah seni pertunjukan tradisional Indonesia yang telah diakui UNESCO sebagai Warisan Kemanusiaan untuk Budaya Lisan dan Nonbendawi.', 'Wayang kulit adalah salah satu puncak seni budaya Indonesia yang berakar dari tradisi Jawa. Pertunjukan wayang kulit menggabungkan berbagai elemen seni seperti sastra, musik, tutur, rupa, dan pertunjukan yang sangat kompleks.\n\nWayang kulit telah ada sejak abad ke-10 Masehi di Jawa. Pertunjukan ini menggunakan boneka kulit yang diproyeksikan pada layar putih dengan lampu minyak kelapa. Dalang atau pemain wayang akan menggerakkan boneka sambil menceritakan kisah dari epos Mahabharata atau Ramayana.', 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=80', 1, '[\"wayang\", \"jawa\", \"tradisi\", \"seni pertunjukan\", \"UNESCO\"]', 'Jawa Tengah', 8, 1523, 'archive', 0, '2025-11-22 16:00:30.264', '2025-11-22 05:40:05.027', '2025-11-25 16:49:34.215', 7, NULL),
(2, 'Tari Kecak: Pesona Tari Api dari Bali', 'tari-kecak-pesona-tari-api-dari-bali', 'Tari Kecak adalah tarian tradisional Bali yang unik karena tidak menggunakan alat musik pengiring, melainkan suara \"cak\" dari puluhan penari pria.', 'Tari Kecak adalah salah satu pertunjukan seni yang paling ikonik dari Bali. Tarian ini diciptakan pada tahun 1930-an dan telah menjadi salah satu daya tarik wisata budaya utama di Indonesia.\n\nTari Kecak diciptakan oleh seniman Bali I Wayan Limbak dan pelukis Jerman Walter Spies pada tahun 1930-an. Yang membuat Tari Kecak berbeda adalah penggunaan suara \"cak-cak-cak\" yang dilantunkan oleh puluhan penari pria yang duduk melingkar.', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80', 2, '[\"tari\", \"bali\", \"kecak\", \"ramayana\", \"tradisi\"]', 'Bali', 6, 2346, 'published', 1, '2025-11-22 05:40:05.027', '2025-11-22 05:40:05.027', '2025-11-26 14:36:12.000', 1, NULL),
(3, 'Batik: Warisan Budaya Dunia dari Indonesia', 'batik-warisan-budaya-dunia-dari-indonesia', 'Batik Indonesia telah diakui UNESCO sebagai Warisan Kemanusiaan untuk Budaya Lisan dan Nonbendawi sejak 2 Oktober 2009.', 'Batik adalah kain bergambar yang pembuatannya secara khusus dengan menuliskan atau menerakan malam pada kain, kemudian pengolahannya diproses dengan cara tertentu.\n\nBatik telah ada di Indonesia sejak zaman Majapahit. Awalnya, batik hanya digunakan oleh kalangan keraton dan bangsawan. Seiring waktu, batik menyebar ke masyarakat luas dan menjadi identitas budaya Indonesia.', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763972275109-f2z4pa6lywt.jpg', 1, '[\"batik\", \"unesco\", \"tradisi\", \"tekstil\", \"warisan budaya\"]', 'Jawa Tengah', 3, 3120, 'published', 0, '2025-11-22 05:40:05.027', '2025-11-22 05:40:05.027', '2025-11-24 08:18:11.476', 3, NULL),
(4, 'Rendang: Makanan Terenak di Dunia dari Minangkabau', 'rendang-makanan-terenak-di-dunia-dari-minangkabau', 'Rendang adalah masakan daging dengan bumbu rempah-rempah khas Minangkabau yang telah dinobatkan sebagai makanan terenak di dunia oleh CNN.', 'Rendang adalah masakan tradisional Indonesia yang berasal dari Sumatera Barat. Pada tahun 2011, CNN International menobatkan Rendang sebagai makanan paling enak di dunia.\n\nRendang berasal dari tradisi masyarakat Minangkabau di Sumatera Barat. Masakan ini telah ada sejak abad ke-16 dan awalnya dibuat sebagai bekal perjalanan karena dapat bertahan lama tanpa pendingin.', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763986449400-z45s6n22i3k.jpg', 2, '[\"rendang\", \"minangkabau\", \"kuliner\", \"sumatera barat\"]', 'Sumatera Barat', 4, 4520, 'published', 0, '2025-11-22 05:40:05.027', '2025-11-22 05:40:05.027', '2025-11-24 12:14:12.269', 5, NULL),
(5, 'Rumah Gadang: Arsitektur Tradisional Minangkabau', 'rumah-gadang-arsitektur-tradisional-minangkabau', 'Rumah Gadang adalah rumah adat tradisional Minangkabau yang memiliki atap berbentuk tanduk kerbau.', 'Rumah Gadang atau Rumah Bagonjong adalah rumah adat tradisional masyarakat Minangkabau di Sumatera Barat. Rumah ini memiliki ciri khas atap yang melengkung seperti tanduk kerbau.\n\nBentuk atap Rumah Gadang yang menyerupai tanduk kerbau memiliki makna filosofis yang dalam. Ini mengingat legenda kemenangan kerbau Minangkabau melawan kerbau Jawa.', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763972404271-uyd5vtmg979.jpg', 1, '[\"rumah gadang\", \"minangkabau\", \"arsitektur\"]', 'Sumatera Barat', 1, 1853, 'published', 0, '2025-11-22 05:40:05.027', '2025-11-22 05:40:05.027', '2025-11-24 08:20:13.758', 4, NULL),
(6, 'Angklung: Alat Musik Bambu Warisan UNESCO', 'angklung-alat-musik-bambu-warisan-unesco', 'Angklung adalah alat musik multitonal tradisional Indonesia yang terbuat dari bambu.', 'Angklung adalah alat musik yang terbuat dari bambu dan dimainkan dengan cara digoyangkan. Alat musik ini berasal dari Jawa Barat dan telah diakui UNESCO sebagai Masterpiece of Oral and Intangible Heritage of Humanity.\n\nAngklung telah ada sejak abad ke-7 Masehi di wilayah Sunda, Jawa Barat. Awalnya angklung digunakan untuk upacara padi, kemudian berkembang menjadi alat musik hiburan dan pendidikan.', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763986655421-eft865kilv5.jpg', 2, '[\"angklung\", \"musik\", \"bambu\", \"jawa barat\", \"unesco\"]', 'Jawa Barat', 5, 995, 'published', 0, '2025-11-22 05:40:05.027', '2025-11-22 05:40:05.027', '2025-11-25 03:13:42.473', 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `article_comments`
--

CREATE TABLE `article_comments` (
  `id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `content` text NOT NULL,
  `upvotes` int(11) NOT NULL DEFAULT 0,
  `downvotes` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `article_comments`
--

INSERT INTO `article_comments` (`id`, `article_id`, `user_id`, `parent_id`, `content`, `upvotes`, `downvotes`, `created_at`, `updated_at`) VALUES
(1, 1, 4, NULL, 'Artikel yang sangat informatif! Saya jadi lebih menghargai seni wayang kulit.', 12, 0, '2025-11-22 05:40:05.032', '2025-11-22 05:40:05.032'),
(2, 1, 2, NULL, 'Wayang kulit memang luar biasa!', 8, 0, '2025-11-22 05:40:05.032', '2025-11-22 05:40:05.032');

-- --------------------------------------------------------

--
-- Table structure for table `badges`
--

CREATE TABLE `badges` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(191) NOT NULL,
  `category` enum('explorer','collector','master','social','special') NOT NULL,
  `requirement` text NOT NULL,
  `points` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `badges`
--

INSERT INTO `badges` (`id`, `name`, `description`, `icon`, `category`, `requirement`, `points`, `created_at`, `updated_at`) VALUES
(1, 'Penjelajah Pemula', 'Scan 5 objek budaya pertama kamu', '🔍', 'explorer', 'Scan 5 objek budaya', 50, '2025-11-22 05:40:04.997', '2025-11-22 05:40:04.997'),
(2, 'Penjelajah Berpengalaman', 'Scan 25 objek budaya dari berbagai daerah', '🗺️', 'explorer', 'Scan 25 objek budaya', 100, '2025-11-22 05:40:04.997', '2025-11-22 05:40:04.997'),
(3, 'Master Penjelajah', 'Scan 100 objek budaya nusantara', '🏆', 'explorer', 'Scan 100 objek budaya', 500, '2025-11-22 05:40:04.997', '2025-11-22 05:40:04.997'),
(4, 'Kolektor Batik', 'Scan 10 jenis batik berbeda', '👘', 'collector', 'Scan 10 jenis batik', 75, '2025-11-22 05:40:04.997', '2025-11-22 05:40:04.997'),
(5, 'Kolektor Wayang', 'Scan 10 karakter wayang berbeda', '🎭', 'collector', 'Scan 10 karakter wayang', 75, '2025-11-22 05:40:04.997', '2025-11-22 05:40:04.997'),
(6, 'Kolektor Keris', 'Scan 5 jenis keris berbeda', '🗡️', 'collector', 'Scan 5 jenis keris', 100, '2025-11-22 05:40:04.997', '2025-11-22 05:40:04.997'),
(7, 'Ahli Budaya Jawa', 'Lengkapi semua koleksi budaya Jawa', '🎌', 'master', 'Scan semua budaya Jawa', 200, '2025-11-22 05:40:04.997', '2025-11-22 05:40:04.997'),
(8, 'Ahli Budaya Bali', 'Lengkapi semua koleksi budaya Bali', '🏯', 'master', 'Scan semua budaya Bali', 200, '2025-11-22 05:40:04.997', '2025-11-22 05:40:04.997'),
(9, 'Guru Budaya Nusantara', 'Lengkapi koleksi dari 10 provinsi berbeda', '📚', 'master', 'Scan budaya dari 10 provinsi', 300, '2025-11-22 05:40:04.997', '2025-11-22 05:40:04.997'),
(10, 'Storyteller', 'Bagikan 5 hasil scan ke media sosial', '📱', 'social', 'Bagikan 5 hasil scan', 50, '2025-11-22 05:40:04.997', '2025-11-22 05:40:04.997'),
(11, 'Kontributor Emas', 'Kontribusi 50+ artikel budaya', '✨', 'special', 'Tulis 50 artikel', 500, '2025-11-22 05:40:04.997', '2025-11-22 05:40:04.997');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(191) DEFAULT NULL,
  `type` varchar(191) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `icon`, `type`, `created_at`, `updated_at`) VALUES
(1, 'Tarian', 'tarian', 'Tarian tradisional', '💃', 'culture', '2025-11-22 05:40:04.721', '2025-11-22 05:40:04.721'),
(2, 'Musik', 'musik', 'Musik & alat musik tradisional', '🎵', 'culture', '2025-11-22 05:40:04.721', '2025-11-22 05:40:04.721'),
(3, 'Pakaian', 'pakaian', 'Pakaian adat', '👘', 'culture', '2025-11-22 05:40:04.721', '2025-11-22 05:40:04.721'),
(4, 'Arsitektur', 'arsitektur', 'Rumah adat & bangunan', '🏛️', 'culture', '2025-11-22 05:40:04.721', '2025-11-22 05:40:04.721'),
(5, 'Kuliner', 'kuliner', 'Makanan & minuman tradisional', '🍜', 'culture', '2025-11-22 05:40:04.721', '2025-11-22 05:40:04.721'),
(6, 'Upacara', 'upacara', 'Upacara adat', '🎎', 'culture', '2025-11-22 05:40:04.721', '2025-11-22 05:40:04.721'),
(7, 'Kerajinan', 'kerajinan', 'Kerajinan tangan', '🎨', 'culture', '2025-11-22 05:40:04.721', '2025-11-22 05:40:04.721'),
(8, 'Senjata', 'senjata', 'Senjata tradisional', '⚔️', 'culture', '2025-11-22 05:40:04.721', '2025-11-22 05:40:04.721'),
(9, 'Permainan', 'permainan', 'Permainan tradisional', '🎲', 'culture', '2025-11-22 05:40:04.721', '2025-11-22 05:40:04.721'),
(10, 'Bahasa', 'bahasa', 'Bahasa & aksara daerah', '📜', 'culture', '2025-11-22 05:40:04.721', '2025-11-22 05:40:04.721'),
(13, 'Festival', 'festival', 'Festival budaya', '🎪', 'event', '2025-11-22 05:40:04.721', '2025-11-22 05:40:04.721'),
(14, 'Pertunjukan', 'pertunjukan', 'Pertunjukan seni', '🎭', 'event', '2025-11-22 05:40:04.721', '2025-11-22 05:40:04.721'),
(15, 'Pameran', 'pameran', 'Pameran budaya', '🖼️', 'event', '2025-11-22 05:40:04.721', '2025-11-22 05:40:04.721');

-- --------------------------------------------------------

--
-- Table structure for table `certificates`
--

CREATE TABLE `certificates` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `date_earned` datetime(3) NOT NULL,
  `certificate_url` varchar(191) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `certificates`
--

INSERT INTO `certificates` (`id`, `user_id`, `title`, `description`, `date_earned`, `certificate_url`, `created_at`, `updated_at`) VALUES
(1, 1, 'Duta Budaya Lokal Lens', 'Penghargaan untuk kontribusi luar biasa dalam melestarikan budaya nusantara', '2024-01-15 00:00:00.000', 'https://example.com/certificates/duta-budaya.pdf', '2025-11-22 05:40:04.990', '2025-11-22 05:40:04.990'),
(2, 1, 'Penjelajah Nusantara', 'Telah menjelajahi semua 34 provinsi di Indonesia', '2024-02-20 00:00:00.000', 'https://example.com/certificates/penjelajah.pdf', '2025-11-22 05:40:04.990', '2025-11-22 05:40:04.990'),
(3, 2, 'Kontributor Aktif', 'Apresiasi untuk kontribusi aktif dalam platform', '2024-03-10 00:00:00.000', 'https://example.com/certificates/contributor-aktif.pdf', '2025-11-22 05:40:04.994', '2025-11-22 05:40:04.994');

-- --------------------------------------------------------

--
-- Table structure for table `challenges`
--

CREATE TABLE `challenges` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `category` enum('scan','quiz','article','exploration','social') NOT NULL,
  `difficulty` enum('easy','medium','hard') NOT NULL,
  `points` int(11) NOT NULL DEFAULT 0,
  `requirements` text NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `challenges`
--

INSERT INTO `challenges` (`id`, `title`, `description`, `category`, `difficulty`, `points`, `requirements`, `created_at`, `updated_at`) VALUES
(1, 'Petualangan Pertama', 'Scan objek budaya pertama kamu dan mulai petualanganmu!', 'scan', 'easy', 25, 'Scan 1 objek budaya', '2025-11-22 05:40:05.001', '2025-11-22 05:40:05.001'),
(2, 'Minggu Produktif', 'Scan 10 objek budaya dalam 7 hari', 'scan', 'medium', 100, 'Scan 10 objek dalam 7 hari', '2025-11-22 05:40:05.001', '2025-11-22 05:40:05.001'),
(3, 'Marathon Budaya', 'Scan 50 objek budaya dalam sebulan', 'scan', 'hard', 500, 'Scan 50 objek dalam 30 hari', '2025-11-22 05:40:05.001', '2025-11-22 05:40:05.001'),
(4, 'Kuis Master', 'Selesaikan 5 kuis budaya dengan sempurna', 'quiz', 'medium', 150, 'Perfect score di 5 kuis', '2025-11-22 05:40:05.001', '2025-11-22 05:40:05.001'),
(5, 'Jenius Budaya', 'Jawab benar 100 pertanyaan kuis', 'quiz', 'hard', 300, 'Jawab 100 pertanyaan dengan benar', '2025-11-22 05:40:05.001', '2025-11-22 05:40:05.001'),
(6, 'Pembaca Setia', 'Baca 10 artikel budaya', 'article', 'easy', 50, 'Baca 10 artikel', '2025-11-22 05:40:05.001', '2025-11-22 05:40:05.001'),
(7, 'Penulis Pemula', 'Tulis artikel budaya pertama kamu', 'article', 'medium', 100, 'Publikasikan 1 artikel', '2025-11-22 05:40:05.001', '2025-11-22 05:40:05.001'),
(8, 'Penjelajah Regional', 'Kunjungi dan scan budaya dari 3 provinsi berbeda', 'exploration', 'medium', 200, 'Scan dari 3 provinsi', '2025-11-22 05:40:05.001', '2025-11-22 05:40:05.001'),
(9, 'Wisatawan Nusantara', 'Kunjungi dan scan budaya dari 10 provinsi', 'exploration', 'hard', 750, 'Scan dari 10 provinsi', '2025-11-22 05:40:05.001', '2025-11-22 05:40:05.001'),
(10, 'Influencer Budaya', 'Share 10 hasil scan ke media sosial', 'social', 'easy', 75, 'Share 10 kali', '2025-11-22 05:40:05.001', '2025-11-22 05:40:05.001'),
(11, 'Community Builder', 'Ajak 5 teman bergabung di LokalLens', 'social', 'medium', 250, 'Referral 5 user', '2025-11-22 05:40:05.001', '2025-11-22 05:40:05.001');

-- --------------------------------------------------------

--
-- Table structure for table `contributors`
--

CREATE TABLE `contributors` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reason` text DEFAULT NULL,
  `verification_status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `verified_by` int(11) DEFAULT NULL,
  `verified_at` datetime(3) DEFAULT NULL,
  `rejection_reason` text DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `cultural_interest` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contributors`
--

INSERT INTO `contributors` (`id`, `user_id`, `reason`, `verification_status`, `verified_by`, `verified_at`, `rejection_reason`, `created_at`, `updated_at`, `cultural_interest`) VALUES
(3, 4, 'Bismillah Juara 1', 'approved', 1, '2025-11-22 21:34:10.297', NULL, '2025-11-22 21:29:09.607', '2025-11-22 21:34:10.306', 'Seni Tari, Kuliner, Arsitektur'),
(4, 5, 'karena gua jago', 'approved', 1, '2025-11-24 12:26:10.443', NULL, '2025-11-23 09:23:27.169', '2025-11-24 12:26:10.444', 'Seni Tari, Kuliner, Arsitektur'),
(5, 7, 'ceritakan motivasi danjajdbjwbdbwhdbhwabhbhabwhwhb', 'pending', NULL, NULL, NULL, '2025-11-23 13:35:49.911', '2025-11-23 13:35:49.911', 'Seni Tari');

-- --------------------------------------------------------

--
-- Table structure for table `cultures`
--

CREATE TABLE `cultures` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `subtitle` varchar(191) DEFAULT NULL,
  `description` text NOT NULL,
  `long_description` text DEFAULT NULL,
  `meaning` text DEFAULT NULL,
  `location` varchar(191) NOT NULL,
  `province` varchar(191) NOT NULL,
  `city` varchar(191) NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `is_endangered` tinyint(1) NOT NULL DEFAULT 0,
  `status` enum('draft','published','archive') NOT NULL DEFAULT 'published',
  `thumbnail` varchar(191) DEFAULT NULL,
  `map_embed_url` text DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `rejection_reason` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cultures`
--

INSERT INTO `cultures` (`id`, `name`, `slug`, `subtitle`, `description`, `long_description`, `meaning`, `location`, `province`, `city`, `latitude`, `longitude`, `is_endangered`, `status`, `thumbnail`, `map_embed_url`, `created_at`, `updated_at`, `category_id`, `rejection_reason`) VALUES
(1, 'Reog Ponorogo', 'reog-ponorogo', 'Tarian Mistis dari Gerbang Timur Jawa', 'Reog adalah salah satu kesenian budaya yang berasal dari Jawa Timur bagian barat-laut dan Ponorogo dianggap sebagai kota asal Reog yang sebenarnya. Gerbang kota Ponorogo dihiasi oleh sosok warok dan gemblak, dua sosok yang ikut tampil pada saat Reog dipertunjukkan.', 'Reog adalah salah satu budaya daerah di Indonesia yang masih sangat kental dengan hal-hal yang berbau mistis dan ilmu kebatinan yang kuat. Sejarahnya dimulai pada zaman Kerajaan Majapahit, di mana Ki Ageng Kutu, seorang abdi kerajaan, menciptakan tarian ini sebagai sindiran kepada Raja Kertabhumi.', 'Tarian ini menggambarkan singa barong, raja hutan, yang menjadi simbol bagi Kertabhumi, dan di atasnya bertengger bulu merak hingga menyerupai kipas raksasa yang menyimbolkan pengaruh kuat para rekannya dari kerajaan Tiongkok. Kesenian ini merupakan wujud kritik terhadap penguasa yang tunduk pada kehendak asing.', 'Ponorogo, Jawa Timur', 'Jawa Timur', 'Ponorogo', NULL, NULL, 1, 'archive', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763967615195-n9ajqae9xz.webp', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126142.77835087282!2d111.38!3d-7.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79a1c3c3c3c3c3%3A0x1234567890abcdef!2sPonorogo!5e0!3m2!1sen!2sid!4v1234567890123', '2025-11-22 05:40:05.036', '2025-11-24 07:00:17.626', 1, NULL),
(2, 'Tari Saman', 'tari-saman', 'Tarian Seribu Tangan dari Aceh', 'Tari Saman adalah tarian suku Gayo yang biasa ditampilkan untuk merayakan peristiwa-peristiwa penting dalam adat. Tarian ini juga digunakan untuk merayakan kelahiran Nabi Muhammad SAW.', 'Dalam beberapa literatur menyebutkan, tari Saman diciptakan oleh Syekh Saman, seorang ulama yang berasal dari Gayo, Aceh Tenggara. Tarian ini diciptakan untuk mendakwahkan ajaran Islam.', 'Tari Saman mengandung pendidikan keagamaan, sopan santun, kepahlawanan, kekompakan, dan kebersamaan. Semua penari harus bersatu dalam gerakan dan suara.', 'Gayo Lues, Aceh', 'Aceh', 'Gayo Lues', 4.323, 97.325, 0, 'published', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763967530045-z38x08k787c.webp', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255841.77835087282!2d97.325!3d4.323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303fb8c3c3c3c3c3%3A0x1234567890abcdef!2sGayo%20Lues!5e0!3m2!1sen!2sid!4v1234567890123', '2025-11-22 05:40:05.036', '2025-11-24 07:05:00.428', 1, NULL),
(3, 'Batik Parang', 'batik-parang', 'Motif Keris Diagonal yang Megah', 'Batik Parang adalah salah satu motif batik tertua di Indonesia. Motif ini menggambarkan sebuah garis miring yang teratur membentuk huruf S.', 'Parang berasal dari kata \"Pereng\" yang berarti lereng. Motif ini menggambarkan lereng gunung yang digunakan oleh para raja dan keluarga kerajaan sebagai simbol kekuatan.', 'Motif parang melambangkan keluhuran budi, kekuatan, dan keteguhan hati. Dahulu, motif ini hanya boleh dikenakan oleh keluarga kerajaan Yogyakarta.', 'Yogyakarta, DI Yogyakarta', 'DI Yogyakarta', 'Yogyakarta', -7.7956, 110.3695, 0, 'published', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1764056615992-nsrpu7ionu.jpg', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126142.77835087282!2d110.369!3d-7.795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5787bd5b6b45%3A0x21723fd4d3b2d63!2sYogyakarta!5e0!3m2!1sen!2sid!4v1234567890123', '2025-11-22 05:40:05.036', '2025-11-25 07:43:39.454', 3, NULL),
(4, 'Rumah Gadang', 'rumah-gadang', 'Arsitektur Megah Minangkabau', 'Rumah Gadang adalah nama untuk rumah adat Minangkabau yang merupakan rumah tradisional dan banyak jumpai di provinsi Sumatera Barat, Indonesia.', 'Rumah ini dikenal karena atapnya yang runcing dan melengkung menyerupai tanduk kerbau. Arsitekturnya mencerminkan sistem matrilineal masyarakat Minangkabau.', 'Rumah Gadang adalah simbol dari sistem kekerabatan matrilineal, di mana garis keturunan berasal dari pihak ibu. Rumah ini adalah milik kaum perempuan dan diwariskan secara turun temurun.', 'Bukittinggi, Sumatera Barat', 'Sumatera Barat', 'Bukittinggi', -0.3097, 100.3693, 0, 'published', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763967321522-vdlrxby62m.webp', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255841.77835087282!2d100.369!3d-0.309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b8c3c3c3c3c3%3A0x1234567890abcdef!2sBukittinggi!5e0!3m2!1sen!2sid!4v1234567890123', '2025-11-22 05:40:05.036', '2025-11-24 07:05:40.490', 4, NULL),
(5, 'Angklung', 'angklung', 'Harmoni Bambu dari Tanah Sunda', 'Angklung adalah alat musik multitonal tradisional yang terbuat dari bambu, dimainkan dengan cara digoyangkan.', 'Angklung telah dikenal sejak zaman Kerajaan Sunda (abad ke-11 hingga ke-16 Masehi). Alat musik ini awalnya digunakan dalam upacara-upacara adat dan ritual keagamaan. Kemudian, angklung berkembang menjadi alat musik populer yang dimainkan dalam berbagai acara kesenian dan hiburan.', 'Angklung melambangkan kebersamaan, harmoni, dan kerja sama. Bunyi yang dihasilkan oleh angklung hanya dapat tercapai jika dimainkan bersama-sama oleh beberapa orang, yang mencerminkan pentingnya persatuan dan kesatuan dalam masyarakat.', 'Bandung, Jawa Barat', 'Jawa Barat', 'Bandung', -6.9147, 107.6098, 0, 'published', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1764079191396-1wl4yol9884.jpg', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d107.57311744335938!3d-6.903444400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477f%3A0x146a1f93d3e815b2!2sBandung!5e0!3m2!1sen!2sid!4v1234567890123', '2025-11-22 05:40:05.036', '2025-11-25 13:59:56.741', 2, NULL),
(6, 'Rendang', 'rendang', 'Makanan Terenak di Dunia', 'Rendang adalah masakan daging bercita rasa pedas yang menggunakan campuran berbagai bumbu dan rempah-rempah khas Minangkabau.', 'Rendang telah dinobatkan sebagai hidangan paling enak di dunia versi CNN International pada tahun 2011. Proses memasak rendang memakan waktu berjam-jam.', 'Rendang melambangkan kearifan dan kesabaran masyarakat Minangkabau dalam mengolah makanan dengan sempurna melalui proses yang panjang.', 'Padang, Sumatera Barat', 'Sumatera Barat', 'Padang', -0.9471, 100.4172, 0, 'published', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763967275155-mvlzreea12f.webp', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127748.4334826047!2d100.3507805!3d-0.9470832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b944f0a0a1b1%3A0xf0db0d7a3f6b6b6!2sPadang!5e0!3m2!1sen!2sid!4v1234567890123', '2025-11-22 05:40:05.036', '2025-11-24 06:54:36.729', 5, NULL),
(7, 'Keris', 'keris', 'Senjata Pusaka Penuh Makna', 'Keris adalah senjata tikam khas Indonesia yang memiliki corak dan bentuk yang unik dengan banyak variasi pamor.', 'Keris bukan hanya senjata, tetapi juga merupakan benda pusaka yang dipercaya memiliki kekuatan spiritual. Telah diakui UNESCO sebagai warisan budaya tak benda.', 'Keris melambangkan kekuatan, kejantanan, dan status sosial pemiliknya. Setiap pamor dan lekukan memiliki makna filosofis tersendiri.', 'Surakarta, Jawa Tengah', 'Jawa Tengah', 'Surakarta', -7.5755, 110.8243, 0, 'published', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763967099174-jamx0ov4fec.webp', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126406.82523866256!2d110.7500415!3d-7.5755495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a16627a8930d1%3A0x16c4283d6a20d80!2sSurakarta!5e0!3m2!1sen!2sid!4v1234567890123', '2025-11-22 05:40:05.036', '2025-11-24 06:51:41.118', 8, NULL),
(8, 'Wayang Kulit', 'wayang-kulit', 'Pertunjukan Bayangan Penuh Filosofi', 'Wayang kulit adalah seni pertunjukan asli Indonesia yang melibatkan boneka kulit yang diproyeksikan pada layar.', 'Wayang kulit telah diakui UNESCO sebagai Masterpiece of Oral and Intangible Heritage of Humanity. Pertunjukan ini biasanya menceritakan kisah dari epos Ramayana dan Mahabharata.', 'Wayang kulit mengandung filosofi kehidupan yang mendalam, mengajarkan tentang kebaikan, kejahatan, dan karma dalam kehidupan manusia.', 'Yogyakarta, DI Yogyakarta', 'DI Yogyakarta', 'Yogyakarta', -7.7956, 110.3695, 0, 'published', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763967190562-iazwjvyauwn.webp', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126142.77835087282!2d110.369!3d-7.795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5787bd5b6b45%3A0x21723fd4d3b2d63!2sYogyakarta!5e0!3m2!1sen!2sid!4v1234567890123', '2025-11-22 05:40:05.036', '2025-11-24 06:53:12.064', 6, NULL),
(29, 'Batik Buketan', 'batik-buketan', 'Keindahan motif tumbuhan yang memukau', 'Batik Buketan adalah motif batik yang menampilkan rangkaian bunga dan tumbuhan, sering dikombinasikan dengan burung atau kupu-kupu. Motif ini berasal dari Pekalongan, Jawa Tengah, dan dipengaruhi oleh budaya Eropa dan Tiongkok.', 'Batik Buketan muncul pada abad ke-19 di pesisir utara Jawa, khususnya Pekalongan. Pengaruh budaya Eropa terlihat dari motif bunga-bunga seperti tulip dan mawar, sedangkan pengaruh Tiongkok tampak pada penggunaan warna-warna cerah dan motif burung phoenix. Proses pembuatannya menggunakan teknik cap dan tulis.', 'Motif Buketan melambangkan keindahan alam, kesuburan, dan kebahagiaan. Rangkaian bunga yang beragam mencerminkan keberagaman budaya dan harmoni dalam kehidupan.', 'Pekalongan, Jawa Tengah', 'Jawa Tengah', 'Pekalongan', -6.8842, 109.6751, 0, 'published', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/scans/batik-buketan-1764250152439.jpg', 'https://www.google.com/maps?q=Pekalongan%2C%20Jawa%20Tengah&output=embed', '2025-11-26 07:44:50.492', '2025-11-27 13:29:15.282', 7, NULL),
(30, 'Batik Ceplok', 'batik-ceplok', 'Motif Klasik Keharmonisan Alam', 'Batik Ceplok adalah motif batik tradisional yang terdiri dari pola-pola geometris berulang. Motif ini sering dijumpai dalam batik klasik dan memiliki berbagai variasi.', 'Motif Ceplok merupakan salah satu motif dasar batik yang telah lama dikenal di Jawa, khususnya Yogyakarta dan Solo. Motif ini biasanya disusun dari bentuk-bentuk geometris seperti lingkaran, kotak, atau bintang yang diulang secara teratur. Variasi motif Ceplok sangat beragam, setiap daerah atau pengrajin mungkin memiliki interpretasi yang berbeda terhadap motif dasar ini.', 'Motif Ceplok seringkali melambangkan keharmonisan, keteraturan, dan kesuburan. Pola yang berulang menunjukkan siklus alam yang terus berputar dan saling terkait. Motif ini juga dianggap sebagai simbol keberuntungan dan kesejahteraan.', 'Yogyakarta, Daerah Istimewa Yogyakarta', 'Daerah Istimewa Yogyakarta', 'Yogyakarta', -7.8014, 110.3647, 0, 'published', 'http://telusurkultur.com/cdn/shop/articles/Cover_Blog_Dienvibi_-_2024-01-31T232608.124.jpg?v=1706718981', 'https://www.google.com/maps?q=Yogyakarta%2C%20Daerah%20Istimewa%20Yogyakarta&output=embed', '2025-11-26 15:23:11.263', '2025-11-26 15:23:11.263', 7, NULL),
(31, 'Tari Lahbako Jember', 'tari-lahbako-jember', 'Ekspresi Seni dan Budaya Jember', 'Tari Lahbako adalah tarian tradisional yang berasal dari Kabupaten Jember, Jawa Timur. Tarian ini menggambarkan kehidupan petani tembakau, salah satu komoditas utama daerah tersebut.', 'Tari Lahbako diciptakan untuk menghormati para petani tembakau dan mengungkapkan rasa syukur atas hasil panen yang melimpah. Gerakan dalam tarian ini meniru aktivitas petani tembakau dari menanam, merawat, hingga memanen. Kostum penari mencerminkan pakaian petani tembakau pada masa lalu.', 'Tari Lahbako mengandung makna kerja keras, gotong royong, dan penghargaan terhadap alam. Tarian ini juga menjadi simbol identitas budaya masyarakat Jember yang erat kaitannya dengan pertanian tembakau.', 'Jember, Jawa Timur', 'Jawa Timur', 'Jember', -8.1675, 113.6942, 0, 'published', 'https://pesantrennuris.net/wp-content/uploads/2019/12/lahbako-640x440.jpg', 'https://www.google.com/maps?q=Jember%2C%20Jawa%20Timur&output=embed', '2025-11-27 05:10:17.690', '2025-11-27 05:10:17.690', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `culture_images`
--

CREATE TABLE `culture_images` (
  `id` int(11) NOT NULL,
  `culture_id` int(11) NOT NULL,
  `image_url` varchar(191) NOT NULL,
  `alt_text` varchar(191) DEFAULT NULL,
  `is_primary` tinyint(1) NOT NULL DEFAULT 0,
  `display_order` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `culture_images`
--

INSERT INTO `culture_images` (`id`, `culture_id`, `image_url`, `alt_text`, `is_primary`, `display_order`, `created_at`) VALUES
(20, 1, 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200', 'Reog Ponorogo Main', 1, 0, '2025-11-24 07:00:19.351'),
(21, 1, 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600', 'Reog Ponorogo 2', 0, 1, '2025-11-24 07:00:19.351'),
(22, 1, 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600', 'Reog Ponorogo 3', 0, 2, '2025-11-24 07:00:19.351'),
(23, 2, 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763967897502-uy6t76q1a2h.webp', 'Tari Saman', 1, 0, '2025-11-24 07:05:03.334'),
(24, 4, 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763967937376-dwjofjn1ikc.webp', 'Rumah Gadang', 1, 0, '2025-11-24 07:05:43.401'),
(26, 3, 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763968028384-r0aglqslio.webp', 'Batik Parang', 1, 0, '2025-11-25 07:43:42.364'),
(27, 5, 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1764079193401-et421sbj2h5.jpg', 'Angklung', 1, 0, '2025-11-25 13:59:59.566'),
(444, 29, 'https://www.batikprabuseno.com/artikel/wp-content/uploads/2024/05/Batik-Buketan-Keindahan-Motif-Bunga-dalam-Seni-Batik-Nusantara.png', 'Referensi Batik Buketan', 0, 0, '2025-11-26 07:44:52.000'),
(445, 29, 'https://www.iwarebatik.org/wp-content/uploads/2019/08/3-1.png', 'Referensi Batik Buketan', 0, 0, '2025-11-26 07:44:53.504'),
(446, 29, 'https://batikbuketan.com/images/buketan/Gambar-Batik-Buketan-Produksi-Nofa.jpg', 'Referensi Batik Buketan', 0, 0, '2025-11-26 07:44:54.511'),
(447, 29, 'https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=2451377292392433432', 'Referensi Batik Buketan', 0, 0, '2025-11-26 07:44:55.513'),
(448, 29, 'https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=2664483585373172053', 'Referensi Batik Buketan', 0, 0, '2025-11-26 07:44:56.516'),
(449, 30, 'http://telusurkultur.com/cdn/shop/articles/Cover_Blog_Dienvibi_-_2024-01-31T232608.124.jpg?v=1706718981', 'Referensi Batik Ceplok', 0, 0, '2025-11-26 15:23:12.669'),
(450, 30, 'http://www.infobatik.com/wp-content/uploads/2019/12/Batik-Indonesia-Solo-Motif-Ceplok-Kawung.jpg', 'Referensi Batik Ceplok', 0, 0, '2025-11-26 15:23:14.303'),
(451, 30, 'https://image.idntimes.com/post/20220907/batik-ceplok-kesatrian-cd05fce426218983e150556b23ad7f49.jpg', 'Referensi Batik Ceplok', 0, 0, '2025-11-26 15:23:15.249'),
(452, 30, 'https://hamzahbatik.co.id/wp-content/uploads/2025/03/bcp-612-batik-yogya-cap-petilan-kawung-hitam-ceplok-kotak-btn.jpg', 'Referensi Batik Ceplok', 0, 0, '2025-11-26 15:23:16.194'),
(453, 30, 'https://pdbifiles.nos.jkt-1.neo.id/files/2019/01/03/roro_ceplok-kasatrian.jpg', 'Referensi Batik Ceplok', 0, 0, '2025-11-26 15:23:17.128'),
(454, 31, 'https://pesantrennuris.net/wp-content/uploads/2019/12/lahbako-640x440.jpg', 'Referensi Tari Lahbako Jember', 0, 0, '2025-11-27 05:10:19.232'),
(455, 31, 'https://sanggarkartikabudaya.com/wp-content/uploads/2023/01/t4r.webp', 'Referensi Tari Lahbako Jember', 0, 0, '2025-11-27 05:10:20.750'),
(456, 31, 'https://assets-a1.kompasiana.com/items/album/2025/05/22/1000137090-682f1c6fc925c40e6933dac2.jpg', 'Referensi Tari Lahbako Jember', 0, 0, '2025-11-27 05:10:21.759'),
(457, 31, 'https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p2/217/2025/04/18/WhatsApp-Image-2017-03-31-at-075043-816x540-3280196204.jpg', 'Referensi Tari Lahbako Jember', 0, 0, '2025-11-27 05:10:22.786'),
(458, 31, 'https://bimamedia-gurusiana.ap-south-1.linodeobjects.com/6800d9089dd7beef27cc9beef66484db/2022/03/07/l-img20220307100738jpg20220307101009.jpeg', 'Referensi Tari Lahbako Jember', 0, 0, '2025-11-27 05:10:23.798');

-- --------------------------------------------------------

--
-- Table structure for table `endangered_reports`
--

CREATE TABLE `endangered_reports` (
  `id` int(11) NOT NULL,
  `culture_name` varchar(191) NOT NULL,
  `threat_type` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(191) NOT NULL,
  `province` varchar(191) DEFAULT NULL,
  `city` varchar(191) DEFAULT NULL,
  `image_url` varchar(191) DEFAULT NULL,
  `reporter_name` varchar(191) DEFAULT NULL,
  `reporter_email` varchar(191) DEFAULT NULL,
  `is_anonymous` tinyint(1) NOT NULL DEFAULT 0,
  `user_id` int(11) DEFAULT NULL,
  `status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `admin_notes` text DEFAULT NULL,
  `reviewed_at` datetime(3) DEFAULT NULL,
  `reviewed_by` int(11) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `endangered_reports`
--

INSERT INTO `endangered_reports` (`id`, `culture_name`, `threat_type`, `description`, `location`, `province`, `city`, `image_url`, `reporter_name`, `reporter_email`, `is_anonymous`, `user_id`, `status`, `admin_notes`, `reviewed_at`, `reviewed_by`, `created_at`, `updated_at`) VALUES
(1, 'Tari Topeng Cirebon', 'Kurangnya Minat', 'Tari Topeng Cirebon mengalami penurunan minat dari generasi muda. Hanya tersisa beberapa sanggar yang masih aktif mengajarkan tarian ini. Regenerasi penari sangat minim dan pertunjukan semakin jarang dilakukan. Perlu upaya pelestarian segera untuk menyelamatkan warisan budaya ini.', 'Cirebon, Jawa Barat', 'Jawa Barat', 'Cirebon', 'https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=800', 'Budi Santoso', 'budi@example.com', 0, NULL, 'approved', NULL, '2024-11-15 00:00:00.000', NULL, '2024-11-10 00:00:00.000', '2025-11-22 05:40:05.120'),
(2, 'Wayang Golek', 'Modernisasi', 'Seni wayang golek mulai tergantikan oleh hiburan modern seperti film dan musik populer. Anak-anak muda lebih tertarik pada gadget daripada seni tradisional. Jumlah dalang muda semakin berkurang dan pertunjukan wayang golek hanya dilakukan pada acara-acara tertentu saja.', 'Bandung, Jawa Barat', 'Jawa Barat', 'Bandung', 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800', NULL, NULL, 1, NULL, 'approved', NULL, '2024-11-18 00:00:00.000', NULL, '2024-11-12 00:00:00.000', '2025-11-22 05:40:05.168'),
(3, 'Reog Ponorogo', 'Tekanan Ekonomi', 'Grup Reog Ponorogo kesulitan mendapatkan dana untuk latihan dan pertunjukan. Kostum dan properti memerlukan biaya perawatan yang tinggi. Banyak pemain yang beralih profesi karena tidak bisa menghidupi keluarga dari seni reog. Perlu dukungan pemerintah dan sponsor untuk keberlanjutan seni ini.', 'Ponorogo, Jawa Timur', 'Jawa Timur', 'Ponorogo', 'https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=800', 'Siti Aminah', 'siti@example.com', 0, NULL, 'approved', NULL, '2024-11-19 00:00:00.000', NULL, '2024-11-14 00:00:00.000', '2025-11-22 05:40:05.172'),
(4, 'Songket Palembang', 'Modernisasi', 'Tenun songket tradisional Palembang terancam oleh masuknya kain songket imitasi dari luar negeri yang lebih murah. Pengrajin songket tradisional semakin berkurang karena proses pembuatan yang lama dan harga jual yang tidak kompetitif. Regenerasi pengrajin sangat minim.', 'Palembang, Sumatera Selatan', 'Sumatera Selatan', 'Palembang', 'https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=800', 'Ahmad Hidayat', 'ahmad@example.com', 0, NULL, 'approved', '', '2025-11-22 14:34:42.344', 1, '2024-11-20 00:00:00.000', '2025-11-22 14:34:42.355'),
(5, 'Tari Tor Tor', 'Urbanisasi', 'Tari Tor Tor dari Sumatera Utara mengalami ancaman karena urbanisasi masyarakat Batak ke kota-kota besar. Anak muda lebih memilih bekerja di kota dan meninggalkan kampung halaman beserta budayanya. Pertunjukan Tor Tor hanya dilakukan pada acara adat tertentu dan semakin jarang dipelajari.', 'Samosir, Sumatera Utara', 'Sumatera Utara', 'Samosir', 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800', NULL, NULL, 1, NULL, 'rejected', 'HOAX', '2025-11-22 14:10:06.540', 1, '2024-11-21 00:00:00.000', '2025-11-22 14:10:06.572'),
(6, 'Batik Pekalongan', 'Tekanan Ekonomi', 'Pengrajin batik tulis Pekalongan mengalami kesulitan bersaing dengan batik printing yang lebih cepat dan murah. Proses pembuatan batik tulis yang memakan waktu hingga berbulan-bulan membuat harga jual tinggi dan kurang diminati pasar. Banyak pengrajin yang beralih ke batik printing atau bahkan menutup usaha.', 'Pekalongan, Jawa Tengah', 'Jawa Tengah', 'Pekalongan', 'https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=800', 'Dewi Lestari', 'dewi@example.com', 0, NULL, 'rejected', 'Laporan kurang detail dan bukti pendukung tidak mencukupi. Mohon lengkapi dengan data lebih spesifik.', '2024-11-19 00:00:00.000', NULL, '2024-11-16 00:00:00.000', '2025-11-22 05:40:05.183');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `long_description` text DEFAULT NULL,
  `thumbnail` varchar(191) DEFAULT NULL,
  `date_start` datetime(3) NOT NULL,
  `date_end` datetime(3) NOT NULL,
  `time_start` varchar(191) DEFAULT NULL,
  `time_end` varchar(191) DEFAULT NULL,
  `location_name` varchar(191) NOT NULL,
  `location_city` varchar(191) NOT NULL,
  `location_province` varchar(191) NOT NULL,
  `location_address` text DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `map_embed_url` text DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `status` enum('available','sold_out','free','cancelled','completed') NOT NULL DEFAULT 'available',
  `organizer` varchar(191) DEFAULT NULL,
  `contact_email` varchar(191) DEFAULT NULL,
  `contact_phone` varchar(191) DEFAULT NULL,
  `website_url` varchar(191) DEFAULT NULL,
  `views` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `slug`, `description`, `long_description`, `thumbnail`, `date_start`, `date_end`, `time_start`, `time_end`, `location_name`, `location_city`, `location_province`, `location_address`, `latitude`, `longitude`, `map_embed_url`, `price`, `status`, `organizer`, `contact_email`, `contact_phone`, `website_url`, `views`, `created_at`, `updated_at`, `category_id`) VALUES
(1, 'Gelar Seni & Pesta Rakyat 2024', 'gelar-seni-pesta-rakyat-2024', 'Sebuah perayaan akbar kekayaan budaya nusantara melalui musik, tari, dan kuliner tradisional.', 'Gelar Seni & Pesta Rakyat 2024 adalah sebuah inisiatif untuk merayakan dan melestarikan warisan budaya Indonesia yang kaya dan beragam. Acara ini akan menjadi panggung bagi para seniman dari berbagai daerah untuk menampilkan keahlian mereka, mulai dari tarian tradisional yang memesona, musik etnik yang menggugah jiwa, hingga pertunjukan wayang yang sarat makna.\n\nPengunjung akan diajak dalam sebuah perjalanan budaya, mencicipi aneka kuliner otentik dari seluruh nusantara, berpartisipasi dalam lokakarya kerajinan tangan, dan menikmati suasana pesta rakyat yang hangat dan meriah. Acara ini bertujuan untuk menginspirasi generasi muda agar lebih mencintai dan bangga akan budayanya sendiri.', 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1600&auto=format&fit=crop&q=80', '2025-12-01 03:00:00.000', '2025-12-02 15:00:00.000', '10:00', '22:00', 'Plaza Tenggara, Gelora Bung Karno', 'Jakarta Pusat', 'DKI Jakarta', 'Jl. Pintu Satu Senayan, Jakarta Pusat 10270', -6.2088, 106.8019, NULL, 50000, 'available', 'Kementerian Pendidikan dan Kebudayaan', NULL, NULL, NULL, 1265, '2025-11-22 05:40:05.104', '2025-11-25 15:02:33.939', 13),
(2, 'Festival Jazz Internasional', 'festival-jazz-internasional', 'Nikmati alunan jazz dari musisi internasional dan lokal terbaik dalam festival musik tahunan yang memukau.', 'Festival Jazz Internasional Jakarta kembali hadir dengan lineup artis internasional dan lokal yang luar biasa. Acara ini menampilkan berbagai genre jazz dari traditional, contemporary, hingga fusion. Pengunjung akan dimanjakan dengan pertunjukan dari musisi jazz ternama dunia serta talenta lokal yang tidak kalah memukau.', 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&auto=format&fit=crop&q=60', '2025-11-29 09:00:00.000', '2025-11-30 16:00:00.000', '16:00', '23:00', 'JIExpo Kemayoran', 'Jakarta Pusat', 'DKI Jakarta', 'Jl. Boulevard Barat Raya No.1, Jakarta Pusat', -6.1477, 106.8464, NULL, 250000, 'available', 'Java Festival Production', NULL, NULL, NULL, 3430, '2025-11-22 05:40:05.109', '2025-11-26 14:41:35.848', 13),
(4, 'Pagelaran Wayang Kulit Semalam Suntuk', 'pagelaran-wayang-kulit-semalam-suntuk', 'Saksikan pertunjukan wayang kulit klasik dengan dalang terkenal dalam acara semalam suntuk yang memukau.', 'Pagelaran wayang kulit semalam suntuk ini menampilkan dalang kondang Ki Manteb Soedharsono yang akan mementaskan lakon Ramayana. Pertunjukan ini dilengkapi dengan gamelan lengkap dan sinden-sinden pilihan. Pengunjung akan diajak menyelami filosofi dan nilai-nilai kehidupan yang terkandung dalam setiap adegan.', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763965786410-k2cpv9la5hd.jpg', '2025-12-07 00:00:00.000', '2025-12-09 00:00:00.000', '20:00', '05:00', 'Pendopo Taman Siswa', 'Yogyakarta', 'DI Yogyakarta', 'Jl. Taman Siswa No.25, Yogyakarta', -7.8014, 110.3691, 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1521.2823208732086!2d110.37700315639742!3d-7.815634168901471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sid!2sid!4v1763965662169!5m2!1sid!2sid', NULL, 'free', 'Yayasan Taman Siswa', 'yayasantaman@gmail.com', '081122223333', 'https://lokallens.site', 4581, '2025-11-22 05:40:05.115', '2025-11-26 14:42:36.114', 14),
(5, 'Pameran Batik Nusantara', 'pameran-batik-nusantara', 'Jelajahi keindahan dan keragaman batik dari seluruh Indonesia dalam pameran batik terbesar tahun ini.', 'Pameran Batik Nusantara menghadirkan koleksi batik dari 34 provinsi di Indonesia. Pengunjung dapat melihat proses pembuatan batik, mengikuti workshop membatik, dan membeli batik langsung dari pengrajin. Pameran ini juga menampilkan fashion show batik modern dan talk show dengan desainer ternama.', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763969813310-9abmsa51fzu.jpg', '2025-12-01 00:00:00.000', '2025-12-03 00:00:00.000', '10:00', '18:00', 'Solo Grand Mall', 'Surakarta', 'Jawa Tengah', 'Jl. Slamet Riyadi No.451, Surakarta', -7.5568, 110.8192, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3759.3860335901677!2d110.8049986747636!3d-7.566245992447808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a142a7f92a58d%3A0x7eafca0e49d351e7!2sNEO%20Solo%20Grand%20Mall!5e1!3m2!1sid!2sid!4v1763969446047!5m2!1sid!2sid', 50000, 'available', 'Dinas Perindustrian dan Perdagangan Kota Solo', 'batik@nusantara.com', '081122223333', 'https://lokallens.site', 890, '2025-11-22 05:40:05.115', '2025-11-24 07:37:03.883', 15),
(7, 'Karnaval Budaya Jakarta', 'karnaval-budaya-jakarta', 'Pawai budaya spektakuler yang menampilkan kostum dan tarian dari berbagai suku di Indonesia.', 'Karnaval Budaya Jakarta adalah pawai tahunan yang menampilkan keberagaman budaya Indonesia. Ribuan peserta dari berbagai komunitas seni dan budaya akan memeriahkan jalanan Jakarta dengan kostum-kostum mewah, tarian energik, dan musik tradisional. Acara ini menjadi simbol persatuan dalam keberagaman.', 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=60', '2025-12-03 00:00:00.000', '2025-12-04 00:00:00.000', '08:00', '16:00', 'Bundaran HI - Monas', 'Jakarta Pusat', 'DKI Jakarta', 'Dari Bundaran HI hingga Monas', -6.1951, 106.8229, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.259353162852!2d106.82049517475035!3d-6.194985093792687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5561518a139%3A0x2911f3a14f98eea7!2sBundaran%20HI!5e1!3m2!1sid!2sid!4v1763970126127!5m2!1sid!2sid', NULL, 'free', 'Pemerintah Provinsi DKI Jakarta', 'jakarta@gmail.com', '081122223333', 'https://lokallens.site', 8903, '2025-11-22 05:40:05.115', '2025-11-24 07:46:22.330', 13),
(10, 'Festival Tari Topeng Nusantara', 'festival-tari-topeng-nusantara', 'Parade tari topeng dari Cirebon, Malang, hingga Bali.', 'Eksplorasi karakter manusia melalui topeng. Menampilkan maestro tari topeng dari berbagai daerah di Indonesia dalam satu panggung megah.', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763967556904-tj9jhxzda3.webp', '2025-11-28 00:00:00.000', '2025-12-01 00:00:00.000', '18:00', '22:00', 'Taman Ismail Marzuki', 'Jakarta Pusat', 'DKI Jakarta', 'Jl. Cikini Raya No.73, Menteng, Jakarta Pusat', -6.1907, 106.8391, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1089.5408135493244!2d106.83797189126366!3d-6.190074754160158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f51f0ca6b0eb%3A0xe5788342658120f1!2sTaman%20Ismail%20Marzuki%20(TIM)!5e1!3m2!1sid!2sid!4v1763967581394!5m2!1sid!2sid', 75000, 'available', 'Dewan Kesenian Jakarta', 'info@tim.or.id', '02131937325', 'https://tamanismailmarzuki.id', 5, '2025-11-24 06:59:24.742', '2025-12-01 04:43:28.752', 13),
(11, 'Jember Fashion Carnival', 'jember-fashion-carnival', 'Karnaval busana jalanan spektakuler dengan catwalk terpanjang di dunia.', 'Saksikan kemegahan kostum-kostum kreatif karya anak bangsa yang berparade sepanjang 3,6 KM. JFC telah diakui dunia sebagai salah satu karnaval fashion terbaik, menampilkan defile tematik yang menggabungkan seni, budaya, dan inovasi.', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763969344991-f6yaazydzwo.webp', '2025-11-29 00:00:00.000', '2025-11-30 00:00:00.000', '13:00', '18:00', 'Central Park (Alun-Alun Jember)', 'Jember', 'Jawa Timur', 'Jl. Sudarman No.1, Kp. Using, Jemberlor, Kec. Patrang, Kabupaten Jember', -8.1724, 113.7007, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.424133!2d113.7007!3d-8.1724', 250000, 'available', 'Yayasan Jember Fashion Carnaval', 'info@jemberfashioncarnaval.com', '0331421234', 'https://jemberfashioncarnaval.com', 1, '2025-11-24 07:29:16.672', '2025-11-26 01:11:32.243', 13);

-- --------------------------------------------------------

--
-- Table structure for table `event_galleries`
--

CREATE TABLE `event_galleries` (
  `id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `image_url` varchar(191) NOT NULL,
  `alt_text` varchar(191) NOT NULL,
  `order_number` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `event_galleries`
--

INSERT INTO `event_galleries` (`id`, `event_id`, `image_url`, `alt_text`, `order_number`, `created_at`) VALUES
(1, 1, 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500&auto=format&fit=crop&q=80', 'Suasana panggung utama Gelar Seni.', 1, '2025-11-22 05:40:05.104'),
(2, 1, 'https://images.unsplash.com/photo-1555400082-8a2583bf4a1f?w=500&auto=format&fit=crop&q=80', 'Penampilan Sanggar Tari Ayodya Pala.', 2, '2025-11-22 05:40:05.104'),
(3, 1, 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&auto=format&fit=crop&q=80', 'I Wayan Sadra bersama gamelannya.', 3, '2025-11-22 05:40:05.104'),
(4, 1, 'https://images.unsplash.com/photo-1547153760-18fc9498a7e6?w=500&auto=format&fit=crop&q=80', 'Eko Supriyanto saat menari.', 4, '2025-11-22 05:40:05.104'),
(5, 1, 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=500&auto=format&fit=crop&q=80', 'Atribut panggung Didi Kempot Legacy.', 5, '2025-11-22 05:40:05.104'),
(6, 2, 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&auto=format&fit=crop&q=80', 'Panggung utama Festival Jazz.', 1, '2025-11-22 05:40:05.109'),
(7, 2, 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=500&auto=format&fit=crop&q=80', 'Joey Alexander tampil memukau.', 2, '2025-11-22 05:40:05.109'),
(26, 4, 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763965789804-mkek59zav7i.jpg', 'Pagelaran Wayang Kulit Semalam Suntuk', 0, '2025-11-24 06:30:00.129'),
(27, 4, 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763965790074-9emgia1ryvk.jpg', 'Pagelaran Wayang Kulit Semalam Suntuk', 1, '2025-11-24 06:30:00.129'),
(31, 10, 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763967559308-vep5ak7auxd.jpg', 'Festival Tari Topeng Nusantara', 0, '2025-11-24 07:02:22.268'),
(32, 10, 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763967558422-sjbv1nk90se.jpg', 'Festival Tari Topeng Nusantara', 1, '2025-11-24 07:02:22.268'),
(33, 10, 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763967558723-vsujzkiv3ng.webp', 'Festival Tari Topeng Nusantara', 2, '2025-11-24 07:02:22.268'),
(34, 11, 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763969347813-fyxt4gljllq.jpg', 'Jember Fashion Carnival', 0, '2025-11-24 07:29:16.672'),
(35, 11, 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763969348509-p9u3ti7wj4.webp', 'Jember Fashion Carnival', 1, '2025-11-24 07:29:16.672'),
(36, 11, 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763969348534-e2ki31jf2ga.jpg', 'Jember Fashion Carnival', 2, '2025-11-24 07:29:16.672'),
(37, 5, 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763969817085-bncj66v1s7d.jpg', 'Pameran Batik Nusantara', 0, '2025-11-24 07:37:03.883'),
(38, 5, 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763969816291-xnkt1mk8ht.jpeg', 'Pameran Batik Nusantara', 1, '2025-11-24 07:37:03.883'),
(39, 5, 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763969816506-n5wb00titdf.jpg', 'Pameran Batik Nusantara', 2, '2025-11-24 07:37:03.883');

-- --------------------------------------------------------

--
-- Table structure for table `event_performers`
--

CREATE TABLE `event_performers` (
  `id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `image_url` varchar(191) DEFAULT NULL,
  `order_number` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `event_performers`
--

INSERT INTO `event_performers` (`id`, `event_id`, `name`, `title`, `description`, `image_url`, `order_number`, `created_at`) VALUES
(1, 1, 'Eko Supriyanto', 'Maestro Tari Kontemporer', 'Dikenal dengan karya-karyanya yang mendunia, Eko Supriyanto akan membawakan tarian yang menggabungkan gerak tradisional Jawa dengan sentuhan modern.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80', 1, '2025-11-22 05:40:05.104'),
(2, 1, 'I Wayan Sadra', 'Komponis Gamelan Modern', 'Seorang pionir dalam musik gamelan, I Wayan Sadra akan memimpin orkestra yang menyajikan komposisi inovatif dan memukau.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80', 2, '2025-11-22 05:40:05.104'),
(3, 1, 'Sanggar Tari Ayodya Pala', 'Kolektif Tari Tradisional', 'Grup tari ternama ini akan menampilkan ragam tarian klasik dari berbagai daerah di Indonesia dengan keanggunan dan presisi yang luar biasa.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80', 3, '2025-11-22 05:40:05.104'),
(4, 1, 'Didi Kempot Legacy', 'Tribute Campursari', 'Sebuah persembahan khusus untuk mengenang sang maestro, membawakan lagu-lagu campursari yang tak lekang oleh waktu.', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80', 4, '2025-11-22 05:40:05.104'),
(5, 2, 'Tompi', 'Jazz Vocalist', 'Penyanyi jazz Indonesia yang akan membawakan hits-nya dengan aransemen jazz yang segar.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80', 1, '2025-11-22 05:40:05.109'),
(6, 2, 'Joey Alexander', 'Piano Jazz Prodigy', 'Pianis muda berbakat Indonesia yang telah malang melintang di kancah jazz internasional.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80', 2, '2025-11-22 05:40:05.109'),
(9, 4, 'Budi', 'Pendalang', 'Budi adalah seorang pendalang profesional', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763965794862-9jo4w4tta4f.jpg', 0, '2025-11-24 06:30:00.129'),
(11, 10, 'Sanggar Mimi Rasinah', 'Penari Topeng Cirebon', 'Pewaris sah gaya tari Topeng Cirebon yang mistis dan energik.', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763967562232-z9qmdrq7jec.jpg', 0, '2025-11-24 07:02:22.268'),
(12, 11, 'Budi Setiawan', 'Presiden JFC', 'Penerus visi Dynand Fariz yang terus membawa JFC ke panggung dunia dengan tema-tema global.', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763969352363-cal86kx9gmf.jpg', 0, '2025-11-24 07:29:16.672'),
(13, 5, 'Putri', 'Pembatik', 'Putri adalah seorang pembatik professional', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763969820093-rs8tsxk230e.jpg', 0, '2025-11-24 07:37:03.883'),
(14, 7, 'Feast Band', 'Band', 'Feast adalah band terkemuka zaman sekarang', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763970378010-j36v9nmqrm.jpg', 0, '2025-11-24 07:46:22.330');

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `bio` text DEFAULT NULL,
  `avatar` varchar(191) DEFAULT NULL,
  `provinces_visited` int(11) NOT NULL DEFAULT 0,
  `badges_earned` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`id`, `user_id`, `bio`, `avatar`, `provinces_visited`, `badges_earned`, `created_at`, `updated_at`) VALUES
(1, 1, 'Administrator platform Lokal Lens', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80', 34, 8, '2025-11-22 05:40:04.798', '2025-11-22 05:40:04.798'),
(2, 2, 'Kontributor aktif di platform Lokal Lens', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', 5, 3, '2025-11-22 05:40:04.861', '2025-11-22 05:40:04.861'),
(3, 3, 'Petugas pemeliharaan budaya', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80', 10, 5, '2025-11-22 05:40:04.923', '2025-11-22 05:40:04.923'),
(4, 4, 'Pengguna biasa platform Lokal Lens', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', 2, 1, '2025-11-22 05:40:04.983', '2025-11-22 05:40:04.983'),
(5, 5, NULL, 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/avatars/avatar_5_1763912368867.jpeg', 0, 0, '2025-11-23 09:23:27.169', '2025-11-23 15:39:31.342'),
(6, 6, NULL, NULL, 0, 0, '2025-11-23 12:12:06.561', '2025-11-23 12:12:06.561'),
(7, 7, NULL, NULL, 0, 0, '2025-11-23 13:35:49.911', '2025-11-23 13:35:49.911'),
(8, 8, NULL, NULL, 0, 0, '2025-11-25 22:19:16.397', '2025-11-25 22:19:16.397');

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `thumbnail` varchar(191) DEFAULT NULL,
  `difficulty` enum('easy','medium','hard') NOT NULL DEFAULT 'medium',
  `time_limit` int(11) DEFAULT NULL,
  `total_questions` int(11) NOT NULL DEFAULT 0,
  `status` enum('draft','published','archive') NOT NULL DEFAULT 'draft',
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `rejection_reason` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `quizzes`
--

INSERT INTO `quizzes` (`id`, `title`, `slug`, `description`, `thumbnail`, `difficulty`, `time_limit`, `total_questions`, `status`, `created_at`, `updated_at`, `category_id`, `rejection_reason`) VALUES
(1, 'Jelajah Candi Nusantara', 'jelajah-candi-nusantara', 'Seberapa jauh pengetahuanmu tentang candi-candi megah yang tersebar di seluruh Indonesia?', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763986575514-hjcbrls1dn.jpg', 'medium', NULL, 10, 'published', '2025-11-22 05:40:05.053', '2025-11-24 12:16:20.460', 4, NULL),
(5, 'Mengenal Batik Nusantara', 'mengenal-batik-nusantara', 'Uji pengetahuan anda mengenai batik Nusantara', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1763989635686-jqe5nszjra.jpg', 'medium', NULL, 10, 'published', '2025-11-24 13:07:20.621', '2025-11-24 13:09:51.042', 3, NULL),
(6, 'Cita Rasa Kuliner Nusantara', 'cita-rasa-kuliner-nusantara', 'Petualangan rasa menebak asal-usul dan bahan utama makanan khas Indonesia.', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1764134617702-zgt3liom9d.jpeg', 'easy', NULL, 5, 'published', '2025-11-26 05:22:45.142', '2025-11-26 05:23:41.950', 5, NULL),
(7, 'Alunan Musik & Tarian Nusantara', 'alunan-musik-tarian-nusantara', 'Tes pengetahuanmu tentang seni pertunjukan tradisional dari Sabang sampai Merauke.', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1764135365976-uyfiqfzmquf.jpeg', 'medium', NULL, 5, 'published', '2025-11-26 05:33:01.394', '2025-11-26 05:36:10.469', 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `quiz_answers`
--

CREATE TABLE `quiz_answers` (
  `id` int(11) NOT NULL,
  `attempt_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `option_id` int(11) NOT NULL,
  `is_correct` tinyint(1) NOT NULL DEFAULT 0,
  `answered_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `quiz_answers`
--

INSERT INTO `quiz_answers` (`id`, `attempt_id`, `question_id`, `option_id`, `is_correct`, `answered_at`) VALUES
(57, 18, 34, 133, 0, '2025-11-25 16:21:59.838'),
(58, 19, 54, 213, 0, '2025-11-25 17:03:18.731'),
(59, 19, 55, 220, 0, '2025-11-25 17:04:41.299'),
(60, 19, 56, 221, 1, '2025-11-25 17:05:14.994'),
(61, 19, 57, 225, 0, '2025-11-25 17:05:58.384'),
(62, 19, 58, 230, 1, '2025-11-25 17:06:11.239'),
(63, 19, 59, 235, 1, '2025-11-25 17:06:33.052'),
(64, 20, 54, 213, 0, '2025-11-25 17:07:16.236'),
(65, 21, 54, 214, 1, '2025-11-25 17:08:46.094'),
(66, 21, 55, 219, 0, '2025-11-25 17:08:56.882'),
(67, 25, 54, 214, 1, '2025-11-25 21:06:31.711'),
(68, 26, 54, 214, 1, '2025-11-25 21:38:49.956'),
(69, 28, 54, 214, 1, '2025-11-26 01:39:57.338'),
(70, 28, 55, 217, 1, '2025-11-26 01:40:09.440'),
(71, 28, 56, 221, 1, '2025-11-26 01:40:18.251'),
(72, 28, 57, 226, 0, '2025-11-26 01:40:30.119'),
(73, 28, 58, 230, 1, '2025-11-26 01:40:39.009'),
(74, 28, 59, 235, 1, '2025-11-26 01:40:50.502'),
(75, 28, 60, 237, 1, '2025-11-26 01:41:01.695'),
(76, 28, 61, 244, 0, '2025-11-26 01:41:13.746'),
(77, 28, 62, 245, 0, '2025-11-26 01:41:24.962'),
(78, 28, 63, 252, 0, '2025-11-26 01:41:37.797'),
(79, 29, 69, 274, 1, '2025-11-26 07:47:01.027'),
(80, 29, 70, 280, 0, '2025-11-26 07:47:29.078'),
(81, 29, 71, 283, 1, '2025-11-26 07:47:45.842'),
(82, 29, 72, 287, 0, '2025-11-26 07:48:20.520'),
(83, 29, 73, 291, 1, '2025-11-26 07:48:48.527'),
(84, 30, 69, 274, 1, '2025-11-26 07:49:47.560'),
(85, 30, 70, 279, 1, '2025-11-26 07:50:26.076'),
(86, 30, 71, 283, 1, '2025-11-26 07:50:39.839'),
(87, 32, 69, 274, 1, '2025-11-26 10:35:05.221'),
(88, 31, 69, 274, 1, '2025-11-26 10:35:06.210'),
(89, 31, 70, 277, 0, '2025-11-26 10:35:17.641'),
(90, 32, 70, 279, 1, '2025-11-26 10:35:18.658'),
(91, 31, 71, 283, 1, '2025-11-26 10:35:28.363'),
(92, 32, 71, 283, 1, '2025-11-26 10:35:29.389'),
(93, 31, 72, 287, 0, '2025-11-26 10:35:40.156'),
(94, 32, 72, 286, 1, '2025-11-26 10:35:41.403'),
(95, 32, 73, 291, 1, '2025-11-26 10:35:51.285'),
(96, 31, 73, 291, 1, '2025-11-26 10:35:52.476'),
(97, 33, 69, 274, 1, '2025-11-26 10:41:40.382'),
(98, 33, 70, 279, 1, '2025-11-26 10:41:52.491'),
(99, 33, 71, 283, 1, '2025-11-26 10:42:03.727'),
(100, 33, 72, 286, 1, '2025-11-26 10:42:11.577'),
(101, 33, 73, 291, 1, '2025-11-26 10:42:19.727'),
(102, 34, 69, 276, 0, '2025-11-26 14:47:00.834'),
(103, 34, 70, 279, 1, '2025-11-26 14:47:35.646'),
(104, 34, 71, 283, 1, '2025-11-26 14:47:46.268'),
(105, 34, 72, 285, 0, '2025-11-26 14:47:58.362'),
(106, 34, 73, 291, 1, '2025-11-26 14:48:12.013'),
(107, 35, 79, 314, 1, '2025-11-27 01:16:18.463'),
(108, 35, 80, 320, 1, '2025-11-27 01:16:30.801'),
(109, 35, 81, 323, 1, '2025-11-27 01:16:41.046'),
(110, 35, 82, 326, 1, '2025-11-27 01:16:51.245'),
(111, 35, 83, 330, 1, '2025-11-27 01:16:59.212');

-- --------------------------------------------------------

--
-- Table structure for table `quiz_attempts`
--

CREATE TABLE `quiz_attempts` (
  `id` int(11) NOT NULL,
  `quiz_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `score` int(11) NOT NULL DEFAULT 0,
  `total_points` int(11) NOT NULL DEFAULT 0,
  `correct_answers` int(11) NOT NULL DEFAULT 0,
  `wrong_answers` int(11) NOT NULL DEFAULT 0,
  `percentage` double NOT NULL DEFAULT 0,
  `time_taken` int(11) DEFAULT NULL,
  `completed_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `quiz_attempts`
--

INSERT INTO `quiz_attempts` (`id`, `quiz_id`, `user_id`, `score`, `total_points`, `correct_answers`, `wrong_answers`, `percentage`, `time_taken`, `completed_at`, `created_at`) VALUES
(3, 1, NULL, 0, 1000, 0, 0, 0, NULL, NULL, '2025-11-23 10:11:12.239'),
(4, 1, NULL, 200, 1000, 2, 0, 20, NULL, NULL, '2025-11-23 10:11:12.356'),
(5, 1, NULL, 0, 1000, 0, 0, 0, NULL, NULL, '2025-11-23 10:32:55.833'),
(7, 1, NULL, 1000, 1000, 10, 12, 100, 200, '2025-11-23 12:23:27.516', '2025-11-23 12:20:02.108'),
(8, 1, NULL, 0, 1000, 0, 1, 0, NULL, NULL, '2025-11-23 16:01:57.395'),
(9, 1, NULL, 0, 1000, 0, 0, 0, NULL, NULL, '2025-11-23 16:13:52.084'),
(10, 1, NULL, 0, 1000, 0, 0, 0, NULL, NULL, '2025-11-23 17:31:47.030'),
(11, 1, NULL, 1000, 1000, 10, 0, 100, 76, '2025-11-23 17:33:04.782', '2025-11-23 17:31:47.160'),
(12, 1, NULL, 0, 1000, 0, 0, 0, NULL, NULL, '2025-11-23 17:36:12.232'),
(13, 1, NULL, 0, 1000, 0, 0, 0, NULL, NULL, '2025-11-23 17:36:12.383'),
(14, 1, NULL, 800, 1000, 8, 2, 80, 39, '2025-11-23 17:37:17.406', '2025-11-23 17:36:36.952'),
(15, 1, NULL, 100, 1000, 1, 9, 10, 157, '2025-11-24 01:49:12.709', '2025-11-24 01:46:30.252'),
(16, 1, NULL, 100, 1000, 1, 0, 10, NULL, NULL, '2025-11-24 03:22:08.146'),
(17, 1, NULL, 0, 1000, 0, 0, 0, NULL, NULL, '2025-11-24 10:45:45.145'),
(18, 1, NULL, 0, 1000, 0, 1, 0, NULL, NULL, '2025-11-25 16:21:41.687'),
(19, 5, NULL, 300, 1000, 3, 3, 30, NULL, NULL, '2025-11-25 17:03:02.148'),
(20, 5, NULL, 0, 1000, 0, 1, 0, NULL, NULL, '2025-11-25 17:07:08.005'),
(21, 5, NULL, 100, 1000, 1, 1, 10, NULL, NULL, '2025-11-25 17:08:36.195'),
(22, 5, NULL, 0, 1000, 0, 0, 0, NULL, NULL, '2025-11-25 17:30:31.980'),
(23, 5, NULL, 0, 1000, 0, 0, 0, NULL, NULL, '2025-11-25 17:30:45.530'),
(24, 5, NULL, 0, 1000, 0, 0, 0, NULL, NULL, '2025-11-25 17:44:22.333'),
(25, 5, NULL, 100, 1000, 1, 0, 10, NULL, NULL, '2025-11-25 21:06:15.902'),
(26, 5, NULL, 100, 1000, 1, 0, 10, NULL, NULL, '2025-11-25 21:38:38.221'),
(27, 5, NULL, 0, 1000, 0, 0, 0, NULL, NULL, '2025-11-26 00:39:32.689'),
(28, 5, NULL, 600, 1000, 6, 4, 60, 115, '2025-11-26 01:41:46.896', '2025-11-26 01:39:46.782'),
(29, 6, NULL, 300, 500, 3, 2, 60, 162, '2025-11-26 07:49:04.530', '2025-11-26 07:46:17.514'),
(30, 6, NULL, 300, 500, 3, 0, 60, NULL, NULL, '2025-11-26 07:49:23.295'),
(31, 6, NULL, 300, 500, 3, 2, 60, 66, '2025-11-26 10:36:00.506', '2025-11-26 10:34:47.979'),
(32, 6, NULL, 500, 500, 5, 0, 100, 61, '2025-11-26 10:35:59.564', '2025-11-26 10:34:53.813'),
(33, 6, NULL, 500, 500, 5, 0, 100, 54, '2025-11-26 10:42:29.330', '2025-11-26 10:41:31.091'),
(34, 6, NULL, 300, 500, 3, 2, 60, 95, '2025-11-26 14:48:25.329', '2025-11-26 14:46:46.923'),
(35, 7, NULL, 500, 500, 5, 0, 100, 59, '2025-11-27 01:17:11.567', '2025-11-27 01:16:07.208'),
(36, 7, NULL, 0, 500, 0, 0, 0, NULL, NULL, '2025-12-01 11:59:28.907');

-- --------------------------------------------------------

--
-- Table structure for table `quiz_options`
--

CREATE TABLE `quiz_options` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `option_text` text NOT NULL,
  `is_correct` tinyint(1) NOT NULL DEFAULT 0,
  `order_number` int(11) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `quiz_options`
--

INSERT INTO `quiz_options` (`id`, `question_id`, `option_text`, `is_correct`, `order_number`, `created_at`) VALUES
(133, 34, 'Candi Borobudur', 0, 1, '2025-11-24 12:16:20.460'),
(134, 34, 'Candi Prambanan', 1, 2, '2025-11-24 12:16:20.460'),
(135, 34, 'Candi Sewu', 0, 3, '2025-11-24 12:16:20.460'),
(136, 34, 'Candi Plaosan', 0, 4, '2025-11-24 12:16:20.460'),
(137, 35, 'Candi Borobudur', 1, 1, '2025-11-24 12:16:20.460'),
(138, 35, 'Candi Mendut', 0, 2, '2025-11-24 12:16:20.460'),
(139, 35, 'Candi Pawon', 0, 3, '2025-11-24 12:16:20.460'),
(140, 35, 'Candi Kalasan', 0, 4, '2025-11-24 12:16:20.460'),
(141, 36, 'Gunadharma', 1, 1, '2025-11-24 12:16:20.460'),
(142, 36, 'Empu Sindok', 0, 2, '2025-11-24 12:16:20.460'),
(143, 36, 'Mpu Prapanca', 0, 3, '2025-11-24 12:16:20.460'),
(144, 36, 'Rakai Panangkaran', 0, 4, '2025-11-24 12:16:20.460'),
(145, 37, 'Abad ke-7', 0, 1, '2025-11-24 12:16:20.460'),
(146, 37, 'Abad ke-8', 0, 2, '2025-11-24 12:16:20.460'),
(147, 37, 'Abad ke-9', 1, 3, '2025-11-24 12:16:20.460'),
(148, 37, 'Abad ke-10', 0, 4, '2025-11-24 12:16:20.460'),
(149, 38, '504 stupa', 0, 1, '2025-11-24 12:16:20.460'),
(150, 38, '72 stupa', 1, 2, '2025-11-24 12:16:20.460'),
(151, 38, '108 stupa', 0, 3, '2025-11-24 12:16:20.460'),
(152, 38, '360 stupa', 0, 4, '2025-11-24 12:16:20.460'),
(153, 39, 'Candi Penataran', 0, 1, '2025-11-24 12:16:20.460'),
(154, 39, 'Candi Singosari', 1, 2, '2025-11-24 12:16:20.460'),
(155, 39, 'Candi Jago', 0, 3, '2025-11-24 12:16:20.460'),
(156, 39, 'Candi Kidal', 0, 4, '2025-11-24 12:16:20.460'),
(157, 40, 'Istana Raja', 0, 1, '2025-11-24 12:16:20.460'),
(158, 40, 'Tempat ibadah dan ziarah', 1, 2, '2025-11-24 12:16:20.460'),
(159, 40, 'Makam kerajaan', 0, 3, '2025-11-24 12:16:20.460'),
(160, 40, 'Benteng pertahanan', 0, 4, '2025-11-24 12:16:20.460'),
(161, 41, 'Candi Borobudur', 0, 1, '2025-11-24 12:16:20.460'),
(162, 41, 'Candi Prambanan', 1, 2, '2025-11-24 12:16:20.460'),
(163, 41, 'Candi Sewu', 0, 3, '2025-11-24 12:16:20.460'),
(164, 41, 'Candi Mendut', 0, 4, '2025-11-24 12:16:20.460'),
(165, 42, '1982', 0, 1, '2025-11-24 12:16:20.460'),
(166, 42, '1991', 1, 2, '2025-11-24 12:16:20.460'),
(167, 42, '2000', 0, 3, '2025-11-24 12:16:20.460'),
(168, 42, '2010', 0, 4, '2025-11-24 12:16:20.460'),
(169, 43, 'Candi Borobudur dan Mendut', 0, 1, '2025-11-24 12:16:20.460'),
(170, 43, 'Candi Sewu dan Plaosan', 1, 2, '2025-11-24 12:16:20.460'),
(171, 43, 'Candi Singosari dan Penataran', 0, 3, '2025-11-24 12:16:20.460'),
(172, 43, 'Candi Kalasan dan Sari', 0, 4, '2025-11-24 12:16:20.460'),
(213, 54, 'Pekalongan', 0, 1, '2025-11-24 13:09:51.042'),
(214, 54, 'Solo', 1, 2, '2025-11-24 13:09:51.042'),
(215, 54, 'Tasikmalaya', 0, 3, '2025-11-24 13:09:51.042'),
(216, 54, 'Madura', 0, 4, '2025-11-24 13:09:51.042'),
(217, 55, 'Cirebon', 1, 1, '2025-11-24 13:09:51.042'),
(218, 55, 'Bandung', 0, 2, '2025-11-24 13:09:51.042'),
(219, 55, 'Rembang', 0, 3, '2025-11-24 13:09:51.042'),
(220, 55, 'Kudus', 0, 4, '2025-11-24 13:09:51.042'),
(221, 56, 'Canting', 1, 1, '2025-11-24 13:09:51.042'),
(222, 56, 'Palu', 0, 2, '2025-11-24 13:09:51.042'),
(223, 56, 'Sikat', 0, 3, '2025-11-24 13:09:51.042'),
(224, 56, 'Caping', 0, 4, '2025-11-24 13:09:51.042'),
(225, 57, 'Motifnya tegas dan gelap', 0, 1, '2025-11-24 13:09:51.042'),
(226, 57, 'Dominan warna merah', 0, 2, '2025-11-24 13:09:51.042'),
(227, 57, 'Warna cerah dan banyak pengaruh budaya Tionghoa', 1, 3, '2025-11-24 13:09:51.042'),
(228, 57, 'Motif penuh garis hitam', 0, 4, '2025-11-24 13:09:51.042'),
(229, 58, 'Hujan berkah', 0, 1, '2025-11-24 13:09:51.042'),
(230, 58, 'Kekuatan, keberanian, dan kesinambungan', 1, 2, '2025-11-24 13:09:51.042'),
(231, 58, 'Kesedihan dan kehilangan', 0, 3, '2025-11-24 13:09:51.042'),
(232, 58, 'Kebahagiaan rumah tangga', 0, 4, '2025-11-24 13:09:51.042'),
(233, 59, 'Batik tulis dibuat dengan mesin', 0, 1, '2025-11-24 13:09:51.042'),
(234, 59, 'Batik cap motifnya random', 0, 2, '2025-11-24 13:09:51.042'),
(235, 59, 'Batik tulis digambar manual pakai canting', 1, 3, '2025-11-24 13:09:51.042'),
(236, 59, 'Batik cap lebih mahal', 0, 4, '2025-11-24 13:09:51.042'),
(237, 60, 'Burung cendrawasih dan ukiran suku', 1, 1, '2025-11-24 13:09:51.042'),
(238, 60, 'Keris dan wayang', 0, 2, '2025-11-24 13:09:51.042'),
(239, 60, 'Tumbuhan pegunungan', 0, 3, '2025-11-24 13:09:51.042'),
(240, 60, 'Gelombang laut saja', 0, 4, '2025-11-24 13:09:51.042'),
(241, 61, '17 Agustus', 0, 1, '2025-11-24 13:09:51.042'),
(242, 61, '2 Oktober', 1, 2, '2025-11-24 13:09:51.042'),
(243, 61, '21 April', 0, 3, '2025-11-24 13:09:51.042'),
(244, 61, '10 November', 0, 4, '2025-11-24 13:09:51.042'),
(245, 62, 'Daun kelapa', 0, 1, '2025-11-24 13:09:51.042'),
(246, 62, 'Bunga teratai', 0, 2, '2025-11-24 13:09:51.042'),
(247, 62, 'Buah aren', 1, 3, '2025-11-24 13:09:51.042'),
(248, 62, 'Air beriak', 0, 4, '2025-11-24 13:09:51.042'),
(249, 63, 'Warna pastel lembut', 0, 1, '2025-11-24 13:09:51.042'),
(250, 63, 'Warna kuat dan kontras', 1, 2, '2025-11-24 13:09:51.042'),
(251, 63, 'Motif awan minimalis', 0, 3, '2025-11-24 13:09:51.042'),
(252, 63, 'Dominan warna biru navy', 0, 4, '2025-11-24 13:09:51.042'),
(273, 69, 'Pempek', 0, 1, '2025-11-26 05:23:41.950'),
(274, 69, 'Rendang', 1, 2, '2025-11-26 05:23:41.950'),
(275, 69, 'Gudeg', 0, 3, '2025-11-26 05:23:41.950'),
(276, 69, 'Sate Padang', 0, 4, '2025-11-26 05:23:41.950'),
(277, 70, 'Rebung', 0, 1, '2025-11-26 05:23:41.950'),
(278, 70, 'Singkong', 0, 2, '2025-11-26 05:23:41.950'),
(279, 70, 'Nangka Muda', 1, 3, '2025-11-26 05:23:41.950'),
(280, 70, 'Pepaya Muda', 0, 4, '2025-11-26 05:23:41.950'),
(281, 71, 'Tepung Beras', 0, 1, '2025-11-26 05:23:41.950'),
(282, 71, 'Jagung', 0, 2, '2025-11-26 05:23:41.950'),
(283, 71, 'Sagu', 1, 3, '2025-11-26 05:23:41.950'),
(284, 71, 'Ubi Jalar', 0, 4, '2025-11-26 05:23:41.950'),
(285, 72, 'Kalimantan Barat', 0, 1, '2025-11-26 05:23:41.950'),
(286, 72, 'Kalimantan Selatan', 1, 2, '2025-11-26 05:23:41.950'),
(287, 72, 'Kalimantan Timur', 0, 3, '2025-11-26 05:23:41.950'),
(288, 72, 'Sulawesi Utara', 0, 4, '2025-11-26 05:23:41.950'),
(289, 73, 'Sambal Terasi', 0, 1, '2025-11-26 05:23:41.950'),
(290, 73, 'Sambal Dabu-dabu', 0, 2, '2025-11-26 05:23:41.950'),
(291, 73, 'Sambal Matah', 1, 3, '2025-11-26 05:23:41.950'),
(292, 73, 'Sambal Ijo', 0, 4, '2025-11-26 05:23:41.950'),
(313, 79, 'Kecapi', 0, 1, '2025-11-26 05:36:10.469'),
(314, 79, 'Sasando', 1, 2, '2025-11-26 05:36:10.469'),
(315, 79, 'Sitar', 0, 3, '2025-11-26 05:36:10.469'),
(316, 79, 'Sampe', 0, 4, '2025-11-26 05:36:10.469'),
(317, 80, 'Tepukan tangan penonton', 0, 1, '2025-11-26 05:36:10.469'),
(318, 80, 'Hentakan kaki ke tanah', 0, 2, '2025-11-26 05:36:10.469'),
(319, 80, 'Paduan suara wanita', 0, 3, '2025-11-26 05:36:10.469'),
(320, 80, 'Teriakan mulut penari', 1, 4, '2025-11-26 05:36:10.469'),
(321, 81, 'Kayu Jati', 0, 1, '2025-11-26 05:36:10.469'),
(322, 81, 'Rotan', 0, 2, '2025-11-26 05:36:10.469'),
(323, 81, 'Bambu', 1, 3, '2025-11-26 05:36:10.469'),
(324, 81, 'Logam Kuningan', 0, 4, '2025-11-26 05:36:10.469'),
(325, 82, 'Sumatera Barat', 0, 1, '2025-11-26 05:36:10.469'),
(326, 82, 'Aceh', 1, 2, '2025-11-26 05:36:10.469'),
(327, 82, 'Riau', 0, 3, '2025-11-26 05:36:10.469'),
(328, 82, 'Lampung', 0, 4, '2025-11-26 05:36:10.469'),
(329, 83, 'Banyuwangi', 0, 1, '2025-11-26 05:36:10.469'),
(330, 83, 'Ponorogo', 1, 2, '2025-11-26 05:36:10.469'),
(331, 83, 'Kediri', 0, 3, '2025-11-26 05:36:10.469'),
(332, 83, 'Madura', 0, 4, '2025-11-26 05:36:10.469');

-- --------------------------------------------------------

--
-- Table structure for table `quiz_questions`
--

CREATE TABLE `quiz_questions` (
  `id` int(11) NOT NULL,
  `quiz_id` int(11) NOT NULL,
  `question` text NOT NULL,
  `image_url` varchar(191) DEFAULT NULL,
  `explanation` text DEFAULT NULL,
  `order_number` int(11) NOT NULL,
  `points` int(11) NOT NULL DEFAULT 100,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `quiz_questions`
--

INSERT INTO `quiz_questions` (`id`, `quiz_id`, `question`, `image_url`, `explanation`, `order_number`, `points`, `created_at`, `updated_at`) VALUES
(34, 1, 'Candi manakah yang reliefnya menceritakan kisah Ramayana dan Krishnayana?', NULL, 'Jawaban yang tepat. Relief Ramayana di Candi Prambanan terpahat pada dinding pagar langkan Candi Siwa dan Candi Brahma, memberikan narasi visual yang luar biasa.', 1, 100, '2025-11-24 12:16:20.460', '2025-11-24 12:16:20.460'),
(35, 1, 'Candi Buddha terbesar di dunia yang terletak di Magelang adalah...', NULL, 'Candi Borobudur adalah monumen Buddha Mahayana abad ke-9 di Magelang, Jawa Tengah, Indonesia. Monumen ini terdiri atas sembilan teras berundak, enam berbentuk bujur sangkar dan tiga berbentuk bundar, dengan sebuah stupa induk di puncaknya.', 2, 100, '2025-11-24 12:16:20.460', '2025-11-24 12:16:20.460'),
(36, 1, 'Siapakah arsitek yang merancang pembangunan Candi Borobudur?', NULL, 'Gunadharma adalah arsitek legendaris yang dipercaya merancang Candi Borobudur pada masa Dinasti Syailendra.', 3, 100, '2025-11-24 12:16:20.460', '2025-11-24 12:16:20.460'),
(37, 1, 'Candi Prambanan dibangun pada abad ke...', NULL, 'Candi Prambanan dibangun pada abad ke-9 Masehi oleh Rakai Pikatan dari dinasti Sanjaya atau Balitung Maha Sambu.', 4, 100, '2025-11-24 12:16:20.460', '2025-11-24 12:16:20.460'),
(38, 1, 'Berapa jumlah stupa di Candi Borobudur?', NULL, 'Candi Borobudur memiliki 504 arca Buddha dan 72 stupa berlubang yang mengelilingi stupa induk di puncaknya.', 5, 100, '2025-11-24 12:16:20.460', '2025-11-24 12:16:20.460'),
(39, 1, 'Candi yang terletak di Jawa Timur dan merupakan peninggalan Kerajaan Singhasari adalah...', NULL, 'Candi Singosari terletak di Kabupaten Malang, Jawa Timur, dan merupakan peninggalan Kerajaan Singhasari yang didirikan sekitar tahun 1304 M.', 6, 100, '2025-11-24 12:16:20.460', '2025-11-24 12:16:20.460'),
(40, 1, 'Apa fungsi utama Candi Borobudur pada masa dibangun?', NULL, 'Candi Borobudur dibangun sebagai tempat ibadah umat Buddha dan tempat ziarah menuju kesempurnaan spiritual.', 7, 100, '2025-11-24 12:16:20.460', '2025-11-24 12:16:20.460'),
(41, 1, 'Candi yang memiliki relief cerita Ramayana paling lengkap adalah...', NULL, 'Candi Prambanan memiliki relief cerita Ramayana yang sangat lengkap, terpahat di dinding Candi Siwa.', 8, 100, '2025-11-24 12:16:20.460', '2025-11-24 12:16:20.460'),
(42, 1, 'Pada tahun berapa Candi Borobudur ditetapkan sebagai Situs Warisan Dunia UNESCO?', NULL, 'Candi Borobudur ditetapkan sebagai Situs Warisan Dunia UNESCO pada tahun 1991.', 9, 100, '2025-11-24 12:16:20.460', '2025-11-24 12:16:20.460'),
(43, 1, 'Apa nama kompleks candi yang berada di sekitar Candi Prambanan?', NULL, 'Di sekitar Candi Prambanan terdapat kompleks candi lain seperti Candi Sewu, Candi Lumbung, Candi Bubrah, dan Candi Plaosan.', 10, 100, '2025-11-24 12:16:20.460', '2025-11-24 12:16:20.460'),
(54, 5, 'Dari daerah manakah batik yang identik dengan warna sogan (coklat tua keemasan)?', NULL, 'Sogan itu khas keraton. Warnanya kalem, tua, elegan—lahir dari Solo dan Yogyakarta, tapi paling lekat dengan Solo.', 1, 100, '2025-11-24 13:09:51.042', '2025-11-24 13:09:51.042'),
(55, 5, 'Motif batik “Megamendung” berasal dari kota mana?', NULL, 'Megamendung itu ikon batik Cirebon. Motifnya awan bertumpuk kayak hati pas mau ujian.', 2, 100, '2025-11-24 13:09:51.042', '2025-11-24 13:09:51.042'),
(56, 5, 'Teknik dasar pembuatan batik tradisional menggunakan alat…', NULL, 'Canting = senjata andalan tukang batik. Tempat lilin cair yang digores halus, bukan buat masak mie.', 3, 100, '2025-11-24 13:09:51.042', '2025-11-24 13:09:51.042'),
(57, 5, 'Batik khas Pekalongan terkenal karena…', NULL, 'Pekalongan itu “kota batik modern”. Warnanya cerah, luwes, penuh sentuhan luar. Fleksibel banget.', 4, 100, '2025-11-24 13:09:51.042', '2025-11-24 13:09:51.042'),
(58, 5, 'Motif “Parang” menggambarkan filosofi…', NULL, 'Parang itu motif keraton, liat miringnya aja udah kayak langkah hidup yang terus maju.', 5, 100, '2025-11-24 13:09:51.042', '2025-11-24 13:09:51.042'),
(59, 5, 'Batik tulis berbeda dari batik cap karena…', NULL, 'Batik tulis = full manual. Detailnya halus, prosesnya panjang, harganya sesuai usaha.', 6, 100, '2025-11-24 13:09:51.042', '2025-11-24 13:09:51.042'),
(60, 5, 'Batik Papua biasanya menampilkan motif…', NULL, 'Khas Papua: warna kuat, garis tegas, dan simbol budaya seperti cendrawasih atau ukiran.', 7, 100, '2025-11-24 13:09:51.042', '2025-11-24 13:09:51.042'),
(61, 5, 'Hari Batik Nasional diperingati setiap tanggal…', NULL, '2 Oktober, hari ketika batik diakui UNESCO sebagai warisan dunia. Bangga.', 8, 100, '2025-11-24 13:09:51.042', '2025-11-24 13:09:51.042'),
(62, 5, 'Motif “Kawung” terinspirasi dari bentuk…', NULL, 'Kawung itu bentuk irisan buah aren. Simbol kesucian dan pengendalian diri.', 9, 100, '2025-11-24 13:09:51.042', '2025-11-24 13:09:51.042'),
(63, 5, 'Batik Madura dikenal dengan karakter…', NULL, 'Madura nggak main aman. Warnanya berani, ngejreng, kontras. Kayak orangnya: lugas dan tegas.', 10, 100, '2025-11-24 13:09:51.042', '2025-11-24 13:09:51.042'),
(69, 6, 'Makanan khas Sumatera Barat yang dinobatkan sebagai salah satu makanan terenak di dunia adalah...', NULL, 'Rendang adalah olahan daging sapi dengan rempah dan santan yang dimasak lama hingga kering.', 1, 100, '2025-11-26 05:23:41.950', '2025-11-26 05:23:41.950'),
(70, 6, 'Bahan utama pembuatan Gudeg khas Yogyakarta adalah...', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1764134561214-cv1nznt2gng.jpeg', 'Gudeg terbuat dari nangka muda (tewel/gori) yang dimasak dengan santan dan gula merah.', 2, 100, '2025-11-26 05:23:41.950', '2025-11-26 05:23:41.950'),
(71, 6, 'Papeda adalah makanan pokok masyarakat Indonesia Timur yang terbuat dari...', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1764134561224-qcjz4mjhsrj.jpg', 'Papeda memiliki tekstur lengket seperti lem yang terbuat dari pati sagu.', 3, 100, '2025-11-26 05:23:41.950', '2025-11-26 05:23:41.950'),
(72, 6, 'Soto Banjar yang memiliki kuah bening dan harum rempah berasal dari provinsi...', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1764134561478-cz9yuisag9d.jpg', 'Sesuai namanya, Soto Banjar berasal dari Banjarmasin, Kalimantan Selatan.', 4, 100, '2025-11-26 05:23:41.950', '2025-11-26 05:23:41.950'),
(73, 6, 'Sambal khas Bali yang terdiri dari irisan bawang merah, cabai, serai, dan minyak kelapa disebut...', NULL, 'Sambal Matah berarti \'mentah\', karena semua bahannya diiris segar tanpa digerus.', 5, 100, '2025-11-26 05:23:41.950', '2025-11-26 05:23:41.950'),
(79, 7, 'Alat musik petik tradisional yang berasal dari Pulau Rote, Nusa Tenggara Timur, dan memiliki bentuk unik seperti daun lontar adalah...', NULL, 'Sasando adalah alat musik berdawai yang dimainkan dengan cara dipetik, khas dari Rote Ndao.', 1, 100, '2025-11-26 05:36:10.469', '2025-11-26 05:36:10.469'),
(80, 7, 'Tari Kecak dari Bali sangat ikonik karena tidak menggunakan alat musik, melainkan...', 'https://l9fbwpjd1wjrlkzf.public.blob.vercel-storage.com/1764135177985-lkrd1x5ssh.png', 'Musik pengiring Tari Kecak berasal dari teriakan \'cak cak cak\' yang dilakukan oleh puluhan hingga ratusan penari laki-laki.', 2, 100, '2025-11-26 05:36:10.469', '2025-11-26 05:36:10.469'),
(81, 7, 'Angklung adalah alat musik yang diakui UNESCO. Dari bahan apakah Angklung dibuat?', NULL, 'Angklung adalah alat musik multitonal (bernada ganda) yang terbuat dari bambu.', 3, 100, '2025-11-26 05:36:10.469', '2025-11-26 05:36:10.469'),
(82, 7, 'Tari Saman yang terkenal dengan gerakan tangan super cepat dan kekompakan berasal dari daerah...', NULL, 'Tari Saman adalah tarian Suku Gayo dari Aceh yang mengandalkan tepukan tangan dan badan.', 4, 100, '2025-11-26 05:36:10.469', '2025-11-26 05:36:10.469'),
(83, 7, 'Kesenian Reog yang menampilkan topeng kepala singa berhias bulu merak berasal dari...', NULL, 'Reog adalah kesenian tradisional yang berasal dari Ponorogo, Jawa Timur.', 5, 100, '2025-11-26 05:36:10.469', '2025-11-26 05:36:10.469');

-- --------------------------------------------------------

--
-- Table structure for table `scan_history`
--

CREATE TABLE `scan_history` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `culture_id` int(11) DEFAULT NULL,
  `object_name` varchar(191) NOT NULL,
  `object_type` varchar(191) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `location` varchar(191) DEFAULT NULL,
  `province` varchar(191) DEFAULT NULL,
  `accuracy` varchar(191) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image_data` longtext DEFAULT NULL,
  `scan_result` text DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `scan_history`
--

INSERT INTO `scan_history` (`id`, `user_id`, `culture_id`, `object_name`, `object_type`, `category_id`, `location`, `province`, `accuracy`, `description`, `image_data`, `scan_result`, `created_at`) VALUES
(4, NULL, 3, 'Batik Kawung Picis', 'batik', 7, 'Jawa Tengah, Indonesia', 'Indonesia', '90%', 'Gambar ini menampilkan kain dengan motif Batik Kawung. Secara spesifik, motif Kawung ini terlihat merupakan variasi \'Kawung Picis\' yang memiliki bentuk lebih kecil dan rapat dibandingkan Kawung standar. Kawung merupakan motif batik klasik yang berasal dari Jawa Tengah. Motif ini memiliki bentuk menyerupai buah kawung (sejenis aren atau kelapa) yang disusun secara geometris. Filosofi motif Kawung melambangkan kehidupan yang teratur, keadilan, dan kesuburan.', NULL, '{\"name\":\"Batik Kawung Picis\",\"location\":\"Jawa Tengah, Indonesia\",\"accuracy\":\"90%\",\"description\":\"Gambar ini menampilkan kain dengan motif Batik Kawung. Secara spesifik, motif Kawung ini terlihat merupakan variasi \'Kawung Picis\' yang memiliki bentuk lebih kecil dan rapat dibandingkan Kawung standar. Kawung merupakan motif batik klasik yang berasal dari Jawa Tengah. Motif ini memiliki bentuk menyerupai buah kawung (sejenis aren atau kelapa) yang disusun secara geometris. Filosofi motif Kawung melambangkan kehidupan yang teratur, keadilan, dan kesuburan.\",\"rarity\":\"Umum\",\"unesco\":\"Tidak Terdaftar\",\"image\":\"\"}', '2025-11-23 18:43:03.118'),
(5, NULL, NULL, 'Kerudung/Hijab Polos', 'Kerudung/Hijab', NULL, 'Indonesia (umum)', NULL, '75%', 'Kerudung atau hijab polos adalah penutup kepala yang umum digunakan oleh wanita Muslim di Indonesia. Meskipun desainnya sederhana, hijab ini merupakan bagian dari identitas budaya dan agama yang penting. Bahan dan warna yang digunakan bervariasi, mencerminkan preferensi pribadi dan gaya berpakaian yang berbeda-beda. Hijab ini bukan merupakan pakaian adat yang spesifik dari daerah tertentu, melainkan bagian dari pakaian sehari-hari yang dipengaruhi oleh nilai-nilai agama dan budaya.', NULL, '{\"name\":\"Kerudung/Hijab Polos\",\"location\":\"Indonesia (umum)\",\"accuracy\":\"75%\",\"description\":\"Kerudung atau hijab polos adalah penutup kepala yang umum digunakan oleh wanita Muslim di Indonesia. Meskipun desainnya sederhana, hijab ini merupakan bagian dari identitas budaya dan agama yang penting. Bahan dan warna yang digunakan bervariasi, mencerminkan preferensi pribadi dan gaya berpakaian yang berbeda-beda. Hijab ini bukan merupakan pakaian adat yang spesifik dari daerah tertentu, melainkan bagian dari pakaian sehari-hari yang dipengaruhi oleh nilai-nilai agama dan budaya.\",\"rarity\":\"Umum\",\"unesco\":\"Tidak Terdaftar\",\"image\":\"\"}', '2025-11-24 01:50:03.668'),
(7, NULL, 3, 'Kain Batik (Motif Tidak Jelas)', 'batik', 7, 'Indonesia', NULL, '45%', 'Terdapat kain yang digantung di dekat pintu. Kain tersebut kemungkinan adalah kain batik, namun motifnya tidak terlihat jelas karena kualitas gambar yang kurang baik dan kain yang menggantung. Sulit untuk mengidentifikasi motif batik yang spesifik tanpa detail yang lebih jelas. Kain batik secara umum merupakan kain tradisional Indonesia yang dibuat dengan teknik pewarnaan menggunakan lilin malam dan memiliki berbagai motif yang berbeda-beda di setiap daerah.', NULL, '{\"name\":\"Kain Batik (Motif Tidak Jelas)\",\"location\":\"Indonesia\",\"accuracy\":\"45%\",\"description\":\"Terdapat kain yang digantung di dekat pintu. Kain tersebut kemungkinan adalah kain batik, namun motifnya tidak terlihat jelas karena kualitas gambar yang kurang baik dan kain yang menggantung. Sulit untuk mengidentifikasi motif batik yang spesifik tanpa detail yang lebih jelas. Kain batik secara umum merupakan kain tradisional Indonesia yang dibuat dengan teknik pewarnaan menggunakan lilin malam dan memiliki berbagai motif yang berbeda-beda di setiap daerah.\",\"rarity\":\"Umum\",\"unesco\":\"Terdaftar\",\"image\":\"\"}', '2025-11-24 10:43:56.590'),
(8, NULL, 3, 'Batik Latar Gringsing', 'batik', 7, 'Yogyakarta, Indonesia', 'Indonesia', '85%', 'Motif batik ini memiliki latar belakang yang disebut \'gringsing\' yang berarti \'tidak sakit\'. Pola ini dipercaya memiliki kekuatan untuk melindungi pemakainya dari penyakit dan roh jahat. Motifnya rumit, seringkali menampilkan detail seperti sisik ikan atau biji padi, yang melambangkan kesuburan dan keberuntungan. Warna dominan adalah coklat sogan dan putih, menciptakan kontras yang elegan.', NULL, '{\"name\":\"Batik Latar Gringsing\",\"location\":\"Yogyakarta, Indonesia\",\"accuracy\":\"85%\",\"description\":\"Motif batik ini memiliki latar belakang yang disebut \'gringsing\' yang berarti \'tidak sakit\'. Pola ini dipercaya memiliki kekuatan untuk melindungi pemakainya dari penyakit dan roh jahat. Motifnya rumit, seringkali menampilkan detail seperti sisik ikan atau biji padi, yang melambangkan kesuburan dan keberuntungan. Warna dominan adalah coklat sogan dan putih, menciptakan kontras yang elegan.\",\"rarity\":\"Umum\",\"unesco\":\"Tidak Terdaftar\",\"image\":\"\"}', '2025-11-24 10:44:30.429'),
(9, NULL, 3, 'Motif Batik Modern Bunga', 'batik', 7, 'Tidak Diketahui, Indonesia', 'Indonesia', '65%', 'Gambar menunjukkan motif yang menyerupai batik modern dengan ornamen bunga dan elemen ornamen lengkung. Namun, motif ini tidak dapat diidentifikasi dengan pasti sebagai motif batik tradisional dari daerah tertentu di Indonesia. Motif ini kemungkinan besar merupakan variasi modern dari motif tradisional yang telah dimodifikasi atau diadaptasi.', NULL, '{\"name\":\"Motif Batik Modern Bunga\",\"location\":\"Tidak Diketahui, Indonesia\",\"accuracy\":\"65%\",\"description\":\"Gambar menunjukkan motif yang menyerupai batik modern dengan ornamen bunga dan elemen ornamen lengkung. Namun, motif ini tidak dapat diidentifikasi dengan pasti sebagai motif batik tradisional dari daerah tertentu di Indonesia. Motif ini kemungkinan besar merupakan variasi modern dari motif tradisional yang telah dimodifikasi atau diadaptasi.\",\"rarity\":\"Umum\",\"unesco\":\"Tidak Terdaftar\",\"image\":\"\"}', '2025-11-24 10:44:57.779'),
(10, NULL, 5, 'Angklung Jawa Barat', 'angklung', 2, 'Jawa Barat, Indonesia', 'Indonesia', '95%', 'Angklung adalah alat musik tradisional Indonesia yang terbuat dari bambu, berasal dari Jawa Barat. Alat musik ini dimainkan dengan cara digoyangkan sehingga menghasilkan bunyi.', NULL, '{\"name\":\"Angklung Jawa Barat\",\"subtitle\":\"Harmoni Bambu dari Tanah Sunda\",\"location\":\"Jawa Barat, Indonesia\",\"accuracy\":\"95%\",\"description\":\"Angklung adalah alat musik tradisional Indonesia yang terbuat dari bambu, berasal dari Jawa Barat. Alat musik ini dimainkan dengan cara digoyangkan sehingga menghasilkan bunyi.\",\"long_description\":\"Angklung telah dikenal sejak zaman Kerajaan Sunda (abad ke-11 hingga ke-16 Masehi). Alat musik ini awalnya digunakan dalam upacara-upacara adat dan ritual keagamaan. Kemudian, angklung berkembang menjadi alat musik populer yang dimainkan dalam berbagai acara kesenian dan hiburan.\",\"meaning\":\"Angklung melambangkan kebersamaan, harmoni, dan kerja sama. Bunyi yang dihasilkan oleh angklung hanya dapat tercapai jika dimainkan bersama-sama oleh beberapa orang, yang mencerminkan pentingnya persatuan dan kesatuan dalam masyarakat.\",\"rarity\":\"Umum\",\"unesco\":\"Terdaftar\",\"image\":\"\",\"latitude\":-6.9147,\"longitude\":107.6098,\"category_slug\":\"musik\"}', '2025-11-25 12:07:10.363'),
(12, NULL, NULL, 'Celurit Madura Ukir', 'Celurit', 8, 'Madura, Jawa Timur', 'Jawa Timur', '95%', 'Celurit adalah senjata tradisional khas Madura, Jawa Timur, yang berbentuk sabit melengkung. Dalam gambar, terlihat celurit dengan ukiran detail pada bilah dan gagangnya, menandakan nilai seni dan budaya.', NULL, '{\"name\":\"Celurit Madura Ukir\",\"subtitle\":\"Senjata Tradisional dengan Keindahan Ukiran\",\"location\":\"Madura, Jawa Timur\",\"accuracy\":\"95%\",\"description\":\"Celurit adalah senjata tradisional khas Madura, Jawa Timur, yang berbentuk sabit melengkung. Dalam gambar, terlihat celurit dengan ukiran detail pada bilah dan gagangnya, menandakan nilai seni dan budaya.\",\"long_description\":\"Celurit bukan hanya alat pertanian, tetapi juga simbol keberanian dan status sosial di Madura. Ukiran pada celurit seringkali mengandung makna filosofis dan identitas pemiliknya. Celurit telah menjadi bagian tak terpisahkan dari budaya Madura, sering digunakan dalam karapan sapi dan upacara adat.\",\"meaning\":\"Celurit melambangkan kekuatan, keberanian, dan harga diri bagi masyarakat Madura. Ukiran pada celurit juga mencerminkan keindahan dan kreativitas seni masyarakat Madura, serta nilai-nilai luhur yang diwariskan dari generasi ke generasi.\",\"rarity\":\"Umum\",\"unesco\":\"Tidak Terdaftar\",\"image\":\"\",\"latitude\":-7.0333,\"longitude\":113.1333,\"category_slug\":\"senjata\"}', '2025-11-25 13:56:15.295'),
(13, NULL, NULL, 'Candi Borobudur', 'Candi', 4, 'Magelang, Jawa Tengah', 'Jawa Tengah', '95%', 'Candi Borobudur adalah candi Buddha Mahayana abad ke-9 yang terletak di Magelang, Jawa Tengah. Monumen ini merupakan salah satu situs warisan budaya UNESCO dan merupakan salah satu landmark paling ikonik di Indonesia.', NULL, '{\"name\":\"Candi Borobudur\",\"subtitle\":\"Mahakarya Arsitektur Buddha dari Jawa\",\"location\":\"Magelang, Jawa Tengah\",\"accuracy\":\"95%\",\"description\":\"Candi Borobudur adalah candi Buddha Mahayana abad ke-9 yang terletak di Magelang, Jawa Tengah. Monumen ini merupakan salah satu situs warisan budaya UNESCO dan merupakan salah satu landmark paling ikonik di Indonesia.\",\"long_description\":\"Dibangun pada masa pemerintahan Dinasti Syailendra, Borobudur merupakan kompleks candi yang terdiri dari sembilan platform bertumpuk, enam berbentuk persegi dan tiga berbentuk lingkaran, dihiasi dengan 2.672 panel relief dan 504 patung Buddha. Struktur ini mencerminkan konsep kosmologi Buddha, menggambarkan perjalanan spiritual menuju pencerahan.\",\"meaning\":\"Borobudur melambangkan perjalanan spiritual manusia menuju Nirwana. Setiap tingkatan mencerminkan tahap-tahap pencapaian spiritual, mulai dari dunia keinginan (Kamadhatu), dunia bentuk (Rupadhatu), hingga dunia tanpa bentuk (Arupadhatu). Relief-reliefnya mengajarkan tentang hukum karma dan pentingnya kebajikan.\",\"rarity\":\"Sangat Langka\",\"unesco\":\"Terdaftar\",\"image\":\"\",\"latitude\":-7.6079,\"longitude\":110.2038,\"category_slug\":\"arsitektur\"}', '2025-11-25 14:54:09.686'),
(15, NULL, NULL, 'Fahombo Batu Nias', 'Fahombo', 14, 'Nias Selatan, Sumatera Utara', 'Sumatera Utara', '85%', 'Fahombo Batu adalah tradisi lompat batu yang berasal dari suku Nias, Sumatera Utara. Tradisi ini dilakukan oleh para pemuda sebagai bagian dari ritual pendewasaan dan pembuktian kekuatan fisik.', NULL, '{\"name\":\"Fahombo Batu Nias\",\"subtitle\":\"Lompatan keberanian dari Pulau Nias\",\"location\":\"Nias Selatan, Sumatera Utara\",\"accuracy\":\"85%\",\"description\":\"Fahombo Batu adalah tradisi lompat batu yang berasal dari suku Nias, Sumatera Utara. Tradisi ini dilakukan oleh para pemuda sebagai bagian dari ritual pendewasaan dan pembuktian kekuatan fisik.\",\"long_description\":\"Tradisi Fahombo Batu telah ada sejak ratusan tahun lalu dan menjadi bagian penting dari budaya Nias. Dahulu, tradisi ini merupakan simbol keberanian dan kemampuan para pemuda dalam berperang. Batu yang dilompati memiliki tinggi sekitar 2 meter, sehingga membutuhkan keberanian dan teknik khusus untuk melewatinya.\",\"meaning\":\"Fahombo Batu melambangkan keberanian, kekuatan, dan kedewasaan. Tradisi ini juga mengandung nilai-nilai sportivitas, kerja keras, dan gotong royong, serta pengakuan atas kemampuan dan keberanian.\",\"rarity\":\"Umum\",\"unesco\":\"Tidak Terdaftar\",\"image\":\"\",\"latitude\":0.8031,\"longitude\":97.7456,\"category_slug\":\"pertunjukan\"}', '2025-11-25 15:11:24.669'),
(16, NULL, NULL, 'Rumah Gadang Minangkabau', 'rumah adat', 4, 'Sumatera Barat, Indonesia', 'Indonesia', '95%', 'Rumah Gadang adalah rumah adat tradisional Minangkabau yang memiliki ciri khas atap melengkung seperti tanduk kerbau. Rumah ini merupakan simbol identitas dan kebanggaan masyarakat Minangkabau, serta merepresentasikan struktur sosial dan budaya mereka.', NULL, '{\"name\":\"Rumah Gadang Minangkabau\",\"subtitle\":\"Arsitektur Megah dari Ranah Minang\",\"location\":\"Sumatera Barat, Indonesia\",\"accuracy\":\"95%\",\"description\":\"Rumah Gadang adalah rumah adat tradisional Minangkabau yang memiliki ciri khas atap melengkung seperti tanduk kerbau. Rumah ini merupakan simbol identitas dan kebanggaan masyarakat Minangkabau, serta merepresentasikan struktur sosial dan budaya mereka.\",\"long_description\":\"Rumah Gadang bukan hanya sekadar tempat tinggal, tetapi juga pusat kegiatan sosial dan budaya bagi keluarga matrilineal Minangkabau. Arsitekturnya yang unik mencerminkan filosofi hidup masyarakat yang menghargai alam dan adat istiadat. Setiap elemen rumah memiliki makna simbolis yang mendalam, mulai dari jumlah gonjong (ujung atap) hingga ukiran-ukiran yang menghiasi dinding.\",\"meaning\":\"Rumah Gadang melambangkan kekuatan, persatuan, dan kebersamaan keluarga besar Minangkabau. Bentuk atapnya yang melengkung seperti tanduk kerbau mengingatkan pada kemenangan masyarakat Minangkabau dalam perlombaan adu kerbau. Rumah ini juga menjadi simbol penghormatan terhadap perempuan sebagai pewaris garis keturunan dan penjaga nilai-nilai budaya.\",\"rarity\":\"Umum\",\"unesco\":\"Tidak Terdaftar\",\"image\":\"\",\"latitude\":-0.9456,\"longitude\":100.3607,\"category_slug\":\"arsitektur\"}', '2025-11-25 15:39:57.688'),
(17, NULL, NULL, 'Sasando Rote', 'alat musik', 2, 'Pulau Rote, Nusa Tenggara Timur', 'Nusa Tenggara Timur', '95%', 'Sasando adalah alat musik tradisional dawai yang berasal dari Pulau Rote, Nusa Tenggara Timur. Terbuat dari bambu dan daun lontar, menghasilkan suara yang unik dan khas.', NULL, '{\"name\":\"Sasando Rote\",\"subtitle\":\"Gitar Bambu dari Pulau Rote\",\"location\":\"Pulau Rote, Nusa Tenggara Timur\",\"accuracy\":\"95%\",\"description\":\"Sasando adalah alat musik tradisional dawai yang berasal dari Pulau Rote, Nusa Tenggara Timur. Terbuat dari bambu dan daun lontar, menghasilkan suara yang unik dan khas.\",\"long_description\":\"Sasando memiliki sejarah panjang dan erat kaitannya dengan budaya masyarakat Rote. Konon, alat musik ini diciptakan oleh seorang penggembala bernama Sangguana. Sasando biasanya dimainkan dalam berbagai upacara adat, pesta rakyat, dan pertunjukan seni.\",\"meaning\":\"Sasando melambangkan harmoni antara manusia dan alam. Bunyinya yang merdu dipercaya dapat membawa kedamaian dan kebahagiaan. Daun lontar yang digunakan sebagai wadah dawai juga melambangkan kesederhanaan dan kearifan lokal.\",\"rarity\":\"Umum\",\"unesco\":\"Tidak Terdaftar\",\"image\":\"\",\"latitude\":-10.75,\"longitude\":123,\"category_slug\":\"musik\"}', '2025-11-25 15:41:48.714'),
(18, NULL, NULL, 'Tari Gandrung Bali', 'tari', 1, 'Gianyar, Bali', 'Bali', '95%', 'Tari Gandrung adalah seni pertunjukan tradisional Bali yang menampilkan gerakan luwes dan kostum megah. Tarian ini sering dipentaskan dalam upacara adat dan hiburan.', NULL, '{\"name\":\"Tari Gandrung Bali\",\"subtitle\":\"Keindahan gerak dan kostum mempesona\",\"location\":\"Gianyar, Bali\",\"accuracy\":\"95%\",\"description\":\"Tari Gandrung adalah seni pertunjukan tradisional Bali yang menampilkan gerakan luwes dan kostum megah. Tarian ini sering dipentaskan dalam upacara adat dan hiburan.\",\"long_description\":\"Tari Gandrung berasal dari Bali dan telah menjadi bagian penting dari budaya lokal. Tarian ini biasanya dibawakan oleh penari perempuan dengan iringan musik gamelan. Kostum yang dikenakan sangat khas, dengan hiasan kepala dan perhiasan yang indah.\",\"meaning\":\"Tari Gandrung memiliki makna sebagai ungkapan syukur dan kegembiraan. Gerakan tarian yang luwes dan anggun mencerminkan keindahan dan keharmonisan.\",\"rarity\":\"Umum\",\"unesco\":\"Tidak Terdaftar\",\"image\":\"\",\"latitude\":-8.4306,\"longitude\":115.2544,\"category_slug\":\"tarian\"}', '2025-11-25 15:46:47.701'),
(19, NULL, NULL, 'Tari Gandrung Banyuwangi', 'tari', 1, 'Banyuwangi, Jawa Timur', 'Jawa Timur', '95%', 'Tari Gandrung adalah tarian tradisional yang berasal dari Banyuwangi, Jawa Timur. Tarian ini merupakan ungkapan rasa syukur dan kegembiraan masyarakat atas hasil panen.', NULL, '{\"name\":\"Tari Gandrung Banyuwangi\",\"subtitle\":\"Pesona Tari Khas Ujung Timur Jawa\",\"location\":\"Banyuwangi, Jawa Timur\",\"accuracy\":\"95%\",\"description\":\"Tari Gandrung adalah tarian tradisional yang berasal dari Banyuwangi, Jawa Timur. Tarian ini merupakan ungkapan rasa syukur dan kegembiraan masyarakat atas hasil panen.\",\"long_description\":\"Tari Gandrung memiliki sejarah panjang yang terkait dengan ritual kesuburan dan panen. Dahulu, tarian ini ditarikan oleh penari laki-laki yang berdandan seperti perempuan. Seiring waktu, tarian ini berevolusi dan kini ditarikan oleh perempuan. Tari Gandrung menjadi ikon budaya Banyuwangi dan sering ditampilkan dalam berbagai acara dan festival.\",\"meaning\":\"Tari Gandrung mengandung makna kesuburan, keharmonisan, dan keindahan. Gerakan-gerakan dalam tarian ini melambangkan kehidupan dan kegembiraan. Tarian ini juga menjadi simbol identitas dan kebanggaan masyarakat Banyuwangi.\",\"rarity\":\"Umum\",\"unesco\":\"Tidak Terdaftar\",\"image\":\"\",\"latitude\":-8.2167,\"longitude\":114.3667,\"category_slug\":\"tarian\"}', '2025-11-25 15:51:29.256'),
(20, NULL, NULL, 'Tari Gandrung Banyuwangi', 'tari', 1, 'Banyuwangi, Jawa Timur', 'Jawa Timur', '95%', 'Tari Gandrung adalah tarian tradisional yang berasal dari Banyuwangi, Jawa Timur. Tarian ini merupakan ungkapan rasa syukur atas hasil panen yang melimpah dan menjadi simbol kesuburan.', NULL, '{\"name\":\"Tari Gandrung Banyuwangi\",\"subtitle\":\"Pesona Tari Tradisional dari Ujung Timur Jawa\",\"location\":\"Banyuwangi, Jawa Timur\",\"accuracy\":\"95%\",\"description\":\"Tari Gandrung adalah tarian tradisional yang berasal dari Banyuwangi, Jawa Timur. Tarian ini merupakan ungkapan rasa syukur atas hasil panen yang melimpah dan menjadi simbol kesuburan.\",\"long_description\":\"Tari Gandrung memiliki sejarah panjang yang berkaitan erat dengan perkembangan budaya Banyuwangi. Pada awalnya, tarian ini dilakukan sebagai ritual pemujaan Dewi Sri, dewi padi dan kesuburan. Seiring waktu, Gandrung berkembang menjadi hiburan rakyat yang populer dan menjadi ikon budaya Banyuwangi. Tarian ini melibatkan penari perempuan yang mengenakan busana khas dan diiringi oleh musik gamelan.\",\"meaning\":\"Tari Gandrung mengandung makna filosofis tentang harmoni antara manusia dan alam, serta rasa syukur atas rezeki yang diberikan. Gerakan tari yang lemah gemulai melambangkan keanggunan dan kesuburan. Musik yang mengiringi tarian menciptakan suasana sakral dan menghanyutkan.\",\"rarity\":\"Umum\",\"unesco\":\"Tidak Terdaftar\",\"image\":\"\",\"latitude\":-8.2167,\"longitude\":114.3667,\"category_slug\":\"tarian\"}', '2025-11-25 15:52:07.754'),
(21, NULL, NULL, 'Kesambi - Alat Musik NTT', 'alat musik', 2, 'Kabupaten Ende, Nusa Tenggara Timur', 'Nusa Tenggara Timur', '85%', 'Kesambi adalah alat musik gesek tradisional yang berasal dari Nusa Tenggara Timur, khususnya di Kabupaten Ende. Alat musik ini terbuat dari kayu dan memiliki bentuk yang unik.', NULL, '{\"name\":\"Kesambi - Alat Musik NTT\",\"subtitle\":\"Alat musik gesek dari Nusa Tenggara Timur\",\"location\":\"Kabupaten Ende, Nusa Tenggara Timur\",\"accuracy\":\"85%\",\"description\":\"Kesambi adalah alat musik gesek tradisional yang berasal dari Nusa Tenggara Timur, khususnya di Kabupaten Ende. Alat musik ini terbuat dari kayu dan memiliki bentuk yang unik.\",\"long_description\":\"Kesambi memiliki bentuk menyerupai busur panah dengan resonator berbentuk bundar yang terbuat dari tempurung kelapa. Dawai kesambi umumnya terbuat dari serat pohon atau senar. Alat musik ini dimainkan dengan cara digesek menggunakan alat gesek khusus yang disebut \'soso\'.\",\"meaning\":\"Kesambi seringkali dimainkan dalam upacara adat, ritual keagamaan, dan pertunjukan seni tradisional sebagai sarana penghibur dan pengiring tarian. Suara yang dihasilkan diyakini memiliki kekuatan magis yang dapat menghubungkan manusia dengan alam dan leluhur.\",\"rarity\":\"Langka\",\"unesco\":\"Tidak Terdaftar\",\"image\":\"\",\"latitude\":-8.65,\"longitude\":121.6,\"category_slug\":\"musik\"}', '2025-11-25 15:53:41.773'),
(22, NULL, NULL, 'Gamelan Jawa Lengkap', 'gamelan', 2, 'Yogyakarta, Jawa Tengah', 'Jawa Tengah', '95%', 'Gamelan Jawa adalah ansambel musik tradisional yang berasal dari Jawa, Indonesia. Terdiri dari berbagai instrumen perkusi seperti gong, saron, gender, dan kendang.', NULL, '{\"name\":\"Gamelan Jawa Lengkap\",\"subtitle\":\"Harmoni Nada dari Tanah Jawa\",\"location\":\"Yogyakarta, Jawa Tengah\",\"accuracy\":\"95%\",\"description\":\"Gamelan Jawa adalah ansambel musik tradisional yang berasal dari Jawa, Indonesia. Terdiri dari berbagai instrumen perkusi seperti gong, saron, gender, dan kendang.\",\"long_description\":\"Gamelan Jawa memiliki sejarah panjang dan mendalam, terkait erat dengan budaya dan spiritualitas Jawa. Alat musik ini sering digunakan dalam upacara adat, pertunjukan wayang, dan acara kesenian lainnya. Setiap instrumen memiliki peran dan fungsinya masing-masing, menciptakan harmoni yang khas dan unik.\",\"meaning\":\"Gamelan Jawa melambangkan keseimbangan dan harmoni dalam kehidupan. Nada-nadanya yang lembut dan meditatif dipercaya dapat menenangkan jiwa dan mendekatkan diri pada Yang Maha Kuasa. Pertunjukan gamelan juga menjadi sarana komunikasi antarmanusia, mempererat tali persaudaraan dan kebersamaan.\",\"rarity\":\"Umum\",\"unesco\":\"Terdaftar\",\"image\":\"\",\"latitude\":-7.8014,\"longitude\":110.3647,\"category_slug\":\"musik\"}', '2025-11-25 16:01:28.011'),
(23, NULL, NULL, 'Pura Besakih', 'Pura', 4, 'Karangasem, Bali', 'Bali', '95%', 'Pura Besakih adalah kompleks pura Hindu terbesar dan terpenting di Bali, terletak di lereng Gunung Agung. Terdiri dari 22 pura yang berbeda, menjadikannya pusat kegiatan keagamaan Hindu Dharma di Bali.', NULL, '{\"name\":\"Pura Besakih\",\"subtitle\":\"Kompleks Pura Terbesar di Bali\",\"location\":\"Karangasem, Bali\",\"accuracy\":\"95%\",\"description\":\"Pura Besakih adalah kompleks pura Hindu terbesar dan terpenting di Bali, terletak di lereng Gunung Agung. Terdiri dari 22 pura yang berbeda, menjadikannya pusat kegiatan keagamaan Hindu Dharma di Bali.\",\"long_description\":\"Pura Besakih diperkirakan telah ada sejak abad ke-14 dan menjadi tempat pemujaan sejak zaman Kerajaan Gelgel. Kompleks pura ini mengalami renovasi dan perluasan selama berabad-abad, mencerminkan arsitektur khas Bali dengan meru bertingkat dan gerbang paduraksa yang megah. Gunung Agung yang suci menjadi latar belakang yang dramatis bagi pura ini.\",\"meaning\":\"Sebagai \'Ibu Pura\' di Bali, Pura Besakih melambangkan keseimbangan kosmis dan harmoni antara manusia, alam, dan para dewa. Pura ini menjadi pusat upacara penting dan tempat pemujaan leluhur, mencerminkan kepercayaan Hindu Bali tentang reinkarnasi dan karma.\",\"rarity\":\"Umum\",\"unesco\":\"Tidak Terdaftar\",\"image\":\"\",\"latitude\":-8.3733,\"longitude\":115.6056,\"category_slug\":\"arsitektur\"}', '2025-11-25 16:14:54.088'),
(24, NULL, NULL, 'Tari Gandrung Banyuwangi', 'tari', 1, 'Banyuwangi, Jawa Timur', 'Jawa Timur', '95%', 'Tari Gandrung adalah tarian tradisional yang berasal dari Banyuwangi, Jawa Timur. Tarian ini merupakan ungkapan syukur masyarakat atas hasil panen dan kesuburan tanah.', NULL, '{\"name\":\"Tari Gandrung Banyuwangi\",\"subtitle\":\"Tarian Sakral dari Ujung Timur Jawa\",\"location\":\"Banyuwangi, Jawa Timur\",\"accuracy\":\"95%\",\"description\":\"Tari Gandrung adalah tarian tradisional yang berasal dari Banyuwangi, Jawa Timur. Tarian ini merupakan ungkapan syukur masyarakat atas hasil panen dan kesuburan tanah.\",\"long_description\":\"Tari Gandrung memiliki sejarah panjang dan erat kaitannya dengan ritual kesuburan dan panen. Awalnya, tarian ini dibawakan oleh laki-laki yang berdandan seperti perempuan, namun seiring waktu, peran tersebut digantikan oleh perempuan. Tari Gandrung menjadi simbol budaya dan identitas Banyuwangi, sering ditampilkan dalam berbagai acara adat dan festival.\",\"meaning\":\"Tari Gandrung memiliki makna filosofis yang mendalam, melambangkan keselarasan antara manusia dengan alam dan rasa syukur atas anugerah Tuhan. Gerakan-gerakan tari yang gemulai dan ekspresif menggambarkan keindahan dan kekuatan perempuan, serta semangat gotong royong masyarakat Banyuwangi.\",\"rarity\":\"Umum\",\"unesco\":\"Tidak Terdaftar\",\"image\":\"\",\"latitude\":-8.2167,\"longitude\":114.3667,\"category_slug\":\"tarian\"}', '2025-11-25 16:29:47.370'),
(25, NULL, NULL, 'Tari Gandrung Banyuwangi', 'tari', 1, 'Banyuwangi, Jawa Timur', 'Jawa Timur', '95%', 'Tari Gandrung adalah tarian tradisional yang berasal dari Banyuwangi, Jawa Timur. Tarian ini merupakan ungkapan syukur atas hasil panen dan kesuburan tanah.', NULL, '{\"name\":\"Tari Gandrung Banyuwangi\",\"subtitle\":\"Tarian Cinta dari Ujung Timur Jawa\",\"location\":\"Banyuwangi, Jawa Timur\",\"accuracy\":\"95%\",\"description\":\"Tari Gandrung adalah tarian tradisional yang berasal dari Banyuwangi, Jawa Timur. Tarian ini merupakan ungkapan syukur atas hasil panen dan kesuburan tanah.\",\"long_description\":\"Gandrung Banyuwangi telah ada sejak abad ke-18 dan awalnya ditarikan oleh laki-laki yang berdandan seperti perempuan. Seiring waktu, tarian ini mulai ditarikan oleh perempuan dan menjadi ikon budaya Banyuwangi. Pertunjukan Gandrung seringkali melibatkan interaksi dengan penonton, menciptakan suasana yang meriah dan akrab.\",\"meaning\":\"Tari Gandrung melambangkan kesuburan, keharmonisan, dan kebahagiaan. Gerakan-gerakannya yang gemulai dan ekspresif mencerminkan rasa syukur dan kegembiraan atas limpahan rezeki.\",\"rarity\":\"Umum\",\"unesco\":\"Tidak Terdaftar\",\"image\":\"\",\"latitude\":-8.2167,\"longitude\":114.3667,\"category_slug\":\"tarian\"}', '2025-11-25 16:30:01.172'),
(26, NULL, NULL, 'Batik Parang Rusak', 'batik', 3, 'Yogyakarta, DI Yogyakarta', 'DI Yogyakarta', '85%', 'Batik Parang Rusak adalah motif batik klasik yang berasal dari Yogyakarta. Motif ini memiliki ciri khas berupa garis-garis diagonal yang saling berpotongan, menyerupai ombak yang tak pernah putus.', NULL, '{\"name\":\"Batik Parang Rusak\",\"subtitle\":\"Motif Klasik Penuh Makna Luhur\",\"location\":\"Yogyakarta, DI Yogyakarta\",\"accuracy\":\"85%\",\"description\":\"Batik Parang Rusak adalah motif batik klasik yang berasal dari Yogyakarta. Motif ini memiliki ciri khas berupa garis-garis diagonal yang saling berpotongan, menyerupai ombak yang tak pernah putus.\",\"long_description\":\"Motif Parang Rusak diciptakan oleh Sultan Agung Hanyokrokusumo, Raja Mataram. Dahulu, motif ini hanya boleh dikenakan oleh kalangan bangsawan dan keluarga kerajaan. Motif parang memiliki makna kekuatan, kekuasaan, dan keberanian. Garis diagonal melambangkan ombak yang tak pernah berhenti, menggambarkan semangat untuk terus berjuang dan tidak menyerah.\",\"meaning\":\"Batik Parang Rusak melambangkan semangat perjuangan, kekuatan, dan keberanian. Motif ini juga mengandung makna harapan agar pemakainya senantiasa memiliki semangat yang tak pernah padam dalam menghadapi berbagai rintangan hidup.\",\"rarity\":\"Umum\",\"unesco\":\"Tidak Terdaftar\",\"image\":\"\",\"latitude\":-7.8014,\"longitude\":110.3647,\"category_slug\":\"pakaian\"}', '2025-11-25 16:47:40.015'),
(27, NULL, NULL, 'Tari Gandrung Banyuwangi', 'tari', 1, 'Banyuwangi, Jawa Timur', 'Jawa Timur', '95%', 'Tari Gandrung adalah tarian tradisional yang berasal dari Banyuwangi, Jawa Timur. Tarian ini menggambarkan rasa syukur dan kegembiraan masyarakat atas hasil panen yang melimpah, serta sebagai bentuk hiburan.', NULL, '{\"name\":\"Tari Gandrung Banyuwangi\",\"subtitle\":\"Pesona Tarian Khas Ujung Timur Jawa\",\"location\":\"Banyuwangi, Jawa Timur\",\"accuracy\":\"95%\",\"description\":\"Tari Gandrung adalah tarian tradisional yang berasal dari Banyuwangi, Jawa Timur. Tarian ini menggambarkan rasa syukur dan kegembiraan masyarakat atas hasil panen yang melimpah, serta sebagai bentuk hiburan.\",\"long_description\":\"Tari Gandrung Banyuwangi memiliki sejarah panjang, konon dimulai sejak zaman kerajaan Blambangan. Pada awalnya, tarian ini ditarikan oleh laki-laki yang berdandan seperti perempuan. Namun, seiring waktu, peran tersebut digantikan oleh penari perempuan. Tarian ini menjadi ikon budaya Banyuwangi dan sering ditampilkan dalam berbagai acara adat dan festival.\",\"meaning\":\"Tari Gandrung memiliki makna filosofis yang mendalam, yaitu sebagai simbol kesuburan, kemakmuran, dan keharmonisan antara manusia dengan alam. Gerakan-gerakan dalam tarian ini menggambarkan kehidupan sehari-hari masyarakat agraris Banyuwangi, serta rasa syukur atas berkah yang diberikan oleh Tuhan.\",\"rarity\":\"Umum\",\"unesco\":\"Tidak Terdaftar\",\"image\":\"\",\"latitude\":-8.2167,\"longitude\":114.3667,\"category_slug\":\"tarian\"}', '2025-11-25 16:59:36.409'),
(28, NULL, NULL, 'Blangkon Yogyakarta', 'Blangkon', 3, 'Yogyakarta, DI Yogyakarta', 'DI Yogyakarta', '95%', 'Blangkon Yogyakarta adalah penutup kepala tradisional pria yang berasal dari Yogyakarta. Terbuat dari kain batik yang dililitkan dan dijahit sedemikian rupa, blangkon menjadi bagian tak terpisahkan dari pakaian adat Jawa.', NULL, '{\"name\":\"Blangkon Yogyakarta\",\"subtitle\":\"Penutup Kepala Kebanggaan Yogyakarta\",\"location\":\"Yogyakarta, DI Yogyakarta\",\"accuracy\":\"95%\",\"description\":\"Blangkon Yogyakarta adalah penutup kepala tradisional pria yang berasal dari Yogyakarta. Terbuat dari kain batik yang dililitkan dan dijahit sedemikian rupa, blangkon menjadi bagian tak terpisahkan dari pakaian adat Jawa.\",\"long_description\":\"Blangkon Yogyakarta memiliki ciri khas bentuk yang berbeda dengan blangkon dari daerah lain seperti Solo. Blangkon ini melambangkan identitas budaya dan sering digunakan dalam acara-acara resmi, upacara adat, dan pertunjukan seni tradisional. Motif batik pada blangkon juga memiliki makna tersendiri yang berkaitan dengan filosofi hidup masyarakat Jawa.\",\"meaning\":\"Blangkon Yogyakarta mengandung makna simbolis tentang pengendalian diri dan kebijaksanaan. Bentuknya yang melingkar melambangkan kesempurnaan dan keutuhan. Penggunaan blangkon juga menunjukkan rasa hormat terhadap tradisi dan budaya leluhur.\",\"rarity\":\"Umum\",\"unesco\":\"Tidak Terdaftar\",\"image\":\"\",\"latitude\":-7.7953,\"longitude\":110.3689,\"category_slug\":\"pakaian\"}', '2025-11-25 23:48:07.628'),
(29, NULL, 29, 'Batik Buketan', 'batik', 7, 'Pekalongan, Jawa Tengah', 'Jawa Tengah', '85%', 'Batik Buketan adalah motif batik yang menampilkan rangkaian bunga dan tumbuhan, sering dikombinasikan dengan burung atau kupu-kupu. Motif ini berasal dari Pekalongan, Jawa Tengah, dan dipengaruhi oleh budaya Eropa dan Tiongkok.', NULL, '{\"name\":\"Batik Buketan\",\"subtitle\":\"Simbol Keindahan dan Kemakmuran Alam\",\"location\":\"Pekalongan, Jawa Tengah\",\"accuracy\":\"85%\",\"description\":\"Batik Buketan adalah motif batik yang menampilkan rangkaian bunga dan tumbuhan, sering dikombinasikan dengan burung atau kupu-kupu. Motif ini berasal dari Pekalongan, Jawa Tengah, dan dipengaruhi oleh budaya Eropa dan Tiongkok.\",\"long_description\":\"Motif Buketan muncul pada masa kolonial, ketika pedagang Belanda dan Tionghoa membawa pengaruh desain baru ke Pekalongan. Motif ini menjadi populer karena keindahannya dan kemampuannya menggabungkan berbagai unsur budaya. Batik Buketan sering digunakan dalam upacara pernikahan dan acara-acara penting lainnya.\",\"meaning\":\"Motif Buketan melambangkan keindahan alam, kesuburan, dan kemakmuran. Bunga-bunga yang mekar merepresentasikan kehidupan yang berkembang dan harapan akan masa depan yang cerah. Burung dan kupu-kupu melambangkan kebebasan dan kebahagiaan.\",\"rarity\":\"Umum\",\"unesco\":\"Terdaftar\",\"image\":\"\",\"latitude\":-6.8842,\"longitude\":109.6754,\"category_slug\":\"kerajinan\"}', '2025-11-26 07:44:57.517'),
(30, NULL, 30, 'Batik Ceplok', 'batik', 7, 'Yogyakarta, Daerah Istimewa Yogyakarta', 'Daerah Istimewa Yogyakarta', '85%', 'Batik Ceplok adalah motif batik tradisional yang terdiri dari pola-pola geometris berulang. Motif ini sering dijumpai dalam batik klasik dan memiliki berbagai variasi.', NULL, '{\"name\":\"Batik Ceplok\",\"subtitle\":\"Motif Klasik Keharmonisan Alam\",\"location\":\"Yogyakarta, Daerah Istimewa Yogyakarta\",\"accuracy\":\"85%\",\"description\":\"Batik Ceplok adalah motif batik tradisional yang terdiri dari pola-pola geometris berulang. Motif ini sering dijumpai dalam batik klasik dan memiliki berbagai variasi.\",\"long_description\":\"Motif Ceplok merupakan salah satu motif dasar batik yang telah lama dikenal di Jawa, khususnya Yogyakarta dan Solo. Motif ini biasanya disusun dari bentuk-bentuk geometris seperti lingkaran, kotak, atau bintang yang diulang secara teratur. Variasi motif Ceplok sangat beragam, setiap daerah atau pengrajin mungkin memiliki interpretasi yang berbeda terhadap motif dasar ini.\",\"meaning\":\"Motif Ceplok seringkali melambangkan keharmonisan, keteraturan, dan kesuburan. Pola yang berulang menunjukkan siklus alam yang terus berputar dan saling terkait. Motif ini juga dianggap sebagai simbol keberuntungan dan kesejahteraan.\",\"rarity\":\"Umum\",\"unesco\":\"Terdaftar\",\"image\":\"\",\"latitude\":-7.8014,\"longitude\":110.3647,\"category_slug\":\"kerajinan\"}', '2025-11-26 15:23:18.062'),
(31, NULL, NULL, 'Blangkon Yogyakarta', 'Blangkon', 3, 'Yogyakarta, DI Yogyakarta', 'DI Yogyakarta', '95%', 'Blangkon adalah penutup kepala tradisional pria Jawa, khususnya dari Yogyakarta. Terbuat dari kain batik yang dililitkan dan dijahit sedemikian rupa, blangkon bukan sekadar aksesori, melainkan identitas.', NULL, '{\"name\":\"Blangkon Yogyakarta\",\"subtitle\":\"Mahkota Identitas Pria Jawa\",\"location\":\"Yogyakarta, DI Yogyakarta\",\"accuracy\":\"95%\",\"description\":\"Blangkon adalah penutup kepala tradisional pria Jawa, khususnya dari Yogyakarta. Terbuat dari kain batik yang dililitkan dan dijahit sedemikian rupa, blangkon bukan sekadar aksesori, melainkan identitas.\",\"long_description\":\"Blangkon Yogyakarta memiliki ciri khas \'mondolan\' di bagian belakangnya, yaitu tonjolan yang menandakan model rambut pria Jawa zaman dahulu yang diikat di belakang kepala. Proses pembuatan blangkon melibatkan keterampilan melipat dan menjahit kain batik secara presisi. Motif batik pada blangkon juga memiliki makna tersendiri, seringkali menunjukkan status sosial atau daerah asal pemakainya.\",\"meaning\":\"Blangkon melambangkan kebijaksanaan, kesopanan, dan identitas Jawa. Cara pemakaian dan jenis blangkon yang dikenakan mencerminkan status sosial dan kedewasaan seseorang. Blangkon juga merupakan simbol penghormatan terhadap tradisi dan budaya Jawa.\",\"rarity\":\"Umum\",\"unesco\":\"Tidak Terdaftar\",\"image\":\"\",\"latitude\":-7.8014,\"longitude\":110.3647,\"category_slug\":\"pakaian\"}', '2025-11-26 15:47:46.962'),
(32, NULL, 31, 'Tari Lahbako Jember', 'tari', 1, 'Jember, Jawa Timur', 'Jawa Timur', '95%', 'Tari Lahbako adalah tarian tradisional yang berasal dari Kabupaten Jember, Jawa Timur. Tarian ini menggambarkan kehidupan petani tembakau, salah satu komoditas utama daerah tersebut.', NULL, '{\"name\":\"Tari Lahbako Jember\",\"subtitle\":\"Ekspresi Seni dan Budaya Jember\",\"location\":\"Jember, Jawa Timur\",\"accuracy\":\"95%\",\"description\":\"Tari Lahbako adalah tarian tradisional yang berasal dari Kabupaten Jember, Jawa Timur. Tarian ini menggambarkan kehidupan petani tembakau, salah satu komoditas utama daerah tersebut.\",\"long_description\":\"Tari Lahbako diciptakan untuk menghormati para petani tembakau dan mengungkapkan rasa syukur atas hasil panen yang melimpah. Gerakan dalam tarian ini meniru aktivitas petani tembakau dari menanam, merawat, hingga memanen. Kostum penari mencerminkan pakaian petani tembakau pada masa lalu.\",\"meaning\":\"Tari Lahbako mengandung makna kerja keras, gotong royong, dan penghargaan terhadap alam. Tarian ini juga menjadi simbol identitas budaya masyarakat Jember yang erat kaitannya dengan pertanian tembakau.\",\"rarity\":\"Umum\",\"unesco\":\"Tidak Terdaftar\",\"image\":\"\",\"latitude\":-8.1675,\"longitude\":113.6942,\"category_slug\":\"tarian\"}', '2025-11-27 05:10:24.828'),
(33, NULL, 29, 'Batik Buketan', 'batik', 7, 'Pekalongan, Jawa Tengah', 'Jawa Tengah', '95%', 'Batik Buketan adalah motif batik yang berasal dari Pekalongan, Jawa Tengah. Motif ini menampilkan rangkaian bunga dan tanaman yang menggambarkan keindahan kebun.', NULL, '{\"name\":\"Batik Buketan\",\"subtitle\":\"Motif Kebun Bunga Khas Pesisir\",\"location\":\"Pekalongan, Jawa Tengah\",\"accuracy\":\"95%\",\"description\":\"Batik Buketan adalah motif batik yang berasal dari Pekalongan, Jawa Tengah. Motif ini menampilkan rangkaian bunga dan tanaman yang menggambarkan keindahan kebun.\",\"long_description\":\"Batik Buketan dipengaruhi oleh budaya Eropa dan Tiongkok, mencerminkan sejarah Pekalongan sebagai kota pelabuhan yang kosmopolitan. Motif ini mulai populer pada abad ke-19 dan sering digunakan dalam upacara pernikahan dan acara penting lainnya. Pola buketan sering dikombinasikan dengan motif lain seperti burung dan kupu-kupu.\",\"meaning\":\"Motif Buketan melambangkan kesuburan, kebahagiaan, dan harapan akan kehidupan yang makmur. Bunga-bunga yang beragam juga merepresentasikan keberagaman dan harmoni dalam masyarakat.\",\"rarity\":\"Umum\",\"unesco\":\"Tidak Terdaftar\",\"image\":\"\",\"latitude\":-6.8844,\"longitude\":109.6634,\"category_slug\":\"kerajinan\"}', '2025-11-27 13:28:53.855'),
(34, NULL, 29, 'Batik Buketan', 'batik', 7, 'Pekalongan, Jawa Tengah', 'Jawa Tengah', '95%', 'Batik Buketan adalah jenis batik yang menampilkan motif rangkaian bunga atau tumbuhan secara berkelompok. Berasal dari Pekalongan, Jawa Tengah, batik ini mencerminkan akulturasi budaya dengan pengaruh Eropa dan Tiongkok.', NULL, '{\"name\":\"Batik Buketan\",\"subtitle\":\"Keindahan motif tumbuhan yang memukau\",\"location\":\"Pekalongan, Jawa Tengah\",\"accuracy\":\"95%\",\"description\":\"Batik Buketan adalah jenis batik yang menampilkan motif rangkaian bunga atau tumbuhan secara berkelompok. Berasal dari Pekalongan, Jawa Tengah, batik ini mencerminkan akulturasi budaya dengan pengaruh Eropa dan Tiongkok.\",\"long_description\":\"Batik Buketan muncul pada abad ke-19 di pesisir utara Jawa, khususnya Pekalongan. Pengaruh budaya Eropa terlihat dari motif bunga-bunga seperti tulip dan mawar, sedangkan pengaruh Tiongkok tampak pada penggunaan warna-warna cerah dan motif burung phoenix. Proses pembuatannya menggunakan teknik cap dan tulis.\",\"meaning\":\"Motif Buketan melambangkan keindahan alam, kesuburan, dan kebahagiaan. Rangkaian bunga yang beragam mencerminkan keberagaman budaya dan harmoni dalam kehidupan.\",\"rarity\":\"Umum\",\"unesco\":\"Tidak Terdaftar\",\"image\":\"\",\"latitude\":-6.8842,\"longitude\":109.6751,\"category_slug\":\"kerajinan\"}', '2025-11-27 13:29:17.218');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `full_name` varchar(191) NOT NULL,
  `role` enum('user','admin','contributor','petugas') NOT NULL DEFAULT 'user',
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `full_name`, `role`, `created_at`, `updated_at`) VALUES
(1, 'admin@gmail.com', '$2a$10$z7t5.b0mT1hHJqHYy9jhgOu5jrmlWQH/0/kt5yCLBoXvTTD6XKIDq', 'Admin Lokal Lens', 'admin', '2025-11-22 05:40:04.798', '2025-11-22 05:40:04.798'),
(2, 'contributor@gmail.com', '$2a$10$sJ0er/SDbvrjvneU7lZYCebNA47.keffmEdhaSJNVtpp2Sbuy9baC', 'Budi Kontributor', 'contributor', '2025-11-22 05:40:04.861', '2025-11-22 05:40:04.861'),
(3, 'officer@gmail.com', '$2a$10$BrxRwW7.1l3IlMOLqVlF0uf/iFTjBiDuYalU2gGf.Iau2ihX33E4q', 'Petugas Budaya', 'petugas', '2025-11-22 05:40:04.923', '2025-11-22 05:40:04.923'),
(4, 'user@gmail.com', '$2a$10$VFc0YqqOo9YCWZdGJifEcOINZuBj.BFmaDWBVFOc2Xc8JP5rMHOny', 'User Biasa', 'contributor', '2025-11-22 05:40:04.983', '2025-11-22 21:34:10.307'),
(5, 'mdjauharil29@gmail.com', '$2a$10$QK8SsnUU7PCTLoqmr147.uTDDIX7J8RNg3.JoG8yaTt6kt4SrACEi', 'Areal', 'contributor', '2025-11-23 09:23:27.169', '2025-11-24 12:26:10.444'),
(6, 'aca@gmail.com', '$2a$10$Sk/ZXvIb78bQ.2i6vAHRAu..e56YYUxKlNr13pTkIkwfDPEolMD3u', 'Khairunnisa', 'user', '2025-11-23 12:12:06.561', '2025-11-23 12:12:06.561'),
(7, 'khairunnisabhari@gmail.com', '$2a$10$nZqPXyfsfby8LMRZopLOlONQJz4gjBPgHHWa5AvqiEv/CqSlI3SSW', 'Khairunnisa', 'user', '2025-11-23 13:35:49.911', '2025-11-23 13:35:49.911'),
(8, 'faiqakrom@gmail.com', '$2a$10$EIfng3rIwD8X00eaLyFj8eUBkQH5w0Dk3Mn5I6umuW5hyEs/6C4Ai', 'Faiq Akrom', 'user', '2025-11-25 22:19:16.397', '2025-11-25 22:19:16.397');

-- --------------------------------------------------------

--
-- Table structure for table `user_article_bookmarks`
--

CREATE TABLE `user_article_bookmarks` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_badges`
--

CREATE TABLE `user_badges` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `badge_id` int(11) NOT NULL,
  `earned_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_badges`
--

INSERT INTO `user_badges` (`id`, `user_id`, `badge_id`, `earned_at`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2025-11-22 05:40:05.007', '2025-11-22 05:40:05.007', '2025-11-22 05:40:05.007'),
(2, 1, 2, '2025-11-22 05:40:05.010', '2025-11-22 05:40:05.010', '2025-11-22 05:40:05.010'),
(3, 1, 3, '2025-11-22 05:40:05.012', '2025-11-22 05:40:05.012', '2025-11-22 05:40:05.012'),
(4, 4, 1, '2025-11-22 05:40:05.015', '2025-11-22 05:40:05.015', '2025-11-22 05:40:05.015');

-- --------------------------------------------------------

--
-- Table structure for table `user_comment_votes`
--

CREATE TABLE `user_comment_votes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `vote_type` varchar(191) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_complete_challenges`
--

CREATE TABLE `user_complete_challenges` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `challenge_id` int(11) NOT NULL,
  `completed_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_complete_challenges`
--

INSERT INTO `user_complete_challenges` (`id`, `user_id`, `challenge_id`, `completed_at`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2025-11-22 05:40:05.018', '2025-11-22 05:40:05.018', '2025-11-22 05:40:05.018'),
(2, 1, 2, '2025-11-22 05:40:05.021', '2025-11-22 05:40:05.021', '2025-11-22 05:40:05.021'),
(3, 4, 1, '2025-11-22 05:40:05.023', '2025-11-22 05:40:05.023', '2025-11-22 05:40:05.023');

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
('04a24ede-7205-4514-9f5f-708a790853ce', 'ea3f94ffed5bee9eb932727cfecf4985415cd8f5f1eff41147207b7186663273', '2025-11-22 05:39:56.999', '20251122053956_add_categories_table', NULL, NULL, '2025-11-22 05:39:56.239', 1),
('16b56a38-b6c6-4b8c-8ea5-c9c5f0c771ac', '05e5ce2c641634824d1bcdafc4727c13bbb034aa9ed115f7de8454adaea0cbad', '2025-11-22 05:39:51.067', '20251121110257_add_culture_category', NULL, NULL, '2025-11-22 05:39:51.035', 1),
('62fa6c59-ec97-41a7-a37d-8f3cda4ccda4', 'b5fee9c71fe2d84d13cf19d1138f44b5deb101dea5818c47ae990dc749904d89', '2025-11-22 05:39:51.756', '20251121171144_add_endangered_reports', NULL, NULL, '2025-11-22 05:39:51.069', 1),
('857e7f91-9555-4b45-8eb4-37919a3b55bf', '165ce591338d8c2ca173c292c079c78e3e5f430da534873bbfd83d0827bc2b3f', '2025-11-22 05:39:51.033', '20251121102108_add_cultures_tables', NULL, NULL, '2025-11-22 05:39:50.478', 1),
('e7c22a4e-e63c-4c3b-a67c-304cd677b705', '5dfbb0ca11bf2a28f0c6783b1c6e046d6d665c2082fcace7cfb3c8c92e119277', '2025-11-22 05:39:50.476', '20251121081611_add_badges_and_challenges', NULL, NULL, '2025-11-22 05:39:50.157', 1),
('f974faca-7de8-4851-9dd9-a2e004733dad', '08519be69d9470e0d986ca5f82f8a3182c591b3bb2d01bba4b984c9cef89eca0', '2025-11-22 07:01:58.301', '20251122070158_remove_deprecated_category_columns', NULL, NULL, '2025-11-22 07:01:58.221', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `articles_slug_key` (`slug`),
  ADD KEY `articles_slug_idx` (`slug`),
  ADD KEY `articles_is_highlight_idx` (`is_highlight`),
  ADD KEY `articles_published_at_idx` (`published_at`),
  ADD KEY `articles_author_id_fkey` (`author_id`),
  ADD KEY `articles_category_id_idx` (`category_id`);

--
-- Indexes for table `article_comments`
--
ALTER TABLE `article_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `article_comments_article_id_idx` (`article_id`),
  ADD KEY `article_comments_user_id_idx` (`user_id`),
  ADD KEY `article_comments_parent_id_idx` (`parent_id`);

--
-- Indexes for table `badges`
--
ALTER TABLE `badges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_name_key` (`name`),
  ADD UNIQUE KEY `categories_slug_key` (`slug`),
  ADD KEY `categories_type_idx` (`type`),
  ADD KEY `categories_slug_idx` (`slug`);

--
-- Indexes for table `certificates`
--
ALTER TABLE `certificates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `certificates_user_id_fkey` (`user_id`);

--
-- Indexes for table `challenges`
--
ALTER TABLE `challenges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contributors`
--
ALTER TABLE `contributors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `contributors_user_id_key` (`user_id`),
  ADD KEY `contributors_verification_status_idx` (`verification_status`),
  ADD KEY `contributors_created_at_idx` (`created_at`);

--
-- Indexes for table `cultures`
--
ALTER TABLE `cultures`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cultures_slug_key` (`slug`),
  ADD KEY `cultures_province_idx` (`province`),
  ADD KEY `cultures_city_idx` (`city`),
  ADD KEY `cultures_latitude_longitude_idx` (`latitude`,`longitude`),
  ADD KEY `cultures_category_id_idx` (`category_id`);

--
-- Indexes for table `culture_images`
--
ALTER TABLE `culture_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `culture_images_culture_id_idx` (`culture_id`);

--
-- Indexes for table `endangered_reports`
--
ALTER TABLE `endangered_reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `endangered_reports_status_idx` (`status`),
  ADD KEY `endangered_reports_user_id_idx` (`user_id`),
  ADD KEY `endangered_reports_province_idx` (`province`),
  ADD KEY `endangered_reports_created_at_idx` (`created_at`),
  ADD KEY `endangered_reports_reviewed_by_fkey` (`reviewed_by`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `events_slug_key` (`slug`),
  ADD KEY `events_slug_idx` (`slug`),
  ADD KEY `events_date_start_idx` (`date_start`),
  ADD KEY `events_status_idx` (`status`),
  ADD KEY `events_location_province_idx` (`location_province`),
  ADD KEY `events_category_id_idx` (`category_id`);

--
-- Indexes for table `event_galleries`
--
ALTER TABLE `event_galleries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_galleries_event_id_idx` (`event_id`);

--
-- Indexes for table `event_performers`
--
ALTER TABLE `event_performers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_performers_event_id_idx` (`event_id`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `profiles_user_id_key` (`user_id`);

--
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `quizzes_slug_key` (`slug`),
  ADD KEY `quizzes_slug_idx` (`slug`),
  ADD KEY `quizzes_status_idx` (`status`),
  ADD KEY `quizzes_category_id_idx` (`category_id`);

--
-- Indexes for table `quiz_answers`
--
ALTER TABLE `quiz_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quiz_answers_attempt_id_idx` (`attempt_id`),
  ADD KEY `quiz_answers_question_id_idx` (`question_id`),
  ADD KEY `quiz_answers_option_id_fkey` (`option_id`);

--
-- Indexes for table `quiz_attempts`
--
ALTER TABLE `quiz_attempts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quiz_attempts_quiz_id_idx` (`quiz_id`),
  ADD KEY `quiz_attempts_user_id_idx` (`user_id`),
  ADD KEY `quiz_attempts_completed_at_idx` (`completed_at`);

--
-- Indexes for table `quiz_options`
--
ALTER TABLE `quiz_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quiz_options_question_id_idx` (`question_id`);

--
-- Indexes for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quiz_questions_quiz_id_idx` (`quiz_id`),
  ADD KEY `quiz_questions_order_number_idx` (`order_number`);

--
-- Indexes for table `scan_history`
--
ALTER TABLE `scan_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `scan_history_user_id_idx` (`user_id`),
  ADD KEY `scan_history_culture_id_idx` (`culture_id`),
  ADD KEY `scan_history_object_type_idx` (`object_type`),
  ADD KEY `scan_history_province_idx` (`province`),
  ADD KEY `scan_history_category_id_idx` (`category_id`),
  ADD KEY `scan_history_created_at_idx` (`created_at`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_key` (`email`);

--
-- Indexes for table `user_article_bookmarks`
--
ALTER TABLE `user_article_bookmarks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_article_bookmarks_user_id_article_id_key` (`user_id`,`article_id`),
  ADD KEY `user_article_bookmarks_article_id_idx` (`article_id`);

--
-- Indexes for table `user_badges`
--
ALTER TABLE `user_badges`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_badges_user_id_badge_id_key` (`user_id`,`badge_id`),
  ADD KEY `user_badges_badge_id_fkey` (`badge_id`);

--
-- Indexes for table `user_comment_votes`
--
ALTER TABLE `user_comment_votes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_comment_votes_user_id_comment_id_key` (`user_id`,`comment_id`),
  ADD KEY `user_comment_votes_comment_id_idx` (`comment_id`);

--
-- Indexes for table `user_complete_challenges`
--
ALTER TABLE `user_complete_challenges`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_complete_challenges_user_id_challenge_id_key` (`user_id`,`challenge_id`),
  ADD KEY `user_complete_challenges_challenge_id_fkey` (`challenge_id`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `article_comments`
--
ALTER TABLE `article_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `badges`
--
ALTER TABLE `badges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `certificates`
--
ALTER TABLE `certificates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `challenges`
--
ALTER TABLE `challenges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `contributors`
--
ALTER TABLE `contributors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cultures`
--
ALTER TABLE `cultures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `culture_images`
--
ALTER TABLE `culture_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=459;

--
-- AUTO_INCREMENT for table `endangered_reports`
--
ALTER TABLE `endangered_reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `event_galleries`
--
ALTER TABLE `event_galleries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `event_performers`
--
ALTER TABLE `event_performers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `quiz_answers`
--
ALTER TABLE `quiz_answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT for table `quiz_attempts`
--
ALTER TABLE `quiz_attempts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `quiz_options`
--
ALTER TABLE `quiz_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=333;

--
-- AUTO_INCREMENT for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `scan_history`
--
ALTER TABLE `scan_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_article_bookmarks`
--
ALTER TABLE `user_article_bookmarks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_badges`
--
ALTER TABLE `user_badges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_comment_votes`
--
ALTER TABLE `user_comment_votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_complete_challenges`
--
ALTER TABLE `user_complete_challenges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `articles_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `article_comments`
--
ALTER TABLE `article_comments`
  ADD CONSTRAINT `article_comments_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `article_comments_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `article_comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `article_comments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `certificates`
--
ALTER TABLE `certificates`
  ADD CONSTRAINT `certificates_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `contributors`
--
ALTER TABLE `contributors`
  ADD CONSTRAINT `contributors_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cultures`
--
ALTER TABLE `cultures`
  ADD CONSTRAINT `cultures_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `culture_images`
--
ALTER TABLE `culture_images`
  ADD CONSTRAINT `culture_images_culture_id_fkey` FOREIGN KEY (`culture_id`) REFERENCES `cultures` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `endangered_reports`
--
ALTER TABLE `endangered_reports`
  ADD CONSTRAINT `endangered_reports_reviewed_by_fkey` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `endangered_reports_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `event_galleries`
--
ALTER TABLE `event_galleries`
  ADD CONSTRAINT `event_galleries_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `event_performers`
--
ALTER TABLE `event_performers`
  ADD CONSTRAINT `event_performers_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `profiles`
--
ALTER TABLE `profiles`
  ADD CONSTRAINT `profiles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD CONSTRAINT `quizzes_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `quiz_answers`
--
ALTER TABLE `quiz_answers`
  ADD CONSTRAINT `quiz_answers_attempt_id_fkey` FOREIGN KEY (`attempt_id`) REFERENCES `quiz_attempts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `quiz_answers_option_id_fkey` FOREIGN KEY (`option_id`) REFERENCES `quiz_options` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `quiz_answers_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `quiz_questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `quiz_attempts`
--
ALTER TABLE `quiz_attempts`
  ADD CONSTRAINT `quiz_attempts_quiz_id_fkey` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `quiz_attempts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `quiz_options`
--
ALTER TABLE `quiz_options`
  ADD CONSTRAINT `quiz_options_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `quiz_questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD CONSTRAINT `quiz_questions_quiz_id_fkey` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `scan_history`
--
ALTER TABLE `scan_history`
  ADD CONSTRAINT `scan_history_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `scan_history_culture_id_fkey` FOREIGN KEY (`culture_id`) REFERENCES `cultures` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `scan_history_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `user_article_bookmarks`
--
ALTER TABLE `user_article_bookmarks`
  ADD CONSTRAINT `user_article_bookmarks_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_article_bookmarks_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_badges`
--
ALTER TABLE `user_badges`
  ADD CONSTRAINT `user_badges_badge_id_fkey` FOREIGN KEY (`badge_id`) REFERENCES `badges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_badges_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_comment_votes`
--
ALTER TABLE `user_comment_votes`
  ADD CONSTRAINT `user_comment_votes_comment_id_fkey` FOREIGN KEY (`comment_id`) REFERENCES `article_comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_comment_votes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_complete_challenges`
--
ALTER TABLE `user_complete_challenges`
  ADD CONSTRAINT `user_complete_challenges_challenge_id_fkey` FOREIGN KEY (`challenge_id`) REFERENCES `challenges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_complete_challenges_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
