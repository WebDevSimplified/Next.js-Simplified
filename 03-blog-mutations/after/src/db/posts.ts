import { Prisma } from "@prisma/client"
import prisma from "./db"
import { updateTag, unstable_cache } from "next/cache"

export const getPosts = unstable_cache(
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
      where.OR = [{ title: { contains: query } }, { body: { contains: query } }]
    }

    if (userId) {
      where.userId = Number(userId)
    }

    return prisma.post.findMany({ where })
  },
  ["posts"],
  { tags: ["posts:all"] },
)

export async function getPost(postId: string | number) {
  const func = unstable_cache(_getPost, ["posts", "postId"], {
    tags: [`posts:id=${postId}`],
  })

  return await func(postId)
}

async function _getPost(postId: string | number) {
  await wait(2000)
  return prisma.post.findUnique({ where: { id: Number(postId) } })
}

export async function getUserPosts(userId: string | number) {
  const func = unstable_cache(_getUserPosts, ["posts", "userId"], {
    tags: [`posts:userId=${userId}`],
  })

  return await func(userId)
}

async function _getUserPosts(userId: string | number) {
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
