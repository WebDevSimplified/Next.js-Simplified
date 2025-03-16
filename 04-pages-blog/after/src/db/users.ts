import prisma from "./db"

export function getUsers() {
  return prisma.user.findMany()
}

export function getUser(userId: string | number) {
  return prisma.user.findUnique({ where: { id: Number(userId) } })
}
