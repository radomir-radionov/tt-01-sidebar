import type { ButtonHTMLAttributes, ReactElement } from 'react'
import { useHeadlessMenu } from '../../providers'
import { useSubHost } from './context'

export type HeadlessMenuSubCloseProps = ButtonHTMLAttributes<HTMLButtonElement>

/** Explicit close control for mobile sheet overlays. */
export function HeadlessMenuSubClose({
  onClick,
  children = 'Close',
  ...rest
}: HeadlessMenuSubCloseProps): ReactElement {
  const menu = useHeadlessMenu()
  const { subId } = useSubHost()

  return (
    <button
      type='button'
      {...rest}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) menu.setSubOpen(subId, false)
      }}
    >
      {children}
    </button>
  )
}
