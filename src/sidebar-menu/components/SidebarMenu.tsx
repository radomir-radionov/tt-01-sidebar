import type { HTMLAttributes, ReactElement, ReactNode } from 'react'
import {
  SidebarMenuProvider,
  type SidebarMenuProviderProps,
} from '../providers'
import { SidebarMenuItem } from './Item'
import {
  SidebarMenuSub,
  SidebarMenuSubClose,
  SidebarMenuSubContent,
  SidebarMenuSubTrigger,
} from './Sub/index'
import { SidebarMenuCollapseTrigger } from './CollapseTrigger'

export type SidebarMenuProps = SidebarMenuProviderProps &
  Omit<HTMLAttributes<HTMLElement>, 'children' | 'defaultValue'> & {
    children: ReactNode
  }

/**
 * Headless sidebar root. Provides selection, density, viewport, and submenu
 * open state — no styles. Compose with Item / Sub / CollapseTrigger in JSX.
 */
function SidebarMenuRoot({
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
}: SidebarMenuProps): ReactElement {
  return (
    <SidebarMenuProvider
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
      <nav role="navigation" aria-label="Sidebar" data-sidebar-menu="" {...rest}>
        {children}
      </nav>
    </SidebarMenuProvider>
  )
}

export const SidebarMenu = Object.assign(SidebarMenuRoot, {
  Item: SidebarMenuItem,
  Sub: SidebarMenuSub,
  SubTrigger: SidebarMenuSubTrigger,
  SubContent: SidebarMenuSubContent,
  SubClose: SidebarMenuSubClose,
  CollapseTrigger: SidebarMenuCollapseTrigger,
})
