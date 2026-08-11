import { Icon, type IconProps } from './Icon'

export function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx='11' cy='11' r='6.5' />
      <path d='m16 16 4 4' />
    </Icon>
  )
}
