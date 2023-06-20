-- MySQL dump 10.13  Distrib 8.0.32, for macos13.0 (x86_64)
--
-- Host: 127.0.0.1    Database: main
-- ------------------------------------------------------
-- Server version	8.0.32

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `mysql` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `mysql`;

--
-- Table structure for table `Account`
--

DROP TABLE IF EXISTS `Account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Account` (
  `account_id` int NOT NULL,
  `google_id` varchar(128) DEFAULT NULL,
  `profile_id` int DEFAULT NULL,
  `name` varchar(128) NOT NULL,
  `email` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Account`
--

LOCK TABLES `Account` WRITE;
/*!40000 ALTER TABLE `Account` DISABLE KEYS */;
INSERT INTO `Account` VALUES (1,'zQokAwj2tchqk4dkovLVvqCmzWp2',26,'Dominik Wunderlich','dominik.privatacc@gmail.com'),(2,'H2Qfee67TCh7dbHQz2qafu9Q9XB2',NULL,'Konstantin Fischer','jodoko.ecom@gmail.com');
/*!40000 ALTER TABLE `Account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Blocknote`
--
DROP TABLE IF EXISTS `Blocknotecontainsprofile`;
DROP TABLE IF EXISTS `Favoritenotecontainsprofile`;
DROP TABLE IF EXISTS `profilecontainsmessage`;
DROP TABLE IF EXISTS `Blocknote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Blocknote` (
  `blocknote_id` varchar(128) NOT NULL,
  `blocking_id` varchar(128) NOT NULL,
  `blocked_id` varchar(128) NOT NULL,
  PRIMARY KEY (`blocknote_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Blocknote`
--

LOCK TABLES `Blocknote` WRITE;
/*!40000 ALTER TABLE `Blocknote` DISABLE KEYS */;
/*!40000 ALTER TABLE `Blocknote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Characteristic`
--

DROP TABLE IF EXISTS `Characteristic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Characteristic` (
  `char_id` int NOT NULL,
  `char_name` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Characteristic`
--

LOCK TABLES `Characteristic` WRITE;
/*!40000 ALTER TABLE `Characteristic` DISABLE KEYS */;
INSERT INTO `Characteristic` VALUES (10,'firstName'),(20,'lastName'),(30,'age'),(40,'gender'),(50,'height'),(60,'religion'),(70,'hair'),(80,'smoking'),(90,'Über Mich');
/*!40000 ALTER TABLE `Characteristic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Favoritenote`
--

DROP TABLE IF EXISTS `Favoritenote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Favoritenote` (
  `favoritenote_id` int NOT NULL,
  `adding_id` varchar(128) NOT NULL,
  `added_id` varchar(128) NOT NULL,
  PRIMARY KEY (`favoritenote_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Favoritenote`
--

LOCK TABLES `Favoritenote` WRITE;
/*!40000 ALTER TABLE `Favoritenote` DISABLE KEYS */;
/*!40000 ALTER TABLE `Favoritenote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `InfoObject`
--

DROP TABLE IF EXISTS `InfoObject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `InfoObject` (
  `infoobject_id` int NOT NULL,
  `char_id` int DEFAULT NULL,
  `char_value` varchar(128) DEFAULT NULL,
  `profile_id` varchar(128) DEFAULT NULL,
  `searchprofile_id` int DEFAULT NULL,
  PRIMARY KEY (`infoobject_id`),
  KEY `InfoObject_Characteristic_char_id_fk` (`char_id`),
  KEY `InfoObject_Profile_profile_id_fk` (`profile_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `InfoObject`
--

LOCK TABLES `InfoObject` WRITE;
/*!40000 ALTER TABLE `InfoObject` DISABLE KEYS */;
INSERT INTO `InfoObject` VALUES (1,30,'1100-10-09T23:06:32.000Z','zQokAwj2tchqk4dkovLVvqCmzWp2',NULL),(2,10,'Dominik','zQokAwj2tchqk4dkovLVvqCmzWp2',NULL),(3,40,'female','zQokAwj2tchqk4dkovLVvqCmzWp2',NULL),(4,70,'blond','zQokAwj2tchqk4dkovLVvqCmzWp2',NULL),(5,50,'100','zQokAwj2tchqk4dkovLVvqCmzWp2',NULL),(6,20,'Wunderlich','zQokAwj2tchqk4dkovLVvqCmzWp2',NULL),(7,60,'islam','zQokAwj2tchqk4dkovLVvqCmzWp2',NULL),(8,80,'smoker','zQokAwj2tchqk4dkovLVvqCmzWp2',NULL);
/*!40000 ALTER TABLE `InfoObject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Message`
--

DROP TABLE IF EXISTS `Message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Message` (
  `message_id` int NOT NULL,
  `sender_id` varchar(128) NOT NULL,
  `recipient_id` varchar(128) NOT NULL,
  `content` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Message`
--

LOCK TABLES `Message` WRITE;
/*!40000 ALTER TABLE `Message` DISABLE KEYS */;
INSERT INTO `Message` VALUES (10,'2','3','Hello World'),(11,'2','3','Hallo'),(12,'2','3','Hallo'),(13,'2','3','Hallo'),(14,'2','3','Hallo'),(15,'2','3','Hallo'),(16,'2','3','Hallo'),(17,'2','3','Hallo'),(18,'2','3','Hallo'),(19,'2','3','Hallo'),(20,'2','3','Hallo'),(21,'2','3','Hallo'),(22,'2','3','Hallo'),(23,'3','2','Na du'),(24,'3','2','Na du'),(25,'2','3','Das ist ein test'),(26,'2','3','Das ist ein test'),(27,'2','3','Das ist ein test'),(28,'2','3','Das ist ein test'),(29,'1','2','test'),(30,'1','2','test'),(31,'1','2','test'),(32,'1','2','Hallo Taro mich siehst du 3x aber keine Ahnung wieso'),(33,'1','2','Strato und ich haben eine Idee'),(34,'1','2','test'),(35,'1','2','gdx'),(36,'1','2','test 5'),(37,'1','2','patrick'),(38,'1','2','patrick 2'),(39,'1','2','patrick 4'),(40,'1','2','patrick 5'),(41,'1','2','patrick 6'),(42,'1','2','test'),(43,'1','2','tsdf'),(44,'1','2','fds'),(45,'1','2','test'),(46,'1','2','test'),(47,'1','2','test2'),(48,'1','2','test'),(49,'1','2','Neue Nachricht'),(50,'1','2','und eine weitere');
/*!40000 ALTER TABLE `Message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Profile`
--

DROP TABLE IF EXISTS `Profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Profile` (
  `profile_id` int NOT NULL,
  `favoritenote_id` int DEFAULT NULL,
  `blocknote_id` int DEFAULT NULL,
  `google_fk` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Profile`
--

LOCK TABLES `Profile` WRITE;
/*!40000 ALTER TABLE `Profile` DISABLE KEYS */;
INSERT INTO `Profile` VALUES (1,0,0,'zQokAwj2tchqk4dkovLVvqCmzWp2');
/*!40000 ALTER TABLE `Profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Profilevisits`
--

DROP TABLE IF EXISTS `Profilevisits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Profilevisits` (
  `profilevisits_id` int NOT NULL,
  `mainprofile_id` varchar(128) NOT NULL,
  `visitedprofile_id` varchar(128) NOT NULL,
  PRIMARY KEY (`profilevisits_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Profilevisits`
--

LOCK TABLES `Profilevisits` WRITE;
/*!40000 ALTER TABLE `Profilevisits` DISABLE KEYS */;
/*!40000 ALTER TABLE `Profilevisits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Searchprofile`
--

DROP TABLE IF EXISTS `Searchprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Searchprofile` (
  `searchprofile_id` int NOT NULL,
  `google_id` varchar(128) NOT NULL,
  PRIMARY KEY (`searchprofile_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Searchprofile`
--

LOCK TABLES `Searchprofile` WRITE;
/*!40000 ALTER TABLE `Searchprofile` DISABLE KEYS */;
/*!40000 ALTER TABLE `Searchprofile` ENABLE KEYS */;
UNLOCK TABLES;




-- Dump completed on 2023-06-13 10:36:40
