import { FormGroup } from "./FormGroup"
import { Suspense } from "react"
import Link from "next/link"
import { SkeletonInput } from "./Skeleton"
import { UserSelectOptions } from "@/app/posts/userSelectOptions"
import { getPost } from "@/db/posts"

type Props = {
  postId?: string
}

export async function PostForm({ postId }: Props) {
  const post = postId ? await getPost(postId) : null

  return (
    <form className="form">
      <div className="form-row">
        <FormGroup errorMessage="Placeholder Error Message">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={post?.title || ""}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="userId">Author</label>
          <select name="userId" id="userId" defaultValue={post?.userId || ""}>
            <Suspense fallback={<option value="">Loading...</option>}>
              <UserSelectOptions />
            </Suspense>
          </select>
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup>
          <label htmlFor="body">Body</label>
          <textarea name="body" id="body" defaultValue={post?.body || ""} />
        </FormGroup>
      </div>
      <div className="form-row form-btn-row">
        <Link
          className="btn btn-outline"
          href={post == null ? "posts" : `posts/${postId}`}
        >
          Cancel
        </Link>
        <button className="btn">Save</button>
      </div>
    </form>
  )
}

export function SkeletonPostForm() {
  return (
    <form className="form">
      <div className="form-row">
        <FormGroup errorMessage="Placeholder Error Message">
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
        <Link className="btn btn-outline" href="..">
          Cancel
        </Link>
        <button disabled className="btn">
          Save
        </button>
      </div>
    </form>
  )
}

// export function postFormValidator({ title, body, userId }) {
//   const errors = {}

//   if (title === "") {
//     errors.title = "Required"
//   }

//   if (body === "") {
//     errors.body = "Required"
//   }

//   if (userId === "") {
//     errors.userId = "Required"
//   }

//   return errors
// }
