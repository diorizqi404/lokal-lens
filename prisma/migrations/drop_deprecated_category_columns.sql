-- Drop deprecated category columns from all tables
-- Run this after creating the category_id columns and migrating data

-- Drop category column from articles table
ALTER TABLE articles DROP COLUMN IF EXISTS category;

-- Drop category column from cultures table  
ALTER TABLE cultures DROP COLUMN IF EXISTS category;

-- Drop category column from quizzes table
ALTER TABLE quizzes DROP COLUMN IF EXISTS category;

-- Drop category column from events table
ALTER TABLE events DROP COLUMN IF EXISTS category;

-- Drop category column from scan_history table
ALTER TABLE scan_history DROP COLUMN IF EXISTS category;
