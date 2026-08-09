import { useControllableState } from './useControllableState'

export type SidebarMenuControllableProps = {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  collapsed?: boolean
  defaultCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  openSubIds?: string[]
  defaultOpenSubIds?: string[]
  onOpenSubIdsChange?: (openSubIds: string[]) => void
}

/** Controlled/uncontrolled selection, open subs, and density for the menu root. */
export function useSidebarMenuControllableState({
  value: valueProp,
  defaultValue = '',
  onValueChange,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  openSubIds: openSubIdsProp,
  defaultOpenSubIds = [],
  onOpenSubIdsChange,
}: SidebarMenuControllableProps) {
  const [value, setValueState] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  })

  const [openSubIds, setOpenSubIds] = useControllableState({
    prop: openSubIdsProp,
    defaultProp: defaultOpenSubIds,
    onChange: onOpenSubIdsChange,
  })

  const [collapsed, setCollapsedState] = useControllableState({
    prop: collapsedProp,
    defaultProp: defaultCollapsed,
    onChange: onCollapsedChange,
  })

  return {
    value,
    setValueState,
    openSubIds,
    setOpenSubIds,
    collapsed,
    setCollapsedState,
  }
}
