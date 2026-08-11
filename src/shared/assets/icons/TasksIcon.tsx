import { Icon, type IconProps } from './Icon'

export function TasksIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx='12' cy='12' r='9' />
      <path d='m8.5 12 2.5 2.5 4.5-5' />
    </Icon>
  )
}
