-- Rename columns in users table
ALTER TABLE `users` 
CHANGE COLUMN `fullName` `full_name` VARCHAR(191) NOT NULL,
CHANGE COLUMN `createdAt` `created_at` DATETIME(3) NOT NULL,
CHANGE COLUMN `updatedAt` `updated_at` DATETIME(3) NOT NULL;

-- Drop the foreign key constraint first in profiles table
ALTER TABLE `profiles` DROP FOREIGN KEY `profiles_userId_fkey`;

-- Drop the unique index in profiles
ALTER TABLE `profiles` DROP INDEX `profiles_userId_key`;

-- Rename columns in profiles table
ALTER TABLE `profiles`
CHANGE COLUMN `userId` `user_id` INT NOT NULL,
CHANGE COLUMN `provincesVisited` `provinces_visited` INT NOT NULL DEFAULT 0,
CHANGE COLUMN `badgesEarned` `badges_earned` INT NOT NULL DEFAULT 0,
CHANGE COLUMN `createdAt` `created_at` DATETIME(3) NOT NULL,
CHANGE COLUMN `updatedAt` `updated_at` DATETIME(3) NOT NULL;

-- Add the new unique index with snake_case column name
ALTER TABLE `profiles` ADD UNIQUE INDEX `profiles_user_id_key`(`user_id`);

-- Add back the foreign key constraint with the new column name
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Rename columns in certificates table
ALTER TABLE `certificates` 
CHANGE COLUMN `userId` `user_id` INT NOT NULL,
CHANGE COLUMN `dateEarned` `date_earned` DATETIME(3) NOT NULL,
CHANGE COLUMN `certificateUrl` `certificate_url` VARCHAR(191) NULL,
CHANGE COLUMN `createdAt` `created_at` DATETIME(3) NOT NULL,
CHANGE COLUMN `updatedAt` `updated_at` DATETIME(3) NOT NULL;

-- Update the foreign key constraint in certificates
ALTER TABLE `certificates` DROP FOREIGN KEY `certificates_userId_fkey`;
ALTER TABLE `certificates` ADD CONSTRAINT `certificates_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
