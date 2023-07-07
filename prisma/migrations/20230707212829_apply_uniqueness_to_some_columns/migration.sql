/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code,name]` on the table `Language` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,languageId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,languageId]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tag]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Author_name_key` ON `Author`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Language_code_name_key` ON `Language`(`code`, `name`);

-- CreateIndex
CREATE UNIQUE INDEX `Post_title_languageId_key` ON `Post`(`title`, `languageId`);

-- CreateIndex
CREATE UNIQUE INDEX `Tag_name_languageId_key` ON `Tag`(`name`, `languageId`);

-- CreateIndex
CREATE UNIQUE INDEX `Topic_tag_key` ON `Topic`(`tag`);
