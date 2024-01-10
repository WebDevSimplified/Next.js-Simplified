import { PostForm } from "@/components/PostForm"

export default function EditPostPage() {
  const post: any = {}

  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <PostForm post={post} />
    </>
  )
}
