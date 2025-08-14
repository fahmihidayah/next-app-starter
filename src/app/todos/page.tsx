import { Suspense } from 'react'
import { getTodos } from '@/actions/todo-actions'
import { TodosClient } from './todos-client'

export default async function TodosPage() {
  const todos = await getTodos()

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Todo List</h1>
        <p className="text-gray-600">Manage your tasks and stay organized</p>
      </div>

      <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
        <TodosClient initialTodos={todos} />
      </Suspense>
    </div>
  )
}