TRUNCATE TABLE `dmaps`.`company_users`;

ALTER TABLE `dmaps`.`company_users` 
ADD COLUMN `User_Password` VARCHAR(45) NOT NULL AFTER `User_Login_ID`,
ADD UNIQUE INDEX `User_Name_UNIQUE` (`User_Name` ASC) VISIBLE,
ADD UNIQUE INDEX `User_Employee_Id_UNIQUE` (`User_Employee_Id` ASC) VISIBLE,
ADD UNIQUE INDEX `Mail_Id_UNIQUE` (`Mail_Id` ASC) VISIBLE,
ADD UNIQUE INDEX `User_Login_ID_UNIQUE` (`User_Login_ID` ASC) VISIBLE;
;
