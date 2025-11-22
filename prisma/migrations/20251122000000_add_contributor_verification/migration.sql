-- CreateEnum for VerificationStatus
CREATE TABLE IF NOT EXISTS `contributors` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER NOT NULL,
  `reason` TEXT NULL,
  `cultural_interest` VARCHAR(255) NULL,
  `verification_status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `verified_by` INTEGER NULL,
  `verified_at` DATETIME(3) NULL,
  `rejection_reason` TEXT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,

  UNIQUE INDEX `contributors_user_id_key`(`user_id`),
  INDEX `contributors_verification_status_idx`(`verification_status`),
  INDEX `contributors_created_at_idx`(`created_at`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `contributors` ADD CONSTRAINT `contributors_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
