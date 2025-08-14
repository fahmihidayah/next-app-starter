import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoForm } from '../todo-form'

// Mock the actions
jest.mock('@/actions/todo-actions', () => ({
  createTodo: jest.fn(),
}))

const mockCreateTodo = require('@/actions/todo-actions').createTodo

describe('TodoForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders form elements', () => {
    render(<TodoForm />)
    
    expect(screen.getByPlaceholderText('Enter todo title...')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter description (optional)...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add Todo' })).toBeInTheDocument()
  })

  it('shows validation error for empty title', async () => {
    const user = userEvent.setup()
    render(<TodoForm />)
    
    const submitButton = screen.getByRole('button', { name: 'Add Todo' })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Title is required')).toBeInTheDocument()
    })
  })

  it('shows validation error for title too long', async () => {
    const user = userEvent.setup()
    render(<TodoForm />)
    
    const titleInput = screen.getByPlaceholderText('Enter todo title...')
    await user.type(titleInput, 'a'.repeat(101))
    
    const submitButton = screen.getByRole('button', { name: 'Add Todo' })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Title must be less than 100 characters')).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    const mockOnSuccess = jest.fn()
    mockCreateTodo.mockResolvedValueOnce({ id: 1, title: 'Test todo', description: 'Test description' })
    
    render(<TodoForm onSuccess={mockOnSuccess} />)
    
    const titleInput = screen.getByPlaceholderText('Enter todo title...')
    const descriptionInput = screen.getByPlaceholderText('Enter description (optional)...')
    const submitButton = screen.getByRole('button', { name: 'Add Todo' })
    
    await user.type(titleInput, 'Test todo')
    await user.type(descriptionInput, 'Test description')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockCreateTodo).toHaveBeenCalledWith({
        title: 'Test todo',
        description: 'Test description',
      })
    })
    
    expect(mockOnSuccess).toHaveBeenCalled()
  })

  it('shows loading state during submission', async () => {
    const user = userEvent.setup()
    mockCreateTodo.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    
    render(<TodoForm />)
    
    const titleInput = screen.getByPlaceholderText('Enter todo title...')
    const submitButton = screen.getByRole('button', { name: 'Add Todo' })
    
    await user.type(titleInput, 'Test todo')
    await user.click(submitButton)
    
    expect(screen.getByRole('button', { name: 'Adding...' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Adding...' })).toBeDisabled()
  })

  it('resets form after successful submission', async () => {
    const user = userEvent.setup()
    mockCreateTodo.mockResolvedValueOnce({ id: 1, title: 'Test todo' })
    
    render(<TodoForm />)
    
    const titleInput = screen.getByPlaceholderText('Enter todo title...')
    const descriptionInput = screen.getByPlaceholderText('Enter description (optional)...')
    const submitButton = screen.getByRole('button', { name: 'Add Todo' })
    
    await user.type(titleInput, 'Test todo')
    await user.type(descriptionInput, 'Test description')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect((titleInput as HTMLInputElement).value).toBe('')
      expect((descriptionInput as HTMLTextAreaElement).value).toBe('')
    })
  })
})