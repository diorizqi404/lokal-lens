import 'dotenv/config'
import { defineConfig, env } from '@/lib/prisma';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations'
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});