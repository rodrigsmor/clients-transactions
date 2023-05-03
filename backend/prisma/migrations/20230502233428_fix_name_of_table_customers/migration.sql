/*
  Warnings:

  - You are about to drop the `custumers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `_ProductAffiliate` DROP FOREIGN KEY `_ProductAffiliate_A_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_customerId_fkey`;

-- DropTable
DROP TABLE `custumers`;

-- CreateTable
CREATE TABLE `customers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `balance_amount` DECIMAL(65, 30) NOT NULL,
    `profile_picture` LONGTEXT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `customers_name_key`(`name`),
    UNIQUE INDEX `customers_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductAffiliate` ADD CONSTRAINT `_ProductAffiliate_A_fkey` FOREIGN KEY (`A`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
