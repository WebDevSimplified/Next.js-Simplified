import { unstable_cache } from "next/cache"
import prisma from "./db"

export const getTodos = unstable_cache(async () => {
  await wait(2000)

  return prisma.todo.findMany()
}, ["todos"])

export const getUserTodos = unstable_cache(
  async (userId: string | number) => {
    await wait(2000)
    return prisma.todo.findMany({ where: { userId: Number(userId) } })
  },
  ["todos", "userId"]
)

function wait(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}
