type Post = {
  id: number
  title: string
  body: string
  userId: number
}

export async function getPosts() {
  await wait(2000)
  return fetch(`${process.env.API_URL}/posts`)
    .then(res => res.json())
    .then(data => data as Post[])
}

export async function getPost(postId: string | number) {
  await wait(2000)
  return fetch(`${process.env.API_URL}/posts/${postId}`)
    .then(res => res.json())
    .then(data => data as Post)
}

export async function getUserPosts(userId: string | number) {
  await wait(2000)
  return fetch(`${process.env.API_URL}/posts?userId=${userId}`)
    .then(res => res.json())
    .then(data => data as Post[])
}

function wait(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}
