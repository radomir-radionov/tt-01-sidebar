import { Icon, type IconProps } from './Icon'

export function ClientsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx='12' cy='12' r='9' />
      <circle cx='9' cy='10' r='1' fill='currentColor' stroke='none' />
      <circle cx='15' cy='10' r='1' fill='currentColor' stroke='none' />
      <path d='M8.5 14.5s1.8 2.2 3.5 2.2 3.5-2.2 3.5-2.2' />
    </Icon>
  )
}
