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
-- Table structure for table `Watchlist`
--

DROP TABLE IF EXISTS `Watchlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Watchlist` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `WatchlistId` int(11) DEFAULT NULL,
  `Symbol` varchar(100) DEFAULT NULL,
  `Price` varchar(50) NOT NULL DEFAULT '0',
  `Percentage` varchar(20) DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `IsDefault` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Watchlist`
--

LOCK TABLES `Watchlist` WRITE;
/*!40000 ALTER TABLE `Watchlist` DISABLE KEYS */;
INSERT INTO `Watchlist` VALUES (1,NULL,'NASDAQ:APPL','100','10','APPL INC',1),(2,NULL,'NASDAQ:INTC','3000','82','Intel Corp',0),(3,NULL,'NASDAQ:BABA','4000','90','Alibaba Group Holding LTD',0),(4,NULL,'NASDAQ:NVDA','100000','67','NVDIA CORP',0),(5,NULL,'baba','--','--','--',0),(6,NULL,'BTCUSD','--','--','--',0),(7,NULL,'test','--','--','--',0),(8,NULL,'bitcoion','--','--','--',0),(9,NULL,'Forex','--','--','--',0),(10,NULL,'TATA','--','--','--',0),(11,NULL,'undefined','--','--','--',0),(12,1,'undefined','--','--','--',0),(13,1,'undefined','--','--','--',0),(14,1,'undefined','--','--','--',0),(15,1,'undefined','--','--','--',0),(16,1,'undefined','--','--','--',0),(17,1,'undefined','--','--','--',0),(18,1,'undefined','--','--','--',0),(19,1,'undefined','--','--','--',0),(20,1,'undefined','--','--','--',0),(21,1,'undefined','--','--','--',0),(22,1,'BTC','--','--','--',0),(23,2,'BTC','--','--','--',0),(24,2,'TATA','--','--','--',0),(25,2,'BTC','--','--','--',0),(26,2,'BTC','--','--','--',0),(27,3,'Reliance','--','--','--',0),(28,3,'Binary Dreamz','--','--','--',0);
/*!40000 ALTER TABLE `Watchlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-12 16:46:00
