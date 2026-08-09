import {
  useContext,
  type ButtonHTMLAttributes,
  type KeyboardEvent,
  type ReactElement,
} from 'react'
import { useSidebarMenu } from '../../providers'
import type { MenuSubRenderProps, SlotChildren } from '../../types'
import { resolveSlot } from '../../utils/resolveSlot'
import { FlyoutHoverContext, useSubHost } from './context'

export type SidebarMenuSubTriggerProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> & {
  children: SlotChildren<MenuSubRenderProps>
}

/**
 * Opens nested content.
 * - flyout: hover opens; click toggles open/closed (leaf click selects)
 * - sheet: click opens panel only (user picks a leaf)
 * - inline: click selects first child and keeps the panel open
 */
export function SidebarMenuSubTrigger({
  children,
  onClick,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: SidebarMenuSubTriggerProps): ReactElement {
  const menu = useSidebarMenu()
  const { subId, disabled, contentId } = useSubHost()
  const hover = useContext(FlyoutHoverContext)
  const active = menu.isSubActive(subId)
  const open = menu.isSubOpen(subId)
  const presentation = menu.submenuPresentation

  const renderProps: MenuSubRenderProps = {
    active,
    open,
    presentation,
    disabled,
  }

  /** Parent activation: flyout toggles; sheet opens only; inline navigates to first leaf. */
  const activateParent = () => {
    if (disabled) return
    if (presentation === 'flyout') {
      // Toggle while pointer may still be on the trigger — hover will not
      // re-fire until leave + re-enter, so close stays closed until then.
      hover?.clearCloseTimer()
      menu.setSubOpen(subId, !open)
      return
    }
    if (presentation === 'sheet') {
      menu.setSubOpen(subId, true)
      return
    }
    const first = menu.getFirstSubItem(subId)
    if (first) menu.setValue(first)
    // setValue clears opens — reopen so inline stays usable.
    menu.setSubOpen(subId, true)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      activateParent()
    }
    if (event.key === 'ArrowRight' && presentation !== 'inline') {
      event.preventDefault()
      menu.setSubOpen(subId, true)
    }
    if (event.key === 'ArrowLeft' && open) {
      event.preventDefault()
      menu.setSubOpen(subId, false)
    }
  }

  return (
    <button
      type="button"
      role="menuitem"
      aria-haspopup={presentation === 'inline' ? 'true' : 'menu'}
      aria-expanded={open}
      aria-controls={contentId}
      data-active={active || undefined}
      data-open={open || undefined}
      data-disabled={disabled || undefined}
      disabled={disabled}
      {...rest}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) activateParent()
      }}
      onKeyDown={handleKeyDown}
      onMouseEnter={(event) => {
        onMouseEnter?.(event)
        if (presentation === 'flyout') {
          hover?.clearCloseTimer()
        }
      }}
      onMouseLeave={onMouseLeave}
    >
      {resolveSlot(children, renderProps)}
    </button>
  )
}
