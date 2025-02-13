import { PostForm } from "@/components/PostForm"
import { getUsers } from "@/db/users"

export default function NewPostPage() {
  return (
    <>
      <h1 className="page-title">New Post</h1>
      <PostForm userSelectOptions={<UserOptions />} />
    </>
  )
}

// TODO: Would it be better to pass this as just an array of users?
async function UserOptions() {
  const users = await getUsers()

  return users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))
}
