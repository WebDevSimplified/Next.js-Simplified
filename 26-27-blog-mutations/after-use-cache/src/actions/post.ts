"use server"

import { createPost, deletePost, updatePost } from "@/db/posts"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export async function deletePostAction(postId: string | number) {
  const post = await deletePost(postId)

  // TODO: Show how to do with both revalidatePath and revalidateTag and explain the pros/cons
  // TODO: Also maybe move the cache revalidation to the actual db function
  revalidatePath("/posts")
  revalidatePath(`/users/${post.userId}`)
  revalidatePath(`/posts/${post.id}`)

  // revalidateTag("posts:all")
  // revalidateTag(`posts:id=${post.id}`)
  // revalidateTag(`posts:userId=${post.userId}`)

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

  // TODO: Show how to do with both revalidatePath and revalidateTag and explain the pros/cons
  revalidatePath("/posts")
  revalidatePath(`/posts/${post.id}`)
  revalidatePath(`/users/${post.userId}`)

  // revalidateTag("posts:all")
  // revalidateTag(`posts:id=${post.id}`)
  // revalidateTag(`posts:userId=${post.userId}`)

  redirect(`/posts/${post.id}`)
}

export async function createPostAction(prevState: unknown, formData: FormData) {
  const [data, errors] = validatePost(formData)
  if (data == null) return errors

  const post = await createPost(data)

  // TODO: Show how to do with both revalidatePath and revalidateTag and explain the pros/cons
  revalidatePath("/posts")
  // Technically probably don't need to revalidate the post itself since it's new but will do so just in case since if there was a query to that particular ID from before it was created it would be a stale null return
  revalidatePath(`/posts/${post.id}`)
  revalidatePath(`/users/${post.userId}`)

  // revalidateTag("posts:all")
  // // Technically probably don't need to revalidate the post itself since it's new but will do so just in case since if there was a query to that particular ID from before it was created it would be a stale null return
  // revalidateTag(`posts:id=${post.id}`)
  // revalidateTag(`posts:userId=${post.userId}`)

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
