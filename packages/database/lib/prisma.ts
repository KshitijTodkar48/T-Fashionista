import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient();

if (process.env.NODE_ENV != "production") globalForPrisma.prisma;

// This code ensures that we only have one instance of the Prisma Client in our application, by using the global object to create a global variable prisma.By doing this, we can reuse the same prisma instance across our entire application.