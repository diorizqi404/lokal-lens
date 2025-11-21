-- CreateTable
CREATE TABLE `articles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `excerpt` TEXT NOT NULL,
    `content` LONGTEXT NOT NULL,
    `featured_image` VARCHAR(191) NOT NULL,
    `author_id` INTEGER NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `tags` TEXT NULL,
    `province` VARCHAR(191) NULL,
    `read_time` INTEGER NOT NULL DEFAULT 5,
    `views` INTEGER NOT NULL DEFAULT 0,
    `is_highlight` BOOLEAN NOT NULL DEFAULT false,
    `published_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `articles_slug_key`(`slug`),
    INDEX `articles_slug_idx`(`slug`),
    INDEX `articles_is_highlight_idx`(`is_highlight`),
    INDEX `articles_published_at_idx`(`published_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `article_comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `article_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `parent_id` INTEGER NULL,
    `content` TEXT NOT NULL,
    `upvotes` INTEGER NOT NULL DEFAULT 0,
    `downvotes` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `article_comments_article_id_idx`(`article_id`),
    INDEX `article_comments_user_id_idx`(`user_id`),
    INDEX `article_comments_parent_id_idx`(`parent_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_comment_votes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `comment_id` INTEGER NOT NULL,
    `vote_type` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `user_comment_votes_comment_id_idx`(`comment_id`),
    UNIQUE INDEX `user_comment_votes_user_id_comment_id_key`(`user_id`, `comment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_article_bookmarks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `article_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `user_article_bookmarks_article_id_idx`(`article_id`),
    UNIQUE INDEX `user_article_bookmarks_user_id_article_id_key`(`user_id`, `article_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cultures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `subtitle` VARCHAR(191) NULL,
    `description` TEXT NOT NULL,
    `long_description` TEXT NULL,
    `meaning` TEXT NULL,
    `location` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `status` ENUM('active', 'inactive', 'draft') NOT NULL DEFAULT 'active',
    `is_endangered` BOOLEAN NOT NULL DEFAULT false,
    `thumbnail` VARCHAR(191) NULL,
    `map_embed_url` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `cultures_slug_key`(`slug`),
    INDEX `cultures_province_idx`(`province`),
    INDEX `cultures_city_idx`(`city`),
    INDEX `cultures_latitude_longitude_idx`(`latitude`, `longitude`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `culture_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `culture_id` INTEGER NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,
    `alt_text` VARCHAR(191) NULL,
    `is_primary` BOOLEAN NOT NULL DEFAULT false,
    `display_order` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `culture_images_culture_id_idx`(`culture_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article_comments` ADD CONSTRAINT `article_comments_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article_comments` ADD CONSTRAINT `article_comments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article_comments` ADD CONSTRAINT `article_comments_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `article_comments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_comment_votes` ADD CONSTRAINT `user_comment_votes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_comment_votes` ADD CONSTRAINT `user_comment_votes_comment_id_fkey` FOREIGN KEY (`comment_id`) REFERENCES `article_comments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_article_bookmarks` ADD CONSTRAINT `user_article_bookmarks_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_article_bookmarks` ADD CONSTRAINT `user_article_bookmarks_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `culture_images` ADD CONSTRAINT `culture_images_culture_id_fkey` FOREIGN KEY (`culture_id`) REFERENCES `cultures`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
