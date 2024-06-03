-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2024 at 01:27 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `timetable`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `adminid` int(3) NOT NULL,
  `name` varchar(25) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`adminid`, `name`, `email`, `password`) VALUES
(1, 'Dev Harsh', 'dev.admin@gmail.com', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `leaves`
--

CREATE TABLE `leaves` (
  `faculty` varchar(25) NOT NULL,
  `ldate` varchar(25) NOT NULL,
  `lday` varchar(25) NOT NULL,
  `cdate` varchar(25) NOT NULL,
  `ctime` varchar(25) NOT NULL,
  `gstatus` int(1) NOT NULL DEFAULT 2
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `leaves`
--

INSERT INTO `leaves` (`faculty`, `ldate`, `lday`, `cdate`, `ctime`, `gstatus`) VALUES
('Amaravati', '5/9/2023', 'Tuesday', '4/28/2023', '11:57:48 PM', 2),
('BosuBabu', '5/22/2023', 'Monday', '4/28/2023', '11:57:48 PM', 2),
('Yasaswi', '5/10/2023', 'Wednesday', '4/29/2023', '9:41:29 AM', 1),
('Mamatha', '5/4/2023', 'Thursday', '4/29/2023', '3:24:18 PM', 1),
('Mamatha', '25/4/2024', 'Thursday', '17/4/2024', '11:45:45 am', 1),
('BosuBabu', '5/6/2024', 'Wednesday', '3/6/2024', '4:49:31 pm', 2);

-- --------------------------------------------------------

--
-- Table structure for table `tableview`
--

CREATE TABLE `tableview` (
  `year` varchar(1) NOT NULL,
  `day` varchar(25) NOT NULL,
  `faculty` varchar(25) NOT NULL,
  `subject` varchar(25) NOT NULL,
  `class` varchar(25) NOT NULL,
  `period` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tableview`
--

INSERT INTO `tableview` (`year`, `day`, `faculty`, `subject`, `class`, `period`) VALUES
('3', 'monday', 'BosuBabu', 'WT', 'C', '6'),
('3', 'monday', 'BosuBabu', 'WT', 'C', '7'),
('3', 'thursday', 'Bosubabu', 'WT', 'C', '4'),
('4', 'tuesday', 'Mamatha', 'DA', 'C', '4');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(3) NOT NULL,
  `name` varchar(25) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
('103', 'BosuBabu', 'bosubabu@gmail.com', 'bosu'),
('104', 'Mahesh', 'mahesh@gmail.com', 'mahe'),
('105', 'Krishnanjneyulu', 'krishna@gmail.com', 'kris'),
('106', 'Amaravati', 'amaravati@gmail.com', 'amar'),
('107', 'Ashwani', 'ashwani@gmail.com', 'ashw'),
('108', 'Mamatha', 'mamatha@gmail.com', 'mama'),
('109', 'Pranitha', 'pranitha@gmail.com', 'pran'),
('110', 'Chandra Shekar', 'chandra@gmail.com', 'chan'),
('111', 'Gowri Puspha', 'gowri@gmail.com', 'gowr'),
('112', 'Gayatri', 'gayatri@gmail.com', 'gaya'),
('113', 'Ushabala', 'ushabala@gmail.com', 'usha'),
('114', 'Preethi', 'preethi@gmail.com', 'pree'),
('115', 'Rohini', 'rohini@gmail.com', 'rohi'),
('116', 'Lahari', 'lahari@gmail.com', 'laha'),
('117', 'Anusha', 'anusha@gmail.com', 'anus'),
('118', 'Marline Joys', 'marline@gmail.com', 'marl'),
('119', 'Spandana', 'spandana@gmail.com', 'span'),
('120', 'Yasaswi', 'yasaswi@gmail.com', 'yasa'),
('101', 'Krishna Prasad', 'krishnaprasad@gmail.com', 'krpr'),
('102', 'Sangeeta', 'sangeeta@gmail.com', 'sang');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
