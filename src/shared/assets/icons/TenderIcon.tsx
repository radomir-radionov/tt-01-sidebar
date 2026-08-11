import { Icon, type IconProps } from './Icon'

export function TenderIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d='M12 3c2.8 3.2 6 6.4 6 10a6 6 0 1 1-12 0c0-3.6 3.2-6.8 6-10Z' />
    </Icon>
  )
}
