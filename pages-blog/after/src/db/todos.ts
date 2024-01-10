import prisma from "./db"

export function getTodos() {
  return prisma.todo.findMany()
}

export function getUserTodos(userId: string | number) {
  return prisma.todo.findMany({ where: { userId: Number(userId) } })
}
