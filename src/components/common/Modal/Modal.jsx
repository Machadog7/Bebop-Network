import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

const sizeMap = { sm: '400px', md: '560px', lg: '780px' }

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const overlay = {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.75)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, padding: '16px',
  }
  const box = {
    background: '#12121a',
    border: '1px solid #1e1e2e',
    borderRadius: '16px',
    width: '100%',
    maxWidth: sizeMap[size] || sizeMap.md,
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 8px 40px rgba(0,0,0,0.7)',
  }
  const header = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '20px 24px', borderBottom: '1px solid #1e1e2e',
  }

  return ReactDOM.createPortal(
    <div style={overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div style={box}>
        <div style={header}>
          <h2 style={{ margin: 0, fontSize: '1.15rem', color: '#e2e8f0' }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: '24px' }}>{children}</div>
      </div>
    </div>,
    document.body
  )
}
