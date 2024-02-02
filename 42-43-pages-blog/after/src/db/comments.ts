import prisma from "./db"

export function getPostComments(postId: string | number) {
  return prisma.comment.findMany({ where: { postId: Number(postId) } })
}
