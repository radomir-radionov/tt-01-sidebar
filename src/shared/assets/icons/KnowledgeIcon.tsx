import { Icon, type IconProps } from './Icon'

export function KnowledgeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.8 9.2a2.4 2.4 0 1 1 3.5 2.1c-.7.4-1.3 1-1.3 1.9" />
      <circle cx="12" cy="16.5" r="0.7" fill="currentColor" stroke="none" />
    </Icon>
  )
}
