-- TRUNCATE TABLE `dmaps`.`company_users`;

-- ALTER TABLE `dmaps`.`company_users` 
-- ADD COLUMN `User_Password` VARCHAR(45) NOT NULL AFTER `User_Login_ID`,
-- ADD UNIQUE INDEX `User_Name_UNIQUE` (`User_Name` ASC) VISIBLE,
-- ADD UNIQUE INDEX `User_Employee_Id_UNIQUE` (`User_Employee_Id` ASC) VISIBLE,
-- ADD UNIQUE INDEX `Mail_Id_UNIQUE` (`Mail_Id` ASC) VISIBLE,
-- ADD UNIQUE INDEX `User_Login_ID_UNIQUE` (`User_Login_ID` ASC) VISIBLE;
-- ;

-- ALTER TABLE `dmaps`.`company_users` 
-- ADD COLUMN `User_Profile` LONGTEXT NULL AFTER `Updated_By`;

-- ALTER TABLE `dmaps`.`company_users` 
-- CHANGE COLUMN `User_Profile` `User_Profile` LONGTEXT NULL DEFAULT NULL AFTER `User_Name`;

-- ALTER TABLE `dmaps`.`company_users` 
-- CHANGE COLUMN `User_Login_ID` `User_Login_ID` VARCHAR(45) NOT NULL ,
-- DROP INDEX `User_Name_UNIQUE` ;

-- CREATE TABLE dmaps.state (                                                                    
--           `State_Id` INT(11) NOT NULL AUTO_INCREMENT,                                              
--           `Country_Id` INT(11) NOT NULL,                                                           
--           `State_Name` VARCHAR(50) NOT NULL,                                                       
--           `Notes` LONGTEXT,                                                                       
--           `Changed_By` VARCHAR(50) DEFAULT NULL,                                                   
--           `Change_Date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  
--           PRIMARY KEY  (`State_Id`));

INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Andhra Pradesh',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Assam',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Arunachal Pradesh',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Gujrat',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Bihar',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Haryana',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Himachal Pradesh',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Jammu & Kashmir',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Karnataka',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Kerala',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Madhya Pradesh',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Maharashtra',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Manipur',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Meghalaya',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Mizoram',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Nagaland',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Orissa',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Punjab',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Rajasthan',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Sikkim',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Tamil Nadu',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Telangana',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Tripura',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Uttar Pradesh',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','West Bengal',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Delhi',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Goa',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Pondichery',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Lakshdweep',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Daman & Diu',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Dadra & Nagar',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Chandigarh',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Andaman & Nicobar',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Uttaranchal',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Jharkhand',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','Chattisgarh',NULL,'Yogesh',CURRENT_TIMESTAMP);


CREATE TABLE `dmaps`.`buyer_groups` (
  `Buyer_Group_Id` INT NOT NULL,
  `Buyer_Group_Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Buyer_Group_Name`),
  UNIQUE INDEX `Buyer_Group_Name_UNIQUE` (`Buyer_Group_Name` ASC) VISIBLE);

ALTER TABLE `dmaps`.`buyer_groups` 
CHANGE COLUMN `Buyer_Group_Id` `Buyer_Group_Id` INT NOT NULL AUTO_INCREMENT ,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`Buyer_Group_Id`, `Buyer_Group_Name`);
;

ALTER TABLE `dmaps`.`buyer_groups` 
DROP PRIMARY KEY,
ADD PRIMARY KEY (`Buyer_Group_Id`);
;

INSERT INTO `dmaps`.`buyer_groups` (`Buyer_Group_Name`) VALUES ('Levis');
INSERT INTO `dmaps`.`buyer_groups` (`Buyer_Group_Name`) VALUES ('Mexx');

CREATE TABLE `dmaps`.`buyers` (
  `Buyer_Id` INT NOT NULL,
  `Buyer_Name` VARCHAR(45) NOT NULL,
  `Buyer_Email_Id` VARCHAR(45) NOT NULL,
  `Buyer_Contact_No` INT NOT NULL,
  PRIMARY KEY (`Buyer_Id`));

ALTER TABLE `dmaps`.`buyers` 
CHANGE COLUMN `Buyer_Id` `Buyer_Id` INT NOT NULL AUTO_INCREMENT ;

ALTER TABLE `dmaps`.`buyers` 
ADD COLUMN `Buyer_Group_Name` VARCHAR(45) NOT NULL AFTER `Buyer_Id`;

ALTER TABLE `dmaps`.`buyers` 
CHANGE COLUMN `Buyer_Contact_No` `Buyer_Contact_No` VARCHAR(15) NOT NULL ;
