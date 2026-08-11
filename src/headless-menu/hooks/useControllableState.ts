import { useCallback, useEffect, useRef, useState } from 'react'

type UseControllableStateParams<T> = {
  prop?: T
  defaultProp: T
  onChange?: (value: T) => void
}

type Optimistic<T> = {
  value: T
  /** Controlled prop at the moment of set — used until prop changes. */
  base: T
}

/**
 * Supports controlled + uncontrolled usage so consumers can plug in
 * React Router, useState, localStorage, etc. without forking the menu.
 *
 * Functional updaters must chain against the latest pending value (ref), not
 * the last rendered `value` — otherwise rapid open/close (flyout hover →
 * sibling delayed close) can wipe a newer open id with a stale snapshot.
 *
 * Controlled + async prop (e.g. React Router `navigate` / startTransition):
 * keep an optimistic value until the prop changes so selection UI does not
 * lag one frame behind sync open-state updates (hover → idle → active flash).
 */
export function useControllableState<T>({
  prop,
  defaultProp,
  onChange,
}: UseControllableStateParams<T>): [T, (next: T | ((prev: T) => T)) => void] {
  const [uncontrolled, setUncontrolled] = useState(defaultProp)
  const [optimistic, setOptimistic] = useState<Optimistic<T> | null>(null)
  const isControlled = prop !== undefined
  const propRef = useRef(prop)
  const onChangeRef = useRef(onChange)
  propRef.current = prop

  useEffect(() => {
    onChangeRef.current = onChange
  })

  const value: T = !isControlled
    ? uncontrolled
    : optimistic != null && Object.is(prop, optimistic.base)
      ? optimistic.value
      : (prop as T)

  const valueRef = useRef(value)

  // Keep ref aligned with controlled props / committed state between updates.
  useEffect(() => {
    valueRef.current = value
  }, [value])

  // Drop stale optimistic once the controlled prop has caught up (or moved on).
  useEffect(() => {
    if (optimistic == null || prop === undefined) return
    if (!Object.is(prop, optimistic.base)) {
      setOptimistic(null)
    }
  }, [prop, optimistic])

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const prev = valueRef.current
      const resolved =
        typeof next === 'function' ? (next as (prev: T) => T)(prev) : next
      // Eagerly advance so a second updater in the same tick sees this result.
      valueRef.current = resolved
      if (!isControlled) {
        setUncontrolled(resolved)
      } else if (!Object.is(resolved, prev)) {
        // Snapshot the lagging prop so we keep showing `resolved` until it moves.
        setOptimistic({ value: resolved, base: propRef.current as T })
      }
      if (!Object.is(resolved, prev)) {
        onChangeRef.current?.(resolved)
      }
    },
    [isControlled],
  )

  return [value, setValue]
}
