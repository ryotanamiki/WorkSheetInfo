-- Active: 1695272844337@@localhost@3306@info_db
CREATE TABLE worksheet(
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    name VARCHAR(255),
    kana VARCHAR(255),
    gender VARCHAR(10),
    email VARCHAR(255),
    address VARCHAR(255),
    phone VARCHAR(20),
    source TEXT,
    inquiry TEXT
) COMMENT '';