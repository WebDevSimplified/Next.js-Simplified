"use client"

import { deletePostAction } from "@/app/actions/post"
import { useTransition } from "react"

export function DeleteButton({ postId }: { postId: string }) {
  const [isPending, startTransition] = useTransition()
  return (
    <button
      disabled={isPending}
      className="btn btn-outline btn-danger"
      onClick={() => {
        startTransition(async () => {
          await deletePostAction(postId)
        })
      }}
    >
      {isPending ? "Deleting" : "Delete"}
    </button>
  )
}
