import { Navigate, Route, Routes } from 'react-router'
import { AppSidebar } from './AppSidebar'
import { PlaceholderPage } from './pages/PlaceholderPage'

export function App() {
  return (
    <div className='flex h-full min-h-0 bg-page'>
      <AppSidebar />

      <div className='relative flex min-w-0 flex-1 flex-col'>
        <main className='min-h-0 flex-1 overflow-auto pb-24 md:pb-0'>
          <Routes>
            <Route
              path='/'
              element={<Navigate to='/inventory/products' replace />}
            />
            <Route path='/trends' element={<PlaceholderPage />} />
            <Route path='/tasks' element={<PlaceholderPage />} />
            <Route path='/tickets' element={<PlaceholderPage />} />
            <Route path='/payments' element={<PlaceholderPage />} />
            <Route path='/clients/list' element={<PlaceholderPage />} />
            <Route path='/clients/reviews' element={<PlaceholderPage />} />
            <Route
              path='/clients/notifications'
              element={<PlaceholderPage />}
            />
            <Route path='/inventory/products' element={<PlaceholderPage />} />
            <Route path='/inventory/orders' element={<PlaceholderPage />} />
            <Route path='/inventory/suppliers' element={<PlaceholderPage />} />
            <Route path='/shop' element={<PlaceholderPage />} />
            <Route path='/reports' element={<PlaceholderPage />} />
            <Route path='/tender' element={<PlaceholderPage />} />
            <Route path='/settings' element={<PlaceholderPage />} />
            <Route path='/knowledge' element={<PlaceholderPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
