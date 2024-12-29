ALTER TABLE `dmaps`.`style_entry` 
ADD COLUMN `Add_On_Field` VARCHAR(45) NULL AFTER `Style_Images`;

ALTER TABLE `dmaps`.`production_order_details` 
ADD COLUMN `PO_Add_On_Field_1` VARCHAR(45) NULL AFTER `Garment_Data`,
ADD COLUMN `PO_Add_On_Field_2` VARCHAR(45) NULL AFTER `PO_Add_On_Field_1`;

CREATE TABLE `dmaps`.`map_shipment_mode` (
  `id` INT NOT NULL,
  `Shipment_Name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`, `Shipment_Name`));

ALTER TABLE `dmaps`.`map_shipment_mode` 
CHANGE COLUMN `id` `id` INT NOT NULL AUTO_INCREMENT ;

CREATE TABLE `dmaps`.`map_garment_color` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Color_Code` VARCHAR(45) NOT NULL,
  `Color_Name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`, `Color_Code`));

CREATE TABLE `dmaps`.`map_tod` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `TOD_Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `TOD_Name`));

INSERT INTO `dmaps`.`map_tod` (`TOD_Name`) VALUES ('A');
INSERT INTO `dmaps`.`map_tod` (`TOD_Name`) VALUES ('B');
INSERT INTO `dmaps`.`map_tod` (`TOD_Name`) VALUES ('C');
INSERT INTO `dmaps`.`map_tod` (`TOD_Name`) VALUES ('D');
INSERT INTO `dmaps`.`map_tod` (`TOD_Name`) VALUES ('E');
INSERT INTO `dmaps`.`map_tod` (`TOD_Name`) VALUES ('F');
INSERT INTO `dmaps`.`map_tod` (`TOD_Name`) VALUES ('G');
INSERT INTO `dmaps`.`map_tod` (`TOD_Name`) VALUES ('H');
INSERT INTO `dmaps`.`map_tod` (`TOD_Name`) VALUES ('I');
INSERT INTO `dmaps`.`map_tod` (`TOD_Name`) VALUES ('J');
INSERT INTO `dmaps`.`map_tod` (`TOD_Name`) VALUES ('K');
INSERT INTO `dmaps`.`map_tod` (`TOD_Name`) VALUES ('L');
INSERT INTO `dmaps`.`map_tod` (`TOD_Name`) VALUES ('M');
INSERT INTO `dmaps`.`map_tod` (`TOD_Name`) VALUES ('N');
INSERT INTO `dmaps`.`map_tod` (`TOD_Name`) VALUES ('O');
INSERT INTO `dmaps`.`map_tod` (`TOD_Name`) VALUES ('P');
INSERT INTO `dmaps`.`map_tod` (`TOD_Name`) VALUES ('Q');

CREATE TABLE `dmaps`.`map_country` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Country_Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `Country_Name`),
  UNIQUE INDEX `Country_Name_UNIQUE` (`Country_Name` ASC) VISIBLE);

INSERT INTO `dmaps`.`map_country` (`Country_Name`) VALUES ('India');
INSERT INTO `dmaps`.`map_country` (`Country_Name`) VALUES ('USA');
INSERT INTO `dmaps`.`map_country` (`Country_Name`) VALUES ('CHINA');
INSERT INTO `dmaps`.`map_country` (`Country_Name`) VALUES ('UK');

ALTER TABLE `dmaps`.`production_order_details` 
ADD COLUMN `Ex_Delivery_date` VARCHAR(45) NULL AFTER `Shipment_Mode`;

ALTER TABLE `dmaps`.`production_order_details` 
ADD COLUMN `DMAPs_PO_No` VARCHAR(45) NULL AFTER `PO_Add_On_Field_2`,
ADD UNIQUE INDEX `DMAPs_PO_No_UNIQUE` (`DMAPs_PO_No` ASC) VISIBLE;

ALTER TABLE `dmaps`.`production_order_details` 
CHANGE COLUMN `DMAPs_PO_No` `DMAPs_PO_No` VARCHAR(45) NULL DEFAULT NULL AFTER `Style_No`;

ALTER TABLE `dmaps`.`production_order_details` 
CHANGE COLUMN `DMAPs_PO_No` `DMAPs_PO_No` VARCHAR(90) NULL DEFAULT NULL ;

ALTER TABLE `dmaps`.`production_order_details` 
CHANGE COLUMN `Ex_Delivery_date` `Ex_Delivery_Date` VARCHAR(45) NULL DEFAULT NULL ;
