import { createContext, useContext } from 'react'

export type SubHostValue = {
  subId: string
  disabled: boolean
  contentId: string
}

export const SubHostContext = createContext<SubHostValue | null>(null)

export type FlyoutHoverValue = {
  clearCloseTimer: () => void
}

export const FlyoutHoverContext = createContext<FlyoutHoverValue | null>(null)

export function useSubHost(): SubHostValue {
  const host = useContext(SubHostContext)
  if (!host) {
    throw new Error(
      'HeadlessMenu.SubTrigger/SubContent must be used inside HeadlessMenu.Sub',
    )
  }
  return host
}

/** Nearest Sub id for leaf registration — null outside a Sub. */
export function useSubMenu(): { subId: string } | null {
  const host = useContext(SubHostContext)
  return host ? { subId: host.subId } : null
}
