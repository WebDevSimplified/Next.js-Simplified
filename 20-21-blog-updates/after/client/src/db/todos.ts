import { unstable_cache } from "next/cache"
import prisma from "./db"
import { cache } from "react"

export const getTodos = unstable_cache(
  cache(async () => {
    await wait(2000)

    return prisma.todo.findMany()
  }),
  ["todos"]
)

export const getUserTodos = unstable_cache(
  cache(async (userId: string | number) => {
    await wait(2000)
    return prisma.todo.findMany({ where: { userId: Number(userId) } })
  }),
  ["todos", "userId"]
)

function wait(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}
