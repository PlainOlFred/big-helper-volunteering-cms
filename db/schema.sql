-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema big_helper_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema big_helper_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `big_helper_db` DEFAULT CHARACTER SET utf8 ;
USE `big_helper_db` ;

-- -----------------------------------------------------
-- Table `big_helper_db`.`project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `big_helper_db`.`project` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `date_started` DATETIME NOT NULL,
  `date_target` DATETIME NULL,
  `date_completed` DATETIME NULL,
  `description` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `title_UNIQUE` (`title` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `big_helper_db`.`team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `big_helper_db`.`team` (
  `team_id` INT NOT NULL,
  PRIMARY KEY (`team_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `big_helper_db`.`volunteer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `big_helper_db`.`volunteer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `location_role` VARCHAR(45) NULL,
  `team_team_id` INT NOT NULL,
  PRIMARY KEY (`id`, `team_team_id`),
  INDEX `fk_volunteer_team1_idx` (`team_team_id` ASC) VISIBLE,
  CONSTRAINT `fk_volunteer_team1`
    FOREIGN KEY (`team_team_id`)
    REFERENCES `big_helper_db`.`team` (`team_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `big_helper_db`.`project_has_volunteer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `big_helper_db`.`project_has_volunteer` (
  `project_id` INT NOT NULL,
  `volunteer_id` INT NOT NULL,
  PRIMARY KEY (`project_id`, `volunteer_id`),
  INDEX `fk_project_has_volunteer_volunteer1_idx` (`volunteer_id` ASC) VISIBLE,
  INDEX `fk_project_has_volunteer_project_idx` (`project_id` ASC) VISIBLE,
  CONSTRAINT `fk_project_has_volunteer_project`
    FOREIGN KEY (`project_id`)
    REFERENCES `big_helper_db`.`project` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_project_has_volunteer_volunteer1`
    FOREIGN KEY (`volunteer_id`)
    REFERENCES `big_helper_db`.`volunteer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `big_helper_db`.`team_member`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `big_helper_db`.`team_member` (
  `volunteer_id` INT NOT NULL,
  PRIMARY KEY (`volunteer_id`),
  CONSTRAINT `fk_team_meber_volunteer1`
    FOREIGN KEY (`volunteer_id`)
    REFERENCES `big_helper_db`.`volunteer` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `big_helper_db`.`team_super`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `big_helper_db`.`team_super` (
  `volunteer_id` INT NOT NULL,
  PRIMARY KEY (`volunteer_id`),
  CONSTRAINT `fk_team_super_volunteer1`
    FOREIGN KEY (`volunteer_id`)
    REFERENCES `big_helper_db`.`volunteer` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `big_helper_db`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `big_helper_db`.`admin` (
  `volunteer_id` INT NOT NULL,
  PRIMARY KEY (`volunteer_id`),
  CONSTRAINT `fk_admin_volunteer1`
    FOREIGN KEY (`volunteer_id`)
    REFERENCES `big_helper_db`.`volunteer` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `big_helper_db`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `big_helper_db`.`customer` (
  `customer_id` INT NOT NULL,
  PRIMARY KEY (`customer_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `big_helper_db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `big_helper_db`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NULL,
  `user_email` VARCHAR(45) NULL,
  `user_password` VARCHAR(45) NULL,
  `volunteer_id` INT NOT NULL,
  `volunteer_team_team_id` INT NOT NULL,
  `customer_customer_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `volunteer_id`, `volunteer_team_team_id`, `customer_customer_id`),
  INDEX `fk_user_volunteer1_idx` (`volunteer_id` ASC, `volunteer_team_team_id` ASC) VISIBLE,
  INDEX `fk_user_customer1_idx` (`customer_customer_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_volunteer1`
    FOREIGN KEY (`volunteer_id` , `volunteer_team_team_id`)
    REFERENCES `big_helper_db`.`volunteer` (`id` , `team_team_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_customer1`
    FOREIGN KEY (`customer_customer_id`)
    REFERENCES `big_helper_db`.`customer` (`customer_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `big_helper_db`.`task`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `big_helper_db`.`task` (
  `task_id` INT NOT NULL,
  `project_id` INT NOT NULL,
  `task_description` VARCHAR(45) NULL,
  `task_isDone` TINYINT NULL DEFAULT 0,
  `task_start` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `test_complete` DATETIME NULL,
  PRIMARY KEY (`task_id`, `project_id`),
  INDEX `fk_task_project1_idx` (`project_id` ASC) VISIBLE,
  CONSTRAINT `fk_task_project1`
    FOREIGN KEY (`project_id`)
    REFERENCES `big_helper_db`.`project` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `big_helper_db`.`task_has_volunteer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `big_helper_db`.`task_has_volunteer` (
  `task_task_id` INT NOT NULL,
  `volunteer_id` INT NOT NULL,
  PRIMARY KEY (`task_task_id`, `volunteer_id`),
  INDEX `fk_task_has_volunteer_volunteer1_idx` (`volunteer_id` ASC) VISIBLE,
  INDEX `fk_task_has_volunteer_task1_idx` (`task_task_id` ASC) VISIBLE,
  CONSTRAINT `fk_task_has_volunteer_task1`
    FOREIGN KEY (`task_task_id`)
    REFERENCES `big_helper_db`.`task` (`task_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_task_has_volunteer_volunteer1`
    FOREIGN KEY (`volunteer_id`)
    REFERENCES `big_helper_db`.`volunteer` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
