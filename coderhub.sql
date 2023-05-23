/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80024
 Source Host           : localhost:3306
 Source Schema         : coderhub

 Target Server Type    : MySQL
 Target Server Version : 80024
 File Encoding         : 65001

 Date: 23/05/2023 20:29:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for avatar
-- ----------------------------
DROP TABLE IF EXISTS `avatar`;
CREATE TABLE `avatar`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `mimetype` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `size` int(0) NULL DEFAULT NULL,
  `user_id` int(0) NULL DEFAULT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `filename`(`filename`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `avatar_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of avatar
-- ----------------------------
INSERT INTO `avatar` VALUES (1, 'c177dae7d5d834395563b4de02fcc737', 'image/jpeg', 345134, 5, '2023-04-24 10:20:40', '2023-04-24 10:20:40');
INSERT INTO `avatar` VALUES (2, '7b43609d372d3eab0eed71d86a01d5f2', 'image/jpeg', 212137, 5, '2023-04-24 11:00:38', '2023-04-24 11:00:38');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `moment_id` int(0) NOT NULL,
  `user_id` int(0) NOT NULL,
  `comment_id` int(0) NULL DEFAULT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `moment_id`(`moment_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `comment_id`(`comment_id`) USING BTREE,
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (1, '你好', 8, 5, NULL, '2023-04-23 16:12:57', '2023-04-23 16:12:57');
INSERT INTO `comment` VALUES (2, '你好', 8, 5, 1, '2023-04-23 16:14:52', '2023-04-23 16:14:52');

-- ----------------------------
-- Table structure for label
-- ----------------------------
DROP TABLE IF EXISTS `label`;
CREATE TABLE `label`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of label
-- ----------------------------
INSERT INTO `label` VALUES (1, '篮球', '2023-04-23 16:52:59', '2023-04-23 16:52:59');
INSERT INTO `label` VALUES (2, 'rap', '2023-04-23 17:01:46', '2023-04-23 17:01:46');
INSERT INTO `label` VALUES (3, '唱歌', '2023-04-23 17:02:15', '2023-04-23 17:02:15');
INSERT INTO `label` VALUES (4, '编程', '2023-04-23 17:02:20', '2023-04-23 17:02:20');
INSERT INTO `label` VALUES (5, '哲学', '2023-04-23 21:17:56', '2023-04-23 21:17:56');
INSERT INTO `label` VALUES (6, '爱情', '2023-04-23 21:17:56', '2023-04-23 21:17:56');
INSERT INTO `label` VALUES (7, '随笔', '2023-04-23 21:44:31', '2023-04-23 21:44:31');
INSERT INTO `label` VALUES (8, '人生', '2023-04-23 21:57:47', '2023-04-23 21:57:47');

-- ----------------------------
-- Table structure for moment
-- ----------------------------
DROP TABLE IF EXISTS `moment`;
CREATE TABLE `moment`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` int(0) NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of moment
-- ----------------------------
INSERT INTO `moment` VALUES (8, '呵呵呵', 6, '2023-04-16 19:27:37', '2023-04-17 10:39:56');
INSERT INTO `moment` VALUES (9, '哈哈哈', 6, '2023-04-17 10:16:29', '2023-04-17 10:16:29');
INSERT INTO `moment` VALUES (10, '牛B', 6, '2023-04-17 10:16:44', '2023-04-17 10:16:44');
INSERT INTO `moment` VALUES (11, '你好', 5, '2023-04-23 15:55:59', '2023-04-23 15:55:59');
INSERT INTO `moment` VALUES (12, '你好', 5, '2023-04-23 15:57:50', '2023-04-23 15:57:50');

-- ----------------------------
-- Table structure for moment_label
-- ----------------------------
DROP TABLE IF EXISTS `moment_label`;
CREATE TABLE `moment_label`  (
  `moment_id` int(0) NOT NULL,
  `label_id` int(0) NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`moment_id`, `label_id`) USING BTREE,
  INDEX `label_id`(`label_id`) USING BTREE,
  CONSTRAINT `moment_label_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `moment_label_ibfk_2` FOREIGN KEY (`label_id`) REFERENCES `label` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of moment_label
-- ----------------------------
INSERT INTO `moment_label` VALUES (8, 1, '2023-04-23 21:52:34', '2023-04-23 21:52:34');
INSERT INTO `moment_label` VALUES (8, 2, '2023-04-23 21:55:43', '2023-04-23 21:55:43');
INSERT INTO `moment_label` VALUES (8, 3, '2023-04-23 21:55:43', '2023-04-23 21:55:43');
INSERT INTO `moment_label` VALUES (8, 5, '2023-04-23 21:55:44', '2023-04-23 21:55:44');
INSERT INTO `moment_label` VALUES (8, 6, '2023-04-23 21:55:44', '2023-04-23 21:55:44');
INSERT INTO `moment_label` VALUES (8, 7, '2023-04-23 21:55:44', '2023-04-23 21:55:44');
INSERT INTO `moment_label` VALUES (8, 8, '2023-04-23 21:57:47', '2023-04-23 21:57:47');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `avatar_url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (5, 'hello', '827ccb0eea8a706c4c34a16891f84e7b', '2023-04-15 18:47:19', '2023-04-24 11:00:38', 'http://localhost:8000/users/avatar/5');
INSERT INTO `user` VALUES (6, 'never', '827ccb0eea8a706c4c34a16891f84e7b', '2023-04-15 18:47:50', '2023-04-15 18:47:50', NULL);

SET FOREIGN_KEY_CHECKS = 1;
