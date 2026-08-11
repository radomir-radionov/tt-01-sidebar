import { createPortal } from 'react-dom'
import { createContext, useContext, type ReactNode } from 'react'
import {
  HeadlessMenu,
  useIsMobile,
  useHeadlessMenu,
  type MenuSubRenderProps,
} from '../../../headless-menu'
import { SubPanel, subContentClass } from './SubPanel'
import { SubTriggerView } from './SubTriggerView'

const GroupContext = createContext<string | null>(null)

/** True when rendering under a Group panel. */
export function useGroupId(): string | null {
  return useContext(GroupContext)
}

export type GroupProps = {
  label: string
  icon?: ReactNode
  /** Stable sub id; defaults to a slug of `label`. */
  id?: string
  children: ReactNode
}

function slugify(label: string): string {
  return label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function Group({ label, icon, id, children }: GroupProps) {
  const groupId = id ?? slugify(label)
  const menu = useHeadlessMenu()
  const isMobile = useIsMobile()
  const collapsed = menu.collapsed
  const presentation = menu.submenuPresentation
  const sheetOpen = presentation === 'sheet' && menu.isSubOpen(groupId)

  const triggerClass = isMobile
    ? 'flex h-full w-full min-w-0 cursor-pointer flex-col items-center'
    : 'relative mb-1 block w-full cursor-pointer'
  const subHostClass = isMobile
    ? 'relative min-w-16 shrink-0 flex-1 basis-16'
    : 'relative mb-1'

  const panel = (
    <HeadlessMenu.SubContent
      className={subContentClass(presentation, isMobile)}
    >
      <SubPanel title={label}>
        <GroupContext.Provider value={groupId}>{children}</GroupContext.Provider>
      </SubPanel>
    </HeadlessMenu.SubContent>
  )

  return (
    <HeadlessMenu.Sub value={groupId} className={subHostClass}>
      <div className={isMobile ? 'flex h-full w-full' : undefined}>
        <HeadlessMenu.SubTrigger className={triggerClass}>
          {(props: MenuSubRenderProps) => (
            <SubTriggerView
              {...props}
              collapsed={collapsed}
              mobile={isMobile}
              icon={icon}
              label={label}
            />
          )}
        </HeadlessMenu.SubTrigger>

        {isMobile
          ? createPortal(
              <>
                {sheetOpen ? (
                  <button
                    type='button'
                    aria-label='Dismiss submenu'
                    data-sheet-backdrop=''
                    className='fixed inset-0 z-40 bg-black/40'
                    onClick={() => menu.setSubOpen(groupId, false)}
                  />
                ) : null}
                {panel}
              </>,
              document.body,
            )
          : panel}
      </div>
    </HeadlessMenu.Sub>
  )
}
