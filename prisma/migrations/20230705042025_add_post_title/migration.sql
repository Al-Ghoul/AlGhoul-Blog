-- CreateTable
CREATE TABLE `Author` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `profileImageURL` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NOT NULL,
    `languageId` INTEGER NOT NULL,

    INDEX `Author_languageId_idx`(`languageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `published` BOOLEAN NOT NULL,
    `authorId` INTEGER NOT NULL,
    `languageId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,
    `topicId` INTEGER NOT NULL,

    INDEX `Post_authorId_idx`(`authorId`),
    INDEX `Post_languageId_idx`(`languageId`),
    INDEX `Post_tagId_idx`(`tagId`),
    INDEX `Post_topicId_idx`(`topicId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `languageId` INTEGER NOT NULL,

    INDEX `Tag_languageId_idx`(`languageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Language` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Topic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tag` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Topic_Language_Translation` (
    `topicId` INTEGER NOT NULL,
    `languageId` INTEGER NOT NULL,
    `translation` VARCHAR(191) NOT NULL,

    INDEX `Topic_Language_Translation_topicId_idx`(`topicId`),
    INDEX `Topic_Language_Translation_languageId_idx`(`languageId`),
    PRIMARY KEY (`topicId`, `languageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
