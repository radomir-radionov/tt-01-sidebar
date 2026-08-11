/** Collapsed-rail label chip (desctop-ui.mp4) — dark blue, left caret. */
export function HoverBadge({ label }: { label: string }) {
  return (
    <span
      role='tooltip'
      className='pointer-events-none absolute left-full top-1/2 z-[70] ml-[14px] -translate-y-1/2 whitespace-nowrap rounded-md bg-active px-2.5 py-1.5 text-[13px] leading-none text-white opacity-0 shadow-sm group-hover:opacity-100'
    >
      <span
        aria-hidden
        className='absolute right-full top-1/2 -translate-y-1/2 border-y-[5px] border-r-[6px] border-y-transparent border-r-active'
      />
      {label}
    </span>
  )
}
