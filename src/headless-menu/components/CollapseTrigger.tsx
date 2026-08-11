import type { ButtonHTMLAttributes, ReactElement } from 'react'
import { useHeadlessMenu } from '../providers'
import type { MenuCollapseRenderProps, SlotChildren } from '../types'
import { resolveSlot } from '../utils/resolveSlot'

export type HeadlessMenuCollapseTriggerProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> & {
  children?: SlotChildren<MenuCollapseRenderProps>
}

/**
 * Toggles desktop density: minimal (icons) ↔ wide (icons + labels).
 * Hidden/no-op on mobile — mobile uses bottom nav instead of density modes.
 */
export function HeadlessMenuCollapseTrigger({
  children,
  onClick,
  ...rest
}: HeadlessMenuCollapseTriggerProps): ReactElement | null {
  const menu = useHeadlessMenu()

  if (menu.isMobile) return null

  const renderProps: MenuCollapseRenderProps = {
    collapsed: menu.collapsed,
    isMobile: menu.isMobile,
  }

  return (
    <button
      type='button'
      aria-label={menu.collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      aria-pressed={menu.collapsed}
      data-collapsed={menu.collapsed || undefined}
      {...rest}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          menu.setCollapsed((prev) => !prev)
        }
      }}
    >
      {resolveSlot(
        children ?? (menu.collapsed ? 'Expand' : 'Collapse'),
        renderProps,
      )}
    </button>
  )
}
