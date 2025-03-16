import { PrismaClient } from "@prisma/client"
import seedData from "./seed.json"

const prisma = new PrismaClient()

async function createUsers() {
  await prisma.user.deleteMany()
  return Promise.all(
    seedData.users.map(async user => {
      return prisma.user.create({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          website: user.website,
          companyName: user.company.name,
          city: user.address.city,
          street: user.address.street,
          suite: user.address.suite,
          zipcode: user.address.zipcode,
        },
      })
    })
  )
}

async function createTodos() {
  await prisma.todo.deleteMany()
  return Promise.all(
    seedData.todos.map(async todo => {
      return prisma.todo.create({
        data: {
          id: todo.id,
          title: todo.title,
          completed: todo.completed,
          userId: todo.userId,
        },
      })
    })
  )
}

async function createPosts() {
  await prisma.post.deleteMany()
  return Promise.all(
    seedData.posts.map(async post => {
      return prisma.post.create({
        data: {
          id: post.id,
          title: post.title,
          body: post.body,
          userId: post.userId,
        },
      })
    })
  )
}

async function createComments() {
  await prisma.comment.deleteMany()
  return Promise.all(
    seedData.comments.map(async comment => {
      return prisma.comment.create({
        data: {
          id: comment.id,
          email: comment.email,
          body: comment.body,
          postId: comment.postId,
        },
      })
    })
  )
}

async function main() {
  await createUsers()
  await createTodos()
  await createPosts()
  await createComments()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
