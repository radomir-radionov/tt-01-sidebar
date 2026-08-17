import { useState, type ReactElement } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { HeadlessMenu } from '../headless-menu'
import { RouterMenu } from '../app/components/RouterMenu'
import { SidebarShell } from '../app/components/nav/SidebarShell'
import {
  ClientsIcon,
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
} from '../shared/assets/icons'

const ALWAYS_DESKTOP = '(max-width: 0px)'
const ALWAYS_MOBILE = '(min-width: 0px)'

/**
 * Same business tree as AppSidebar + product footer (Settings / Knowledge).
 * Wired with HeadlessMenu controlled props — HelloClient paint, no Router.
 */
function HelloClientTree(): ReactElement {
  return (
    <>
      <RouterMenu.Item label='Trends' to='/trends' icon={<TrendsIcon />} />
      <RouterMenu.Item label='Tasks' to='/tasks' icon={<TasksIcon />} />
      <RouterMenu.Item label='Tickets' to='/tickets' icon={<TicketsIcon />} />
      <RouterMenu.Item
        label='Payments'
        to='/payments'
        icon={<PaymentsIcon />}
      />

      <RouterMenu.Group label='Clients' icon={<ClientsIcon />}>
        <RouterMenu.Item label='List' to='/clients/list' />
        <RouterMenu.Item label='Reviews' to='/clients/reviews' />
        <RouterMenu.Item label='Notifications' to='/clients/notifications' />
      </RouterMenu.Group>

      <RouterMenu.Group label='Inventory' icon={<InventoryIcon />}>
        <RouterMenu.Item label='Products' to='/inventory/products' />
        <RouterMenu.Item label='Orders' to='/inventory/orders' />
        <RouterMenu.Item label='Suppliers' to='/inventory/suppliers' />
      </RouterMenu.Group>

      <RouterMenu.Item label='Shop' to='/shop' icon={<ShopIcon />} />
      <RouterMenu.Item label='Reports' to='/reports' icon={<ReportsIcon />} />
      <RouterMenu.Item label='Tender' to='/tender' icon={<TenderIcon />} />
    </>
  )
}

function HelloClientMenu({
  defaultValue = '/inventory/products',
  defaultCollapsed = false,
  mobileQuery = ALWAYS_DESKTOP,
}: {
  defaultValue?: string
  defaultCollapsed?: boolean
  mobileQuery?: string
}): ReactElement {
  const [value, setValue] = useState(defaultValue)
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  return (
    <div className='flex h-screen bg-page'>
      <HeadlessMenu
        value={value}
        onValueChange={setValue}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        mobileQuery={mobileQuery}
      >
        <SidebarShell
          footer={
            <>
              <RouterMenu.Item
                label='Settings'
                to='/settings'
                icon={<SettingsIcon />}
              />
              <RouterMenu.Item
                label='Knowledge Base'
                to='/knowledge'
                icon={<KnowledgeIcon />}
              />
            </>
          }
        >
          <HelloClientTree />
        </SidebarShell>
      </HeadlessMenu>
      <div className='min-w-0 flex-1 bg-page' aria-hidden />
    </div>
  )
}

const meta = {
  title: 'HeadlessMenu/HelloClient',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'One-to-one HelloClient chrome (SidebarShell + nav paint) over HeadlessMenu. No React Router — selection is local state.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** Matches desktop wide mock: Inventory open, Products active. */
export const DesktopWide: Story = {
  name: 'Desktop / wide (inline)',
  render: () => (
    <HelloClientMenu
      defaultValue='/inventory/products'
      defaultCollapsed={false}
    />
  ),
}

export const DesktopCollapsed: Story = {
  name: 'Desktop / collapsed (flyout)',
  render: () => (
    <HelloClientMenu
      defaultValue='/inventory/products'
      defaultCollapsed={true}
    />
  ),
}

export const MobileSheet: Story = {
  name: 'Mobile / sheet',
  render: () => (
    <HelloClientMenu defaultValue='/trends' mobileQuery={ALWAYS_MOBILE} />
  ),
}
