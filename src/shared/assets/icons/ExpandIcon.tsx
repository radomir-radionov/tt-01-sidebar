import { Icon, type IconProps } from './Icon'

/** Expand control: vertical bar + right chevron */
export function ExpandIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 5v14" />
      <path d="m10 8 4 4-4 4" />
    </Icon>
  )
}
