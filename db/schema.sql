DROP DATABASE IF EXISTS big_helper;
CREATE DATABASE big_helper;

USE big_helper;

CREATE TABLE volunteer (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role VARCHAR(50) -- ["VOLUNTEER", "TEAM_LEADER", "SUPER", "ADMIN"]
);

CREATE TABLE project (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(50),
    team_lead_id INT,
    INDEX team_lead_index (team_lead_id),
    CONSTRAINT fk_team_lead FOREIGN KEY (team_lead_id) REFERENCES volunteer(id) ON DELETE SET NULL
);