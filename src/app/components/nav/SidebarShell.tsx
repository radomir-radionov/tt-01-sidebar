import type { ReactNode } from 'react'
import {
  SidebarMenu,
  useIsMobile,
  useSidebarMenu,
} from '../../../sidebar-menu'
import { CollapseIcon, ExpandIcon } from '../../../shared/assets/icons'
import { itemRow } from './itemStyles'

export type SidebarShellProps = {
  children: ReactNode
  /** Desktop-only slot below the business tree (e.g. utility links). Not shown on mobile. */
  footer?: ReactNode
}

/**
 * HelloClient layout chrome around the menu tree.
 * Brand + collapse only — app-specific links come from `footer` (RouterMenu).
 */
export function SidebarShell({ children, footer }: SidebarShellProps) {
  const isMobile = useIsMobile()
  return (
    <div
      className={isMobile ? 'contents' : 'relative h-full overflow-visible'}
    >
      <Chrome footer={footer}>{children}</Chrome>
    </div>
  )
}

function Chrome({
  children,
  footer,
}: {
  children: ReactNode
  footer?: ReactNode
}) {
  const menu = useSidebarMenu()
  const isMobile = useIsMobile()
  const collapsed = menu.collapsed
  const presentation = menu.submenuPresentation

  if (isMobile) {
    // Footer intentionally omitted — mobile bottom nav is business tree only.
    return <MobileChrome>{children}</MobileChrome>
  }

  return (
    <div
      className={`relative z-20 flex h-full flex-col border-r border-line bg-sidebar text-ink transition-[width] duration-200 ${
        collapsed ? 'w-[68px] overflow-visible' : 'w-[210px]'
      }`}
    >
      <div className="shrink-0 overflow-hidden px-3 pt-3">
        <div className="whitespace-nowrap rounded-[10px] px-2.5 py-2 text-left text-[16px] font-extrabold tracking-tight text-brand">
          {collapsed ? 'HC' : 'HelloClient'}
        </div>
      </div>

      {/*
        overflow-y-auto forces overflow-x to clip too, which hides collapsed flyouts.
        Use visible in flyout mode so the submenu can paint beside the rail.
      */}
      <div
        className={`flex flex-1 flex-col px-3 pb-3 pt-1 ${
          presentation === 'flyout'
            ? 'overflow-visible'
            : 'overflow-y-auto overflow-x-hidden'
        }`}
      >
        {children}

        {footer ? (
          <>
            <div className="my-2 border-t border-line" role="separator" />
            {footer}
          </>
        ) : null}

        <div className="my-2 border-t border-line" role="separator" />

        <SidebarMenu.CollapseTrigger
          className={`${itemRow} text-muted hover:bg-hover-bg hover:text-ink`}
        >
          {({ collapsed: isCollapsed }) =>
            isCollapsed ? <ExpandIcon /> : <CollapseIcon />
          }
        </SidebarMenu.CollapseTrigger>
      </div>
    </div>
  )
}

function MobileChrome({ children }: { children: ReactNode }) {
  const menu = useSidebarMenu()
  const sheetOpen = menu.hasOpenSub

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 ${
        sheetOpen
          ? 'pointer-events-none'
          : 'border-t border-line bg-sidebar/95 backdrop-blur-sm'
      }`}
    >
      <div
        className={
          sheetOpen
            ? 'hidden'
            : 'flex items-stretch gap-0.5 overflow-x-auto overscroll-x-contain px-1 py-1 [-webkit-overflow-scrolling:touch]'
        }
      >
        {children}
      </div>
    </div>
  )
}
