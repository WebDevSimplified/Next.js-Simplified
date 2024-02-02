import { FormGroup } from "./FormGroup"
import Link from "next/link"

type Props = {
  post?: { id: number; title: string; body: string; userId: number }
}

export function PostForm({ post }: Props) {
  const users: any[] = []

  return (
    <form className="form">
      <div className="form-row">
        <FormGroup>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            defaultValue={post?.title}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="userId">Author</label>
          <select
            required
            name="userId"
            id="userId"
            defaultValue={post?.userId}
          >
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup>
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
        <button className="btn">Save</button>
      </div>
    </form>
  )
}
