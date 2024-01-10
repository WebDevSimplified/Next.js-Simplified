import { Prisma } from "@prisma/client"
import prisma from "./db"

export function getPosts({
  query,
  userId,
}: {
  query?: string
  userId?: string | number
} = {}) {
  const where: Prisma.PostFindManyArgs["where"] = {}
  if (query) {
    where.OR = [{ title: { contains: query } }, { body: { contains: query } }]
  }

  if (userId) {
    where.userId = Number(userId)
  }

  return prisma.post.findMany({ where })
}

export function getPost(postId: string | number) {
  return prisma.post.findUnique({ where: { id: Number(postId) } })
}

export function getUserPosts(userId: string | number) {
  return prisma.post.findMany({ where: { userId: Number(userId) } })
}

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
