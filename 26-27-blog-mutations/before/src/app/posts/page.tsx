import { getPosts } from "@/db/posts"
import { FormGroup } from "@/components/FormGroup"
import { PostCard, SkeletonPostCard } from "@/components/PostCard"
import { SkeletonList } from "@/components/Skeleton"
import { Suspense } from "react"
import Form from "next/form"
import Link from "next/link"
import { getUsers } from "@/db/users"

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

      <Form action="/posts" className="form mb-4">
        <div className="form-row">
          <FormGroup>
            <label htmlFor="query">Query</label>
            <input type="search" name="query" id="query" defaultValue={query} />
          </FormGroup>
          <FormGroup>
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId" defaultValue={userId}>
              <Suspense fallback={<option value="">Loading...</option>}>
                <UserOptions />
              </Suspense>
            </select>
          </FormGroup>
          <button className="btn">Filter</button>
        </div>
      </Form>

      <div className="card-grid">
        <Suspense
          key={`${userId}-${query}`}
          fallback={
            <SkeletonList amount={6}>
              <SkeletonPostCard />
            </SkeletonList>
          }
        >
          <PostGrid userId={userId} query={query} />
        </Suspense>
      </div>
    </>
  )
}

async function PostGrid({ userId, query }: { userId: string; query: string }) {
  const posts = await getPosts({ query, userId })

  return posts.map(post => <PostCard key={post.id} {...post} />)
}

async function UserOptions() {
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
