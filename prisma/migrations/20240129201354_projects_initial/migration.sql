-- CreateTable
CREATE TABLE `Project` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `imageURL` VARCHAR(191) NOT NULL,
    `languageId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,

    INDEX `Project_languageId_idx`(`languageId`),
    INDEX `Project_tagId_idx`(`tagId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
