"use server"

import { createPost, deletePost, updatePost } from "@/db/posts"
import { redirect } from "next/navigation"

export async function createPostAction(prevState: unknown, formData: FormData) {
  const [data, errors] = validatePost(formData)

  if (!data) return errors

  const post = await createPost(data)

  redirect(`/posts/${post.id}`)
}

export async function editPostAction(
  postId: number,
  prevState: unknown,
  formData: FormData
) {
  const [data, errors] = validatePost(formData)

  if (!data) return errors

  const post = await updatePost(postId, data)

  redirect(`/posts/${post.id}`)
}

export async function deletePostAction(postId: number | string) {
  await deletePost(postId)
  redirect("/posts")
}

function validatePost(formData: FormData) {
  const errors: { title?: string; body?: string; userId?: string } = {}
  const title = formData.get("title") as string
  const body = formData.get("body") as string
  const userId = Number(formData.get("userId"))
  let isValid = true

  if (title === "") {
    errors.title = "Required"
    isValid = false
  }

  if (body === "") {
    errors.body = "Required"
    isValid = false
  }

  if (isNaN(userId)) {
    errors.userId = "Required"
    isValid = false
  }

  return [isValid ? { title, body, userId } : undefined, errors] as const
}
