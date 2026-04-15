import React from 'react'

export default function Card({ children, className, style = {}, onClick, hoverable = false }) {
  const cardStyle = {
    background: '#12121a',
    border: '1px solid #1e1e2e',
    borderRadius: '12px',
    padding: '20px',
    transition: 'all 0.2s ease',
    ...(hoverable ? { cursor: 'pointer' } : {}),
    ...style,
  }

  return (
    <div
      className={className}
      style={cardStyle}
      onClick={onClick}
      onMouseEnter={hoverable ? (e) => { e.currentTarget.style.borderColor = '#f59e0b'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(245,158,11,0.15)' } : undefined}
      onMouseLeave={hoverable ? (e) => { e.currentTarget.style.borderColor = '#1e1e2e'; e.currentTarget.style.boxShadow = 'none' } : undefined}
    >
      {children}
    </div>
  )
}
