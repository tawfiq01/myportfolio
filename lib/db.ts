import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Singleton PrismaClient (Prisma 7 requires a driver adapter), or null when
// DATABASE_URL isn't configured — callers fall back to the static content in
// lib/content.ts, so the site builds and runs even with no database attached.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient(): PrismaClient {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({ adapter });
}

export const prisma: PrismaClient | null = process.env.DATABASE_URL
  ? (globalForPrisma.prisma ?? (globalForPrisma.prisma = createClient()))
  : null;
