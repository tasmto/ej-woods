import { PrismaClient } from '@prisma/client'

//  To avoid the warning "there are already 10 instances of prisma running"...
declare global {
  var prisma: PrismaClient | undefined
}
const prisma = global.prisma || new PrismaClient()

// Stops prisma from creating new instances every time this file is called
if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export { prisma }
