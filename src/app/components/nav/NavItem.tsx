import type { ReactNode } from 'react'
import { HoverBadge } from './HoverBadge'
import { iconWrap, itemActive, itemIdle, itemRow } from './itemStyles'
import { Label } from './Label'

export function NavItem({
  selected,
  collapsed,
  icon,
  label,
  mobile = false,
}: {
  selected: boolean
  collapsed: boolean
  icon?: ReactNode
  label: string
  mobile?: boolean
}) {
  if (mobile) {
    return (
      <span
        className={`flex w-full cursor-pointer flex-col items-center gap-0.5 rounded-[10px] px-1 py-1.5 text-[10px] ${
          selected ? itemActive : itemIdle
        }`}
      >
        {icon ? <span className={iconWrap}>{icon}</span> : null}
        <span className="whitespace-nowrap px-0.5">{label}</span>
      </span>
    )
  }

  return (
    <span
      className={`group relative ${itemRow} ${selected ? itemActive : itemIdle}`}
    >
      {icon ? <span className={iconWrap}>{icon}</span> : null}
      <Label show={!collapsed}>{label}</Label>
      {collapsed ? <HoverBadge label={label} /> : null}
    </span>
  )
}
