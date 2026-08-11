import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react'
import { useHeadlessMenu } from '../../providers'
import {
  FlyoutHoverContext,
  type FlyoutHoverValue,
  useSubHost,
} from './context'

/** Only used when `relatedTarget` is null (some browsers mid-transition). */
const FLYOUT_CLOSE_FALLBACK_MS = 40

export function SubRoot({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const menu = useHeadlessMenu()
  const { subId, disabled, contentId } = useSubHost()
  const active = menu.isSubActive(subId)
  const open = menu.isSubOpen(subId)
  const presentation = menu.submenuPresentation
  const closeTimerRef = useRef<number | null>(null)

  // Stable hover API for trigger/content without useCallback/useMemo churn.
  const hoverApiRef = useRef<FlyoutHoverValue>({
    clearCloseTimer: () => {
      if (closeTimerRef.current != null) {
        window.clearTimeout(closeTimerRef.current)
        closeTimerRef.current = null
      }
    },
  })

  const clearCloseTimer = () => {
    hoverApiRef.current.clearCloseTimer()
  }

  useEffect(() => clearCloseTimer, [])

  const scheduleClose = (event: MouseEvent<HTMLDivElement>) => {
    if (presentation !== 'flyout') return
    const nextTarget = event.relatedTarget
    if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) {
      return
    }
    const hostElement = event.currentTarget
    clearCloseTimer()

    const closeIfLeft = () => {
      const contentElement = document.getElementById(contentId)
      // Consumer bridges rail→panel with padding; still re-check :hover so a
      // brief relatedTarget glitch does not flash the panel shut.
      if (hostElement.matches(':hover') || contentElement?.matches(':hover')) {
        return
      }
      menu.setSubOpen(subId, false)
    }

    // Close immediately when we know the pointer left (collapsed flyout should
    // not linger). Defer only if relatedTarget is missing.
    if (!(nextTarget instanceof Node)) {
      closeTimerRef.current = window.setTimeout(() => {
        closeIfLeft()
        closeTimerRef.current = null
      }, FLYOUT_CLOSE_FALLBACK_MS)
      return
    }

    closeIfLeft()
  }

  return (
    <div
      className={className}
      data-sidebar-sub=''
      data-sub-id={subId}
      data-active={active || undefined}
      data-open={open || undefined}
      data-presentation={presentation}
      data-disabled={disabled || undefined}
      // Keep flyout open while pointer is over trigger OR panel; close when leaving both.
      // Flyout also opens on host enter (trigger/content only clear the close timer).
      onMouseEnter={() => {
        clearCloseTimer()
        if (!disabled && presentation === 'flyout') {
          menu.setSubOpen(subId, true)
        }
      }}
      onMouseLeave={scheduleClose}
    >
      <FlyoutHoverContext.Provider value={hoverApiRef.current}>
        {children}
      </FlyoutHoverContext.Provider>
    </div>
  )
}
