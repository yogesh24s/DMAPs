CREATE TABLE `dmaps`.`style_entry` (
  `Style_Entry_Id` INT NOT NULL,
  `Buyer_Id` INT NOT NULL,
  `Buyer_Order_Ref_No` VARCHAR(45) NOT NULL,
  `Style_No` VARCHAR(45) NOT NULL,
  `Style_Description` VARCHAR(200) NULL,
  `Size_Grid` VARCHAR(45) NULL,
  `Product_Type` VARCHAR(45) NULL,
  `Gender` VARCHAR(45) NULL,
  `Season` VARCHAR(45) NULL,
  `Marchant_Name` VARCHAR(45) NULL,
  `Marchant_Contact` VARCHAR(45) NULL,
  `Note` LONGTEXT NULL,
  PRIMARY KEY (`Style_Entry_Id`),
  UNIQUE INDEX `Style_No_UNIQUE` (`Style_No` ASC) VISIBLE,
  UNIQUE INDEX `Buyer_Order_Ref_No_UNIQUE` (`Buyer_Order_Ref_No` ASC) VISIBLE);


ALTER TABLE `dmaps`.`style_entry` 
ADD COLUMN `Buyer_Group_Name` VARCHAR(45) NULL AFTER `Buyer_Group_Id`,
CHANGE COLUMN `Buyer_Id` `Buyer_Group_Id` INT NOT NULL ;

ALTER TABLE `dmaps`.`style_entry` 
DROP COLUMN `Buyer_Group_Name`;

ALTER TABLE `dmaps`.`style_entry` 
CHANGE COLUMN `Style_Entry_Id` `Style_Entry_Id` INT NOT NULL AUTO_INCREMENT ;

ALTER TABLE `dmaps`.`style_entry` 
CHANGE COLUMN `Marchant_Name` `Marchent_Name` VARCHAR(45) NULL DEFAULT NULL ,
CHANGE COLUMN `Marchant_Contact` `Marchent_Contact` VARCHAR(45) NULL DEFAULT NULL ;

ALTER TABLE `dmaps`.`style_entry` 
ADD COLUMN `Style_Images` LONGTEXT NULL AFTER `Note`;

CREATE TABLE `dmaps`.`map_size_grid` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Size_Grid` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `Size_Grid`),
  UNIQUE INDEX `Size_Grid_UNIQUE` (`Size_Grid` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

INSERT INTO `dmaps`.`map_size_grid` (`Size_Grid`) VALUES ('M');
INSERT INTO `dmaps`.`map_size_grid` (`Size_Grid`) VALUES ('L');
INSERT INTO `dmaps`.`map_size_grid` (`Size_Grid`) VALUES ('XL');
INSERT INTO `dmaps`.`map_size_grid` (`Size_Grid`) VALUES ('XXL');

CREATE TABLE `dmaps`.`map_product_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Product_Type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `Product_Type`));


INSERT INTO `dmaps`.`map_product_type` (`Product_Type`) VALUES ('Jersy');
INSERT INTO `dmaps`.`map_product_type` (`Product_Type`) VALUES ('Shirt');
INSERT INTO `dmaps`.`map_product_type` (`Product_Type`) VALUES ('Pant');
INSERT INTO `dmaps`.`map_product_type` (`Product_Type`) VALUES ('T-Shirt');


CREATE TABLE `dmaps`.`map_gender` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Gender` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `Gender`));

INSERT INTO `dmaps`.`map_gender` (`Gender`) VALUES ('Boy');
INSERT INTO `dmaps`.`map_gender` (`Gender`) VALUES ('Girl');
INSERT INTO `dmaps`.`map_gender` (`Gender`) VALUES ('Men');
INSERT INTO `dmaps`.`map_gender` (`Gender`) VALUES ('Women');

CREATE TABLE `dmaps`.`map_emb_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Emb_Type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `Emb_Type`));

INSERT INTO `dmaps`.`map_emb_type` (`Emb_Type`) VALUES ('A');
INSERT INTO `dmaps`.`map_emb_type` (`Emb_Type`) VALUES ('B');
INSERT INTO `dmaps`.`map_emb_type` (`Emb_Type`) VALUES ('C');

CREATE TABLE `dmaps`.`map_washing_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Washing_Type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `Washing_Type`));

INSERT INTO `dmaps`.`map_washing_type` (`Washing_Type`) VALUES ('Water');
INSERT INTO `dmaps`.`map_washing_type` (`Washing_Type`) VALUES ('DRY');

CREATE TABLE `dmaps`.`map_print_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Print_Type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `Print_Type`));

INSERT INTO `dmaps`.`map_print_type` (`Print_Type`) VALUES ('Dark');
INSERT INTO `dmaps`.`map_print_type` (`Print_Type`) VALUES ('White');

CREATE TABLE `dmaps`.`production_order_details` (
  `PO_Id` INT NOT NULL AUTO_INCREMENT,
  `Style_No` VARCHAR(45) NULL,
  `PO_No` VARCHAR(45) NOT NULL,
  `OC_No` VARCHAR(45) NULL,
  `Emb_Type` VARCHAR(45) NULL,
  `Print_Type` VARCHAR(45) NULL,
  `Washing_Type` VARCHAR(45) NULL,
  `Others` VARCHAR(45) NULL,
  `Shipment_Mode` VARCHAR(45) NULL,
  `Delivery_Date` VARCHAR(45) NULL,
  `PCD` VARCHAR(45) NULL,
  `Mote` VARCHAR(45) NULL,
  PRIMARY KEY (`PO_Id`, `PO_No`));

ALTER TABLE `dmaps`.`production_order_details` 
ADD COLUMN `F_PO_No` VARCHAR(45) NULL AFTER `Style_No`;

ALTER TABLE `dmaps`.`production_order_details` 
CHANGE COLUMN `Mote` `Note` VARCHAR(45) NULL DEFAULT NULL ;

CREATE TABLE `dmaps`.`po_garment_details` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `PO_Id` INT NULL,
  `Garment_Color` VARCHAR(45) NULL,
  `Destination_Country` VARCHAR(45) NULL,
  `PO_No` VARCHAR(45) NULL,
  `XS` FLOAT NULL,
  `S` FLOAT NULL,
  `M` FLOAT NULL,
  `L` FLOAT NULL,
  `XL` FLOAT NULL,
  `Total` FLOAT NULL,
  PRIMARY KEY (`id`));











