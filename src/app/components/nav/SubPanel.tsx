import { SidebarMenu, useSidebarMenu } from '../../../sidebar-menu'
import { CloseIcon } from '../../../shared/assets/icons'
import { itemActive, itemIdle } from './itemStyles'

export function subContentClass(
  presentation: ReturnType<typeof useSidebarMenu>['submenuPresentation'],
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

export function SubPanel({
  title,
  presentation,
  items,
}: {
  title: string
  presentation: ReturnType<typeof useSidebarMenu>['submenuPresentation']
  items: { value: string; label: string }[]
}) {
  // Collapsed flyout: bold parent title + plain children (no bullets) — matches desctop-ui.mp4
  if (presentation === 'flyout') {
    return (
      <div className="min-w-[160px] rounded-[10px] border border-line bg-sidebar p-1.5 shadow-md">
        <div className="px-2.5 py-1.5 text-[14px] font-semibold leading-5 text-ink">
          {title}
        </div>
        {items.map((item) => (
          <SidebarMenu.Item key={item.value} value={item.value} className="w-full">
            {({ selected }) => (
              <span
                className={`flex w-full cursor-pointer items-center rounded-[8px] px-2.5 py-1.5 text-left text-[14px] leading-5 ${
                  selected ? itemActive : itemIdle
                }`}
              >
                {item.label}
              </span>
            )}
          </SidebarMenu.Item>
        ))}
      </div>
    )
  }

  // Mobile sheet: title + X, plain text rows (no bullets) — matches sheet ref
  if (presentation === 'sheet') {
    return (
      <div className="flex flex-col">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="text-[17px] font-semibold leading-6 text-ink">{title}</div>
          <SidebarMenu.SubClose
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted hover:bg-hover-bg hover:text-ink"
            aria-label="Close"
          >
            <CloseIcon />
          </SidebarMenu.SubClose>
        </div>
        <div className="flex flex-col">
          {items.map((item) => (
            <SidebarMenu.Item key={item.value} value={item.value} className="w-full">
              {({ selected }) => (
                <span
                  className={`block w-full cursor-pointer rounded-lg px-2.5 py-3 text-left text-[15px] leading-5 ${
                    selected
                      ? 'font-medium text-active'
                      : 'text-ink hover:bg-hover-bg'
                  }`}
                >
                  {item.label}
                </span>
              )}
            </SidebarMenu.Item>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {items.map((item) => (
        <SidebarMenu.Item key={item.value} value={item.value} className="mb-1 w-full">
          {({ selected }) => (
            <span
              className={`flex w-full cursor-pointer items-center gap-3 rounded-[10px] px-2.5 py-2 text-left text-[13px] leading-5 ${
                selected ? itemActive : itemIdle
              }`}
            >
              {/* 5px bullet — matches leaf text color when selected */}
              <span
                className={`inline-block h-[5px] w-[5px] shrink-0 rounded-full ${
                  selected ? 'bg-active' : 'bg-ink'
                }`}
                aria-hidden
              />
              <span className={selected ? 'text-active' : undefined}>
                {item.label}
              </span>
            </span>
          )}
        </SidebarMenu.Item>
      ))}
    </div>
  )
}
