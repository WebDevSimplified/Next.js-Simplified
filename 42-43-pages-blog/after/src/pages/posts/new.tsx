import { PostForm } from "@/components/PostForm"
import { getUsers } from "@/db/users"
import { GetStaticProps, InferGetStaticPropsType } from "next"

export default function NewPostPage({
  users,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <h1 className="page-title">New Post</h1>
      <PostForm users={users} />
    </>
  )
}

export const getStaticProps = (async () => {
  const users = await getUsers()

  return { props: { users } }
}) satisfies GetStaticProps
