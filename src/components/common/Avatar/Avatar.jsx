import React from 'react'
import { getInitials } from '../../../utils/formatters.js'

const sizeMap = {
  xs: { width: 24, height: 24, fontSize: '0.6rem' },
  sm: { width: 36, height: 36, fontSize: '0.75rem' },
  md: { width: 48, height: 48, fontSize: '1rem' },
  lg: { width: 72, height: 72, fontSize: '1.4rem' },
  xl: { width: 96, height: 96, fontSize: '1.8rem' },
}

export default function Avatar({ src, name, size = 'md', onClick }) {
  const dim = sizeMap[size] || sizeMap.md
  const style = {
    ...dim,
    borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: (src && /^https?:\/\//i.test(src)) ? 'transparent' : '#22223a',
    color: '#f59e0b',
    fontWeight: 700,
    overflow: 'hidden',
    flexShrink: 0,
    border: '2px solid #1e1e2e',
    cursor: onClick ? 'pointer' : 'default',
    userSelect: 'none',
  }

  // Only allow http/https URLs to prevent javascript: XSS
  const safeSrc = src && /^https?:\/\//i.test(src) ? src : null

  return (
    <div style={style} onClick={onClick}>
      {safeSrc
        ? <img src={safeSrc} alt="User avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} referrerPolicy="no-referrer" />
        : <span style={{ fontSize: dim.fontSize }}>{getInitials(name)}</span>
      }
    </div>
  )
}
