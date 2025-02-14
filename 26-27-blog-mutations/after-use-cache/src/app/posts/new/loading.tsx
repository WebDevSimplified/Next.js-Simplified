import { SkeletonPostForm } from "@/components/PostForm"

// TODO: Is this needed
export default function LoadingNewPostPage() {
  return (
    <>
      <h1 className="page-title">New Post</h1>
      <SkeletonPostForm />
    </>
  )
}
