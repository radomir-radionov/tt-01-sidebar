import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { SidebarMenu } from '../../sidebar-menu'
import { SidebarShell } from './nav/SidebarShell'

/**
 * Consumer styling aligned to https://app.helloclient.by/marketing/notifications
 */
export function AppSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <SidebarMenu
      value={location.pathname}
      onValueChange={(path) => navigate(path)}
      collapsed={collapsed}
      onCollapsedChange={setCollapsed}
    >
      <SidebarShell />
    </SidebarMenu>
  )
}
