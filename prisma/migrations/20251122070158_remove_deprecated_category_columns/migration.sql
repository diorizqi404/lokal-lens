/*
  Warnings:

  - You are about to drop the column `category` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `cultures` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `quizzes` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `scan_history` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `articles` DROP COLUMN `category`;

-- AlterTable
ALTER TABLE `cultures` DROP COLUMN `category`;

-- AlterTable
ALTER TABLE `events` DROP COLUMN `category`;

-- AlterTable
ALTER TABLE `quizzes` DROP COLUMN `category`;

-- AlterTable
ALTER TABLE `scan_history` DROP COLUMN `category`;
