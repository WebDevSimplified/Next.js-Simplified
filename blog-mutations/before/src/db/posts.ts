import { Prisma } from "@prisma/client"
import prisma from "./db"
import { unstable_cache } from "next/cache"
import { cache } from "react"

export const getPosts = unstable_cache(
  cache(
    async ({
      query,
      userId,
    }: {
      query?: string
      userId?: string | number
    } = {}) => {
      await wait(2000)

      const where: Prisma.PostFindManyArgs["where"] = {}
      if (query) {
        where.OR = [
          { title: { contains: query } },
          { body: { contains: query } },
        ]
      }

      if (userId) {
        where.userId = Number(userId)
      }

      return prisma.post.findMany({ where })
    }
  ),
  ["posts"]
)

export const getPost = unstable_cache(
  cache(async (postId: string | number) => {
    await wait(2000)
    return prisma.post.findUnique({ where: { id: Number(postId) } })
  }),
  ["posts", "postId"]
)

export const getUserPosts = unstable_cache(
  cache(async (userId: string | number) => {
    await wait(2000)
    return prisma.post.findMany({ where: { userId: Number(userId) } })
  }),
  ["posts", "userId"]
)

export function createPost({
  title,
  body,
  userId,
}: {
  title: string
  body: string
  userId: number
}) {
  return prisma.post.create({
    data: {
      title,
      body,
      userId,
    },
  })
}

export function updatePost(
  postId: string | number,
  {
    title,
    body,
    userId,
  }: {
    title: string
    body: string
    userId: number
  }
) {
  return prisma.post.update({
    where: { id: Number(postId) },
    data: {
      title,
      body,
      userId,
    },
  })
}

export function deletePost(postId: string | number) {
  return prisma.post.delete({ where: { id: Number(postId) } })
}

function wait(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}
