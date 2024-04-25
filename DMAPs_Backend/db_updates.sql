ALTER TABLE `dmaps`.`style_entry` 
DROP COLUMN `Style_Entry_Id`,
CHANGE COLUMN `Style_No` `Style_No` INT NOT NULL AUTO_INCREMENT FIRST,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`Style_No`);
;

ALTER TABLE `dmaps`.`style_entry` 
CHANGE COLUMN `Style_No` `Style_No` INT(6) NOT NULL ;


ALTER TABLE `dmaps`.`production_order_details` 
ADD COLUMN `Garment_Data` MEDIUMTEXT NULL AFTER `Note`;

ALTER TABLE `dmaps`.`style_entry` 
CHANGE COLUMN `Style_No` `Style_No` INT NOT NULL AUTO_INCREMENT ;

