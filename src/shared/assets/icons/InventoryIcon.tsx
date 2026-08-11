import { Icon, type IconProps } from './Icon'

export function InventoryIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d='M4 8.2 12 4l8 4.2v7.6L12 20l-8-4.2V8.2Z' />
      <path d='M4 8.2 12 12.4 20 8.2' />
      <path d='M12 12.4V20' />
    </Icon>
  )
}
