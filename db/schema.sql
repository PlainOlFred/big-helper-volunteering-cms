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
-- Table `big_helper_db`.`charity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `big_helper_db`.`charity` (
  `charity_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`charity_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
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
  `charity_charity_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_volunteer_team1_idx` (`team_team_id` ASC) VISIBLE,
  INDEX `fk_volunteer_charity1_idx` (`charity_charity_id` ASC) VISIBLE,
  CONSTRAINT `fk_volunteer_team1`
    FOREIGN KEY (`team_team_id`)
    REFERENCES `big_helper_db`.`team` (`team_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_volunteer_charity1`
    FOREIGN KEY (`charity_charity_id`)
    REFERENCES `big_helper_db`.`charity` (`charity_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `big_helper_db`.`team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `big_helper_db`.`team` (
  `team_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `team_leader` INT NOT NULL,
  PRIMARY KEY (`team_id`),
  INDEX `team_leader_fk_idx` (`team_leader` ASC) VISIBLE,
  CONSTRAINT `team_leader_fk`
    FOREIGN KEY (`team_leader`)
    REFERENCES `big_helper_db`.`volunteer` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `big_helper_db`.`project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `big_helper_db`.`project` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `date_started` DATETIME NOT NULL,
  `date_target` DATETIME NULL,
  `date_completed` DATETIME NULL,
  `description` VARCHAR(100) NULL,
  `charity_charity_id` INT NOT NULL,
  `team_team_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `title_UNIQUE` (`name` ASC) VISIBLE,
  INDEX `fk_project_charity1_idx` (`charity_charity_id` ASC) VISIBLE,
  INDEX `fk_project_team1_idx` (`team_team_id` ASC) VISIBLE,
  CONSTRAINT `fk_project_charity1`
    FOREIGN KEY (`charity_charity_id`)
    REFERENCES `big_helper_db`.`charity` (`charity_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_project_team1`
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
  INDEX `fk_project_has_volunteer_volunteer1_idx` (`volunteer_id` ASC) VISIBLE,
  INDEX `fk_project_has_volunteer_project_idx` (`project_id` ASC) VISIBLE,
  PRIMARY KEY (`project_id`, `volunteer_id`),
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
-- Table `big_helper_db`.`task`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `big_helper_db`.`task` (
  `task_id` INT NOT NULL,
  `project_id` INT NOT NULL,
  `volunteer_id` INT NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`task_id`),
  INDEX `fk_task_project1_idx` (`project_id` ASC) VISIBLE,
  INDEX `fk_task_volunteer1_idx` (`volunteer_id` ASC) VISIBLE,
  CONSTRAINT `fk_task_project1`
    FOREIGN KEY (`project_id`)
    REFERENCES `big_helper_db`.`project` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_task_volunteer1`
    FOREIGN KEY (`volunteer_id`)
    REFERENCES `big_helper_db`.`volunteer` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
