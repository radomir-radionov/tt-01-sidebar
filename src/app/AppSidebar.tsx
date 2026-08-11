import { RouterMenu } from './components/RouterMenu'
import { MenuTree } from './components/nav/MenuTree'

/**
 * App sidebar entry — RouterMenu owns router + paint; MenuTree is the tree.
 */
export function AppSidebar() {
  return (
    <RouterMenu>
      <MenuTree />
    </RouterMenu>
  )
}
