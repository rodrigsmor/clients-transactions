/*
  Warnings:

  - You are about to drop the `ProductAffiliate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `costumers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductAffiliate` DROP FOREIGN KEY `ProductAffiliate_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductAffiliate` DROP FOREIGN KEY `ProductAffiliate_productId_fkey`;

-- DropForeignKey
ALTER TABLE `_ProductAffiliate` DROP FOREIGN KEY `_ProductAffiliate_A_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_customerId_fkey`;

-- DropTable
DROP TABLE `ProductAffiliate`;

-- DropTable
DROP TABLE `costumers`;

-- CreateTable
CREATE TABLE `custumers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `balance_amount` DECIMAL(65, 30) NOT NULL,
    `profile_picture` VARCHAR(191) NULL,

    UNIQUE INDEX `custumers_name_key`(`name`),
    UNIQUE INDEX `custumers_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `custumers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `custumers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductAffiliate` ADD CONSTRAINT `_ProductAffiliate_A_fkey` FOREIGN KEY (`A`) REFERENCES `custumers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
