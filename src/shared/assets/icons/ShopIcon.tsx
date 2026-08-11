import { Icon, type IconProps } from './Icon'

export function ShopIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx='9' cy='19' r='1.4' />
      <circle cx='17' cy='19' r='1.4' />
      <path d='M3 5h2.2l2.2 10.2h9.8L19.5 8H7.1' />
    </Icon>
  )
}
