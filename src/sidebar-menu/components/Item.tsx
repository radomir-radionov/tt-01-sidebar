import {
  useEffect,
  type ButtonHTMLAttributes,
  type KeyboardEvent,
  type ReactElement,
} from 'react'
import { useSidebarMenu } from '../providers'
import type { MenuItemRenderProps, SlotChildren } from '../types'
import { resolveSlot } from '../utils/resolveSlot'
import { useSubMenu } from './Sub/index'

export type SidebarMenuItemProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'value'
> & {
  /** Selection key — typically a route path when used with a router. */
  value: string
  disabled?: boolean
  children: SlotChildren<MenuItemRenderProps>
}

/**
 * Selectable leaf. Consumer supplies visuals (and Link wrappers) via children /
 * render props — this component only owns selection + a11y attributes.
 */
export function SidebarMenuItem({
  value,
  disabled = false,
  children,
  onClick,
  onKeyDown,
  ...rest
}: SidebarMenuItemProps): ReactElement {
  const menu = useSidebarMenu()
  const sub = useSubMenu()
  const registerItem = menu.registerItem
  const subId = sub?.subId ?? null

  // Depend on the stable registerItem callback — not the whole menu context.
  // The context value is recreated when subItems change, so `[menu]` would
  // re-run this effect → unregister+register → setState → infinite loop.
  useEffect(() => registerItem(subId, value), [registerItem, subId, value])

  const selected = menu.isItemSelected(value)
  const renderProps: MenuItemRenderProps = {
    selected,
    active: selected,
    disabled,
  }

  const select = () => {
    if (disabled) return
    menu.setValue(value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      select()
    }
  }

  return (
    <button
      type="button"
      role="menuitem"
      data-selected={selected || undefined}
      data-active={selected || undefined}
      data-disabled={disabled || undefined}
      aria-current={selected ? 'page' : undefined}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      {...rest}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) select()
      }}
      onKeyDown={handleKeyDown}
    >
      {resolveSlot(children, renderProps)}
    </button>
  )
}
