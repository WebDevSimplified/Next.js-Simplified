import { getPostComments } from "@/db/comments"
import { getPost } from "@/db/posts"
import { getUser } from "@/db/users"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

export default function PostPage({
  postId,
  post,
  comments,
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  function deletePost() {
    setIsDeleting(true)
    fetch(`/api/posts/${post.id}`, { method: "DELETE" }).then(res => {
      if (res.ok) return router.push("/posts")
      setIsDeleting(false)
    })
  }

  return (
    <>
      <h1 className="page-title">
        {post.title}
        <div className="title-btns">
          <Link className="btn btn-outline" href={`/posts/${postId}/edit`}>
            Edit
          </Link>
          <button
            disabled={isDeleting}
            onClick={deletePost}
            className="btn btn-outline btn-danger"
          >
            {isDeleting ? "Deleting" : "Delete"}
          </button>
        </div>
      </h1>
      <span className="page-subtitle">
        By: <Link href={`/users/${user.id}`}>{user.name}</Link>
      </span>
      <div>{post.body}</div>

      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        {comments.map(comment => (
          <div key={comment.id} className="card">
            <div className="card-body">
              <div className="text-sm mb-1">{comment.email}</div>
              {comment.body}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export const getServerSideProps = (async ({ params }) => {
  const postId = params?.postId as string
  const comments = getPostComments(postId)
  const post = await getPost(postId)
  if (post == null) return { notFound: true }

  const user = await getUser(post.userId)
  if (user == null) return { notFound: true }

  return {
    props: {
      post,
      user,
      postId,
      comments: await comments,
    },
  }
}) satisfies GetServerSideProps
