import { TodoItem } from "@/components/TodoItem"
import { getTodos } from "@/db/todos"
import { GetStaticProps, InferGetStaticPropsType } from "next"

export default function TodosPage({
  todos,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <h1 className="page-title">Todos</h1>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  )
}

export const getStaticProps = (async () => {
  const todos = await getTodos()

  return { props: { todos } }
}) satisfies GetStaticProps
