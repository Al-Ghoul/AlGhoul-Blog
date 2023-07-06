/*
  Warnings:

  - You are about to drop the column `tagId` on the `Post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Post_tagId_idx` ON `Post`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `tagId`;

-- CreateTable
CREATE TABLE `_PostToTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PostToTag_AB_unique`(`A`, `B`),
    INDEX `_PostToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
