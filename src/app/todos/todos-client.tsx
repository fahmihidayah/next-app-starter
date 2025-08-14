'use client'

import { useState } from 'react'
import { TodoForm } from '@/modules/todos/components/todo-form'
import { TodoList } from '@/modules/todos/components/todo-list'
import { type Todo } from '@/db/schema'
import { getTodos } from '@/actions/todo-actions'

interface TodosClientProps {
  initialTodos: Todo[]
}

export function TodosClient({ initialTodos }: TodosClientProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshTodos = async () => {
    setIsRefreshing(true)
    try {
      const updatedTodos = await getTodos()
      setTodos(updatedTodos)
    } catch (error) {
      console.error('Failed to refresh todos:', error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleFormSuccess = () => {
    refreshTodos()
  }

  const handleTodoUpdate = () => {
    refreshTodos()
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-blue-900">Progress</h2>
            <p className="text-blue-700">
              {completedCount} of {totalCount} tasks completed
            </p>
          </div>
          {totalCount > 0 && (
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((completedCount / totalCount) * 100)}%
              </div>
              <div className="text-sm text-blue-600">Complete</div>
            </div>
          )}
        </div>
        
        {totalCount > 0 && (
          <div className="mt-3">
            <div className="bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Add Todo Form */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Todo</h2>
        <TodoForm onSuccess={handleFormSuccess} />
      </div>

      {/* Todo List */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Your Todos</h2>
          <button
            onClick={refreshTodos}
            disabled={isRefreshing}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium disabled:opacity-50"
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        
        <TodoList todos={todos} onUpdate={handleTodoUpdate} />
      </div>
    </div>
  )
}