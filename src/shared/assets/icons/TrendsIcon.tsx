import { Icon, type IconProps } from './Icon'

export function TrendsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 15v-4" />
      <path d="M12 15V9" />
      <path d="M16 15v-7" />
    </Icon>
  )
}
