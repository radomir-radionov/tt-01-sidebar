import { SidebarMenu, useSidebarMenu } from '../../../sidebar-menu'
import {
  ClientsIcon,
  CollapseIcon,
  ExpandIcon,
  InventoryIcon,
  KnowledgeIcon,
  PaymentsIcon,
  ReportsIcon,
  SettingsIcon,
  ShopIcon,
  TasksIcon,
  TenderIcon,
  TicketsIcon,
  TrendsIcon,
} from '../../../shared/assets/icons'
import { itemRow } from './itemStyles'
import { NavItem } from './NavItem'
import { NestedGroup } from './NestedGroup'

export function MenuTree({
  collapsed,
  presentation,
  mobile = false,
}: {
  collapsed: boolean
  presentation: ReturnType<typeof useSidebarMenu>['submenuPresentation']
  mobile?: boolean
}) {
  // Equal cells that refuse to shrink below a readable label width — overflow scrolls.
  const leafClass = mobile
    ? 'flex min-w-16 shrink-0 flex-1 basis-16 cursor-pointer flex-col items-center'
    : 'relative mb-1 block w-full cursor-pointer'

  // Order + nesting from sources/image-*.webp (HelloClient mockups)
  return (
    <>
      <SidebarMenu.Item value="/trends" className={leafClass}>
        {(props) => (
          <NavItem
            {...props}
            collapsed={collapsed}
            mobile={mobile}
            icon={<TrendsIcon />}
            label="Trends"
          />
        )}
      </SidebarMenu.Item>

      <SidebarMenu.Item value="/tasks" className={leafClass}>
        {(props) => (
          <NavItem
            {...props}
            collapsed={collapsed}
            mobile={mobile}
            icon={<TasksIcon />}
            label="Tasks"
          />
        )}
      </SidebarMenu.Item>

      <SidebarMenu.Item value="/tickets" className={leafClass}>
        {(props) => (
          <NavItem
            {...props}
            collapsed={collapsed}
            mobile={mobile}
            icon={<TicketsIcon />}
            label="Tickets"
          />
        )}
      </SidebarMenu.Item>

      <SidebarMenu.Item value="/payments" className={leafClass}>
        {(props) => (
          <NavItem
            {...props}
            collapsed={collapsed}
            mobile={mobile}
            icon={<PaymentsIcon />}
            label="Payments"
          />
        )}
      </SidebarMenu.Item>

      <NestedGroup
        id="clients"
        label="Clients"
        icon={<ClientsIcon />}
        collapsed={collapsed}
        presentation={presentation}
        mobile={mobile}
        items={[
          { value: '/clients/list', label: 'List' },
          { value: '/clients/reviews', label: 'Reviews' },
          { value: '/clients/notifications', label: 'Notifications' },
        ]}
      />

      <NestedGroup
        id="inventory"
        label="Inventory"
        icon={<InventoryIcon />}
        collapsed={collapsed}
        presentation={presentation}
        mobile={mobile}
        items={[
          { value: '/inventory/products', label: 'Products' },
          { value: '/inventory/orders', label: 'Orders' },
          { value: '/inventory/suppliers', label: 'Suppliers' },
        ]}
      />

      <SidebarMenu.Item value="/shop" className={leafClass}>
        {(props) => (
          <NavItem
            {...props}
            collapsed={collapsed}
            mobile={mobile}
            icon={<ShopIcon />}
            label="Shop"
          />
        )}
      </SidebarMenu.Item>

      <SidebarMenu.Item value="/reports" className={leafClass}>
        {(props) => (
          <NavItem
            {...props}
            collapsed={collapsed}
            mobile={mobile}
            icon={<ReportsIcon />}
            label="Reports"
          />
        )}
      </SidebarMenu.Item>

      <SidebarMenu.Item value="/tender" className={leafClass}>
        {(props) => (
          <NavItem
            {...props}
            collapsed={collapsed}
            mobile={mobile}
            icon={<TenderIcon />}
            label="Tender"
          />
        )}
      </SidebarMenu.Item>

      {!mobile && (
        <>
          <div className="my-2 border-t border-line" role="separator" />

          <SidebarMenu.Item value="/settings" className={leafClass}>
            {(props) => (
              <NavItem
                {...props}
                collapsed={collapsed}
                icon={<SettingsIcon />}
                label="Settings"
              />
            )}
          </SidebarMenu.Item>

          <SidebarMenu.Item value="/knowledge" className={leafClass}>
            {(props) => (
              <NavItem
                {...props}
                collapsed={collapsed}
                icon={<KnowledgeIcon />}
                label="Knowledge Base"
              />
            )}
          </SidebarMenu.Item>

          {/* Collapse sits directly under Knowledge Base (desktop ref) */}
          <div className="my-2 border-t border-line" role="separator" />

          <SidebarMenu.CollapseTrigger
            className={`${itemRow} text-muted hover:bg-hover-bg hover:text-ink`}
          >
            {({ collapsed: isCollapsed }) =>
              isCollapsed ? <ExpandIcon /> : <CollapseIcon />
            }
          </SidebarMenu.CollapseTrigger>
        </>
      )}
    </>
  )
}
