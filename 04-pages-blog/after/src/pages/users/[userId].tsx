import { PostCard } from "@/components/PostCard"
import { TodoItem } from "@/components/TodoItem"
import { getUserPosts } from "@/db/posts"
import { getUserTodos } from "@/db/todos"
import { getUser, getUsers } from "@/db/users"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"

export default function UserPage({
  user,
  posts,
  todos,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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

export const getStaticPaths = (async () => {
  const users = await getUsers()

  return {
    paths: users.map(user => {
      return { params: { userId: user.id.toString() } }
    }),
    fallback: "blocking",
  }
}) satisfies GetStaticPaths

export const getStaticProps = (async ({ params }) => {
  const userId = params?.userId as string
  const [user, posts, todos] = await Promise.all([
    getUser(userId),
    getUserPosts(userId),
    getUserTodos(userId),
  ])

  if (user == null) return { notFound: true }

  return {
    props: {
      user,
      posts,
      todos,
    },
  }
}) satisfies GetStaticProps
