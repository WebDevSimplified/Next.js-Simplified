import { getPosts } from "@/db/posts"
import { getUsers } from "@/db/users"
import { FormGroup } from "@/components/FormGroup"
import { PostCard, SkeletonPostCard } from "@/components/PostCard"
import { SkeletonList } from "@/components/Skeleton"
import { Suspense } from "react"
import Form from "next/form"
import Link from "next/link"

type SearchParams = Promise<{ query?: string; userId?: string }>

export default async function PostsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
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
              <SearchSelect searchParams={searchParams} />
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

async function SearchSelect({ searchParams }: { searchParams: SearchParams }) {
  const { userId } = await searchParams

  return (
    <select name="userId" id="userId" defaultValue={userId}>
      <Suspense fallback={<option value="">Loading...</option>}>
        <UserSelect />
      </Suspense>
    </select>
  )
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
