import { createPost } from "@/db/posts"
import { validatePost } from "@/lib/validatePost"
import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") return POST(req, res)

  res.status(405)
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const [data, errors] = validatePost(req.body)
  if (data == null) return res.status(400).json(errors)

  const post = await createPost(data)

  res.revalidate(`/users/${post.userId}`)
  res.status(201).json(post)
}
