import prisma from "./db"

export async function getPostComments(postId: string | number) {
  await wait(2000)
  return prisma.comment.findMany({ where: { postId: Number(postId) } })
}

function wait(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}
