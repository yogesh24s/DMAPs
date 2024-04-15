UPDATE `dmaps`.`map_product_type` SET `Product_Type` = 'Men\'s Pant' WHERE (`id` = '1') and (`Product_Type` = 'Jersy');
UPDATE `dmaps`.`map_product_type` SET `Product_Type` = 'T shirt' WHERE (`id` = '2') and (`Product_Type` = 'Shirt');
UPDATE `dmaps`.`map_product_type` SET `Product_Type` = 'Polo shirt' WHERE (`id` = '3') and (`Product_Type` = 'Pant');
UPDATE `dmaps`.`map_product_type` SET `Product_Type` = 'Dress' WHERE (`id` = '4') and (`Product_Type` = 'T-Shirt');
INSERT INTO `dmaps`.`map_product_type` (`Product_Type`) VALUES ('Womens Top');
INSERT INTO `dmaps`.`map_product_type` (`Product_Type`) VALUES ('Womens Bottoms');
INSERT INTO `dmaps`.`map_product_type` (`Product_Type`) VALUES ('Kids Wear');
INSERT INTO `dmaps`.`map_product_type` (`Product_Type`) VALUES ('JP Suits');

UPDATE `dmaps`.`map_gender` SET `Gender` = 'Men\'s' WHERE (`id` = '1') and (`Gender` = 'Boy');
UPDATE `dmaps`.`map_gender` SET `Gender` = 'Women\'s' WHERE (`id` = '2') and (`Gender` = 'Girl');
DELETE FROM `dmaps`.`map_gender` WHERE (`id` = '4') and (`Gender` = 'Women');
UPDATE `dmaps`.`map_gender` SET `Gender` = 'Kids' WHERE (`id` = '3') and (`Gender` = 'Men');

CREATE TABLE `dmaps`.`map_buyer` (
  `Buyer_Id` INT NOT NULL AUTO_INCREMENT,
  `Buyer_Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Buyer_Id`, `Buyer_Name`));

INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Aarasan');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('AEO');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Big Bang London');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Carhartt');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Decathlon');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Disney');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Dunnes');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Dunnes Stores');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Dunning');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Evesyl');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Gap');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Greg Norman');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('H&M');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Izod');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Johnston & Murphy');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('K Mart');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Kenneth Cole');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Kohl\'s');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Lee');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Louis philippe');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Lucky brand');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Matalan');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Nautica');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Nike');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Old Navy');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Ostin');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Pijama');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Primark');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Ralph Lauren');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Reliance');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('RRL');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('T J Morries');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Tommy');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Tommy EUR');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Tommy IND');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Uniqlo');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Van Heusen');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Walmart');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Zara');
INSERT INTO `dmaps`.`map_buyer` (`Buyer_Name`) VALUES ('Zudio');


CREATE TABLE `dmaps`.`map_season` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Season_Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `Season_Name`));


  INSERT INTO `dmaps`.`map_season` (`Season_Name`) VALUES ('Summer 24');
INSERT INTO `dmaps`.`map_season` (`Season_Name`) VALUES ('Winter');
INSERT INTO `dmaps`.`map_season` (`Season_Name`) VALUES ('Flow');


CREATE TABLE `dmaps`.`map_size_gridname` (
  `Size_Grid_Id` INT NOT NULL AUTO_INCREMENT,
  `Size_Grid_Name` VARCHAR(45) NOT NULL,
  `Size_Grid_Value` VARCHAR(45) NULL,
  PRIMARY KEY (`Size_Grid_Id`, `Size_Grid_Name`),
  UNIQUE INDEX `Size_Grid_Name_UNIQUE` (`Size_Grid_Name` ASC) VISIBLE);
  
ALTER TABLE `dmaps`.`map_size_gridname` 
CHANGE COLUMN `Size_Grid_Name` `Size_Grid_Name` VARCHAR(200) NOT NULL ,
CHANGE COLUMN `Size_Grid_Value` `Size_Grid_Value` MEDIUMTEXT NULL DEFAULT NULL ;


-- Insert queries for the provided data
INSERT INTO  `dmaps`.`map_size_gridname` (Size_Grid_Name, Size_Grid_Value) VALUES
('0 to 20', '0,2,4,6,8,10,12,14,16,18,20'),
('00 to 20', '00'',0'',2'',4'',6'',8'',10'',12'',14'',16'',18'',20'''),
('0P TO 14P', '0P,2P,4P,6P,8P,10P,12P,14P'),
('1 to 14', '1,2,3,4,5,6,7,8,9,10,11,12,13,14'),
('14W TO 22W', '14W,16W,18W,20W,22W'),
('18/24 to 6/7', '18/24,2-Mar,3-Apr,4-May,5-Jun,6-Jul'),
('28 to 42', '28,29,30,31,32,33,34,36,38,40,42'),
('28/ 30 to 42/ 30', '28/ 30,29/ 30,30/ 30,31/ 30,32/ 30,33/ 30,34/ 30,35/ 30,36/ 30,38/30,40/ 30,42/ 30'),
('28/ 32 to 42/ 32', '28/ 32,29/ 32,30/ 32,31/ 32,32/ 32,33/ 32,34/ 32,35/ 32,36/ 32,38/32,40/ 32,42/ 32'),
('28/ 324 to 42/ 34', '28/ 34,29/ 34,30/ 34,31/ 34,32/ 34,33/ 34,34/ 34,35/ 34,36/ 34,38/34,40/ 34,42/ 34'),
('2T to 18', '2T,3T,4T,4'',5'',6'',6X,7'',8'',10'',12'',14'',16'',18'',14'),
('2T to 6x', '2T,3T,4T,4'',5'',6'',6X'),
('30 to 40', '30,32,34,36,38,40'),
('32 to 48', '32,34,36,38,40,42,44,46,48'),
('3M to 24M', '3M,6M,9M,12M,18M,24M'),
('4 to 12', '4'',5'',6'',6x,7'',8'',10'',12'''),
('4 to 20', '4,6,8,10,12,14,16,18,20'),
('6 to 20', '6,8,10,12,14,16,18,20'),
('7 to 20', '7,8,10,12,14,16,18,20'),
('8 TO 22', '8,10,12,14,16,18,20,22'),
('8/10 to 18/20', '8-Oct,10-Dec,Dec-14,14/ 16,18/ 20'),
('A to N', 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,0'),
('S to 4XL', 'S,M,L,XL,XXL,3XL,4XL'),
('XS to XXL', 'XS,S,M,L,XL,XXL,XXXL'),
('XS to XXL T', 'XS,S,M,L,XL,XXL,XXXL,M T,L T,XL T'),
('XS(2) to XXL(20)', 'XS(2),S(6),M(10),L(14),XL(18),XXL(20)'),
('XS/P TO 3XL/P', 'XS/P,S/P,M/P,L/P,XL/P,XXL/P,3XL/P'),
('XXS to XXL', 'XXS,XS,S,M,L,XL,XXL'),
('Xxsp to xxLp', 'XXSP,XSP,SP,MP,LP,XLP,XXLP');

ALTER TABLE `dmaps`.`style_entry` 
DROP PRIMARY KEY,
ADD PRIMARY KEY (`Style_Entry_Id`, `Style_No`);
;

ALTER TABLE `dmaps`.`style_entry` 
CHANGE COLUMN `Style_No` `Style_No` INT NOT NULL ;

ALTER TABLE `dmaps`.`style_entry` 
CHANGE COLUMN `Buyer_Group_Id` `Buyer_Id` VARCHAR(45) NOT NULL ;

ALTER TABLE `dmaps`.`style_entry` 
CHANGE COLUMN `Buyer_Id` `Buyer_Group_Id` VARCHAR(45) NOT NULL ;
