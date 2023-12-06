import { Suspense } from "react"
import { Await, defer, useLoaderData } from "react-router-dom"
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

async function loader({ request: { signal, url } }) {
  const posts = getPosts({ signal })

  return defer({
    postsPromise: posts,
  })
}

export const postListRoute = {
  loader,
  element: <PostList />,
}
