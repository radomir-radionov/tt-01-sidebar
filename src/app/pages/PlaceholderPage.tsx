import { useLocation } from 'react-router'
import { SearchIcon } from '../../shared/assets/icons'

const titles: Record<string, string> = {
  '/trends': 'Trends',
  '/tasks': 'Tasks',
  '/tickets': 'Tickets',
  '/payments': 'Payments',
  '/clients/list': 'List',
  '/clients/reviews': 'Reviews',
  '/clients/notifications': 'Notifications',
  '/inventory/products': 'Products',
  '/inventory/orders': 'Orders',
  '/inventory/suppliers': 'Suppliers',
  '/shop': 'Shop',
  '/reports': 'Reports',
  '/tender': 'Tender',
  '/settings': 'Settings',
  '/knowledge': 'Knowledge Base',
}

export function PlaceholderPage() {
  const { pathname } = useLocation()

  if (pathname === '/payments') return <PaymentsPage />
  if (pathname === '/inventory/products') {
    return <InventoryPage pathname={pathname} />
  }
  if (pathname === '/clients/notifications') {
    return <NotificationsPromoPage />
  }

  return <EmptyStatePage title={titles[pathname] ?? pathname} />
}

function NotificationsPromoPage() {
  return (
    <div className='min-h-full bg-surface px-8 py-6'>
      <p className='text-sm text-muted'>Notifications</p>
      <h1 className='mt-4 text-3xl font-semibold tracking-tight'>Notifications</h1>
      <div className='mx-auto mt-10 max-w-xl rounded-2xl border border-line bg-white px-8 py-10 text-center shadow-sm'>
        <span className='inline-flex items-center gap-1 rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-white'>
          PRO
        </span>
        <h2 className='mt-5 text-2xl font-semibold leading-snug'>
          Notifications that keep clients informed – without calls and
          unnecessary questions
        </h2>
        <ul className='mx-auto mt-6 max-w-md space-y-2 text-left text-sm text-ink'>
          <li>✓ Automatic SMS and email updates</li>
          <li>✓ Fewer “where is my order?” calls</li>
          <li>✓ Clients stay informed at every step</li>
        </ul>
        <button
          type='button'
          className='mt-8 rounded-xl bg-brand px-8 py-3 text-sm font-medium text-white hover:opacity-90'
        >
          Get Access
        </button>
      </div>
    </div>
  )
}

function PaymentsPage() {
  const tabs = ['All', 'Наличные 3', 'Наличные 2', 'Наличные', 'Карта', 'Банк']

  return (
    <div className='min-h-full bg-surface px-6 py-5'>
      <div className='flex flex-wrap items-center gap-4 border-b border-line pb-0'>
        <span className='pb-3 text-sm text-muted'>
          Payments <span className='mx-1 text-line'>/</span>
        </span>
        {tabs.map((tab, i) => (
          <button
            key={tab}
            type='button'
            className={`-mb-px border-b-2 pb-3 text-sm ${
              i === 0
                ? 'border-ink font-medium text-ink'
                : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className='mt-6 flex flex-wrap items-end gap-10'>
        <div>
          <div className='text-2xl font-semibold tracking-tight'>
            Balance <span className='font-bold'>RUB 0.00</span>
          </div>
        </div>
        <Stat label='Income' value='RUB 0.00' />
        <Stat label='Expense' value='RUB 0.00' />
        <Stat label='Total' value='RUB 0.00' />
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className='text-xs text-muted'>{label}</div>
      <div className='mt-0.5 text-sm font-medium'>{value}</div>
    </div>
  )
}

function InventoryPage({ pathname }: { pathname: string }) {
  const rows = ['SKU', '', 'GBH 2-28 F', '', '', '']

  return (
    <div className='flex min-h-full bg-surface'>
      <aside className='hidden w-56 shrink-0 border-r border-line bg-page p-4 md:block'>
        <h2 className='mb-3 text-sm font-semibold'>Products and categories</h2>
        <ul className='space-y-0.5 text-sm'>
          <li className='rounded-[10px] bg-active-bg px-2 py-1.5 text-active'>
            All categories
          </li>
          <li className='rounded-[10px] px-2 py-1.5 text-ink hover:bg-hover-bg'>
            1111
          </li>
          <li className='rounded-[10px] px-2 py-1.5 text-ink hover:bg-hover-bg'>
            Dalys
          </li>
          <li className='rounded-[10px] px-2 py-1.5 text-ink hover:bg-hover-bg'>
            Экраны
          </li>
        </ul>
      </aside>

      <div className='min-w-0 flex-1 p-5'>
        <p className='mb-3 text-xs text-muted'>{pathname}</p>
        <div className='relative mb-4 max-w-md'>
          <span className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted'>
            <SearchIcon />
          </span>
          <input
            type='search'
            placeholder='Search'
            className='w-full rounded-full border border-line bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-brand/40 focus:ring-2 focus:ring-brand/15'
          />
        </div>
        <div className='divide-y divide-line rounded-lg border border-line'>
          {rows.map((label, i) => (
            <div key={i} className='flex items-center gap-3 px-3 py-3 text-sm'>
              <input type='checkbox' className='size-4 rounded border-line' readOnly />
              <span className={label ? 'text-ink' : 'text-transparent'}>
                {label || '—'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function EmptyStatePage({ title }: { title: string }) {
  return (
    <div className='flex min-h-full flex-col items-center justify-center bg-surface px-6 pb-24 text-center md:pb-6'>
      <p className='text-lg font-semibold text-ink'>Here is empty</p>
      <p className='mt-1 text-sm text-muted'>{title}</p>
    </div>
  )
}
