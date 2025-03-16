import { Suspense } from "react"
import { Await, useLoaderData } from "react-router"
import { getPosts } from "../api/posts"
import { PostCard, SkeletonPostCard } from "../components/PostCard"
import { SkeletonList } from "../components/Skeleton"

function PostList() {
  const { postsPromise } = useLoaderData()

  return (
    <>
      <h1 className="page-title">Posts</h1>

      <div className="card-grid">
        <Suspense
          fallback={
            <SkeletonList amount={6}>
              <SkeletonPostCard />
            </SkeletonList>
          }
        >
          <Await resolve={postsPromise}>
            {posts => posts.map(post => <PostCard key={post.id} {...post} />)}
          </Await>
        </Suspense>
      </div>
    </>
  )
}

function loader({ request: { signal } }) {
  const posts = getPosts({ signal })

  return { postsPromise: posts }
}

export const postListRoute = {
  loader,
  element: <PostList />,
}
