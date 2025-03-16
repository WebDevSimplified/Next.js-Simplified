"use client"

import { SkeletonPostCard } from "@/components/PostCard"
import { SkeletonList } from "@/components/Skeleton"
import { ReactNode, Suspense } from "react"
import { useFormStatus } from "react-dom"

export function PostPageClient({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus()

  if (pending) {
    return (
      <SkeletonList amount={6}>
        <SkeletonPostCard />
      </SkeletonList>
    )
  }

  return (
    <div className="card-grid">
      <Suspense
        fallback={
          <SkeletonList amount={6}>
            <SkeletonPostCard />
          </SkeletonList>
        }
      >
        {children}
      </Suspense>
    </div>
  )
}
