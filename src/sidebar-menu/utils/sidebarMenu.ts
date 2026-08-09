import type { SubmenuPresentation } from '../types'

export type SubItemsMap = Readonly<Record<string, readonly string[]>>

export function resolveSubmenuPresentation(
  isMobile: boolean,
  collapsed: boolean,
): SubmenuPresentation {
  if (isMobile) return 'sheet'
  return collapsed ? 'flyout' : 'inline'
}

/** Accordion open set: at most one manual open id. */
export function nextOpenSubIds(
  prev: readonly string[],
  subId: string,
  open: boolean,
): string[] {
  if (open) {
    return prev.length === 1 && prev[0] === subId ? [...prev] : [subId]
  }
  if (!prev.includes(subId)) return [...prev]
  return prev.filter((id) => id !== subId)
}

export function subHasValue(
  subItems: SubItemsMap,
  subId: string,
  value: string | undefined,
): boolean {
  if (value == null) return false
  return (subItems[subId] ?? []).some((itemValue) => itemValue === value)
}

/**
 * Inline: last manual open wins; if none, auto-expand subs that own the active leaf.
 * Flyout/sheet: raw open ids only.
 */
export function resolveOpenSubIds(input: {
  presentation: SubmenuPresentation
  openSubIds: readonly string[]
  subItems: SubItemsMap
  value: string | undefined
}): string[] {
  const { presentation, openSubIds, subItems, value } = input
  if (presentation !== 'inline') return [...openSubIds]
  if (openSubIds.length > 0) {
    return [openSubIds[openSubIds.length - 1]!]
  }
  return Object.keys(subItems).filter((subId) =>
    subHasValue(subItems, subId, value),
  )
}

export function addSubItem(
  prev: Record<string, string[]>,
  subId: string,
  itemValue: string,
): Record<string, string[]> {
  const list = prev[subId] ?? []
  if (list.includes(itemValue)) return prev
  return { ...prev, [subId]: [...list, itemValue] }
}

export function removeSubItem(
  prev: Record<string, string[]>,
  subId: string,
  itemValue: string,
): Record<string, string[]> {
  const list = prev[subId] ?? []
  return { ...prev, [subId]: list.filter((v) => v !== itemValue) }
}
