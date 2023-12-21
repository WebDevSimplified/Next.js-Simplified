import { SkeletonPostForm } from "@/components/PostForm"

export default async function EditPostPage() {
  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <SkeletonPostForm />
    </>
  )
}
