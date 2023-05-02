/*
  Warnings:

  - Added the required column `updatedAt` to the `custumers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `custumers` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
