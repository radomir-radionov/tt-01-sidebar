import { Icon, type IconProps } from './Icon'

export function ReportsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d='M4 19V5' />
      <path d='M4 19h16' />
      <path d='M8 15 11.5 10l2.8 3.2L18 7' />
    </Icon>
  )
}
