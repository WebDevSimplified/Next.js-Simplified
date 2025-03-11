"use client"

import { FormGroup } from "./FormGroup"
import { Suspense, useActionState } from "react"
import Link from "next/link"
import { SkeletonInput } from "./Skeleton"
import { createPostAction, editPostAction } from "@/actions/posts"

export function PostForm({
  users,
  post,
}: {
  users: { id: number; name: string }[]
  post?: {
    id: number
    title: string
    userId: number
    body: string
  }
}) {
  const action =
    post == null ? createPostAction : editPostAction.bind(null, post.id)
  const [errors, formAction, pending] = useActionState(action, {})

  return (
    <form action={formAction} className="form">
      <div className="form-row">
        <FormGroup errorMessage={errors.title}>
          <label htmlFor="title">Title</label>
          <input
            required
            type="text"
            name="title"
            id="title"
            defaultValue={post?.title}
          />
        </FormGroup>
        <FormGroup errorMessage={errors.userId}>
          <label htmlFor="userId">Author</label>
          <select
            required
            name="userId"
            id="userId"
            defaultValue={post?.userId}
          >
            <Suspense fallback={<option value="">Loading...</option>}>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
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
        <Link className="btn btn-outline" href="/posts">
          Cancel
        </Link>
        <button disabled={pending} className="btn">
          {pending ? "Saving" : "Save"}
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
