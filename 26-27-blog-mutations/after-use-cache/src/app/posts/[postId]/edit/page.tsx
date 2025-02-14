import { PostForm } from "@/components/PostForm"
import { getPost } from "@/db/posts"
import { notFound } from "next/navigation"
import { getUsers } from "@/db/users"

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ postId: string }>
}) {
  // TODO: Does this need to be in a Suspense boundary?
  const { postId } = await params
  const [post, users] = await Promise.all([getPost(postId), getUsers()])

  if (post == null) return notFound()

  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <PostForm userSelectOptions={<UserOptions users={users} />} post={post} />
    </>
  )
}

// TODO: Would it be better to pass this as just an array of users?
async function UserOptions({
  users,
}: {
  users: { id: number; name: string }[]
}) {
  return users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))
}
