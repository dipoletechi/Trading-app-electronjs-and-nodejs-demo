-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: trading.staffetc.com    Database: tradingdevdb
-- ------------------------------------------------------
-- Server version	5.6.34-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Email` varchar(50) DEFAULT NULL,
  `HashPassword` varchar(500) DEFAULT NULL,
  `HashPasswordSalt` varchar(45) DEFAULT NULL,
  `LoginAttempts` int(11) DEFAULT NULL,
  `IsLocked` tinyint(4) DEFAULT NULL,
  `IsDeleted` tinyint(4) DEFAULT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  `UpdatedOn` datetime DEFAULT NULL,
  `IsActive` tinyint(4) DEFAULT NULL,
  `LastLoginAttemptOn` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'efootstep@gmail.com','0771ca284a47cbad2bbc2fc882338a935d58a6979a232bc96cfb1acbde2610d1dcbbf38d8c924b9975287b219f7311532720cb27b3b61721f86dfaa331cd1438','a3b7bd09d4ee80e3',5,0,0,'2018-01-26 14:28:51','2018-01-26 14:28:51',1,'2018-01-30 09:22:49'),(2,'efootstepgmail.com','430a5749e031c1abbf61f9896faf9e8d10242bdb6ff576452a1f9e0d6c7e9f3b51e62c605896ea32d1042a9d3a55a2fcac1f14d9acaec1045eca5a57da70ed7a','f6e4b9b59f919ace',1,0,0,'2018-01-26 14:30:46','2018-01-26 14:30:46',1,NULL),(3,'efootspgmail.com','e611ce887b9d7765b6fac0ccd668b74fae56a9a61f11ae7a67a13ed288bb206d08373003bc4f59f757ec6eba20ac54edf46d1698472e30c8f525173fbcd6ecea','5dc9c69af0d8f1e3',0,0,0,'2018-01-26 15:12:04','2018-01-26 15:12:04',1,NULL),(4,'riya@gma.com','b10b1a1145512a340f4b696e8455e87c19c9f8b1118911ba21ed5eee5bf7e8cfdd924b0bbe53be7c774efcf7f37f7dfe948443168cc44cb3b87bb11e22913ea7','f3bbea815257ec13',0,0,0,'2018-01-26 15:15:12','2018-01-26 15:15:12',1,NULL),(5,'riyag@hmma.com','460acfdbef2b595c2640b6007c54a535e25756ecca6d16fc25c754afcf7772006a06205d8578ef1207358db804a1bf5767b9a108d7222cb89f62e644d3e4216b','3bc61790a7923dcb',0,0,0,'2018-01-26 15:15:46','2018-01-26 15:15:46',1,NULL),(6,'dharmandarjob@gmail.com','995b4e97ea5625356262f022dacaf41d91690d576d830f85fd2c2eb782e29023bf88c3547dd0ce4c25c1a7044e2f416967678bb06b5d50330519d0f1b797ef06','d78e2cd052c96554',0,0,0,'2018-01-30 07:09:37','2018-01-30 07:09:37',1,'2018-01-31 17:24:42'),(7,'dharmandarjob1@gmail.com','204a74a54cf10396b9f532e16b0d3bcdee85dd78fb7d85e263b41c7daf61dff7a5bd7d53574bd664160e1e1a99e02b1f90e96a6b2c340661c0bfdca5bc111d21','256f9cad4dda0e5d',0,0,0,'2018-01-30 07:24:19','2018-01-30 07:24:19',1,NULL),(8,'efootstep@yahoo.com','8a926002cb9cb30e35c04deed1c07a359754c9e3f58025815fa0c6b5a36afd571cfca180a9da92ffc48be14df95293e0be6451ed17ede7850f06ea23c05d733c','e59f75d383c6df5f',0,0,0,'2018-01-30 07:25:44','2018-01-30 07:25:44',1,NULL),(9,'reena@gmail.com','014edf5b86cc078984c45a7797929d36f974f023167570e4c3f83183b7a3f66eb75a7eb6d654a7553eb4704d96b1e243f2cd5660ea7c5c75b9b748e3dcfb643f','8f4432ba1a49f059',0,0,0,'2018-01-31 15:01:16','2018-01-31 15:01:16',1,'2018-01-31 15:01:27'),(10,'aa@gmail.com','8e912714319214b4149476d98b800714960a4a29fc1840a267a6b89aef2a6b4be43fcf2c81670b5aa05180d6fb121cbd8f38e3379248afa9a9a6df7d0c008499','454214b1676c1ede',0,0,0,'2018-01-31 15:18:44','2018-01-31 15:18:44',1,NULL),(11,'ada@gmail.com','616fc6241c7ce5a2af3044cd31dd7261c7ba0ea151c0003a0c2880c1511dc331e2696d6a9a5334d4b101cc8753d5cbbd5e109012b3f310618c2716738dc7f3c9','111e9a61256bc3f7',0,0,0,'2018-01-31 15:19:53','2018-01-31 15:19:53',1,NULL),(12,'adfa@gmail.com','0e16a11d9c730cd0213473209f0b559236c693b14a367738efbc6ad31223d2c53a2ce5e3b3d6fc5bf1903cb5609ad27ef16b7a52c77c49e389e4281c159cf663','e010767ce9877a43',0,0,0,'2018-01-31 15:20:20','2018-01-31 15:20:20',1,NULL),(13,'adfda@gmail.com','877ac912c1081a514946710086e07e1f731d733dc71387292e0cfddea4495f440fad3d5e09708c5f26db271af84db1133953455ced336016ddcf5fef0701df35','3f96795c7de68a66',0,0,0,'2018-01-31 15:21:07','2018-01-31 15:21:07',1,NULL),(14,'adffda@gmail.com','443a4ee8a77368a430d0bd2a0584cf6d19005cecdf7b8e6eeb8eca3284fd0898b4eb2d77c824a49f4930ea17827a50bee16ee53f270d810a0bce903dd3278f09','dfc6fd3a0229f875',0,0,0,'2018-01-31 15:22:13','2018-01-31 15:22:13',1,NULL),(15,'addffda@gmail.com','9d62117bcc6e37375a8cd9a1c1a9824fda0673211f6b54d7a389e938f51d55526ded5e45b00d2b009897f3d7c87f63d88606b5f8b391866f7971299ab56c8f5d','43c859938a387a8d',0,0,0,'2018-01-31 15:22:48','2018-01-31 15:22:48',1,NULL),(16,'addsffda@gmail.com','5aa162452fbef642192d008e752df363b64cb37eedda8e3c45426753844f9db01b774d66ba888ab8582b7e755f89a1ca49309d5aa984f86f9ada48d324f37c08','1022f0c9f569be1d',0,0,0,'2018-01-31 15:23:17','2018-01-31 15:23:17',1,NULL),(17,'health@gmail.com','9d738739d44ee4626374db5a32aff753cda9731d6377b54619e27b846c88df4b6577684910a4eb393d11b8e6c2f40c670f24fd53367e0752169d1f34de708c71','fa711631135f2ba4',0,0,0,'2018-01-31 15:29:33','2018-01-31 15:29:33',1,NULL),(18,'ankit@gmail.com','01de14e1894477edd810f1aa00879140de428ae50ea36c3e7c3b21fbcb4c26bd1ced464784332cc817e1781cfbbd4773c282c6365ccb3ca7d7fec0354cc957f3','2651a0865cd149a7',0,0,0,'2018-01-31 15:43:20','2018-01-31 15:43:20',1,'2018-01-31 17:45:24'),(19,'dharm@gmail.com','f73b43c8bbea4738fa3be52a9f2e86e41ffb90f72044b50b0f5df071f29db97af39f0567d85eb1194f18c7359f75b1e655be6479e76df56195ca5619a8a2012e','41086269c6415578',0,0,0,'2018-01-31 17:44:28','2018-01-31 17:44:28',1,'2018-01-31 17:44:38');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-12 16:46:30
