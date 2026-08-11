import { Icon, type IconProps } from './Icon'

export function TicketsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d='M4 7h16v3.2a2.2 2.2 0 0 0 0 3.6V17H4v-3.2a2.2 2.2 0 0 0 0-3.6V7Z' />
      <path d='M12 7v10' />
    </Icon>
  )
}
