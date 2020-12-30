/*
SQLyog Community
MySQL - 8.0.16 : Database - event_scoreboard
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`event_scoreboard` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `event_scoreboard`;

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `categoryId` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(125) NOT NULL,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `category` */

insert  into `category`(`categoryId`,`label`) values 
(1,'Parents'),
(2,'Young Adults'),
(3,'Kids');

/*Table structure for table `game` */

DROP TABLE IF EXISTS `game`;

CREATE TABLE `game` (
  `gameId` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(200) NOT NULL,
  PRIMARY KEY (`gameId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `game` */

insert  into `game`(`gameId`,`label`) values 
(1,'Charades'),
(2,'Action Relay'),
(3,'Bread Chain'),
(4,'Spaghetti Tower'),
(5,'Balloon Parade'),
(6,'Tongue Twister'),
(7,'Candle Stockings'),
(8,'Drawing Relay');

/*Table structure for table `participant` */

DROP TABLE IF EXISTS `participant`;

CREATE TABLE `participant` (
  `participantId` int(11) NOT NULL AUTO_INCREMENT,
  `lastName` varchar(125) DEFAULT NULL,
  `firstName` varchar(125) DEFAULT NULL,
  `categoryId` int(11) NOT NULL,
  `teamId` int(11) DEFAULT NULL,
  PRIMARY KEY (`participantId`),
  KEY `categoryId` (`categoryId`),
  KEY `teamId` (`teamId`),
  CONSTRAINT `categoryId` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`),
  CONSTRAINT `teamId` FOREIGN KEY (`teamId`) REFERENCES `team` (`teamId`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `participant` */

/*Table structure for table `team` */

DROP TABLE IF EXISTS `team`;

CREATE TABLE `team` (
  `teamId` int(11) NOT NULL AUTO_INCREMENT,
  `teamName` varchar(125) NOT NULL,
  `colorHex` varchar(12) DEFAULT NULL,
  `leaderId` int(11) DEFAULT NULL,
  PRIMARY KEY (`teamId`),
  KEY `leaderId` (`leaderId`),
  CONSTRAINT `leaderId` FOREIGN KEY (`leaderId`) REFERENCES `participant` (`participantId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `team` */

insert  into `team`(`teamId`,`teamName`,`colorHex`,`leaderId`) values 
(1,'RED','#B40000',NULL),
(2,'BLUE','#0044C8',NULL),
(3,'YELLOW','#C8C000',NULL);

/*Table structure for table `team_games` */

DROP TABLE IF EXISTS `team_games`;

CREATE TABLE `team_games` (
  `teamId` int(11) NOT NULL,
  `gameId` int(11) NOT NULL,
  `score` int(11) DEFAULT '0',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `team_games` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
