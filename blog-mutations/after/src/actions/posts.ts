"use server"

import {
  deletePost as deletePostFromDB,
  updatePost as updatePostFromDB,
  createPost as createPostFromDB,
} from "@/db/posts"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createPost(prevState: unknown, formData: FormData) {
  const [data, errors] = validatePost(formData)
  if (!data) return errors

  const post = await createPostFromDB(data)

  revalidatePath("/posts")
  revalidatePath(`/users/${post.userId}`)
  redirect("/posts")
}

export async function updatePost(
  postId: string | number,
  prevState: unknown,
  formData: FormData
) {
  const [data, errors] = validatePost(formData)
  if (!data) return errors

  const post = await updatePostFromDB(postId, data)

  revalidatePath("/posts")
  revalidatePath(`/posts/${postId}`)
  revalidatePath(`/users/${post.userId}`)
  redirect(`/posts/${postId}`)
}

export async function deletePost(postId: string | number) {
  const post = await deletePostFromDB(postId)

  revalidatePath("/posts")
  revalidatePath(`/posts/${postId}`)
  revalidatePath(`/users/${post.userId}`)
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
