import { SkeletonPostForm } from "@/components/PostForm"

export default function LoadingEditPostPage() {
  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <SkeletonPostForm />
    </>
  )
}
