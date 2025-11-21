# Prisma Setup Guide for Lokal Lens

## Configuration Files

- **prisma/schema.prisma** - Main Prisma schema definition (database models)
- **prisma/seed.ts** - Seed script for populating test data
- **.env.local** - Environment variables (DATABASE_URL, JWT_SECRET)
- **prisma.config.ts** - Prisma configuration (if needed for advanced options)

## Available Commands

### Using npm scripts (recommended)

```bash
# Generate Prisma Client (run after changing schema)
npm run prisma:generate

# Create and run migrations in development
npm run prisma:migrate

# Deploy migrations to production
npm run prisma:migrate:deploy

# Run seed script to populate test data
npm run prisma:seed

# Reset database (⚠️ deletes all data, then migrates and seeds)
npm run prisma:reset

# Open Prisma Studio (database GUI at http://localhost:5555)
npm run prisma:studio

# Format prisma/schema.prisma
npm run prisma:format
```

### Using npx directly

```bash
# Generate Prisma Client
npx prisma generate

# Create a new migration
npx prisma migrate dev --name add_new_table

# Deploy all pending migrations
npx prisma migrate deploy

# Run seed script
npx prisma db seed

# View database in Prisma Studio
npx prisma studio

# Check database status
npx prisma migrate status

# Format schema
npx prisma format

# Validate schema
npx prisma validate
```

## Workflow

### First Time Setup

```bash
# 1. Install dependencies
npm install

# 2. Create MySQL database
# In phpMyAdmin: Create database named "lokal-lens"

# 3. Generate Prisma Client
npm run prisma:generate

# 4. Run initial migration
npm run prisma:migrate

# 5. Populate test data
npm run prisma:seed
```

### After Schema Changes

```bash
# 1. Update prisma/schema.prisma
nano prisma/schema.prisma

# 2. Create and run migration
npm run prisma:migrate

# Give your migration a descriptive name when prompted
# Example: "add_user_preferences_table"

# 3. Seed if needed
npm run prisma:seed
```

### Reset Everything

```bash
# ⚠️ WARNING: This deletes ALL data
npm run prisma:reset

# This will:
# 1. Drop database
# 2. Create new database
# 3. Run all migrations
# 4. Run seed script
```

## Database URL

The database connection is configured in `.env.local`:

```
DATABASE_URL="mysql://root@localhost/lokal-lens"
```

Change this if your MySQL credentials differ.

## Seed Data

The seed script (`prisma/seed.ts`) creates test users:

- **Admin**: admin@lokal-lens.com / admin123456
- **Contributor**: contributor@lokal-lens.com / contributor123456
- **Officer**: officer@lokal-lens.com / officer123456
- **User**: user@lokal-lens.com / user123456

## Troubleshooting

### "Cannot find module '@prisma/client'"
```bash
npm run prisma:generate
```

### "Unable to acquire lock"
The database is locked by another process. Kill the previous Next.js process and try again.

### Migration failed
```bash
# Check migration status
npx prisma migrate status

# View migration history
npx prisma migrate history
```

### Need to modify existing migration before deployment
```bash
# Mark migration as rolled back (use with caution)
npx prisma migrate resolve --rolled-back migration_name

# Then create a new migration
npm run prisma:migrate
```

## Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Migrate Guide](https://www.prisma.io/docs/orm/prisma-migrate)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
