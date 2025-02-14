import { SkeletonPostForm } from "@/components/PostForm"

// TODO: Can this be structured better to use Suspense instead
export default function LoadingEditPostPage() {
  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <SkeletonPostForm />
    </>
  )
}
