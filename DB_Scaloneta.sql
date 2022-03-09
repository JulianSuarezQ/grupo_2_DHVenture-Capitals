-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: localhost    Database: DB_Scaloneta
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

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
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id_cart` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `cant_product` int NOT NULL,
  `total_price` int NOT NULL,
  `discount` int DEFAULT NULL,
  `detail` varchar(45) NOT NULL,
  PRIMARY KEY (`id_cart`),
  KEY `fk_carrito_usuario_idx` (`id_user`),
  CONSTRAINT `fk_carrito_usuario` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_product`
--

DROP TABLE IF EXISTS `cart_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_cart` int NOT NULL,
  `id_product` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cart_idx` (`id_cart`),
  KEY `fk_product_idx` (`id_product`),
  CONSTRAINT `fk_cart` FOREIGN KEY (`id_cart`) REFERENCES `cart` (`id_cart`),
  CONSTRAINT `fk_product` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_product`
--

LOCK TABLES `cart_product` WRITE;
/*!40000 ALTER TABLE `cart_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id_category` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `detail` varchar(45) NOT NULL,
  PRIMARY KEY (`id_category`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Argentina','Seleccion Argentina'),(2,'Deportivo','ropa sport');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id_product` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `discount` int NOT NULL,
  `detail` varchar(200) NOT NULL,
  `stock` int NOT NULL,
  `id_category` int NOT NULL,
  `color` varchar(150) NOT NULL,
  `price` int NOT NULL,
  `size` varchar(3) NOT NULL,
  `img` varchar(45) NOT NULL,
  PRIMARY KEY (`id_product`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `fk_productos_category_idx` (`id_category`),
  CONSTRAINT `fk_productos_category` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'camiseta titular 2021',0,'camiseta titular que la seleccion argentina utilizo en 2021',1,1,'celeste y blanca',19999,'M','img-1640788520811-784627877.jpeg'),(2,'camiseta titular 2022',0,'camiseta titular que la seleccion argentina utilizo en 2021',1,1,'celeste y blanca a',19999,'M','img-1640788520811-784627877.jpeg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rols`
--

DROP TABLE IF EXISTS `rols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rols` (
  `id_rol` int NOT NULL,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rols`
--

LOCK TABLES `rols` WRITE;
/*!40000 ALTER TABLE `rols` DISABLE KEYS */;
INSERT INTO `rols` VALUES (1,'admin'),(2,'user');
/*!40000 ALTER TABLE `rols` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `id_rol` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `birth_date` date NOT NULL,
  `dni` varchar(11) NOT NULL,
  `gender` char(1) NOT NULL,
  `tel` varchar(11) NOT NULL,
  `polices` tinyint NOT NULL,
  `img` varchar(150) NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_Usuario_rol_idx` (`id_rol`),
  CONSTRAINT `fk_Usuario_rol` FOREIGN KEY (`id_rol`) REFERENCES `rols` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=309 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,'admin','admin','admin@admin.com','$2a$10$shhfnEMCWzLbD4Z6Y/Tv0e6DdN0MSMSaC6DK5rahJA0m8.w11KkrS','2000-01-01','11111111','H','1212121212',1,'img-1646765929807-33888129.png'),(2,2,'Nicolis','McKeevers','nmckeevers0@biblegateway.com','mDQ2tV','2021-07-13','6844905','H','184524',1,'http://dummyimage.com/182x100.png/dddddd/000000'),(4,2,'Gal','Gossington','ggossington0@techcrunch.com','8Ko7Fiu','2021-10-10','8522761','H','685156',0,'http://dummyimage.com/205x100.png/cc0000/ffffff'),(5,2,'Raf','Sondland','rsondland1@taobao.com','ZIbZq7UcAg5p','2021-03-19','2188428','H','549485',1,'http://dummyimage.com/162x100.png/5fa2dd/ffffff'),(6,2,'Emili','Scholfield','escholfield2@homestead.com','BsY3atulY','2022-02-07','2993946','H','260256',0,'http://dummyimage.com/178x100.png/dddddd/000000'),(7,2,'Egor','Cristoforetti','ecristoforetti3@netlog.com','zHuNqxEmOL','2021-05-16','6638044','H','945152',1,'http://dummyimage.com/107x100.png/dddddd/000000'),(8,2,'Maximilien','Elener','melener4@time.com','aRYOv1ky','2021-02-20','7078457','H','937931',0,'http://dummyimage.com/176x100.png/dddddd/000000'),(9,2,'Maxy','Spick','mspick5@51.la','EPARX0','2021-04-28','3516696','H','719816',1,'http://dummyimage.com/128x100.png/ff4444/ffffff'),(10,2,'Edward','Parrot','eparrot6@friendfeed.com','14qyyq5','2021-04-23','8357712','H','1064103',1,'http://dummyimage.com/152x100.png/ff4444/ffffff'),(11,2,'Betty','Braben','bbraben7@ebay.com','It5fRK0cwV','2021-12-17','3419388','H','639208',0,'http://dummyimage.com/118x100.png/ff4444/ffffff'),(12,2,'Dotty','Geroldo','dgeroldo8@lycos.com','gbdERuR5P','2021-04-18','2321593','H','913888',1,'http://dummyimage.com/133x100.png/5fa2dd/ffffff'),(13,2,'Lian','Gobolos','lgobolos9@marriott.com','pPbQIU5e2sY','2021-12-21','2760827','H','966226',1,'http://dummyimage.com/210x100.png/ff4444/ffffff'),(14,2,'Lanae','Oguz','loguza@csmonitor.com','0gostXO76Z6','2021-04-23','5066904','H','197184',0,'http://dummyimage.com/174x100.png/5fa2dd/ffffff'),(15,2,'Colene','Maleney','cmaleneyb@biblegateway.com','eGaS9A','2021-05-09','8915750','H','179796',0,'http://dummyimage.com/136x100.png/cc0000/ffffff'),(16,2,'Miner','Nance','mnancec@cornell.edu','3JcgPoh','2022-01-26','6843883','H','621511',0,'http://dummyimage.com/116x100.png/dddddd/000000'),(17,2,'Roda','Slucock','rslucockd@digg.com','mjwyPs','2022-01-21','1465073','H','925954',1,'http://dummyimage.com/222x100.png/cc0000/ffffff'),(18,2,'Farleigh','Ipplett','fipplette@last.fm','hkdzERk','2022-02-02','7990447','H','841130',1,'http://dummyimage.com/150x100.png/ff4444/ffffff'),(19,2,'Lindsay','Patrono','lpatronof@addthis.com','NtuZRDiJ','2021-04-06','7316611','H','1219242',1,'http://dummyimage.com/217x100.png/5fa2dd/ffffff'),(20,2,'Vladimir','Croizier','vcroizierg@tinypic.com','wDFVtL','2021-10-25','6648713','H','481337',1,'http://dummyimage.com/178x100.png/5fa2dd/ffffff'),(21,2,'Alec','Casaroli','acasarolih@myspace.com','FFq2P5Jm','2021-09-08','4436049','H','1109037',1,'http://dummyimage.com/208x100.png/ff4444/ffffff'),(22,2,'Lucilia','Hollyar','lhollyari@umich.edu','YwOOUvRT4jc','2021-12-27','1602793','H','914873',1,'http://dummyimage.com/213x100.png/dddddd/000000'),(23,2,'Kermie','Gate','kgatej@so-net.ne.jp','5YRJnu','2021-12-07','4644797','H','163563',0,'http://dummyimage.com/112x100.png/cc0000/ffffff'),(24,2,'Maxy','Swainston','mswainstonk@fastcompany.com','y2t4AdSud','2021-03-02','7273863','H','957691',1,'http://dummyimage.com/197x100.png/5fa2dd/ffffff'),(25,2,'Liesa','Kemwal','lkemwall@tmall.com','CiIlSDfr','2021-10-30','3928153','H','921920',0,'http://dummyimage.com/200x100.png/cc0000/ffffff'),(26,2,'Barn','Ericsson','bericssonm@adobe.com','fm6Z1l4V1GT','2021-11-18','4925857','H','582358',0,'http://dummyimage.com/224x100.png/5fa2dd/ffffff'),(27,2,'Tammy','Brookzie','tbrookzien@dedecms.com','M3PMyCq3','2021-11-14','7437165','H','844218',0,'http://dummyimage.com/113x100.png/ff4444/ffffff'),(28,2,'Xenia','Grane','xgraneo@cbc.ca','McGMA7','2022-01-13','1238087','H','874900',1,'http://dummyimage.com/200x100.png/cc0000/ffffff'),(29,2,'Stormi','Kimberly','skimberlyp@ning.com','ZRVdoPfB','2021-09-02','6544814','H','750779',1,'http://dummyimage.com/137x100.png/5fa2dd/ffffff'),(30,2,'Celinda','Limbrick','climbrickq@msu.edu','g624bZKj','2021-10-07','5774474','H','379756',0,'http://dummyimage.com/157x100.png/dddddd/000000'),(31,2,'Jillane','Lotwich','jlotwichr@canalblog.com','OxkuMl','2022-02-09','7126890','H','476067',0,'http://dummyimage.com/212x100.png/cc0000/ffffff'),(32,2,'Nicholas','Duplain','nduplains@apple.com','arU433f3wjAS','2021-03-18','3722265','H','862360',0,'http://dummyimage.com/124x100.png/5fa2dd/ffffff'),(33,2,'Lem','Fretwell','lfretwellt@archive.org','3nQXeT2xe','2021-12-09','9945693','H','1036207',1,'http://dummyimage.com/164x100.png/ff4444/ffffff'),(34,2,'Nicolette','Penritt','npenrittu@biglobe.ne.jp','1Pwredx','2021-08-10','6183510','H','166937',1,'http://dummyimage.com/232x100.png/5fa2dd/ffffff'),(35,2,'Brice','MacCallester','bmaccallesterv@symantec.com','CWuxbb','2021-06-11','8665275','H','138789',0,'http://dummyimage.com/230x100.png/5fa2dd/ffffff'),(36,2,'Judy','LeEstut','jleestutw@nydailynews.com','Fc2gSP','2021-08-12','2989625','H','841494',0,'http://dummyimage.com/217x100.png/dddddd/000000'),(37,2,'Asa','Mealiffe','amealiffex@goo.ne.jp','hQ1bVn2','2021-12-14','9710427','H','191482',1,'http://dummyimage.com/131x100.png/cc0000/ffffff'),(38,2,'Ora','Lamas','olamasy@webmd.com','GS8pH4W','2022-02-11','9236725','H','707964',1,'http://dummyimage.com/175x100.png/5fa2dd/ffffff'),(39,2,'Clea','Ferreiro','cferreiroz@ocn.ne.jp','JEd0d69nipQW','2021-12-12','1245326','H','196297',0,'http://dummyimage.com/161x100.png/ff4444/ffffff'),(40,2,'Kiel','Oldcote','koldcote10@desdev.cn','VVHYgPcIx','2021-07-18','3039685','H','240262',1,'http://dummyimage.com/128x100.png/cc0000/ffffff'),(41,2,'Teresina','Lassell','tlassell11@marriott.com','d48Z7HHut','2021-09-02','4011576','H','423547',0,'http://dummyimage.com/118x100.png/dddddd/000000'),(42,2,'Tremaine','Kilgannon','tkilgannon12@icq.com','6iV3Lj','2021-04-09','4707802','H','363662',0,'http://dummyimage.com/231x100.png/cc0000/ffffff'),(43,2,'Coretta','Freeborn','cfreeborn13@mozilla.org','jF7NUa1qejMI','2021-10-04','8276468','H','646533',0,'http://dummyimage.com/144x100.png/5fa2dd/ffffff'),(44,2,'Cheryl','Bantham','cbantham14@diigo.com','MeHJod1M','2021-05-02','9240985','H','327213',1,'http://dummyimage.com/146x100.png/ff4444/ffffff'),(45,2,'Janeta','Crang','jcrang15@last.fm','jzi0NlrY','2021-11-24','4248122','H','1114837',1,'http://dummyimage.com/241x100.png/dddddd/000000'),(46,2,'Henrie','Parken','hparken16@ted.com','OtT6IRD2VVy','2021-09-03','5120581','H','881933',0,'http://dummyimage.com/147x100.png/cc0000/ffffff'),(47,2,'Danya','Dreakin','ddreakin17@bluehost.com','Nii1QnXIUV','2021-06-18','8146021','H','1065997',0,'http://dummyimage.com/150x100.png/cc0000/ffffff'),(48,2,'Araldo','Skotcher','askotcher18@google.it','CBSBMb','2021-07-08','5935411','H','1047486',0,'http://dummyimage.com/250x100.png/cc0000/ffffff'),(49,2,'Rennie','Twigger','rtwigger19@marriott.com','OCQHeWL2F','2021-04-25','5047317','H','617533',0,'http://dummyimage.com/244x100.png/dddddd/000000'),(50,2,'Konrad','Rainger','krainger1a@discovery.com','WkMw7aVuTo7','2021-06-25','6731048','H','956878',1,'http://dummyimage.com/201x100.png/ff4444/ffffff'),(51,2,'Cherilyn','Heigold','cheigold1b@youtu.be','KNaJwX','2021-10-05','8722613','H','414682',1,'http://dummyimage.com/129x100.png/cc0000/ffffff'),(52,2,'Anthe','Sprull','asprull1c@abc.net.au','OsVpdWyAypMz','2021-06-19','6250476','H','235967',0,'http://dummyimage.com/244x100.png/cc0000/ffffff'),(53,2,'Dulce','Raleston','draleston1d@amazon.co.uk','7Cv9pxnU','2022-01-17','1547452','H','617261',0,'http://dummyimage.com/225x100.png/cc0000/ffffff'),(54,2,'Ermin','Ezzle','eezzle1e@hatena.ne.jp','5adIjmEkNPF','2021-08-15','6977210','H','1106809',1,'http://dummyimage.com/164x100.png/cc0000/ffffff'),(55,2,'Miranda','MacGuffog','mmacguffog1f@sina.com.cn','uyVYwZTpQ0','2021-11-09','9705148','H','337108',0,'http://dummyimage.com/145x100.png/ff4444/ffffff'),(56,2,'Ashby','Mitrovic','amitrovic1g@livejournal.com','kfbcMOxiDch','2021-10-19','6627434','H','323845',0,'http://dummyimage.com/145x100.png/ff4444/ffffff'),(57,2,'Kacey','Bladder','kbladder1h@wix.com','d5mWalu','2021-10-14','6924100','H','182639',1,'http://dummyimage.com/177x100.png/cc0000/ffffff'),(58,2,'Jo','McArte','jmcarte1i@is.gd','3Zy6YW','2021-07-21','8052010','H','435033',0,'http://dummyimage.com/196x100.png/cc0000/ffffff'),(59,2,'Aurie','Drinan','adrinan1j@washingtonpost.com','r7rdG8J4R','2021-09-26','3916525','H','298267',0,'http://dummyimage.com/118x100.png/ff4444/ffffff'),(60,2,'Paige','Spohrmann','pspohrmann1k@furl.net','VDqNvOaj9pj','2021-05-30','4940415','H','740922',1,'http://dummyimage.com/141x100.png/ff4444/ffffff'),(61,2,'Yorgo','Matcham','ymatcham1l@msu.edu','sViK5KfPQWd','2021-10-16','9160471','H','826424',0,'http://dummyimage.com/153x100.png/5fa2dd/ffffff'),(62,2,'Neill','Fick','nfick1m@1und1.de','i4K5IEKGGbG','2021-10-25','3470878','H','843470',1,'http://dummyimage.com/100x100.png/ff4444/ffffff'),(63,2,'Jobyna','Lorkins','jlorkins1n@webmd.com','PMOAlA0tO','2021-09-20','7202046','H','263712',0,'http://dummyimage.com/152x100.png/dddddd/000000'),(64,2,'Jammie','Maidens','jmaidens1o@wikimedia.org','lIq5qM5','2022-01-23','9422180','H','876947',0,'http://dummyimage.com/218x100.png/cc0000/ffffff'),(65,2,'Reid','Doodney','rdoodney1p@dailymotion.com','9JMXoE8ex3','2022-01-17','4095230','H','946571',0,'http://dummyimage.com/112x100.png/dddddd/000000'),(66,2,'Sheeree','Coomer','scoomer1q@com.com','lSZpGx','2021-05-31','7095867','H','630760',0,'http://dummyimage.com/148x100.png/dddddd/000000'),(67,2,'Joana','Keller','jkeller1r@slate.com','sK9Kvubdt','2022-01-06','4554911','H','522755',0,'http://dummyimage.com/245x100.png/dddddd/000000'),(68,2,'Louis','Fraulo','lfraulo1s@homestead.com','yz10UC17','2021-03-09','3514227','H','1150998',1,'http://dummyimage.com/142x100.png/dddddd/000000'),(69,2,'Stanfield','Prettjohn','sprettjohn1t@goo.ne.jp','LJs0wevded93','2021-07-18','3297315','H','1007283',0,'http://dummyimage.com/192x100.png/dddddd/000000'),(70,2,'Rhianna','Ashbridge','rashbridge1u@narod.ru','eDUk5mnfuXJ6','2021-08-06','6756731','H','431307',1,'http://dummyimage.com/149x100.png/5fa2dd/ffffff'),(71,2,'Minnaminnie','Iiannoni','miiannoni1v@businessweek.com','21NGWP2RC','2021-10-03','3982362','H','948619',0,'http://dummyimage.com/187x100.png/dddddd/000000'),(72,2,'Em','Boyet','eboyet1w@liveinternet.ru','80Qrgg2b4','2021-12-11','6922767','H','515760',1,'http://dummyimage.com/208x100.png/dddddd/000000'),(73,2,'Fernande','Conrad','fconrad1x@facebook.com','eNP6Nst8tQ','2022-01-16','7009201','H','552352',1,'http://dummyimage.com/176x100.png/cc0000/ffffff'),(74,2,'Clarke','Spittles','cspittles1y@nydailynews.com','RbjWy31aUTUu','2021-09-20','1156390','H','432066',0,'http://dummyimage.com/108x100.png/cc0000/ffffff'),(75,2,'Franky','Arstall','farstall1z@zdnet.com','jm0ZKv1k','2021-08-09','7702011','H','486808',1,'http://dummyimage.com/242x100.png/cc0000/ffffff'),(76,2,'Angelica','Hartshorn','ahartshorn20@networkadvertising.org','pKicSUz','2021-09-26','7937393','H','204536',0,'http://dummyimage.com/219x100.png/ff4444/ffffff'),(77,2,'Catarina','McCandless','cmccandless21@jimdo.com','UmLCkP1iOBp4','2021-10-12','9194633','H','1004726',0,'http://dummyimage.com/148x100.png/cc0000/ffffff'),(78,2,'Anna-diana','Fiddy','afiddy22@state.gov','ybDFAXTjXz','2021-09-21','9710356','H','566326',0,'http://dummyimage.com/105x100.png/cc0000/ffffff'),(79,2,'Cassandry','Seyfart','cseyfart23@t.co','Ie7JDI','2021-03-16','2291952','H','736937',1,'http://dummyimage.com/124x100.png/5fa2dd/ffffff'),(80,2,'Stefa','Kobes','skobes24@jiathis.com','dYMmdKBN0g2D','2021-06-17','6132134','H','1193517',1,'http://dummyimage.com/155x100.png/cc0000/ffffff'),(81,2,'Ellwood','Sallter','esallter25@themeforest.net','uCi7DZZV','2022-01-21','5290185','H','562876',0,'http://dummyimage.com/175x100.png/dddddd/000000'),(82,2,'Dorice','Jozsa','djozsa26@cloudflare.com','wh3ZsI','2021-04-14','5727340','H','1220007',1,'http://dummyimage.com/206x100.png/dddddd/000000'),(83,2,'Carley','Harlick','charlick27@squarespace.com','5qw3LLXW9','2021-06-15','5330255','H','1084919',0,'http://dummyimage.com/117x100.png/ff4444/ffffff'),(84,2,'Jacqueline','Eldin','jeldin28@huffingtonpost.com','qFvZHe','2021-10-14','2552717','H','592772',0,'http://dummyimage.com/166x100.png/dddddd/000000'),(85,2,'Wynn','Tirte','wtirte29@acquirethisname.com','MRLf5uCg','2021-12-06','9569932','H','949689',0,'http://dummyimage.com/203x100.png/5fa2dd/ffffff'),(86,2,'Janot','Duffit','jduffit2a@flickr.com','Q9QSdpimpM5','2021-10-23','6501766','H','908526',0,'http://dummyimage.com/221x100.png/dddddd/000000'),(87,2,'Alethea','Brindley','abrindley2b@wordpress.org','hXOVHYFZnk','2021-09-14','2722544','H','397306',1,'http://dummyimage.com/160x100.png/ff4444/ffffff'),(88,2,'Brewster','Girton','bgirton2c@theguardian.com','Ejmgig0q','2021-12-01','9185672','H','759126',0,'http://dummyimage.com/169x100.png/5fa2dd/ffffff'),(89,2,'Karoly','Grishanov','kgrishanov2d@hud.gov','aFiz5bsYOTgT','2021-09-14','4079638','H','660184',0,'http://dummyimage.com/187x100.png/cc0000/ffffff'),(90,2,'Ashien','Freen','afreen2e@de.vu','wem22Gag','2021-10-22','2305810','H','987863',0,'http://dummyimage.com/104x100.png/5fa2dd/ffffff'),(91,2,'Martha','Coppen','mcoppen2f@apple.com','3Tudyq5V','2021-11-08','9975605','H','786638',0,'http://dummyimage.com/206x100.png/5fa2dd/ffffff'),(92,2,'Ripley','Jarrett','rjarrett2g@discovery.com','tn3Bqu57','2022-01-11','5411807','H','982800',1,'http://dummyimage.com/104x100.png/ff4444/ffffff'),(93,2,'Andras','Furst','afurst2h@ihg.com','rHfmpVzVEj5n','2021-04-23','8307665','H','625585',0,'http://dummyimage.com/209x100.png/ff4444/ffffff'),(94,2,'Clementia','Quan','cquan2i@youtube.com','ZDG1sFTdwKi','2021-03-28','7292429','H','498386',1,'http://dummyimage.com/240x100.png/dddddd/000000'),(95,2,'Brinn','Lightoller','blightoller2j@creativecommons.org','cKf9ZnK6P','2021-10-19','8229686','H','1170779',0,'http://dummyimage.com/129x100.png/cc0000/ffffff'),(96,2,'Claudie','Yardy','cyardy2k@smh.com.au','hgzkDT','2021-12-20','1698442','H','161245',1,'http://dummyimage.com/203x100.png/cc0000/ffffff'),(97,2,'Shirline','Ragdale','sragdale2l@china.com.cn','4JbxovHgf99O','2021-04-05','7594740','H','251138',0,'http://dummyimage.com/182x100.png/ff4444/ffffff'),(98,2,'Martha','Christon','mchriston2m@newyorker.com','hObEvEIB','2021-06-28','5085012','H','935093',1,'http://dummyimage.com/201x100.png/5fa2dd/ffffff'),(99,2,'Billy','McDuffie','bmcduffie2n@tinyurl.com','B61BfNlXNw8','2021-02-26','8683450','H','860009',1,'http://dummyimage.com/103x100.png/ff4444/ffffff'),(100,2,'Maxie','Crossfeld','mcrossfeld2o@mtv.com','eIfBCme8Y','2021-06-10','1755659','H','283730',0,'http://dummyimage.com/198x100.png/5fa2dd/ffffff'),(101,2,'Isabel','Husby','ihusby2p@go.com','k0m2XeQUeG0R','2021-11-19','7376448','H','1094900',1,'http://dummyimage.com/210x100.png/cc0000/ffffff'),(102,2,'Bancroft','Acosta','bacosta2q@addtoany.com','MBpudzBAiin','2021-06-24','1228474','H','620638',1,'http://dummyimage.com/220x100.png/5fa2dd/ffffff'),(103,2,'Mureil','Caroline','mcaroline2r@nbcnews.com','RORngaqb','2021-02-28','7883283','H','794010',1,'http://dummyimage.com/201x100.png/dddddd/000000'),(305,2,'Facundo','Taborra','facundo@gmial.com','$2a$10$3QUBEW5bJiuy2t/Pxc/...fJ1BgWai6BqxJCm9bdD5HHEDFrnwKMa','2001-09-27','43493628','H','3471627777',1,'img-1646762735912-239171675.png'),(306,2,'rodolf','alcachofa','rodof@hotmail.com','$2a$10$HM8vMyrtYJsHzPNcQ2Qe7.kAvyaL.0ZxMhd9y2vys9MqkItCTXlgK','1121-02-21','12312312','H','12312312',1,'img-1646764683601-556282253.png'),(308,2,'Rodolfo','mendes','rodolf@alcachofa.com','$2a$10$2iLcAtUF90tfPhTRbFxjiuT8cbpYKRprkZGJJPD4du.BNrBgnk5DG','1231-03-12','12312313','H','12312312',1,'img-1646833857602-87038446.png');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-09 10:56:43
