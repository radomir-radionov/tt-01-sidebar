import { useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router'
import {
  SidebarMenu,
  useIsMobile,
  useSidebarMenu,
  type SubmenuPresentation,
} from '../../sidebar-menu'
import { NestedGroup, useNestedGroupId } from './nav/NestedGroup'
import { NavItem } from './nav/NavItem'
import { SidebarShell } from './nav/SidebarShell'
import { itemActive, itemIdle } from './nav/itemStyles'

export type RouterMenuProps = {
  children: ReactNode
  collapsed?: boolean
  defaultCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

/**
 * Product menu: SidebarMenu + React Router + HelloClient design.
 * Business code only declares the tree — no value/handlers/classNames.
 */
function RouterMenuRoot({
  children,
  collapsed: collapsedProp,
  defaultCollapsed,
  onCollapsedChange,
}: RouterMenuProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(
    defaultCollapsed ?? false,
  )
  const collapsed = collapsedProp ?? uncontrolledCollapsed
  const setCollapsed = onCollapsedChange ?? setUncontrolledCollapsed

  return (
    <SidebarMenu
      value={location.pathname}
      onValueChange={(path) => navigate(path)}
      collapsed={collapsed}
      onCollapsedChange={setCollapsed}
    >
      <SidebarShell>{children}</SidebarShell>
    </SidebarMenu>
  )
}

function Item({
  to,
  label,
  icon,
}: {
  to: string
  label: string
  icon?: ReactNode
}) {
  const inGroup = useNestedGroupId() != null
  const menu = useSidebarMenu()
  const isMobile = useIsMobile()
  const collapsed = menu.collapsed
  const presentation = menu.submenuPresentation

  if (inGroup) {
    const className =
      presentation === 'inline' ? 'mb-1 w-full' : 'w-full'
    return (
      <SidebarMenu.Item value={to} className={className}>
        {({ selected }: { selected: boolean }) => (
          <NestedLeaf
            selected={selected}
            label={label}
            presentation={presentation}
          />
        )}
      </SidebarMenu.Item>
    )
  }

  const leafClass = isMobile
    ? 'flex min-w-16 shrink-0 flex-1 basis-16 cursor-pointer flex-col items-center'
    : 'relative mb-1 block w-full cursor-pointer'

  return (
    <SidebarMenu.Item value={to} className={leafClass}>
      {({ selected }: { selected: boolean }) => (
        <NavItem
          selected={selected}
          collapsed={collapsed}
          icon={icon}
          label={label}
          mobile={isMobile}
        />
      )}
    </SidebarMenu.Item>
  )
}

/** Nested leaf paint — kept local (was inline in SubPanel). */
function NestedLeaf({
  selected,
  label,
  presentation,
}: {
  selected: boolean
  label: string
  presentation: SubmenuPresentation
}) {
  if (presentation === 'flyout') {
    return (
      <span
        className={`flex w-full cursor-pointer items-center rounded-[8px] px-2.5 py-1.5 text-left text-[14px] leading-5 ${
          selected ? itemActive : itemIdle
        }`}
      >
        {label}
      </span>
    )
  }

  if (presentation === 'sheet') {
    return (
      <span
        className={`block w-full cursor-pointer rounded-lg px-2.5 py-3 text-left text-[15px] leading-5 ${
          selected
            ? 'font-medium text-active'
            : 'text-ink hover:bg-hover-bg'
        }`}
      >
        {label}
      </span>
    )
  }

  return (
    <span
      className={`flex w-full cursor-pointer items-center gap-3 rounded-[10px] px-2.5 py-2 text-left text-[13px] leading-5 ${
        selected ? itemActive : itemIdle
      }`}
    >
      <span
        className={`inline-block h-[5px] w-[5px] shrink-0 rounded-full ${
          selected ? 'bg-active' : 'bg-ink'
        }`}
        aria-hidden
      />
      <span className={selected ? 'text-active' : undefined}>{label}</span>
    </span>
  )
}

/**
 * Product chrome: hide children on mobile (bottom nav) and paint the section rule.
 * Keeps viewport / classNames out of the business tree.
 */
function DesktopOnly({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile()
  if (isMobile) return null

  return (
    <>
      <div className="my-2 border-t border-line" role="separator" />
      {children}
    </>
  )
}

export const RouterMenu = Object.assign(RouterMenuRoot, {
  Item,
  Group: NestedGroup,
  DesktopOnly,
})
