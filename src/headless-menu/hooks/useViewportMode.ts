import { useEffect, useState } from 'react'
import type { ViewportMode } from '../types'

const DEFAULT_QUERY = '(max-width: 767px)'

/**
 * Tracks viewport mode via matchMedia so the menu can switch
 * desktop (sidebar) vs mobile (bottom nav / sheet) behavior on resize.
 */
export function useViewportMode(query = DEFAULT_QUERY): ViewportMode {
  const [mode, setMode] = useState<ViewportMode>(() => {
    if (typeof window === 'undefined') return 'desktop'
    return window.matchMedia(query).matches ? 'mobile' : 'desktop'
  })

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => {
      setMode(mql.matches ? 'mobile' : 'desktop')
    }
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return mode
}
