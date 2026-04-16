import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Sidebar from './components/common/Sidebar'
import Router from './router.jsx'
import { seedAll } from './services/localStorage/index.js'
import { useApp } from './context/AppContext.jsx'

const NO_SIDEBAR_ROUTES = ['/login', '/register']

function NotificationToast({ notifications }) {
  if (notifications.length === 0) return null
  return (
    <div style={{ position: 'fixed', top: '76px', right: '20px', zIndex: 999, display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '320px' }}>
      {notifications.map((n) => (
        <div key={n.id} style={{
          background: n.type === 'error' ? '#1a0808' : '#0d1a0d',
          border: `1px solid ${n.type === 'error' ? '#ef444440' : '#10b98140'}`,
          color: n.type === 'error' ? '#ef4444' : '#10b981',
          borderRadius: '10px', padding: '10px 16px', fontSize: '0.85rem', fontWeight: 500,
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          animation: 'slideIn 0.3s ease',
        }}>
          {n.msg}
        </div>
      ))}
      <style>{`@keyframes slideIn { from { transform: translateX(20px); opacity: 0 } to { transform: translateX(0); opacity: 1 } }`}</style>
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const { notifications } = useApp()
  const showSidebar = !NO_SIDEBAR_ROUTES.includes(location.pathname)

  useEffect(() => {
    seedAll()
  }, [])

  return (
    <>
      <Navbar />
      <NotificationToast notifications={notifications} />
      {showSidebar ? (
        <div style={{ display: 'flex', paddingTop: '64px', minHeight: '100vh' }}>
          <div className="hide-mobile" style={{ padding: '24px 0 24px 24px', flexShrink: 0 }}>
            <Sidebar />
          </div>
          <main style={{ flex: 1, minWidth: 0, padding: '24px', maxWidth: '860px' }}>
            <Router />
          </main>
        </div>
      ) : (
        <Router />
      )}
    </>
  )
}
