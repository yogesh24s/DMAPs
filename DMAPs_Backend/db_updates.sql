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

ALTER TABLE `dmaps`.`company_users` 
CHANGE COLUMN `User_Login_ID` `User_Login_ID` VARCHAR(45) NOT NULL ,
DROP INDEX `User_Name_UNIQUE` ;

CREATE TABLE dmaps.state (                                                                    
          `State_Id` INT(11) NOT NULL AUTO_INCREMENT,                                              
          `Country_Id` INT(11) NOT NULL,                                                           
          `State_Name` VARCHAR(50) NOT NULL,                                                       
          `Notes` LONGTEXT,                                                                       
          `Changed_By` VARCHAR(50) DEFAULT NULL,                                                   
          `Change_Date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  
          PRIMARY KEY  (`State_Id`));

INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','ANDHRA PRADESH',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','ASSAM',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','ARUNACHAL PRADESH',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','GUJRAT',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','BIHAR',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','HARYANA',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','HIMACHAL PRADESH',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','JAMMU & KASHMIR',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','KARNATAKA',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','KERALA',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','MADHYA PRADESH',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','MAHARASHTRA',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','MANIPUR',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','MEGHALAYA',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','MIZORAM',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','NAGALAND',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','ORISSA',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','PUNJAB',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','RAJASTHAN',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','SIKKIM',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','TAMIL NADU',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','TELANGANA',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','TRIPURA',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','UTTAR PRADESH',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','WEST BENGAL',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','DELHI',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','GOA',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','PONDICHERY',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','LAKSHDWEEP',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','DAMAN & DIU',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','DADRA & NAGAR',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','CHANDIGARH',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','ANDAMAN & NICOBAR',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','UTTARANCHAL',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','JHARKHAND',NULL,'Yogesh',CURRENT_TIMESTAMP);
INSERT INTO dmaps.state (`State_Id`,`Country_Id`,`State_Name`,`Notes`,`Changed_By`,`Change_Date`) VALUES ( NULL,'1','CHATTISGARH',NULL,'Yogesh',CURRENT_TIMESTAMP);
