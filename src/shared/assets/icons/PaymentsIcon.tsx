import { Icon, type IconProps } from './Icon'

export function PaymentsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 8.5c0-.8.7-1.5 1.5-1.5H16l4 4v7c0 .8-.7 1.5-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-9Z" />
      <path d="M16 7v3.5h4" />
      <circle cx="9" cy="14" r="1.25" />
    </Icon>
  )
}
