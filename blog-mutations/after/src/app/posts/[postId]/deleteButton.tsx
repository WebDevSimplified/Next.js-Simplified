"use client"

import { deletePost } from "@/actions/posts"
import { useTransition } from "react"

export function DeleteButton({ postId }: { postId: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      className="btn btn-outline btn-danger"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await deletePost(postId)
        })
      }
    >
      Delete
    </button>
  )
}
