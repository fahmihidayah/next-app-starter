'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { type Todo } from '@/db/schema'
import { deleteTodo, toggleTodoComplete, updateTodo } from '@/actions/todo-actions'
import { Pencil, Trash2, Check, X } from 'lucide-react'

interface TodoListProps {
  todos: Todo[]
  onUpdate?: () => void
}

function TodoItem({ todo, onUpdate }: { todo: Todo; onUpdate?: () => void }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description || '')
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleComplete = async () => {
    setIsLoading(true)
    try {
      await toggleTodoComplete(todo.id)
      onUpdate?.()
    } catch (error) {
      console.error('Failed to toggle todo:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await deleteTodo(todo.id)
      onUpdate?.()
    } catch (error) {
      console.error('Failed to delete todo:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveEdit = async () => {
    setIsLoading(true)
    try {
      await updateTodo(todo.id, {
        title: editTitle,
        description: editDescription,
      })
      setIsEditing(false)
      onUpdate?.()
    } catch (error) {
      console.error('Failed to update todo:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelEdit = () => {
    setEditTitle(todo.title)
    setEditDescription(todo.description || '')
    setIsEditing(false)
  }

  return (
    <div className={`p-4 border rounded-lg ${
      todo.completed ? 'bg-green-50 border-green-200' : 'bg-white border-blue-200'
    }`}>
      {isEditing ? (
        <div className="space-y-3">
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Todo title"
          />
          <Textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Description (optional)"
            rows={3}
          />
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={handleSaveEdit} 
              disabled={isLoading || !editTitle.trim()}
            >
              <Check className="w-4 h-4 mr-1" />
              Save
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleCancelEdit}
              disabled={isLoading}
            >
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className={`font-medium ${
                todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
              }`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className={`text-sm mt-1 ${
                  todo.completed ? 'line-through text-gray-400' : 'text-gray-600'
                }`}>
                  {todo.description}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              Created: {new Date(todo.createdAt).toLocaleDateString()}
            </div>
            
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={todo.completed ? "secondary" : "default"}
                onClick={handleToggleComplete}
                disabled={isLoading}
              >
                {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              
              <Button
                size="sm"
                variant="destructive"
                onClick={handleDelete}
                disabled={isLoading}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export function TodoList({ todos, onUpdate }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No todos yet. Create your first todo above!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} />
      ))}
    </div>
  )
}