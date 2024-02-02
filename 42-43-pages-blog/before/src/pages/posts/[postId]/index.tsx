import Link from "next/link"

export default function PostPage() {
  const postId = "1"
  const post: any = {}
  const user: any = {}
  const comments: any[] = []

  return (
    <>
      <h1 className="page-title">
        {post.title}
        <div className="title-btns">
          <Link className="btn btn-outline" href={`/posts/${postId}/edit`}>
            Edit
          </Link>
          <button className="btn btn-outline btn-danger">Delete</button>
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
