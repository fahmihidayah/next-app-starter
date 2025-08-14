import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoList } from '../todo-list'
import { type Todo } from '@/db/schema'

// Mock the actions
jest.mock('@/actions/todo-actions', () => ({
  deleteTodo: jest.fn(),
  toggleTodoComplete: jest.fn(),
  updateTodo: jest.fn(),
}))

const mockActions = {
  deleteTodo: require('@/actions/todo-actions').deleteTodo,
  toggleTodoComplete: require('@/actions/todo-actions').toggleTodoComplete,
  updateTodo: require('@/actions/todo-actions').updateTodo,
}

const mockTodos: Todo[] = [
  {
    id: 1,
    title: 'Test Todo 1',
    description: 'Test description 1',
    completed: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 2,
    title: 'Test Todo 2',
    description: null,
    completed: true,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
]

describe('TodoList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders empty state when no todos', () => {
    render(<TodoList todos={[]} />)
    
    expect(screen.getByText('No todos yet. Create your first todo above!')).toBeInTheDocument()
  })

  it('renders todos correctly', () => {
    render(<TodoList todos={mockTodos} />)
    
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument()
    expect(screen.getByText('Test description 1')).toBeInTheDocument()
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument()
    
    // Check completion states
    const todo1Title = screen.getByText('Test Todo 1')
    const todo2Title = screen.getByText('Test Todo 2')
    
    expect(todo1Title).not.toHaveClass('line-through')
    expect(todo2Title).toHaveClass('line-through')
  })

  it('shows correct action buttons', () => {
    render(<TodoList todos={mockTodos} />)
    
    expect(screen.getByRole('button', { name: 'Mark Complete' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Mark Incomplete' })).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(6) // 2 completion + 2 edit + 2 delete buttons
  })

  it('calls toggleTodoComplete when toggle button is clicked', async () => {
    const user = userEvent.setup()
    const mockOnUpdate = jest.fn()
    mockActions.toggleTodoComplete.mockResolvedValueOnce(mockTodos[0])
    
    render(<TodoList todos={mockTodos} onUpdate={mockOnUpdate} />)
    
    const toggleButton = screen.getByRole('button', { name: 'Mark Complete' })
    await user.click(toggleButton)
    
    await waitFor(() => {
      expect(mockActions.toggleTodoComplete).toHaveBeenCalledWith(1)
      expect(mockOnUpdate).toHaveBeenCalled()
    })
  })

  it('calls deleteTodo when delete button is clicked', async () => {
    const user = userEvent.setup()
    const mockOnUpdate = jest.fn()
    mockActions.deleteTodo.mockResolvedValueOnce(undefined)
    
    render(<TodoList todos={mockTodos} onUpdate={mockOnUpdate} />)
    
    const deleteButtons = screen.getAllByRole('button')
    const deleteButton = deleteButtons.find(button => button.querySelector('[data-lucide="trash-2"]'))
    
    if (deleteButton) {
      await user.click(deleteButton)
      
      await waitFor(() => {
        expect(mockActions.deleteTodo).toHaveBeenCalledWith(1)
        expect(mockOnUpdate).toHaveBeenCalled()
      })
    }
  })

  it('enters edit mode when edit button is clicked', async () => {
    const user = userEvent.setup()
    
    render(<TodoList todos={mockTodos} />)
    
    const editButtons = screen.getAllByRole('button')
    const editButton = editButtons.find(button => button.querySelector('[data-lucide="pencil"]'))
    
    if (editButton) {
      await user.click(editButton)
      
      await waitFor(() => {
        expect(screen.getByDisplayValue('Test Todo 1')).toBeInTheDocument()
        expect(screen.getByDisplayValue('Test description 1')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
      })
    }
  })

  it('saves changes when save button is clicked in edit mode', async () => {
    const user = userEvent.setup()
    const mockOnUpdate = jest.fn()
    mockActions.updateTodo.mockResolvedValueOnce({ ...mockTodos[0], title: 'Updated Todo' })
    
    render(<TodoList todos={mockTodos} onUpdate={mockOnUpdate} />)
    
    // Enter edit mode
    const editButtons = screen.getAllByRole('button')
    const editButton = editButtons.find(button => button.querySelector('[data-lucide="pencil"]'))
    
    if (editButton) {
      await user.click(editButton)
      
      // Edit the title
      const titleInput = screen.getByDisplayValue('Test Todo 1')
      await user.clear(titleInput)
      await user.type(titleInput, 'Updated Todo')
      
      // Save changes
      const saveButton = screen.getByRole('button', { name: 'Save' })
      await user.click(saveButton)
      
      await waitFor(() => {
        expect(mockActions.updateTodo).toHaveBeenCalledWith(1, {
          title: 'Updated Todo',
          description: 'Test description 1',
        })
        expect(mockOnUpdate).toHaveBeenCalled()
      })
    }
  })

  it('cancels edit mode when cancel button is clicked', async () => {
    const user = userEvent.setup()
    
    render(<TodoList todos={mockTodos} />)
    
    // Enter edit mode
    const editButtons = screen.getAllByRole('button')
    const editButton = editButtons.find(button => button.querySelector('[data-lucide="pencil"]'))
    
    if (editButton) {
      await user.click(editButton)
      
      // Edit the title
      const titleInput = screen.getByDisplayValue('Test Todo 1')
      await user.clear(titleInput)
      await user.type(titleInput, 'Changed Title')
      
      // Cancel changes
      const cancelButton = screen.getByRole('button', { name: 'Cancel' })
      await user.click(cancelButton)
      
      await waitFor(() => {
        expect(screen.getByText('Test Todo 1')).toBeInTheDocument()
        expect(screen.queryByDisplayValue('Changed Title')).not.toBeInTheDocument()
      })
    }
  })
})