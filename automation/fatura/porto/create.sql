CREATE SCHEMA `import_invoice` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE `import_invoice`.`new_table` (
  `id` INT NOT NULL,
  `data` VARCHAR(20) NULL,
  `empresa` VARCHAR(100) NULL,
  `debito` VARCHAR(20) NULL,
  `tipo` VARCHAR(20) NULL,
  `parcelado` VARCHAR(10) NULL,
  `parcela_atual` VARCHAR(5) NULL,
  `parcelas` VARCHAR(5) NULL,
  `ultima_parcela` VARCHAR(5) NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `import_invoice`.`new_table` 
RENAME TO  `import_invoice`.`invoice` ;

ALTER TABLE `import_invoice`.`invoice` 
CHANGE COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT ;

ALTER TABLE `import_invoice`.`invoice` 
ADD COLUMN `fatura_id` VARCHAR(45) NULL AFTER `ultima_parcela`;