import { PostForm } from "@/components/PostForm"
import { getPost } from "@/db/posts"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { getUsers } from "@/db/users"

export default function EditPostPage({
  users,
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <PostForm post={post} users={users} />
    </>
  )
}

export const getServerSideProps = (async ({ params }) => {
  const [post, users] = await Promise.all([
    getPost(params?.postId as string),
    getUsers(),
  ])

  if (post == null) return { notFound: true }

  return {
    props: {
      post,
      users,
    },
  }
}) satisfies GetServerSideProps
