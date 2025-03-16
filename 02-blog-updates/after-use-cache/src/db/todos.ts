import prisma from "./db"

export async function getTodos() {
  "use cache"

  await wait(2000)

  return prisma.todo.findMany()
}

export async function getUserTodos(userId: string | number) {
  "use cache"

  await wait(2000)
  return prisma.todo.findMany({ where: { userId: Number(userId) } })
}

function wait(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}
