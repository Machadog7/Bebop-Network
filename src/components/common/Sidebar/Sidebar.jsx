import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Avatar from '../Avatar'
import { useAuth } from '../../../hooks/useAuth.js'

const NAV_LINKS = [
  { to: '/', label: 'Feed', icon: '🎵' },
  { to: '/musicians', label: 'Músicos', icon: '👥' },
  { to: '/gigs', label: 'Shows', icon: '🎤' },
  { to: '/marketplace', label: 'Marketplace', icon: '🛍️' },
  { to: '/battles', label: 'Batalhas', icon: '⚔️' },
  { to: '/live', label: 'Live', icon: '📡' },
  { to: '/settings', label: 'Configurações', icon: '⚙️' },
]

export default function Sidebar() {
  const { user, isAuthenticated } = useAuth()
  const location = useLocation()

  const sidebarStyle = {
    width: '220px', flexShrink: 0,
    position: 'sticky', top: '80px',
    height: 'fit-content',
    background: '#12121a', border: '1px solid #1e1e2e',
    borderRadius: '12px', padding: '16px 0',
    display: 'flex', flexDirection: 'column', gap: '4px',
  }

  const linkStyle = (active) => ({
    display: 'flex', alignItems: 'center', gap: '10px',
    padding: '10px 16px', borderRadius: '8px', margin: '0 8px',
    textDecoration: 'none',
    color: active ? '#f59e0b' : '#94a3b8',
    background: active ? 'rgba(245,158,11,0.1)' : 'transparent',
    fontWeight: active ? 600 : 400, fontSize: '0.9rem',
    transition: 'all 0.2s',
  })

  return (
    <aside style={sidebarStyle}>
      {isAuthenticated && (
        <div style={{ padding: '12px 16px 16px', borderBottom: '1px solid #1e1e2e', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar src={user?.profilePicture} name={user?.name} size="sm" />
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>@{user?.username}</div>
          </div>
        </div>
      )}
      {NAV_LINKS.map((link) => {
        const active = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to))
        return (
          <Link key={link.to} to={link.to} style={linkStyle(active)}
            onMouseEnter={(e) => { if (!active) { e.currentTarget.style.color = '#e2e8f0'; e.currentTarget.style.background = '#1a1a26' } }}
            onMouseLeave={(e) => { if (!active) { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'transparent' } }}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        )
      })}
    </aside>
  )
}
