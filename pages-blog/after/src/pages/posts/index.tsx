import { FormGroup } from "@/components/FormGroup"
import { PostCard } from "@/components/PostCard"
import Link from "next/link"
import { useRef } from "react"

export default function PostsPage() {
  const posts: any[] = []

  return (
    <>
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <Link className="btn btn-outline" href="posts/new">
            New
          </Link>
        </div>
      </h1>

      <SearchForm />

      <div className="card-grid">
        {posts.map(post => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  )
}

function SearchForm() {
  const query = ""
  const userId = ""
  const queryRef = useRef<HTMLInputElement>(null)
  const userRef = useRef<HTMLSelectElement>(null)

  const users: any[] = []

  return (
    <form className="form mb-4">
      <div className="form-row">
        <FormGroup>
          <label htmlFor="query">Query</label>
          <input
            type="search"
            name="query"
            id="query"
            defaultValue={query}
            ref={queryRef}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="userId">Author</label>
          <select name="userId" id="userId" defaultValue={userId} ref={userRef}>
            <option value="">Any</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </FormGroup>
        <button className="btn">Filter</button>
      </div>
    </form>
  )
}
