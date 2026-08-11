import type { ReactNode } from 'react'
import type { SubmenuPresentation } from '../../../headless-menu'
import { iconWrap, itemActive, itemHovered, itemIdle, itemRow } from './itemStyles'
import { Label } from './Label'

export function SubTriggerView({
  active,
  open,
  presentation,
  collapsed,
  icon,
  label,
  mobile = false,
}: {
  active: boolean
  open: boolean
  presentation: SubmenuPresentation
  collapsed: boolean
  icon?: ReactNode
  label: string
  mobile?: boolean
}) {
  if (mobile) {
    return (
      <span
        className={`flex w-full cursor-pointer flex-col items-center gap-0.5 rounded-[10px] px-1 py-1.5 text-[10px] ${
          active ? itemActive : itemIdle
        }`}
      >
        {icon ? <span className={iconWrap}>{icon}</span> : null}
        <span className='whitespace-nowrap px-0.5'>{label}</span>
      </span>
    )
  }

  // Flyout: keep trigger looking hovered while the panel is open (pointer may be on the panel).
  const idle =
    open && presentation === 'flyout' ? itemHovered : itemIdle

  return (
    <span
      className={`group relative ${itemRow} ${active ? itemActive : idle}`}
    >
      {icon ? <span className={iconWrap}>{icon}</span> : null}
      <Label show={!collapsed}>{label}</Label>
    </span>
  )
}
