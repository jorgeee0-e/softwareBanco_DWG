CREATE TABLE `accounts`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_user` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `balance` decimal(65, 2) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_account`(`id_user`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `branches`  (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `id_manager` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `manager_user_branch`(`id_manager`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `client_movements`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type` enum('Depósito','Retiro') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `account`(`account`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `loan_movements`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `account_creditor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `account_borrower` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `interest` decimal(65, 2) NOT NULL,
  `period` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `account`(`account_creditor`) USING BTREE,
  INDEX `transfer_account_receiver`(`account_borrower`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `movements`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `amount` decimal(65, 2) NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date` datetime(0) NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_user` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_movement`(`id_user`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `roles`  (
  `id` int NOT NULL,
  `name` enum('Cliente','Dependiente del Banco','Cajero','Gerente de Sucursal','Gerente General del Banco') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `transfer_movements`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `account_transmitter` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `account_receiver` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `account`(`account_transmitter`) USING BTREE,
  INDEX `transfer_account_receiver`(`account_receiver`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `users`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `full_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_branch` int NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_role` int NOT NULL,
  `dui` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `salary` decimal(10, 2) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `role_user`(`id_role`) USING BTREE,
  INDEX `branch_user`(`id_branch`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

ALTER TABLE `accounts` ADD CONSTRAINT `user_account` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `branches` ADD CONSTRAINT `manager_user_branch` FOREIGN KEY (`id_manager`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `client_movements` ADD CONSTRAINT `account` FOREIGN KEY (`account`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `client_movements` ADD CONSTRAINT `movement` FOREIGN KEY (`id`) REFERENCES `movements` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `loan_movements` ADD CONSTRAINT `loan_movements_ibfk_3` FOREIGN KEY (`id`) REFERENCES `movements` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `loan_movements` ADD CONSTRAINT `accounts_borrower_movement` FOREIGN KEY (`account_borrower`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `loan_movements` ADD CONSTRAINT `accounts_creditor_movement` FOREIGN KEY (`account_creditor`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `movements` ADD CONSTRAINT `user_movement` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `transfer_movements` ADD CONSTRAINT `transfer_movements_ibfk_2` FOREIGN KEY (`id`) REFERENCES `movements` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `transfer_movements` ADD CONSTRAINT `transfer_account_receiver` FOREIGN KEY (`account_receiver`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `transfer_movements` ADD CONSTRAINT `transfer_account_transmitter` FOREIGN KEY (`account_transmitter`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `users` ADD CONSTRAINT `role_user` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `users` ADD CONSTRAINT `branch_user` FOREIGN KEY (`id_branch`) REFERENCES `branches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

