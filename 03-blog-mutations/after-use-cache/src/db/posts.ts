import { Prisma } from "@prisma/client"
import prisma from "./db"
import { cacheTag, updateTag } from "next/cache"

export async function getPosts({
  query,
  userId,
}: {
  query?: string
  userId?: string | number
} = {}) {
  "use cache"
  cacheTag("posts:all")

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
  "use cache"
  cacheTag(`posts:id=${postId}`)

  await wait(2000)
  return prisma.post.findUnique({ where: { id: Number(postId) } })
}

export async function getUserPosts(userId: string | number) {
  "use cache"
  cacheTag(`posts:userId=${userId}`)

  await wait(2000)
  return prisma.post.findMany({ where: { userId: Number(userId) } })
}

export async function createPost({
  title,
  body,
  userId,
}: {
  title: string
  body: string
  userId: number
}) {
  await wait(2000)
  const post = await prisma.post.create({
    data: {
      title,
      body,
      userId,
    },
  })

  updateTag("posts:all")
  updateTag(`posts:id=${post.id}`)
  updateTag(`posts:userId=${post.userId}`)

  return post
}

export async function updatePost(
  postId: string | number,
  {
    title,
    body,
    userId,
  }: {
    title: string
    body: string
    userId: number
  },
) {
  await wait(2000)
  const post = await prisma.post.update({
    where: { id: Number(postId) },
    data: {
      title,
      body,
      userId,
    },
  })

  updateTag("posts:all")
  updateTag(`posts:id=${post.id}`)
  updateTag(`posts:userId=${post.userId}`)

  return post
}

export async function deletePost(postId: string | number) {
  await wait(2000)

  const post = await prisma.post.delete({ where: { id: Number(postId) } })

  updateTag("posts:all")
  updateTag(`posts:id=${post.id}`)
  updateTag(`posts:userId=${post.userId}`)

  return post
}

function wait(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}
