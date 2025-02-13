import { getPosts } from "@/db/posts"
import { getUsers } from "@/db/users"
import { FormGroup } from "@/components/FormGroup"
import { PostCard, SkeletonPostCard } from "@/components/PostCard"
import { SkeletonList } from "@/components/Skeleton"
import { Suspense } from "react"
import { SearchForm } from "./searchForm"

type PageProps = {
  searchParams: { query?: string; userId?: string }
}

export default function PostsPage({
  searchParams: { userId = "", query = "" },
}: PageProps) {
  return (
    <>
      <h1 className="page-title">Posts</h1>

      <SearchForm userOptions={<UserSelect />} />

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
