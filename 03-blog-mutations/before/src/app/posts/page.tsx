import { getPosts } from "@/db/posts"
import { getUsers } from "@/db/users"
import { FormGroup } from "@/components/FormGroup"
import { PostCard } from "@/components/PostCard"
import { Suspense } from "react"
import Form from "next/form"
import { PostPageClient } from "./_client"
import Link from "next/link"

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; userId?: string }>
}) {
  const { query = "", userId = "" } = await searchParams

  return (
    <>
      <div className="page-title">
        <h1>Posts</h1>
        <div className="title-btns">
          <Link className="btn btn-outline" href="posts/new">
            New
          </Link>
        </div>
      </div>

      <Form action="" className="form mb-4">
        <div className="form-row">
          <FormGroup>
            <label htmlFor="query">Query</label>
            <input type="search" name="query" id="query" defaultValue={query} />
          </FormGroup>
          <FormGroup>
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId" defaultValue={userId}>
              <Suspense fallback={<option value="">Loading...</option>}>
                <UserSelect />
              </Suspense>
            </select>
          </FormGroup>
          <button className="btn">Filter</button>
        </div>

        <PostPageClient>
          <PostGrid userId={userId} query={query} />
        </PostPageClient>
      </Form>
    </>
  )
}

async function PostGrid({ userId, query }: { userId: string; query: string }) {
  const posts = await getPosts({ userId, query })

  return posts.map(post => <PostCard key={post.id} {...post} />)
}

async function UserSelect() {
  const users = await getUsers()

  return (
    <>
      <option value="">Any</option>
      {users.map(user => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </>
  )
}
