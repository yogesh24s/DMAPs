-- Profile Remarks query

ALTER TABLE `dev_hris`.`employee` 
ADD COLUMN `remarks` TEXT NULL AFTER `Mentor`;


CREATE TABLE `dev_hris`.`employee_transfer` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `Employee_Id` VARCHAR(45) NULL,
    `Start_Date` DATE NULL,
    `End_Date` DATE NULL,
    `Transfer_Type` VARCHAR(45) NULL,
    `created_at` VARCHAR(45) NULL,
    `created_by` VARCHAR(45) NULL,
    `updated_at` VARCHAR(45) NULL,
    `updated_by` VARCHAR(45) NULL,
    `deleted_at` VARCHAR(45) NULL,
    `deleted_by` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

  ALTER TABLE `dev_hris`.`employee_transfer` 
ADD COLUMN `Location` VARCHAR(45) NULL DEFAULT NULL AFTER `deleted_by`;

