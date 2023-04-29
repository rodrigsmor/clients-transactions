/*
  Warnings:

  - You are about to drop the column `product` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `productId` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `product`,
    ADD COLUMN `productId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
