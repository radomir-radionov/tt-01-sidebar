import { useState, type CSSProperties, type ReactElement } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { HeadlessMenu, useHeadlessMenu } from '../headless-menu'
import './headless-menu.story.css'

/**
 * Story-only paint so headless behavior (selection, open, density, presentation)
 * is visible. No Router — controlled props only.
 */
const ALWAYS_DESKTOP = '(max-width: 0px)'
const ALWAYS_MOBILE = '(min-width: 0px)'

type DemoArgs = {
  defaultValue?: string
  defaultCollapsed?: boolean
  mobileQuery?: string
}

function MenuDebug(): ReactElement {
  const menu = useHeadlessMenu()
  return (
    <aside className='hm-story-debug' aria-label='Menu state'>
      <div>
        <strong>value</strong> {menu.value ?? '—'}
      </div>
      <div>
        <strong>collapsed</strong> {String(menu.collapsed)}
      </div>
      <div>
        <strong>presentation</strong> {menu.submenuPresentation}
      </div>
      <div>
        <strong>isMobile</strong> {String(menu.isMobile)}
      </div>
      <div>
        <strong>hasOpenSub</strong> {String(menu.hasOpenSub)}
      </div>
    </aside>
  )
}

function DemoTree(): ReactElement {
  return (
    <>
      <HeadlessMenu.Item value='/home' className='hm-story-item'>
        {({ selected }) => (selected ? '• Home' : 'Home')}
      </HeadlessMenu.Item>

      <HeadlessMenu.Sub value='clients' className='hm-story-sub'>
        <HeadlessMenu.SubTrigger className='hm-story-item'>
          {({ open, active, presentation }) =>
            `Clients${active ? ' ★' : ''}${open ? ' ▾' : ' ▸'} [${presentation}]`
          }
        </HeadlessMenu.SubTrigger>
        <HeadlessMenu.SubContent className='hm-story-sub-content'>
          <HeadlessMenu.Item value='/clients/list' className='hm-story-item'>
            {({ selected }) => (selected ? '• List' : 'List')}
          </HeadlessMenu.Item>
          <HeadlessMenu.Item value='/clients/new' className='hm-story-item'>
            {({ selected }) => (selected ? '• New' : 'New')}
          </HeadlessMenu.Item>
        </HeadlessMenu.SubContent>
      </HeadlessMenu.Sub>

      <HeadlessMenu.Item value='/shop' className='hm-story-item'>
        {({ selected }) => (selected ? '• Shop' : 'Shop')}
      </HeadlessMenu.Item>

      <HeadlessMenu.CollapseTrigger className='hm-story-collapse'>
        {({ collapsed }) => (collapsed ? 'Expand' : 'Collapse')}
      </HeadlessMenu.CollapseTrigger>
    </>
  )
}

function UncontrolledDemo({
  defaultValue = '/home',
  defaultCollapsed = false,
  mobileQuery = ALWAYS_DESKTOP,
}: DemoArgs): ReactElement {
  const layoutStyle: CSSProperties =
    mobileQuery === ALWAYS_MOBILE
      ? { display: 'flex', flexDirection: 'column', gap: 12, minHeight: 360 }
      : { display: 'flex', gap: 24, alignItems: 'flex-start' }

  return (
    <div className='hm-story-root' style={layoutStyle}>
      <HeadlessMenu
        className={
          mobileQuery === ALWAYS_MOBILE
            ? 'hm-story-menu hm-story-menu--mobile'
            : 'hm-story-menu'
        }
        defaultValue={defaultValue}
        defaultCollapsed={defaultCollapsed}
        mobileQuery={mobileQuery}
      >
        <MenuDebug />
        <div className='hm-story-tree'>
          <DemoTree />
        </div>
      </HeadlessMenu>
    </div>
  )
}

function ControlledDemo(): ReactElement {
  const [value, setValue] = useState('/clients/list')
  const [collapsed, setCollapsed] = useState(false)
  const [openSubIds, setOpenSubIds] = useState<string[]>(['clients'])

  return (
    <div className='hm-story-root' style={{ display: 'flex', gap: 24 }}>
      <div className='hm-story-controls'>
        <label>
          value{' '}
          <select value={value} onChange={(e) => setValue(e.target.value)}>
            <option value='/home'>/home</option>
            <option value='/clients/list'>/clients/list</option>
            <option value='/clients/new'>/clients/new</option>
            <option value='/shop'>/shop</option>
          </select>
        </label>
        <label>
          <input
            type='checkbox'
            checked={collapsed}
            onChange={(e) => setCollapsed(e.target.checked)}
          />{' '}
          collapsed
        </label>
        <p className='hm-story-hint'>
          External state drives the menu (same pattern RouterMenu uses).
        </p>
      </div>
      <HeadlessMenu
        className='hm-story-menu'
        value={value}
        onValueChange={setValue}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        openSubIds={openSubIds}
        onOpenSubIdsChange={setOpenSubIds}
        mobileQuery={ALWAYS_DESKTOP}
      >
        <MenuDebug />
        <div className='hm-story-tree'>
          <DemoTree />
        </div>
      </HeadlessMenu>
    </div>
  )
}

const meta = {
  title: 'HeadlessMenu',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Logic-only sidebar menu. Stories use temporary paint so open/active/density/viewport behavior is checkable without React Router.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** Wide desktop → inline submenu; collapse toggles flyout. */
export const DesktopWide: Story = {
  name: 'Desktop / wide (inline)',
  render: () => (
    <UncontrolledDemo defaultValue='/clients/list' defaultCollapsed={false} />
  ),
}

/** Collapsed desktop → flyout on hover / click. */
export const DesktopCollapsed: Story = {
  name: 'Desktop / collapsed (flyout)',
  render: () => (
    <UncontrolledDemo defaultValue='/clients/list' defaultCollapsed={true} />
  ),
}

/** Forced mobile → sheet presentation. */
export const MobileSheet: Story = {
  name: 'Mobile / sheet',
  render: () => (
    <UncontrolledDemo defaultValue='/home' mobileQuery={ALWAYS_MOBILE} />
  ),
}

/** Controlled value / collapsed / openSubIds from outside. */
export const Controlled: Story = {
  name: 'Controlled props',
  render: () => <ControlledDemo />,
}
