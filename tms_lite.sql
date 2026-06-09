-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 03, 2025 at 05:12 PM
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
-- Database: `tms_lite`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL,
  `booking_date` date NOT NULL,
  `comments` text DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `package_id`, `booking_date`, `comments`, `status`) VALUES
(1, 2, 1, '2025-08-02', NULL, 'Approved'),
(5, 6, 3, '2025-08-03', 'I want only vegetarian food during the trip.', 'Approved'),
(6, 7, 5, '2025-08-03', 'Do you help in Visa processing as well?', 'Approved');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `is_admin` tinyint(1) DEFAULT 0,
  `message` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `booking_id`, `user_id`, `is_admin`, `message`, `created_at`) VALUES
(1, 1, 2, 0, 'I need a bedroom for single person', '2025-08-02 22:30:32'),
(3, 1, 1, 1, 'ok', '2025-08-03 00:41:13'),
(4, 6, 1, 1, 'Yes,we help with all visa related issues', '2025-08-03 02:31:56'),
(5, 6, 7, 0, 'What will be approximate time for Visa Arrival?', '2025-08-03 02:33:18');

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `id` int(11) NOT NULL,
  `package_name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `package_type` varchar(255) DEFAULT 'Family Package',
  `location` varchar(255) DEFAULT 'Unknown',
  `features` text DEFAULT 'Free Breakfast, Free Wi-Fi'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`id`, `package_name`, `description`, `price`, `image_path`, `created_at`, `image`, `package_type`, `location`, `features`) VALUES
(1, 'Bali Bliss: Family Getaway', 'Embark on a relaxing family escape to the exotic island of Bali. Discover serene beaches, vibrant culture, and stunning temples. This package includes flights, comfortable hotel stay, daily breakfast, and seamless internet access for your convenience.', 999.00, '3.jpg', '2025-08-02 20:28:00', 'istockphoto-653953140-612x612.jpg', 'Family Vacation Package', 'Bali, Indonesia', 'Free Breakfast,Complimentary Wi-Fi,Round-trip Flights,3-Star Hotel Accommodation'),
(2, '6 Days in Guwahati & Shillong with Cherrapunji Excursion', 'Embark on a 6-day journey through the serene landscapes of Northeast India. Begin in Guwahati, exploring the Kamakhya Temple and cruising the Brahmaputra River. Journey to Shillong, the \"Scotland of the East,\" to see its beautiful lakes and waterfalls. The tour also includes a visit to the living root bridges of Cherrapunji and the crystal-clear waters of Dawki. This package is a perfect blend of culture, nature, and adventure.', 4500.00, '4.jpg', '2025-08-02 21:05:24', 'mesmerising-meghalaya-shillong-2n-cherrapunjee-2n-guwahati-2n-6239b0d7ade29.jpg', 'Nature & Culture Exploration Package', 'Guwahati – Shillong – Cherrapunji – Dawki', 'Daily Breakfast Included, Private AC Transport, Guided Tours at Key Locations, Hotel Accommodation'),
(3, 'Bhutan Holidays - Thimphu and Paro', 'Experience the peaceful charm of Bhutan on a solo journey through Thimphu and Paro. Visit sacred sites like the Tiger’s Nest Monastery, explore traditional markets, and soak in Bhutanese culture at your own pace. Ideal for solo travelers seeking nature, culture, and tranquility.', 3000.00, '5.jpg', '2025-08-02 21:05:24', 'download.jpeg', 'Solo Scenic Retreat', 'Thimphu and Paro, Bhutan', 'Free Breakfast, Free Wi-Fi, Local Sightseeing, Comfortable Stay, Private Transfers'),
(4, 'Short Trip to Dubai', 'Escape with your partner to the dazzling city of Dubai! Enjoy a romantic desert safari, breathtaking views from the Burj Khalifa, and a scenic city tour. This thoughtfully designed couple’s package offers the perfect mix of adventure, luxury, and unforgettable moments.', 1500.00, '6.jpg', '2025-08-02 21:05:24', 'download (1).jpeg', 'Couple\'s Luxury Getaway', 'Dubai, United Arab Emirates', 'Free Breakfast, Free Wi-Fi, Desert Safari, Burj Khalifa Entry, Romantic City Tour'),
(5, 'The Ultimate Japan Experience', 'Discover the vibrant culture and stunning landscapes of Japan on this enriching 10-day journey. Visit Tokyo\'s lively neighborhoods, the historic temples of Kyoto, and the powerful memorials of Hiroshima. Enjoy cultural experiences like a tea ceremony, dine on authentic Japanese dishes, and travel swiftly across cities via the iconic bullet train. A perfect family package blending history, tradition, and modern wonder.', 5500.00, 'c1.jpg', '2025-08-02 21:05:41', '全部尺寸 _ Tokyo Tower Sunset _ Flickr - 相片分享！.jpeg', 'Cultural Family Adventure', 'Tokyo, Kyoto, Hiroshima & More', '10-Day Itinerary, Guided City Tours, Bullet Train Ride, Traditional Tea Ceremony, Local Cuisine Tasting'),
(6, 'European Adventure – 14-Day Multi-City Tour', 'Embark on an unforgettable journey through the historic capitals of Europe. This 14-day tour takes you to iconic cities like Paris, Rome, and London. Explore the art and culture of the Louvre Museum, stand in awe of the Colosseum, and witness the changing of the guard at Buckingham Palace. Our package includes guided tours, comfortable accommodation, and flexible travel options, offering a seamless and enriching experience across the continent.', 4200.00, 'c2.jpg', '2025-08-02 21:05:41', '10 Beautiful Palaces In London You Have To Visit.jpeg', 'Family Discovery Tour', 'Paris, Rome, London & More', 'Guided City Tours, Museum Entry, Comfortable Stays, Flexible Travel Options'),
(7, 'Thai Island Hopping Adventure', 'Embark on an unforgettable island-hopping adventure across Thailand’s most stunning tropical destinations. Perfect for families, this tour includes visits to crystal-clear beaches, vibrant coral reefs for snorkeling, and tranquil spots to relax. Explore the unique charm of each island with a carefully curated itinerary, combining adventure and leisure for a dream vacation.', 4000.00, 'c3.jpg', '2025-08-02 21:05:41', '20 Amazing Things To Do In Bangkok _ For First….jpeg', 'Tropical Family Getaway', 'Phuket, Krabi, Phi Phi Islands, and more', 'Free Breakfast, Free Wi-Fi, Island Transfers, Guided Tours, Beach Activities'),
(8, 'New York City Tour', 'See the sights and sounds of the Big Apple. This family-friendly tour takes you to iconic landmarks like the Statue of Liberty, Times Square, Central Park, and the Empire State Building. Our guided bus tour provides an entertaining and educational way to explore the city\'s rich history and culture. This package is the perfect way for the whole family to experience the energy and excitement of New York City.', 2100.00, 'c4.jpg', '2025-08-02 21:05:41', 'explore NEW YORK CITY.jpeg', 'Urban Solo Explorer Package', 'See the sights and sounds of the Big Apple.', 'Free Wi-Fi, Hotel Pick-up, Guided Sightseeing Bus Tour, Landmark Access'),
(9, 'Hawaiian Paradise', 'Escape to a tropical dream with our \"Hawaiian Paradise\" tour package. This romantic getaway is perfect for couples seeking sun-kissed beaches, stunning volcanic landscapes, and vibrant Polynesian culture. Spend your days snorkeling in crystal-clear waters, exploring lush rainforests, and relaxing on pristine shores. As the sun sets, enjoy a romantic cruise and a traditional Hawaiian luau dinner, creating unforgettable memories together.', 3500.00, 'c5.jpg', '2025-08-02 21:05:41', '9bd55998-9a68-494f-bcca-570579ea910a.jpeg', 'Honeymoon & Romantic Getaway', 'Hawaii, USA', 'Hotel Stay, Romantic Sunset Cruise, Snorkeling Adventure, Luau Dinner'),
(10, 'Himachal Backpacking Trip – Friends Edition', 'Grab your friends and set out on an unforgettable trip to Himachal Pradesh! Wander the vibrant streets of Shimla, enjoy adventure sports in Solang Valley, chill in Kasol’s riverside cafes, and take in the snow-capped views of Manali. Perfect for students and young travelers, this package blends fun, bonding, and nature into one epic group adventure—complete with treks, bonfires, and scenic memories.', 1000.00, '', '0000-00-00 00:00:00', 'MANALI.jpeg', 'Adventure Group Tour (Students & Friends)', 'Shimla, Manali, Solang Valley, Kasol', 'Group Travel, Budget Stays, Campfire Nights, Local Treks, Guided Sightseeing');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`) VALUES
(1, 'Admin\r\n', 'admin@example.com', '$2y$10$7Y/pDjJCWV46bo1CL9tMeOh26i2DGptjy57ffUZbBmXceowbnSfCi', 1),
(2, 'Kushagra Srivastava', 'srivastavakushagra@gmail.com', '$2y$10$f9wBzrTqPT8Ayg7voM2mEeEoA6Nrml5eJ5lqqTOrbBU63aTFKWPBy', 0),
(6, 'John Doe', 'johndoe123@gmail.com', '$2y$10$ETRpp990KDz/5RpigRK0neb8S3kV6R1lB6JMgeyOsmdBL9hbGN86e', 0),
(7, 'Aryan Bishnoi', 'aryanbishnoi222@gmail.com', '$2y$10$a79ZB21EMbWJplvSCqS7V.iiVVdPGRr1cYPOBPgK2b2mrcYHdJUAG', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `package_id` (`package_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_id` (`booking_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
