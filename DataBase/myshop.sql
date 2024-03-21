-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2024 at 09:40 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `price` int(10) NOT NULL,
  `details` text NOT NULL,
  `image` text NOT NULL,
  `quantity` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `details`, `image`, `quantity`) VALUES
(1, 'Pepsi', 125, 'This is a best cold drink ever', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE08NnoGFBCl7-r_VMFDmHKVXvJCITiPPMOg', 10),
(2, 'Basket', 100, 'This is the best basket ever, and for basic use. you can use it for many perposes.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuqrQKpBTIdODRDCZAi0clWAk_p7W4Qd39ng&usqp=CAU', 10),
(3, 'Airpods', 1000, 'this is mouse', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVbyYiT4h3tWQUd22vnLjfBSqLNB4qTu6R1lsgoCuJFNUtAI6Wa1q-VbteFPYWoTKf6XM', 10),
(4, 'HEADPHONE', 1300, 'This is to listen music', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZtDXsakDuny9F6KXgdFyZHm6SonZO1fGh8uP4Np-q-6U8v3iLQbZEdgc6RxKT1SID3hA&usqp=CAU...https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrU76qMiDYam1rzz90H5UUOxM6ilb-GI2Hx1X_P1BHNf690_8OvUxj4ejIfkDcfGZ_bQQ&usqp=CAU...https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfDdwPMeyvX4jie6RmyHr875YQV_JCEZQ5gbkZNjHtwhttXsknBOdFF53I1qnFRhb1Z68&usqp=CAU', 10),
(5, 'Super HeadPhone', 10000, 'This is best', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZtDXsakDuny9F6KXgdFyZHm6SonZO1fGh8uP4Np-q-6U8v3iLQbZEdgc6RxKT1SID3hA', 10),
(6, 'watch', 200, 'This is a best watch ever', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzFqk7qB-dhz9F1stQ8Xq0nI8PzfR0pns-Zw&usqp=CAU', 10);

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `date` tinyint(4) NOT NULL,
  `sales` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `date`, `sales`, `price`) VALUES
(1, 1, 0, 0),
(2, 2, 0, 0),
(3, 3, 2301, 546475),
(4, 4, 0, 0),
(5, 5, 0, 0),
(6, 6, 0, 0),
(7, 7, 0, 0),
(8, 8, 0, 0),
(9, 9, 0, 0),
(10, 10, 0, 0),
(11, 11, 0, 0),
(12, 12, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
