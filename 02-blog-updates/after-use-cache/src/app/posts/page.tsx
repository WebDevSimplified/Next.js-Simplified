import { getPosts } from "@/db/posts"
import { getUsers } from "@/db/users"
import { FormGroup } from "@/components/FormGroup"
import { PostCard, SkeletonPostCard } from "@/components/PostCard"
import { SkeletonList } from "@/components/Skeleton"
import { Suspense } from "react"
import Form from "next/form"

type SearchParams = Promise<{ query?: string; userId?: string }>

export default async function PostsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  return (
    <>
      <h1 className="page-title">Posts</h1>

      <Form action="" className="form mb-4">
        <div className="form-row">
          <FormGroup>
            <label htmlFor="query">Query</label>
            <Suspense
              fallback={
                <input type="search" name="query" id="query" disabled />
              }
            >
              <SearchInput searchParams={searchParams} />
            </Suspense>
          </FormGroup>
          <FormGroup>
            <label htmlFor="userId">Author</label>
            <Suspense
              fallback={
                <select name="userId" id="userId" disabled>
                  <option value="">Loading...</option>
                </select>
              }
            >
              <UserSelect searchParams={searchParams} />
            </Suspense>
          </FormGroup>
          <button className="btn">Filter</button>
        </div>
      </Form>

      <div className="card-grid">
        <Suspense
          fallback={
            <SkeletonList amount={6}>
              <SkeletonPostCard />
            </SkeletonList>
          }
        >
          <PostGrid searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  )
}

async function SearchInput({ searchParams }: { searchParams: SearchParams }) {
  const { query } = await searchParams

  return <input type="search" name="query" id="query" defaultValue={query} />
}

async function PostGrid({ searchParams }: { searchParams: SearchParams }) {
  const { query = "", userId = "" } = await searchParams

  return (
    <Suspense
      key={`${userId}-${query}`}
      fallback={
        <SkeletonList amount={6}>
          <SkeletonPostCard />
        </SkeletonList>
      }
    >
      <PostGridInner userId={userId} query={query} />
    </Suspense>
  )
}

async function PostGridInner({
  userId,
  query,
}: {
  userId: string
  query: string
}) {
  const posts = await getPosts({ query, userId })

  return posts.map(post => <PostCard key={post.id} {...post} />)
}

async function UserSelect({ searchParams }: { searchParams: SearchParams }) {
  const [{ userId }, users] = await Promise.all([searchParams, getUsers()])

  return (
    <select name="userId" id="userId" defaultValue={userId}>
      <option value="">Any</option>
      {users.map(user => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  )
}
