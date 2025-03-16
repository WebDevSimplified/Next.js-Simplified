import { getPosts } from "@/api/posts"
import { PostCard } from "@/components/PostCard"

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <>
      <h1 className="page-title">Posts</h1>

      <div className="card-grid">
        {posts.map(post => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  )
}
