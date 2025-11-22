-- DropIndex
DROP INDEX `cultures_category_idx` ON `cultures`;

-- DropIndex
DROP INDEX `quizzes_category_idx` ON `quizzes`;

-- AlterTable
ALTER TABLE `articles` ADD COLUMN `category_id` INTEGER NULL,
    MODIFY `category` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `cultures` ADD COLUMN `category_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `events` ADD COLUMN `category_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `quizzes` ADD COLUMN `category_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `icon` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `categories_name_key`(`name`),
    UNIQUE INDEX `categories_slug_key`(`slug`),
    INDEX `categories_type_idx`(`type`),
    INDEX `categories_slug_idx`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `scan_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `culture_id` INTEGER NULL,
    `object_name` VARCHAR(191) NOT NULL,
    `object_type` VARCHAR(191) NOT NULL,
    `category_id` INTEGER NULL,
    `category` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `province` VARCHAR(191) NULL,
    `accuracy` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `image_data` LONGTEXT NULL,
    `scan_result` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `scan_history_user_id_idx`(`user_id`),
    INDEX `scan_history_culture_id_idx`(`culture_id`),
    INDEX `scan_history_object_type_idx`(`object_type`),
    INDEX `scan_history_province_idx`(`province`),
    INDEX `scan_history_category_id_idx`(`category_id`),
    INDEX `scan_history_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `articles_category_id_idx` ON `articles`(`category_id`);

-- CreateIndex
CREATE INDEX `cultures_category_id_idx` ON `cultures`(`category_id`);

-- CreateIndex
CREATE INDEX `events_category_id_idx` ON `events`(`category_id`);

-- CreateIndex
CREATE INDEX `quizzes_category_id_idx` ON `quizzes`(`category_id`);

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cultures` ADD CONSTRAINT `cultures_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quizzes` ADD CONSTRAINT `quizzes_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `scan_history` ADD CONSTRAINT `scan_history_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `scan_history` ADD CONSTRAINT `scan_history_culture_id_fkey` FOREIGN KEY (`culture_id`) REFERENCES `cultures`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `scan_history` ADD CONSTRAINT `scan_history_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
