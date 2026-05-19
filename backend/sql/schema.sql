CREATE DATABASE IF NOT EXISTS single_product_shop;
USE single_product_shop;

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  avatar VARCHAR(255),
  role ENUM('member', 'admin') DEFAULT 'member'
);

CREATE TABLE IF NOT EXISTS categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  slug VARCHAR(120) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  category_id INT NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  stock INT DEFAULT 0,
  sales_count INT DEFAULT 0,
  views_count INT DEFAULT 0,
  images JSON,
  attributes JSON,
  is_promotion TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO users (username, email, avatar, role) VALUES
('Thao', 'member1@example.com', 'https://i.pravatar.cc/120?img=12', 'member'),
('Admin', 'admin@example.com', 'https://i.pravatar.cc/120?img=3', 'admin')
ON DUPLICATE KEY UPDATE username = VALUES(username);

INSERT INTO categories (name, slug) VALUES
('Sneaker Cao Cap', 'sneaker-cao-cap'),
('Sneaker Chay Bo', 'sneaker-chay-bo'),
('Sneaker Streetwear', 'sneaker-streetwear')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO products (name, description, category_id, price, stock, sales_count, views_count, images, attributes, is_promotion)
VALUES
('Apex Prime Leather', 'Sneaker da that cao cap, em chan va ben bi.', 1, 3200000, 20, 180, 1600,
 JSON_ARRAY('https://picsum.photos/id/21/1200/900','https://picsum.photos/id/26/1200/900'),
 JSON_OBJECT('color', 'White/Red', 'material', 'Leather'), 1),
('Velocity Run X', 'Toi uu cho chay bo duong dai.', 2, 2600000, 35, 220, 2400,
 JSON_ARRAY('https://picsum.photos/id/30/1200/900','https://picsum.photos/id/42/1200/900'),
 JSON_OBJECT('color', 'Black', 'material', 'Mesh'), 0),
('Urban Hype 77', 'Thiet ke streetwear tre trung.', 3, 2100000, 0, 300, 2800,
 JSON_ARRAY('https://picsum.photos/id/60/1200/900','https://picsum.photos/id/96/1200/900'),
 JSON_OBJECT('color', 'Cream', 'material', 'Canvas'), 1);


USE single_product_shop;

UPDATE products
SET images = JSON_ARRAY('https://picsum.photos/id/21/1200/900','https://picsum.photos/id/26/1200/900')
WHERE id = 1;

UPDATE products
SET images = JSON_ARRAY('https://picsum.photos/id/30/1200/900','https://picsum.photos/id/42/1200/900')
WHERE id = 2;

UPDATE products
SET images = JSON_ARRAY('https://picsum.photos/id/60/1200/900','https://picsum.photos/id/96/1200/900')
WHERE id = 3;