import { useId, useMemo, type ReactElement, type ReactNode } from 'react'
import { SubHostContext } from './context'
import { SubRoot } from './SubRoot'

export type SidebarMenuSubProps = {
  /** Stable id for open-state tracking (not the selected route value). */
  value: string
  disabled?: boolean
  /** Applied to the Sub host wrapper (`SubRoot`) — e.g. equal-width bottom-nav cells. */
  className?: string
  children: ReactNode
}

export function SidebarMenuSub({
  value,
  disabled = false,
  className,
  children,
}: SidebarMenuSubProps): ReactElement {
  const reactId = useId()
  const host = useMemo(
    () => ({
      subId: value,
      disabled,
      contentId: `sidebar-sub-${value}-${reactId}`,
    }),
    [value, disabled, reactId],
  )

  return (
    <SubHostContext.Provider value={host}>
      <SubRoot className={className}>{children}</SubRoot>
    </SubHostContext.Provider>
  )
}
