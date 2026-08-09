import type { ButtonHTMLAttributes, ReactElement } from 'react'
import { useSidebarMenu } from '../../providers'
import { useSubHost } from './context'

export type SidebarMenuSubCloseProps = ButtonHTMLAttributes<HTMLButtonElement>

/** Explicit close control for mobile sheet overlays. */
export function SidebarMenuSubClose({
  onClick,
  children = 'Close',
  ...rest
}: SidebarMenuSubCloseProps): ReactElement {
  const menu = useSidebarMenu()
  const { subId } = useSubHost()

  return (
    <button
      type="button"
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
