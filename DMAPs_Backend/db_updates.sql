CREATE DATABASE `dmaps` DEFAULT CHARACTER SET utf8;

CREATE TABLE `dmaps`.`company` (
  `unit_fullname` VARCHAR(32) NULL,
  `unit_shortname` VARCHAR(32) NOT NULL,
  `group` VARCHAR(32) NULL,
  `division` VARCHAR(32) NULL,
  `tin_no` INT(11) NULL,
  `reg_no` VARCHAR(32) NULL,
  `address_line1` VARCHAR(32) NULL,
  `address_line2` VARCHAR(32) NULL,
  `street` VARCHAR(32) NULL,
  `city` VARCHAR(32) NULL,
  `state` VARCHAR(32) NULL,
  `pin_code` INT(6) NULL,
  `contact_no` INT(10) NULL,
  `email_id` VARCHAR(32) NULL,
  `website` VARCHAR(32) NULL,
  `company_logo` VARCHAR(32) NULL,
  PRIMARY KEY (`unit_shortname`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `dmaps`.`user` (
  `unit_shortname_fk` VARCHAR(32) NOT NULL,
  `user_name` VARCHAR(16) NULL,
  `employee_id` VARCHAR(16) NULL,
  `department` VARCHAR(16) NULL,
  `designation` VARCHAR(16) NULL,
  `mobile_no` INT(10) NULL,
  `email_id` VARCHAR(32) NULL,
  `user_role` VARCHAR(32) NULL,
  `status` VARCHAR(16) NULL,
  `created_date` DATE NULL,
  `user_id` VARCHAR(16) NULL,
  `password` VARCHAR(16) NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `dmaps`.`department` (
  `department_id` VARCHAR(32) NOT NULL,
  `department_name` VARCHAR(32) NULL,
  PRIMARY KEY (`department_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `dmaps`.`designation` (
  `designation_id` VARCHAR(8) NOT NULL,
  `designation_title` VARCHAR(32) NULL,
  `division` VARCHAR(32) NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `dmaps`.`user_credentials` (
  `id` INT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` TINYTEXT NULL,
  `last_password_changed_at` DATETIME NULL,
  `created_at` DATETIME NULL,
  `created_by` VARCHAR(45) NULL,
  PRIMARY KEY (`username`));


ALTER TABLE `dmaps`.`user` 
ADD COLUMN `login_access` VARCHAR(45) NULL AFTER `password`;

ALTER TABLE `dmaps`.`company` 
ADD COLUMN `Unit_Id` INT NOT NULL FIRST,
ADD COLUMN `Fax_No` INT NULL AFTER `Company_Logo`,
ADD COLUMN `Mail_Id` VARCHAR(32) NULL AFTER `Fax_No`,
CHANGE COLUMN `unit_fullname` `Unit_Full_Name` VARCHAR(100) NULL DEFAULT NULL ,
CHANGE COLUMN `unit_shortname` `Unit_Short_Name` VARCHAR(32) NULL ,
CHANGE COLUMN `group` `Group_Id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `division` `Division_Id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `tin_no` `Tin_Num` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `reg_no` `Reg_Num` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `address_line1` `Address_Line_1` VARCHAR(200) NULL DEFAULT NULL ,
CHANGE COLUMN `address_line2` `Address_Line_2` VARCHAR(200) NULL DEFAULT NULL ,
CHANGE COLUMN `street` `Street` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `city` `City` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `state` `State` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `pin_code` `Pin_Code` INT NULL DEFAULT NULL ,
CHANGE COLUMN `contact_no` `Contact_No` INT NULL DEFAULT NULL ,
CHANGE COLUMN `email_id` `Email_Id` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `website` `Website_Link` VARCHAR(32) NULL DEFAULT NULL ,
CHANGE COLUMN `company_logo` `Company_Logo` VARCHAR(32) NULL DEFAULT NULL ,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`Unit_Id`),
ADD UNIQUE INDEX `Unit_Short_Name_UNIQUE` (`Unit_Short_Name` ASC) VISIBLE;
;

ALTER TABLE `dmaps`.`company` 
RENAME TO  `dmaps`.`company_units` ;

ALTER TABLE `dmaps`.`department` 
CHANGE COLUMN `department_id` `Department_Id` INT NOT NULL ,
CHANGE COLUMN `department_name` `Department_Name` VARCHAR(32) NULL DEFAULT NULL ;

ALTER TABLE `dmaps`.`designation` 
DROP COLUMN `division`,
CHANGE COLUMN `designation_id` `Devision_Id` INT NOT NULL ,
CHANGE COLUMN `designation_title` `Devision_Name` VARCHAR(32) NULL DEFAULT NULL ,
ADD PRIMARY KEY (`Devision_Id`);
;


ALTER TABLE `dmaps`.`user` 
CHANGE COLUMN `unit_shortname_fk` `Unit_Short_Name` VARCHAR(32) NOT NULL ,
CHANGE COLUMN `user_id` `User_Id` VARCHAR(16) NOT NULL ,
CHANGE COLUMN `user_name` `User_Name` VARCHAR(16) NOT NULL ,
CHANGE COLUMN `employee_id` `Employee_Id` VARCHAR(16) NOT NULL ,
CHANGE COLUMN `department` `Department_Id` VARCHAR(16) NOT NULL ,
CHANGE COLUMN `designation` `Designation_Id` VARCHAR(16) NOT NULL ,
CHANGE COLUMN `mobile_no` `Mobile_Num` INT NOT NULL ,
CHANGE COLUMN `email_id` `Mail_Id` VARCHAR(32) NOT NULL ,
CHANGE COLUMN `user_role` `User_Role` VARCHAR(32) NOT NULL ,
CHANGE COLUMN `status` `Status` VARCHAR(16) NOT NULL ,
CHANGE COLUMN `created_date` `Created_Date` DATE NULL DEFAULT NULL ,
CHANGE COLUMN `password` `Password` VARCHAR(16) NULL DEFAULT NULL ,
CHANGE COLUMN `login_access` `Login_Access` VARCHAR(45) NULL DEFAULT NULL ;


ALTER TABLE `dmaps`.`company_units` 
CHANGE COLUMN `Unit_Id` `Unit_Id` INT NULL ,
CHANGE COLUMN `Unit_Short_Name` `Unit_Short_Name` VARCHAR(32) NOT NULL ,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`Unit_Short_Name`),
DROP INDEX `Unit_Short_Name_UNIQUE` ;
;

ALTER TABLE `dmaps`.`user_credentials` 
CHANGE COLUMN `id` `Id` INT NULL DEFAULT NULL ,
CHANGE COLUMN `username` `User_Name` VARCHAR(45) NOT NULL ,
CHANGE COLUMN `password` `Password` TINYTEXT NULL DEFAULT NULL ,
CHANGE COLUMN `last_password_changed_at` `Last_Password_Changed_At` DATETIME NULL DEFAULT NULL ,
CHANGE COLUMN `created_at` `Created_At` DATETIME NULL DEFAULT NULL ,
CHANGE COLUMN `created_by` `Created_By` VARCHAR(45) NULL DEFAULT NULL ;

ALTER TABLE `dmaps`.`company_units` 
ADD COLUMN `Created_By` VARCHAR(45) NULL AFTER `Created_At`,
ADD COLUMN `Updated_At` DATETIME NULL AFTER `Created_By`,
ADD COLUMN `Updated_By` VARCHAR(45) NULL AFTER `Updated_At`,
CHANGE COLUMN `Mail_Id` `Created_At` DATETIME NULL DEFAULT NULL ;

ALTER TABLE `dmaps`.`company_units` 
CHANGE COLUMN `Unit_Id` `Unit_Id` INT NOT NULL AUTO_INCREMENT ,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`Unit_Id`),
ADD UNIQUE INDEX `Unit_Short_Name_UNIQUE` (`Unit_Short_Name` ASC) VISIBLE;
;

CREATE TABLE `dmaps`.`user_role_permission` (
  `Id` INT NOT NULL,
  `Employee_Id` VARCHAR(45) NULL,
  `Model_Id` VARCHAR(45) NULL,
  `Unit_Id` VARCHAR(45) NULL,
  `Access_Permission` VARCHAR(45) NULL,
  `Role_Id` VARCHAR(45) NULL,
  PRIMARY KEY (`Id`));

  ALTER TABLE `dmaps`.`user` 
DROP COLUMN `User_Role`,
DROP COLUMN `Employee_Id`,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`User_Id`);
;

ALTER TABLE `dmaps`.`user_role_permission` 
CHANGE COLUMN `Id` `Id` INT NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `Employee_Id` `User_Id` VARCHAR(45) NULL DEFAULT NULL ;

ALTER TABLE `dmaps`.`company_units` 
CHANGE COLUMN `Contact_No` `Contact_No` VARCHAR(10) NULL DEFAULT NULL ;

ALTER TABLE `dmaps`.`user` 
CHANGE COLUMN `Password` `User_Role` VARCHAR(16) NULL DEFAULT NULL ;

ALTER TABLE `dmaps`.`user` 
CHANGE COLUMN `Mobile_Num` `Mobile_Num` VARCHAR(10) NOT NULL ;
