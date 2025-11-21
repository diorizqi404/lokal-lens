-- AlterTable
ALTER TABLE `cultures` ADD COLUMN `category` ENUM('tarian', 'musik', 'pakaian', 'arsitektur', 'kuliner', 'upacara', 'kerajinan', 'senjata', 'permainan', 'bahasa') NULL;

-- CreateIndex
CREATE INDEX `cultures_category_idx` ON `cultures`(`category`);
