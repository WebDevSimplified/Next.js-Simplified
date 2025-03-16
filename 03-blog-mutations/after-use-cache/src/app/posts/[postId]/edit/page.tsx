import { PostForm } from "@/components/PostForm"
import { getPost } from "@/db/posts"
import { getUsers } from "@/db/users"
import { notFound } from "next/navigation"

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ postId: string }>
}) {
  const { postId } = await params
  const [users, post] = await Promise.all([getUsers(), getPost(postId)])

  if (post == null) return notFound()

  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <PostForm users={users} post={post} />
    </>
  )
}
