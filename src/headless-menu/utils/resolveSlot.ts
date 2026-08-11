import type { SlotChildren } from '../types'

export function resolveSlot<T>(children: SlotChildren<T>, props: T) {
  return typeof children === 'function' ? children(props) : children
}
