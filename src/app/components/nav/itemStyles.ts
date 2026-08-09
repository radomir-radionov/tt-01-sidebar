/**
 * Spacing/type sampled from https://app.helloclient.by/marketing/notifications
 * Item: h≈44, pad ×10, gap 12, fs 16, radius 10
 * Sub: indented +16px, fs ~13–16, 5px circle bullet
 */
export const itemIdle = 'cursor-pointer text-ink hover:bg-hover-bg'
/** Explicit hover paint — CSS :hover drops when the pointer moves into the flyout. */
export const itemHovered = 'cursor-pointer bg-hover-bg text-ink'
export const itemActive = 'cursor-pointer bg-active-bg text-active'
export const itemRow =
  'flex h-11 w-full cursor-pointer items-center justify-start rounded-[10px] px-2.5 text-left text-[16px] leading-6'
export const iconWrap =
  'inline-flex h-5 w-5 shrink-0 items-center justify-center [&_svg]:h-5 [&_svg]:w-5'
