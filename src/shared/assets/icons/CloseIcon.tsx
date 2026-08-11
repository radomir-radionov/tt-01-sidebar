import { Icon, type IconProps } from './Icon'

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d='M6 6l12 12' />
      <path d='M18 6 6 18' />
    </Icon>
  )
}
