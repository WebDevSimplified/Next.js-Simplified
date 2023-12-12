import { useRouteError } from "react-router-dom"
import { RootLayout } from "./layouts/RootLayout"
import { postRoute } from "./pages/Post"
import { postListRoute } from "./pages/PostList"
import { todoListRoute } from "./pages/TodoList"
import { userRoute } from "./pages/User"
import { userListRoute } from "./pages/UserList"
import { homeRoute } from "./pages/Home"

export const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        children: [
          { index: true, ...homeRoute },
          {
            path: "posts",
            children: [
              {
                index: true,
                ...postListRoute,
              },
              {
                path: ":postId",
                children: [{ index: true, ...postRoute }],
              },
            ],
          },
          {
            path: "users",
            children: [
              { index: true, ...userListRoute },
              { path: ":userId", ...userRoute },
            ],
          },
          { path: "todos", ...todoListRoute },
          { path: "*", element: <h1>404 - Page Not Found</h1> },
        ],
      },
    ],
  },
]
