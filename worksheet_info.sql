-- データベースの作成
CREATE DATABASE worksheet_db;

-- データベースを選択
USE worksheet_db;

-- テーブルの作成
CREATE TABLE worksheet (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    kana VARCHAR(255) NOT NULL,
    gender ENUM('男', '女') NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    source VARCHAR(255),
    inquiry TEXT
);
