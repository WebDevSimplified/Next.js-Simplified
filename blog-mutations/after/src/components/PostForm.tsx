"use client"

import { FormGroup } from "./FormGroup"
import { ReactNode, Suspense } from "react"
import Link from "next/link"
import { SkeletonInput } from "./Skeleton"
import { useFormState, useFormStatus } from "react-dom"

type Props = {
  post?: { id: number; title: string; body: string; userId: number }
  userSelectOptions: ReactNode
  action: (
    prevState: unknown,
    formData: FormData
  ) => Promise<{ title?: string; body?: string; userId?: string }>
}

export function PostForm({ action, userSelectOptions, post }: Props) {
  const [errors, formAction] = useFormState(action, {})

  return (
    <form action={formAction} className="form">
      <div className="form-row">
        <FormGroup errorMessage={errors.title}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={post?.title || ""}
          />
        </FormGroup>
        <FormGroup errorMessage={errors.userId}>
          <label htmlFor="userId">Author</label>
          <select name="userId" id="userId" defaultValue={post?.userId || ""}>
            <Suspense fallback={<option value="">Loading...</option>}>
              {userSelectOptions}
            </Suspense>
          </select>
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup errorMessage={errors.body}>
          <label htmlFor="body">Body</label>
          <textarea name="body" id="body" defaultValue={post?.body || ""} />
        </FormGroup>
      </div>
      <div className="form-row form-btn-row">
        <Link
          className="btn btn-outline"
          href={post == null ? "/posts" : `/posts/${post.id}`}
        >
          Cancel
        </Link>
        <SubmitButton />
      </div>
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button disabled={pending} className="btn">
      {pending ? "Saving" : "Save"}
    </button>
  )
}

export function SkeletonPostForm({ postId }: { postId?: string }) {
  return (
    <form className="form">
      <div className="form-row">
        <FormGroup>
          <label htmlFor="title">Title</label>
          <SkeletonInput />
        </FormGroup>
        <FormGroup>
          <label htmlFor="userId">Author</label>
          <SkeletonInput />
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup>
          <label htmlFor="body">Body</label>
          <SkeletonInput />
        </FormGroup>
      </div>
      <div className="form-row form-btn-row">
        <Link
          className="btn btn-outline"
          href={postId == null ? "/posts" : `/posts/${postId}`}
        >
          Cancel
        </Link>
        <button disabled className="btn">
          Save
        </button>
      </div>
    </form>
  )
}
