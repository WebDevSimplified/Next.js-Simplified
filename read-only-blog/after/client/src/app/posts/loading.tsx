import { SkeletonPostCard } from "@/components/PostCard"
import { SkeletonList } from "@/components/Skeleton"

export default function LoadingPostsPage() {
  return (
    <>
      <h1 className="page-title">Posts</h1>

      <div className="card-grid">
        <SkeletonList amount={6}>
          <SkeletonPostCard />
        </SkeletonList>
      </div>
    </>
  )
}
