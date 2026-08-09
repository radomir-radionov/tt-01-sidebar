import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'
import { SidebarMenu, useSidebarMenu } from '../../../sidebar-menu'
import { SubPanel, subContentClass } from './SubPanel'
import { SubTriggerView } from './SubTriggerView'

export function NestedGroup({
  id,
  label,
  icon,
  collapsed,
  presentation,
  mobile,
  items,
}: {
  id: string
  label: string
  icon: ReactNode
  collapsed: boolean
  presentation: ReturnType<typeof useSidebarMenu>['submenuPresentation']
  mobile: boolean
  items: { value: string; label: string }[]
}) {
  const triggerClass = mobile
    ? 'flex h-full w-full min-w-0 cursor-pointer flex-col items-center'
    : 'relative mb-1 block w-full cursor-pointer'
  const menu = useSidebarMenu()
  const sheetOpen = presentation === 'sheet' && menu.isSubOpen(id)
  // className must land on SubRoot (flex child of the bar) — not an inner wrapper.
  const subHostClass = mobile
    ? 'relative min-w-16 shrink-0 flex-1 basis-16'
    : 'relative mb-1'

  const panel = (
    <SidebarMenu.SubContent
      className={subContentClass(presentation, mobile)}
    >
      {(props) => (
        <SubPanel
          title={label}
          presentation={props.presentation}
          items={items}
        />
      )}
    </SidebarMenu.SubContent>
  )

  return (
    <SidebarMenu.Sub value={id} className={subHostClass}>
      <div className={mobile ? 'flex h-full w-full' : undefined}>
        <SidebarMenu.SubTrigger className={triggerClass}>
          {(props) => (
            <SubTriggerView
              {...props}
              collapsed={collapsed}
              mobile={mobile}
              icon={icon}
              label={label}
            />
          )}
        </SidebarMenu.SubTrigger>

        {mobile
          ? createPortal(
              <>
                {sheetOpen ? (
                  <button
                    type="button"
                    aria-label="Dismiss submenu"
                    data-sheet-backdrop=""
                    className="fixed inset-0 z-40 bg-black/40"
                    onClick={() => menu.setSubOpen(id, false)}
                  />
                ) : null}
                {panel}
              </>,
              document.body,
            )
          : panel}
      </div>
    </SidebarMenu.Sub>
  )
}
