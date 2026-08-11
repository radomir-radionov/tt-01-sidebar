import type { ReactNode } from 'react'
import {
  SidebarMenu,
  useSidebarMenu,
  type SubmenuPresentation,
} from '../../../sidebar-menu'
import { CloseIcon } from '../../../shared/assets/icons'

export function subContentClass(
  presentation: SubmenuPresentation,
  mobile: boolean,
) {
  // Mobile sheet replaces the bottom nav — matches mobile-ui.mp4 / sheet ref
  if (presentation === 'sheet' || mobile) {
    return 'fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-white px-5 pb-6 pt-5 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] outline-none'
  }
  if (presentation === 'flyout') {
    // pl bridges sidebar px-3 so the pointer never leaves the sub host on the way out.
    // -4px pulls the panel slightly over the rail edge when collapsed.
    return 'absolute left-[calc(100%-4px)] top-0 z-[60] pl-3 outline-none'
  }
  // Live: sub links sit ~16px inset from parent (x 28 vs 12)
  return 'ml-4 flex flex-col'
}

/** Chrome around nested items — title / close / flyout card. */
export function SubPanel({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  const { submenuPresentation: presentation } = useSidebarMenu()

  if (presentation === 'flyout') {
    return (
      <div className="min-w-[160px] rounded-[10px] border border-line bg-sidebar p-1.5 shadow-md">
        <div className="px-2.5 py-1.5 text-[14px] font-semibold leading-5 text-ink">
          {title}
        </div>
        {children}
      </div>
    )
  }

  if (presentation === 'sheet') {
    return (
      <div className="flex flex-col">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="text-[17px] font-semibold leading-6 text-ink">
            {title}
          </div>
          <SidebarMenu.SubClose
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted hover:bg-hover-bg hover:text-ink"
            aria-label="Close"
          >
            <CloseIcon />
          </SidebarMenu.SubClose>
        </div>
        <div className="flex flex-col">{children}</div>
      </div>
    )
  }

  return <div className="flex flex-col">{children}</div>
}
