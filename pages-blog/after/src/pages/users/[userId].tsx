import { PostCard } from "@/components/PostCard"
import { TodoItem } from "@/components/TodoItem"

export default function UserPage() {
  const user: any = {}
  const posts: any[] = []
  const todos: any[] = []

  return (
    <>
      <h1 className="page-title">{user.name}</h1>
      <div className="page-subtitle">{user.email}</div>
      <div>
        <b>Company:</b> {user.companyName}
      </div>
      <div>
        <b>Website:</b> {user.website}
      </div>
      <div>
        <b>Address:</b>{" "}
        {`${user.street} ${user.suite}
    ${user.city} ${user.zipcode}`}
      </div>

      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        {posts.map(post => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>

      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  )
}
