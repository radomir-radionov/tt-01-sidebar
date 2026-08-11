import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  type HTMLAttributes,
  type ReactElement,
} from 'react'
import { useHeadlessMenu } from '../../providers'
import type { MenuSubRenderProps, SlotChildren } from '../../types'
import { resolveSlot } from '../../utils/resolveSlot'
import { FlyoutHoverContext, useSubHost } from './context'

export type HeadlessMenuSubContentProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  children: SlotChildren<MenuSubRenderProps>
}

export function HeadlessMenuSubContent({
  children,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  ...rest
}: HeadlessMenuSubContentProps): ReactElement | null {
  const menu = useHeadlessMenu()
  const { subId, disabled, contentId } = useSubHost()
  const hover = useContext(FlyoutHoverContext)
  const active = menu.isSubActive(subId)
  const open = menu.isSubOpen(subId)
  const presentation = menu.submenuPresentation
  const panelRef = useRef<HTMLDivElement>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)
  const registerSubFocusReleaser = menu.registerSubFocusReleaser

  const renderProps: MenuSubRenderProps = {
    active,
    open,
    presentation,
    disabled,
  }

  // Escape closes overlay/flyout; inline stays open via active descendants.
  // Provider releases focus before open state clears.
  useEffect(() => {
    if (!open || presentation === 'inline') return
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        menu.setSubOpen(subId, false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, presentation, menu, subId])

  // Close paths call this sync before `open` flips — blur only.
  // Do not restore here: on mobile the trigger lives in a still-hidden bottom
  // nav, so focus() fails and aria-hidden would wrap the focused leaf.
  useEffect(() => {
    return registerSubFocusReleaser(subId, () => {
      const panel = panelRef.current
      const activeEl = document.activeElement
      if (
        !panel ||
        !(activeEl instanceof HTMLElement) ||
        !panel.contains(activeEl)
      ) {
        previouslyFocusedRef.current = null
        return
      }
      activeEl.blur()
    })
  }, [registerSubFocusReleaser, subId])

  // Sheet: focus panel on open; restore trigger after close (nav visible again).
  useLayoutEffect(() => {
    if (presentation !== 'sheet') return

    if (open) {
      const panel = panelRef.current
      const activeEl = document.activeElement
      previouslyFocusedRef.current =
        activeEl instanceof HTMLElement ? activeEl : null
      panel?.focus({ preventScroll: true })
      return
    }

    const restore = previouslyFocusedRef.current
    previouslyFocusedRef.current = null
    if (restore?.isConnected) {
      restore.focus({ preventScroll: true })
    }
  }, [open, presentation])

  // Keep one stable wrapper so opening a flyout does not remount/register
  // its leaf items again and briefly reset ancestor state.
  return (
    <div
      ref={panelRef}
      id={contentId}
      hidden={!open}
      aria-hidden={open ? undefined : true}
      role={open ? (presentation === 'inline' ? 'group' : 'menu') : undefined}
      tabIndex={open && presentation === 'sheet' ? -1 : undefined}
      data-sidebar-sub-content=''
      data-presentation={open ? presentation : undefined}
      data-active={active || undefined}
      {...rest}
      onMouseEnter={(event) => {
        onMouseEnter?.(event)
        if (presentation === 'flyout') {
          hover?.clearCloseTimer()
        }
      }}
      onMouseLeave={(event) => {
        onMouseLeave?.(event)
        // Closing is handled by SubRoot so leaving trigger→panel does not flicker.
      }}
      onKeyDown={onKeyDown}
    >
      {resolveSlot(children, renderProps)}
    </div>
  )
}
