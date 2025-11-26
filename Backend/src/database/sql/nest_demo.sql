use nest_demo;
show tables;
select * from users;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `notes`;
DROP TABLE IF EXISTS `refresh_tokens`;
DROP TABLE IF EXISTS `user_roles`;
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `lastLogin` datetime NULL,
  `approved` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) NULL,

  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_users_email` (`email`)
);

CREATE TABLE `refresh_tokens` (
  `id` char(36) NOT NULL,
  `token` varchar(500) NOT NULL,
  `userId` char(36) NOT NULL,
  `expiresAt` datetime NOT NULL,
  `isRevoked` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_refresh_tokens_token` (`token`),

  CONSTRAINT `FK_refresh_tokens_user`
    FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- CREATE ROLES TABLE
CREATE TABLE `roles` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),

  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_roles_name` (`name`)
);



CREATE TABLE `user_roles` (
  `userId` char(36) NOT NULL,
  `roleId` char(36) NOT NULL,

  PRIMARY KEY (`userId`, `roleId`),

  CONSTRAINT `FK_user_roles_user`
    FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
    ON DELETE CASCADE ON UPDATE NO ACTION,

  CONSTRAINT `FK_user_roles_role`
    FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`)
    ON DELETE CASCADE ON UPDATE NO ACTION
);


