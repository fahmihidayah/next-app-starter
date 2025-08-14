import { render, screen, fireEvent } from '@testing-library/react'
import { Textarea } from '../textarea'

describe('Textarea', () => {
  it('renders textarea with default styles', () => {
    render(<Textarea placeholder="Enter text" />)
    
    const textarea = screen.getByPlaceholderText('Enter text')
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveClass(
      'flex', 'min-h-[80px]', 'w-full', 'rounded-md', 'border', 
      'border-blue-200', 'bg-white', 'px-3', 'py-2', 'text-sm'
    )
  })

  it('handles value changes', () => {
    const handleChange = jest.fn()
    render(<Textarea onChange={handleChange} />)
    
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'test value' } })
    
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect((textarea as HTMLTextAreaElement).value).toBe('test value')
  })

  it('can be disabled', () => {
    render(<Textarea disabled />)
    
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeDisabled()
    expect(textarea).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
  })

  it('supports rows attribute', () => {
    render(<Textarea rows={5} />)
    
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('rows', '5')
  })

  it('applies custom className', () => {
    render(<Textarea className="custom-class" />)
    
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveClass('custom-class')
  })

  it('forwards other props', () => {
    render(<Textarea data-testid="custom-textarea" maxLength={100} />)
    
    const textarea = screen.getByTestId('custom-textarea')
    expect(textarea).toHaveAttribute('maxLength', '100')
  })

  it('handles focus and blur events', () => {
    const handleFocus = jest.fn()
    const handleBlur = jest.fn()
    
    render(<Textarea onFocus={handleFocus} onBlur={handleBlur} />)
    
    const textarea = screen.getByRole('textbox')
    
    fireEvent.focus(textarea)
    expect(handleFocus).toHaveBeenCalledTimes(1)
    
    fireEvent.blur(textarea)
    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  it('handles resize behavior', () => {
    render(<Textarea style={{ resize: 'vertical' }} />)
    
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveStyle('resize: vertical')
  })
})