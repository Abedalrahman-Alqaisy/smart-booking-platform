-- Create Database
CREATE DATABASE IF NOT EXISTS smart_booking_db;
USE smart_booking_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    service_name VARCHAR(100) NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    UNIQUE KEY unique_booking (booking_date, booking_time)
);

-- Sample Data for Users (password is 'admin123' for demo purposes)
INSERT INTO users (username, password) VALUES ('admin', 'admin123');

-- Sample Data for Bookings
INSERT INTO bookings (customer_name, service_name, booking_date, booking_time) VALUES 
('John Doe', 'Consultation', '2026-02-01', '10:00:00'),
('Jane Smith', 'Maintenance', '2026-02-01', '14:00:00'),
('Alice Brown', 'Consultation', '2026-02-02', '09:00:00');
