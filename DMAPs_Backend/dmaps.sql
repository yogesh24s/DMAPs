-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: dmaps
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `company_units`
--

DROP TABLE IF EXISTS `company_units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_units` (
  `Unit_Id` int NOT NULL AUTO_INCREMENT,
  `Unit_Full_Name` varchar(100) DEFAULT NULL,
  `Unit_Short_Name` varchar(32) NOT NULL,
  `Group_Id` varchar(32) DEFAULT NULL,
  `Division_Id` varchar(32) DEFAULT NULL,
  `Tin_Num` varchar(32) DEFAULT NULL,
  `Reg_Num` varchar(32) DEFAULT NULL,
  `Address_Line_1` varchar(200) DEFAULT NULL,
  `Address_Line_2` varchar(200) DEFAULT NULL,
  `Street` varchar(32) DEFAULT NULL,
  `City` varchar(32) DEFAULT NULL,
  `State` varchar(32) DEFAULT NULL,
  `Pin_Code` int DEFAULT NULL,
  `Contact_No` varchar(10) DEFAULT NULL,
  `Email_Id` varchar(32) DEFAULT NULL,
  `Website_Link` varchar(32) DEFAULT NULL,
  `Company_Logo` varchar(32) DEFAULT NULL,
  `Fax_No` int DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Created_By` varchar(45) DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Unit_Id`),
  UNIQUE KEY `Unit_Short_Name_UNIQUE` (`Unit_Short_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_units`
--

LOCK TABLES `company_units` WRITE;
/*!40000 ALTER TABLE `company_units` DISABLE KEYS */;
/*!40000 ALTER TABLE `company_units` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `Department_Id` int NOT NULL,
  `Department_Name` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`Department_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'AEG'),(2,'Data Engineering');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designation`
--

DROP TABLE IF EXISTS `designation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designation` (
  `Devision_Id` int NOT NULL,
  `Devision_Name` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`Devision_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designation`
--

LOCK TABLES `designation` WRITE;
/*!40000 ALTER TABLE `designation` DISABLE KEYS */;
INSERT INTO `designation` VALUES (1,'Manager'),(2,'Senior Associate'),(3,'Consultant');
/*!40000 ALTER TABLE `designation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `Unit_Short_Name` varchar(32) NOT NULL,
  `User_Id` varchar(16) NOT NULL,
  `User_Name` varchar(16) NOT NULL,
  `Department_Id` varchar(16) NOT NULL,
  `Designation_Id` varchar(16) NOT NULL,
  `Mobile_Num` varchar(10) NOT NULL,
  `Mail_Id` varchar(32) NOT NULL,
  `Status` varchar(16) NOT NULL,
  `Created_Date` date DEFAULT NULL,
  `User_Role` varchar(16) DEFAULT NULL,
  `Login_Access` varchar(45) DEFAULT NULL,
  `Official_Mail_Id` varchar(45) DEFAULT NULL,
  `Official_Mobile_Num` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`User_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_credentials`
--

DROP TABLE IF EXISTS `user_credentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_credentials` (
  `Id` int DEFAULT NULL,
  `User_Name` varchar(45) NOT NULL,
  `Password` tinytext,
  `Last_Password_Changed_At` datetime DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Created_By` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`User_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_credentials`
--

LOCK TABLES `user_credentials` WRITE;
/*!40000 ALTER TABLE `user_credentials` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_credentials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role_permission`
--

DROP TABLE IF EXISTS `user_role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role_permission` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `User_Id` varchar(45) DEFAULT NULL,
  `Model_Id` varchar(45) DEFAULT NULL,
  `Unit_Id` varchar(45) DEFAULT NULL,
  `Access_Permission` varchar(45) DEFAULT NULL,
  `Role_Id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role_permission`
--

LOCK TABLES `user_role_permission` WRITE;
/*!40000 ALTER TABLE `user_role_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_role_permission` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-09 11:18:46
