import { Prisma } from "@prisma/client"
import prisma from "./db"

export async function getPosts({
  query,
  userId,
}: {
  query?: string
  userId?: string | number
} = {}) {
  await wait(2000)

  const where: Prisma.PostFindManyArgs["where"] = {}
  if (query) {
    where.OR = [{ title: { contains: query } }, { body: { contains: query } }]
  }

  if (userId) {
    where.userId = Number(userId)
  }

  return prisma.post.findMany({ where })
}

export async function getPost(postId: string | number) {
  await wait(2000)
  return prisma.post.findUnique({ where: { id: Number(postId) } })
}

export async function getUserPosts(userId: string | number) {
  await wait(2000)
  return prisma.post.findMany({ where: { userId: Number(userId) } })
}

function wait(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}
