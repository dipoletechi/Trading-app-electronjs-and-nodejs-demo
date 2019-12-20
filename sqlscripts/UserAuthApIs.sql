CREATE TABLE `UserAuthToken` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `AuthToken` varchar(45) DEFAULT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `ExpiresOn` datetime DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
);


ALTER TABLE `Users` 
CHANGE COLUMN `HashPassword` `HashPassword` VARCHAR(500) NULL DEFAULT NULL ;

ALTER TABLE `Users` 
ADD COLUMN `LastLoginAttemptOn` DATETIME NULL AFTER `IsActive`;
ALTER TABLE `UserWatchlists` 
ADD COLUMN `UserId` INT NULL AFTER `UpdatedOn`;
