import { Icon, type IconProps } from './Icon'

export function MarketingIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 10v4h3l6 3.5V6.5L7 10H4Z" />
      <path d="M17 9.5a3 3 0 0 1 0 5" />
      <path d="M19 7.5a5.5 5.5 0 0 1 0 9" />
    </Icon>
  )
}
