import { PostForm } from "@/components/PostForm"
import { getPost } from "@/db/posts"
import { getUsers } from "@/db/users"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ postId: string }>
}) {
  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPostFormWrapper params={params} />
      </Suspense>
    </>
  )
}

async function EditPostFormWrapper({
  params,
}: {
  params: Promise<{ postId: string }>
}) {
  const { postId } = await params
  const [users, post] = await Promise.all([getUsers(), getPost(postId)])

  if (post == null) return notFound()

  return <PostForm users={users} post={post} />
}
