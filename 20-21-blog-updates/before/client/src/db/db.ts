import { PrismaClient } from "@prisma/client"

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var __prisma__: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.__prisma__ ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== "production") globalThis.__prisma__ = prisma
