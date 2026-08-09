import type { ReactNode } from 'react'

export function Label({
  show,
  children,
}: {
  show: boolean
  children: ReactNode
}) {
  // Margin (not gap) so collapsing the label does not shift the icon column.
  return (
    <span className={`min-w-0 truncate ${show ? 'ml-3' : 'sr-only'}`}>
      {children}
    </span>
  )
}
