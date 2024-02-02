import { PostForm } from "@/components/PostForm"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { getUsers } from "@/db/users"

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

  return {
    props: {
      users,
    },
  }
}) satisfies GetStaticProps
