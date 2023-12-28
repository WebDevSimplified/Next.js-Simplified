import { SkeletonPostForm } from "@/components/PostForm"

export default async function NewPostPage() {
  return (
    <>
      <h1 className="page-title">New Post</h1>
      <SkeletonPostForm />
    </>
  )
}
