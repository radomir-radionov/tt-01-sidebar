import type { HTMLAttributes, ReactElement, ReactNode } from 'react'
import {
  HeadlessMenuProvider,
  type HeadlessMenuProviderProps,
} from '../providers'
import { HeadlessMenuItem } from './Item'
import {
  HeadlessMenuSub,
  HeadlessMenuSubClose,
  HeadlessMenuSubContent,
  HeadlessMenuSubTrigger,
} from './Sub/index'
import { HeadlessMenuCollapseTrigger } from './CollapseTrigger'

export type HeadlessMenuProps = HeadlessMenuProviderProps &
  Omit<HTMLAttributes<HTMLElement>, 'children' | 'defaultValue'> & {
    children: ReactNode
  }

/**
 * Headless sidebar root. Provides selection, density, viewport, and submenu
 * open state — no styles. Compose with Item / Sub / CollapseTrigger in JSX.
 */
function HeadlessMenuRoot({
  children,
  value,
  defaultValue,
  onValueChange,
  collapsed,
  defaultCollapsed,
  onCollapsedChange,
  openSubIds,
  defaultOpenSubIds,
  onOpenSubIdsChange,
  mobileQuery,
  ...rest
}: HeadlessMenuProps): ReactElement {
  return (
    <HeadlessMenuProvider
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      collapsed={collapsed}
      defaultCollapsed={defaultCollapsed}
      onCollapsedChange={onCollapsedChange}
      openSubIds={openSubIds}
      defaultOpenSubIds={defaultOpenSubIds}
      onOpenSubIdsChange={onOpenSubIdsChange}
      mobileQuery={mobileQuery}
    >
      <nav role='navigation' aria-label='Sidebar' data-headless-menu='' {...rest}>
        {children}
      </nav>
    </HeadlessMenuProvider>
  )
}

export const HeadlessMenu = Object.assign(HeadlessMenuRoot, {
  Item: HeadlessMenuItem,
  Sub: HeadlessMenuSub,
  SubTrigger: HeadlessMenuSubTrigger,
  SubContent: HeadlessMenuSubContent,
  SubClose: HeadlessMenuSubClose,
  CollapseTrigger: HeadlessMenuCollapseTrigger,
})
