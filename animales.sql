CREATE DATABASE  IF NOT EXISTS `animales` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `animales`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: animales
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `animal`
--

DROP TABLE IF EXISTS `animal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animal` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(50) NOT NULL,
  `EDAD` int DEFAULT NULL,
  `NUM_CHIP` int NOT NULL,
  `ID_ESPECIE` int DEFAULT NULL,
  `ID_DUENYO` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `NUM_CHIP` (`NUM_CHIP`),
  KEY `ID_ESPECIE` (`ID_ESPECIE`),
  KEY `ID_DUENYO` (`ID_DUENYO`),
  CONSTRAINT `animal_ibfk_1` FOREIGN KEY (`ID_ESPECIE`) REFERENCES `especie` (`ID`),
  CONSTRAINT `animal_ibfk_2` FOREIGN KEY (`ID_DUENYO`) REFERENCES `duenyo` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animal`
--

LOCK TABLES `animal` WRITE;
/*!40000 ALTER TABLE `animal` DISABLE KEYS */;
INSERT INTO `animal` VALUES (1,'Mini',1002,1,22,3),(2,'Maxi',1032,2,22,3),(3,'Roberto',23,23,20,NULL),(4,'Barbie',12,82,19,1),(5,'Pedro',9,89,25,2),(6,'Abascal',8,102,25,NULL),(7,'Pablo Casado',7,104,24,4),(8,'Julio Iglesias',10,111,24,NULL),(9,'Patricio',3,132,21,4),(10,'Mario',30,150,23,1),(11,'Patricia',31,182,19,2),(12,'Juan Carlos I',82,200,20,1),(13,'Duquesa de Alba',12,221,21,3),(14,'Titus',11,231,25,NULL),(15,'Crustus',21,271,23,4),(16,'Romulo',5,249,24,2),(17,'Sinus',6,250,24,4),(18,'Unisi',50,299,19,3);
/*!40000 ALTER TABLE `animal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `duenyo`
--

DROP TABLE IF EXISTS `duenyo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `duenyo` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(20) DEFAULT NULL,
  `EDAD` int DEFAULT NULL,
  `DNI` varchar(9) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `DNI` (`DNI`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `duenyo`
--

LOCK TABLES `duenyo` WRITE;
/*!40000 ALTER TABLE `duenyo` DISABLE KEYS */;
INSERT INTO `duenyo` VALUES (1,'Juan',23,'21765555S'),(2,'Carlos',42,'17492832G'),(3,'Solisa',1002,'00000000A'),(4,'Ramón',38,'93728192L');
/*!40000 ALTER TABLE `duenyo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especie`
--

DROP TABLE IF EXISTS `especie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especie` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `NOMBRE` (`NOMBRE`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especie`
--

LOCK TABLES `especie` WRITE;
/*!40000 ALTER TABLE `especie` DISABLE KEYS */;
INSERT INTO `especie` VALUES (20,'Caballo'),(21,'Cangrejo'),(22,'Minotauro'),(25,'Ornitorrinco'),(24,'Rana'),(23,'Reno'),(19,'Unicorno');
/*!40000 ALTER TABLE `especie` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-06 15:59:16
