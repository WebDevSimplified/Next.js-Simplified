import { getUserPosts } from "@/db/posts"
import { getUserTodos } from "@/db/todos"
import { getUser } from "@/db/users"
import { PostCard, SkeletonPostCard } from "@/components/PostCard"
import { Skeleton, SkeletonList } from "@/components/Skeleton"
import { TodoItem } from "@/components/TodoItem"
import { Suspense } from "react"
import { notFound } from "next/navigation"

export default async function UserPage({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  return (
    <>
      <Suspense
        fallback={
          <>
            <h1 className="page-title">
              <Skeleton short inline />
            </h1>
            <div className="page-subtitle">
              <Skeleton short inline />
            </div>
            <div>
              <b>Company:</b> <Skeleton short inline />
            </div>
            <div>
              <b>Website:</b> <Skeleton short inline />
            </div>
            <div>
              <b>Address:</b> <Skeleton short inline />
            </div>
          </>
        }
      >
        <UserDetailsWrapper params={params} />
      </Suspense>

      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        <Suspense
          fallback={
            <SkeletonList amount={3}>
              <SkeletonPostCard />
            </SkeletonList>
          }
        >
          <UserPostsWrapper params={params} />
        </Suspense>
      </div>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        <Suspense
          fallback={
            <SkeletonList amount={5}>
              <li>
                <Skeleton short />
              </li>
            </SkeletonList>
          }
        >
          <UserTodosWrapper params={params} />
        </Suspense>
      </ul>
    </>
  )
}

async function UserDetailsWrapper({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params
  return <UserDetails userId={userId} />
}

async function UserPostsWrapper({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params
  return <UserPosts userId={userId} />
}

async function UserTodosWrapper({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params
  return <UserTodos userId={userId} />
}

async function UserDetails({ userId }: { userId: string }) {
  const user = await getUser(userId)

  if (user == null) return notFound()

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
    </>
  )
}

async function UserPosts({ userId }: { userId: string }) {
  const posts = await getUserPosts(userId)

  return posts.map(post => <PostCard key={post.id} {...post} />)
}

async function UserTodos({ userId }: { userId: string }) {
  const todos = await getUserTodos(userId)

  return todos.map(todo => <TodoItem key={todo.id} {...todo} />)
}
