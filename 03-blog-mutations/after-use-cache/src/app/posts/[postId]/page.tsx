import { getPostComments } from "@/db/comments"
import { getPost } from "@/db/posts"
import { getUser } from "@/db/users"
import { Skeleton, SkeletonButton, SkeletonList } from "@/components/Skeleton"
import Link from "next/link"
import { Suspense } from "react"
import { notFound } from "next/navigation"
import { DeleteButton } from "./_DeleteButton"

export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>
}) {
  return (
    <>
      <Suspense
        fallback={
          <>
            <div className="page-title">
              <Skeleton inline short />
              <div className="title-btns">
                <SkeletonButton />
                <SkeletonButton />
              </div>
            </div>
            <span className="page-subtitle">
              By: <Skeleton short inline />
            </span>
            <div>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          </>
        }
      >
        <PostDetails params={params} />
      </Suspense>

      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        <Suspense
          fallback={
            <SkeletonList amount={5}>
              <div className="card">
                <div className="card-body">
                  <div className="text-sm mb-1">
                    <Skeleton short />
                  </div>
                  <Skeleton />
                  <Skeleton />
                </div>
              </div>
            </SkeletonList>
          }
        >
          <Comments params={params} />
        </Suspense>
      </div>
    </>
  )
}

async function PostDetails({
  params,
}: {
  params: Promise<{ postId: string }>
}) {
  const { postId } = await params
  const post = await getPost(postId)

  if (post == null) return notFound()

  return (
    <>
      <div className="page-title">
        <h1>{post.title}</h1>
        <div className="title-btns">
          <Link className="btn btn-outline" href={`/posts/${postId}/edit`}>
            Edit
          </Link>
          <DeleteButton postId={postId} />
        </div>
      </div>
      <span className="page-subtitle">
        By:{" "}
        <Suspense fallback={<Skeleton short inline />}>
          <UserDetails userId={post.userId} />
        </Suspense>
      </span>
      <div>{post.body}</div>
    </>
  )
}

async function UserDetails({ userId }: { userId: number }) {
  const user = await getUser(userId)

  if (user == null) return notFound()

  return <Link href={`/users/${user.id}`}>{user.name}</Link>
}

async function Comments({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params
  const comments = await getPostComments(postId)

  return comments.map(comment => (
    <div key={comment.id} className="card">
      <div className="card-body">
        <div className="text-sm mb-1">{comment.email}</div>
        {comment.body}
      </div>
    </div>
  ))
}
