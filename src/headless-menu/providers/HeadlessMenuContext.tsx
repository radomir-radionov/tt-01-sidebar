import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  useHeadlessMenuControllableState,
  type HeadlessMenuControllableProps,
} from '../hooks/useHeadlessMenuControllableState'
import { useViewportMode } from '../hooks/useViewportMode'
import type { SubmenuPresentation } from '../types'
import {
  addSubItem,
  nextOpenSubIds,
  removeSubItem,
  resolveOpenSubIds,
  resolveSubmenuPresentation,
  subHasValue,
} from '../utils/headlessMenu'

export type HeadlessMenuContextValue = {
  value: string | undefined
  setValue: (next: string) => void
  collapsed: boolean
  setCollapsed: (next: boolean | ((prev: boolean) => boolean)) => void
  isMobile: boolean
  /** Derived: sheet on mobile, flyout when collapsed desktop, inline when wide. */
  submenuPresentation: SubmenuPresentation
  isSubOpen: (subId: string) => boolean
  /** True when any submenu panel is manually open (sheet/flyout). */
  hasOpenSub: boolean
  setSubOpen: (subId: string, open: boolean) => void
  /** Items register under their nearest Sub so parents can compute 'active'. */
  registerItem: (subId: string | null, itemValue: string) => () => void
  /**
   * SubContent registers a sync releaser so focus leaves the panel before
   * open state clears (and `hidden` / aria-hidden apply).
   */
  registerSubFocusReleaser: (subId: string, release: () => void) => () => void
  /** First registered leaf under a Sub — used when activating a parent row. */
  getFirstSubItem: (subId: string) => string | undefined
  isItemSelected: (itemValue: string) => boolean
  isSubActive: (subId: string) => boolean
}

const HeadlessMenuContext = createContext<HeadlessMenuContextValue | null>(null)

export type HeadlessMenuProviderProps = HeadlessMenuControllableProps & {
  children: ReactNode
  /** matchMedia query for mobile mode (default max-width: 767px). */
  mobileQuery?: string
}

export function HeadlessMenuProvider({
  children,
  mobileQuery,
  ...controllable
}: HeadlessMenuProviderProps) {
  const isMobile = useViewportMode(mobileQuery) === 'mobile'

  const {
    value,
    setValueState,
    openSubIds,
    setOpenSubIds,
    collapsed,
    setCollapsedState,
  } = useHeadlessMenuControllableState(controllable)

  // Map subId -> descendant item values (for ancestor active highlighting).
  const [subItems, setSubItems] = useState<Record<string, string[]>>({})
  const openSubIdsRef = useRef(openSubIds)
  openSubIdsRef.current = openSubIds
  // Sync focus releasers — called before open ids shrink so hidden never wraps focus.
  const focusReleasersRef = useRef(new Map<string, () => void>())

  const submenuPresentation = resolveSubmenuPresentation(isMobile, collapsed)

  // Only setters that must stay referentially stable: Item / SubContent effects key on them.
  const registerItem = useCallback((subId: string | null, itemValue: string) => {
    if (!subId) return () => {}
    setSubItems((prev) => addSubItem(prev, subId, itemValue))
    return () => {
      setSubItems((prev) => removeSubItem(prev, subId, itemValue))
    }
  }, [])

  const registerSubFocusReleaser = useCallback(
    (subId: string, release: () => void) => {
      focusReleasersRef.current.set(subId, release)
      return () => {
        if (focusReleasersRef.current.get(subId) === release) {
          focusReleasersRef.current.delete(subId)
        }
      }
    },
    [],
  )

  const releaseFocusForClosingSubs = (
    prev: readonly string[],
    next: readonly string[],
  ) => {
    for (const id of prev) {
      if (!next.includes(id)) {
        focusReleasersRef.current.get(id)?.()
      }
    }
  }

  // Wide (inline): auto-expand active ancestor when nothing is manually open.
  const openSubIdsWithAuto = useMemo(
    () =>
      resolveOpenSubIds({
        presentation: submenuPresentation,
        openSubIds,
        subItems,
        value,
      }),
    [submenuPresentation, openSubIds, subItems, value],
  )

  const ctx = useMemo<HeadlessMenuContextValue>(
    () => ({
      value: value || undefined,
      setValue: (next) => {
        // Leaf select clears opens — move focus out of panels first.
        releaseFocusForClosingSubs(openSubIdsRef.current, [])
        openSubIdsRef.current = []
        setValueState(next)
        // Clear opens on select; SubTrigger re-opens after picking the first leaf.
        setOpenSubIds([])
      },
      collapsed: isMobile ? true : collapsed,
      // Collapsing clears opens so inline accordion does not stick as a flyout.
      setCollapsed: (next) => {
        const resolved = typeof next === 'function' ? next(collapsed) : next
        if (resolved && !collapsed) {
          releaseFocusForClosingSubs(openSubIdsRef.current, [])
          openSubIdsRef.current = []
          setOpenSubIds([])
        }
        setCollapsedState(resolved)
      },
      isMobile,
      submenuPresentation,
      isSubOpen: (subId) =>
        submenuPresentation === 'inline'
          ? openSubIdsWithAuto.includes(subId)
          : openSubIds.includes(subId),
      hasOpenSub: openSubIds.length > 0,
      setSubOpen: (subId, open) => {
        const prev = openSubIdsRef.current
        const next = nextOpenSubIds(prev, subId, open)
        releaseFocusForClosingSubs(prev, next)
        openSubIdsRef.current = next
        setOpenSubIds(next)
      },
      registerItem,
      registerSubFocusReleaser,
      getFirstSubItem: (subId) => subItems[subId]?.[0],
      isItemSelected: (itemValue) => value === itemValue,
      isSubActive: (subId) => subHasValue(subItems, subId, value),
    }),
    [
      value,
      collapsed,
      isMobile,
      submenuPresentation,
      openSubIds,
      openSubIdsWithAuto,
      registerItem,
      registerSubFocusReleaser,
      subItems,
      setValueState,
      setOpenSubIds,
      setCollapsedState,
    ],
  )

  return (
    <HeadlessMenuContext.Provider value={ctx}>
      {children}
    </HeadlessMenuContext.Provider>
  )
}

export function useHeadlessMenu(): HeadlessMenuContextValue {
  const ctx = useContext(HeadlessMenuContext)
  if (!ctx) {
    throw new Error('useHeadlessMenu must be used within <HeadlessMenu>')
  }
  return ctx
}

/** Convenience alias used by consumers for viewport checks. */
export function useIsMobile(): boolean {
  return useHeadlessMenu().isMobile
}
