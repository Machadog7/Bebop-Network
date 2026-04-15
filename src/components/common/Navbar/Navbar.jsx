import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from '../Avatar'
import { useAuth } from '../../../hooks/useAuth.js'
import { useApp } from '../../../context/AppContext.jsx'

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const { notifications, clearNotifications } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const navigate = useNavigate()

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, height: '64px',
    background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(10px)',
    borderBottom: '1px solid #1e1e2e',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 24px', zIndex: 100,
  }

  const logoStyle = {
    display: 'flex', alignItems: 'center', gap: '10px',
    fontSize: '1.2rem', fontWeight: 800, color: '#f59e0b',
    textDecoration: 'none',
  }

  const navLinks = [
    { to: '/', label: '🎵 Feed' },
    { to: '/musicians', label: '👥 Músicos' },
    { to: '/gigs', label: '🎤 Shows' },
    { to: '/marketplace', label: '🛍️ Mercado' },
    { to: '/battles', label: '⚔️ Batalhas' },
    { to: '/live', label: '📡 Live' },
  ]

  const linkStyle = {
    color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem',
    fontWeight: 500, padding: '6px 10px', borderRadius: '8px',
    transition: 'all 0.2s',
  }

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>
        <span>🎷</span>
        <span>Bebop Network</span>
      </Link>

      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }} className="hide-mobile">
        {navLinks.map((l) => (
          <Link
            key={l.to} to={l.to} style={linkStyle}
            onMouseEnter={(e) => { e.target.style.color = '#f59e0b'; e.target.style.background = 'rgba(245,158,11,0.1)' }}
            onMouseLeave={(e) => { e.target.style.color = '#94a3b8'; e.target.style.background = 'transparent' }}
          >{l.label}</Link>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {isAuthenticated ? (
          <>
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setNotifOpen((o) => !o)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.2rem', cursor: 'pointer', position: 'relative' }}
              >
                🔔
                {notifications.length > 0 && (
                  <span style={{ position: 'absolute', top: -2, right: -4, background: '#ef4444', color: '#fff', borderRadius: '50%', width: '16px', height: '16px', fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {notifications.length}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div style={{ position: 'absolute', right: 0, top: '36px', background: '#12121a', border: '1px solid #1e1e2e', borderRadius: '12px', minWidth: '260px', maxHeight: '320px', overflowY: 'auto', boxShadow: '0 8px 32px rgba(0,0,0,0.6)', zIndex: 200 }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #1e1e2e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Notificações</span>
                    {notifications.length > 0 && <button onClick={clearNotifications} style={{ background: 'none', border: 'none', color: '#f59e0b', cursor: 'pointer', fontSize: '0.8rem' }}>Limpar</button>}
                  </div>
                  {notifications.length === 0
                    ? <p style={{ padding: '16px', color: '#475569', fontSize: '0.85rem', textAlign: 'center' }}>Nenhuma notificação</p>
                    : notifications.map((n) => (
                        <div key={n.id} style={{ padding: '12px 16px', borderBottom: '1px solid #1e1e2e', fontSize: '0.85rem', color: '#e2e8f0' }}>{n.msg}</div>
                      ))
                  }
                </div>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ cursor: 'pointer' }} onClick={() => setMenuOpen((o) => !o)}>
                <Avatar src={user?.profilePicture} name={user?.name} size="sm" />
              </div>
              {menuOpen && (
                <div style={{ position: 'absolute', right: 0, top: '44px', background: '#12121a', border: '1px solid #1e1e2e', borderRadius: '12px', minWidth: '180px', boxShadow: '0 8px 32px rgba(0,0,0,0.6)', zIndex: 200 }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #1e1e2e' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user?.name}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>@{user?.username}</div>
                  </div>
                  {[
                    { label: '👤 Meu Perfil', action: () => { navigate(`/profile/${user?.username}`); setMenuOpen(false) } },
                    { label: '⚙️ Configurações', action: () => { navigate('/settings'); setMenuOpen(false) } },
                    { label: '🚪 Sair', action: () => { logout(); setMenuOpen(false) } },
                  ].map((item) => (
                    <button key={item.label} onClick={item.action} style={{ width: '100%', padding: '12px 16px', background: 'none', border: 'none', color: '#e2e8f0', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem', transition: 'background 0.2s' }}
                      onMouseEnter={(e) => e.target.style.background = '#1a1a26'}
                      onMouseLeave={(e) => e.target.style.background = 'none'}
                    >{item.label}</button>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Link to="/login" style={{ padding: '8px 16px', background: 'transparent', border: '1.5px solid #f59e0b', color: '#f59e0b', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>Entrar</Link>
            <Link to="/register" style={{ padding: '8px 16px', background: '#f59e0b', color: '#0a0a0f', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>Cadastrar</Link>
          </div>
        )}

        <button
          className="hide-desktop"
          onClick={() => setMenuOpen((o) => !o)}
          style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.4rem', cursor: 'pointer', display: 'none' }}
        >☰</button>
      </div>
    </nav>
  )
}
