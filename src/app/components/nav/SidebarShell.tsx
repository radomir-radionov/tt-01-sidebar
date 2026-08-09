import { useIsMobile, useSidebarMenu } from '../../../sidebar-menu'
import { MenuTree } from './MenuTree'

/** Owns layout classes so viewport comes from the menu provider (one matchMedia). */
export function SidebarShell() {
  const isMobile = useIsMobile()
  return (
    <div
      className={
        isMobile ? 'contents' : 'relative h-full overflow-visible'
      }
    >
      <SidebarChrome />
    </div>
  )
}

function SidebarChrome() {
  const menu = useSidebarMenu()
  const isMobile = useIsMobile()
  const collapsed = menu.collapsed
  const presentation = menu.submenuPresentation

  if (isMobile) {
    return <MobileChrome presentation={presentation} />
  }

  return (
    <div
      className={`relative z-20 flex h-full flex-col border-r border-line bg-sidebar text-ink transition-[width] duration-200 ${
        collapsed ? 'w-[68px] overflow-visible' : 'w-[210px]'
      }`}
    >
      {/* Same left padding as nav rows — clip to "HC" when collapsed (sources/image.webp) */}
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
        <MenuTree collapsed={collapsed} presentation={presentation} />
      </div>
    </div>
  )
}

function MobileChrome({
  presentation,
}: {
  presentation: ReturnType<typeof useSidebarMenu>['submenuPresentation']
}) {
  const menu = useSidebarMenu()
  // Sheet replaces the bottom nav (mobile "sidebar") while a sub is open.
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
        <MenuTree collapsed presentation={presentation} mobile />
      </div>
    </div>
  )
}
