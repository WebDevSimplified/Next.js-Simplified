# Before Getting Started

For this project we will be taking an already existing React application and converting it to Next.js. This version of the project is going to be a readonly blog style application that has users, posts, comments, and todos. The entire purpose of this project is to familiarize yourself with Next.js's routing system by comparing it to how React Router handles routing.

The `api` folder contains the code for the fake API we will be using, while the `client` folder contains the React version of the application. In order to start the API you need to run `npm run dev` inside the `api` folder (make sure you run `npm i` first to install the dependencies). This should start up an API on `http://localhost:3001`. This API is built on the [json-server](https://www.npmjs.com/package/json-server) package, which is a great tool for quickly building fake APIs. Essentially, whenever you make a request to the API it will read/write to the `db.json` file to get your data. I also included a `db.example.json` file which is the same as the `db.json` file, but it will never be modified so if you want to reset the API data to its original state you can copy the JSON from the `db.example.json` file into the `db.json` file.

# API Information

The API has the following endpoints:

- `GET /posts` - Returns all of the posts
- `GET /posts/:id` - Returns a single post
- `GET /posts/:id/comments` - Returns all of the comments for a single post
- `GET /users` - Returns all of the users
- `GET /users/:id` - Returns a single user
- `GET /posts?userId=<userId>` - Returns all of the posts for a single user
- `GET /todos` - Returns all of the todos
- `GET /todos?userId=<userId>` - Returns all of the todos for a single user

# Instructions

1. Create an exact copy of the React application with the following features:
   1. Use `fetch` instead of `axios` so we can later play around with some of the advanced features of `fetch` built into Next.js.
   2. Create a nav bar that contains links to the following pages:
      - Posts
      - Users
      - Todos
   3. Create a Posts page that renders out all of the posts from the API in a card based grid where each card contains the title, body, and a link to view the post.
   4. Create a Users page that renders out all of the users from the API in a card based grid where each card contains the user name, company name, email, website, and a link to view the user.
   5. Create a Todos page that renders out all of the todos from the API in a list where each item contains the todo title and is crossed off if completed.
   6. Create a Post page that renders out the post title, body, comments, and user name.
   7. Create a User page that renders out the user name, company name, email, website, and address as well as the users's posts and todos.

## Bonus:

1. Add a skeleton loading UI to each page.
2. Make sure that all API request are done performed as optimally as possible by making all requests in parallel when possible.
3. Use the `loading.tsx` page for at least one loading UI and use `Suspense` for at least one other page to practice both techniques.
