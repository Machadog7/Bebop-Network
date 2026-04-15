import React from 'react'

const colorMap = {
  gold: { background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' },
  green: { background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)' },
  blue: { background: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)' },
  purple: { background: 'rgba(139,92,246,0.15)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.3)' },
  red: { background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' },
  gray: { background: 'rgba(148,163,184,0.15)', color: '#94a3b8', border: '1px solid rgba(148,163,184,0.3)' },
}

const sizeMap = {
  sm: { fontSize: '0.7rem', padding: '2px 8px' },
  md: { fontSize: '0.8rem', padding: '4px 10px' },
  lg: { fontSize: '0.9rem', padding: '6px 14px' },
}

export default function Badge({ label, color = 'gold', size = 'md' }) {
  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '20px',
    fontWeight: 600,
    ...(colorMap[color] || colorMap.gold),
    ...(sizeMap[size] || sizeMap.md),
  }
  return <span style={style}>{label}</span>
}
