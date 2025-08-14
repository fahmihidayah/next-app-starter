import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveClass(...classNames: string[]): R
      toBeDisabled(): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveStyle(style: string | Record<string, any>): R
      toHaveValue(value: string | number | string[]): R
      toBeChecked(): R
      toBeVisible(): R
      toHaveFocus(): R
      toBeEmptyDOMElement(): R
      toContainElement(element: HTMLElement | null): R
      toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R
    }
  }
}