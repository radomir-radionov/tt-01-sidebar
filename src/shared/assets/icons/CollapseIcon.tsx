import { Icon, type IconProps } from './Icon'

/** Collapse control matching video: vertical bar + left chevron */
export function CollapseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 5v14" />
      <path d="m16 8-4 4 4 4" />
    </Icon>
  )
}
