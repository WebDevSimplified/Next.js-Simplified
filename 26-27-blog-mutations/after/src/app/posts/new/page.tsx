import { PostForm } from "@/components/PostForm"
import { getUsers } from "@/db/users"

export default async function NewPostPage() {
  const users = await getUsers()

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <PostForm users={users} />
    </>
  )
}
