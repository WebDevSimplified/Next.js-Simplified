"use client"

import { FormGroup } from "./FormGroup"
import { ReactNode, Suspense, useActionState } from "react"
import Link from "next/link"
import { SkeletonInput } from "./Skeleton"
import { createPostAction, editPostAction } from "@/actions/post"

export function PostForm({
  userSelectOptions,
  post,
}: {
  userSelectOptions: ReactNode
  post?: { id: number; title: string; body: string; userId: number }
}) {
  const action =
    post == null ? createPostAction : editPostAction.bind(null, post.id)
  const [errors, formAction, isPending] = useActionState(action, {})

  return (
    <form action={formAction} className="form">
      <div className="form-row">
        <FormGroup errorMessage={errors.title}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            defaultValue={post?.title}
          />
        </FormGroup>
        <FormGroup errorMessage={errors.userId}>
          <label htmlFor="userId">Author</label>
          <select
            name="userId"
            id="userId"
            required
            defaultValue={post?.userId}
          >
            {/* TODO: Does this Suspense do anything */}
            <Suspense fallback={<option value="">Loading...</option>}>
              {userSelectOptions}
            </Suspense>
          </select>
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup errorMessage={errors.body}>
          <label htmlFor="body">Body</label>
          <textarea required name="body" id="body" defaultValue={post?.body} />
        </FormGroup>
      </div>
      <div className="form-row form-btn-row">
        <Link
          className="btn btn-outline"
          href={post ? `/posts/${post.id}` : "/posts"}
        >
          Cancel
        </Link>
        <button className="btn" disabled={isPending}>
          Save
        </button>
      </div>
    </form>
  )
}

export function SkeletonPostForm() {
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
        <Link className="btn btn-outline" href="/posts">
          Cancel
        </Link>
        <button disabled className="btn">
          Save
        </button>
      </div>
    </form>
  )
}
