import { deletePost, updatePost } from "@/db/posts"
import { validatePost } from "@/lib/validatePost"
import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") return PUT(req, res)
  if (req.method === "DELETE") return DELETE(req, res)

  res.status(405)
}

async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.postId as string
  const [data, errors] = validatePost(req.body)
  if (data == null) return res.status(400).json(errors)

  const post = await updatePost(postId, data)

  res.revalidate(`/users/${post.userId}`)
  res.status(200).json(post)
}

async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const post = await deletePost(req.query.postId as string)

  if (post == null) return res.status(404)

  res.revalidate(`/users/${post.userId}`)
  res.status(200).json(post)
}
