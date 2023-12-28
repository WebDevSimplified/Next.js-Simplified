import { getPosts } from "@/db/posts"
import { PostCard, SkeletonPostCard } from "@/components/PostCard"
import { SkeletonList } from "@/components/Skeleton"
import { Suspense } from "react"
import { SearchForm } from "./searchForm"
import Link from "next/link"
import { UserSelectOptions } from "./userSelectOptions"

type PageProps = {
  searchParams: { query?: string; userId?: string }
}

export default function PostsPage({
  searchParams: { userId = "", query = "" },
}: PageProps) {
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

      <SearchForm userOptions={<UserSelectOptions withAnyOption />} />

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
