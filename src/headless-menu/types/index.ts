import type { ReactNode } from 'react'

/** How nested menus are presented — derived from viewport + density. */
export type SubmenuPresentation = 'flyout' | 'inline' | 'sheet'

export type ViewportMode = 'desktop' | 'mobile'

export type MenuItemRenderProps = {
  /** True when this item's value equals the selected value. */
  selected: boolean
  /** Same as selected for leaves; kept for API symmetry with Sub. */
  active: boolean
  disabled: boolean
}

export type MenuSubRenderProps = {
  /** True when this sub or any registered descendant is selected. */
  active: boolean
  open: boolean
  /** Current presentation mode for nested content. */
  presentation: SubmenuPresentation
  disabled: boolean
}

export type MenuCollapseRenderProps = {
  collapsed: boolean
  isMobile: boolean
}

export type SlotChildren<T> = ReactNode | ((props: T) => ReactNode)
