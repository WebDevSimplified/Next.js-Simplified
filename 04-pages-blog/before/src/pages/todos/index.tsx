import { TodoItem } from "@/components/TodoItem"

export default function TodosPage() {
  const todos: any[] = []

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
