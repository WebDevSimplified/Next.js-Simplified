"use server"

import { createPost, deletePost, updatePost } from "@/db/posts"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function deletePostAction(postId: string | number) {
  const post = await deletePost(postId)

  revalidatePath("/posts")
  revalidatePath(`/users/${post.userId}`)
  revalidatePath(`/posts/${post.id}`)
  redirect("/posts")
}

export async function editPostAction(
  postId: number,
  prevState: unknown,
  formData: FormData
) {
  const [data, errors] = validatePost(formData)
  if (data == null) return errors

  const post = await updatePost(postId, data)

  revalidatePath("/posts")
  revalidatePath(`/posts/${post.id}`)
  revalidatePath(`/users/${post.userId}`)
  redirect(`/posts/${post.id}`)
}

export async function createPostAction(prevState: unknown, formData: FormData) {
  const [data, errors] = validatePost(formData)
  if (data == null) return errors

  const post = await createPost(data)

  revalidatePath("/posts")
  revalidatePath(`/users/${post.userId}`)
  redirect(`/posts/${post.id}`)
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
