import type { ReactNode, SVGProps } from 'react'

export type IconProps = SVGProps<SVGSVGElement>

export function Icon(props: IconProps & { children: ReactNode }) {
  const { children, ...rest } = props
  return (
    <svg
      viewBox="0 0 24 24"
      width="1.25rem"
      height="1.25rem"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {children}
    </svg>
  )
}
