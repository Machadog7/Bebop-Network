import React from 'react'

const base = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  fontFamily: 'inherit',
  fontWeight: 600,
  cursor: 'pointer',
  border: 'none',
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  textDecoration: 'none',
}

const variants = {
  primary: { background: '#f59e0b', color: '#0a0a0f' },
  secondary: { background: '#22223a', color: '#e2e8f0' },
  outline: { background: 'transparent', color: '#f59e0b', border: '1.5px solid #f59e0b' },
  danger: { background: '#ef4444', color: '#fff' },
  ghost: { background: 'transparent', color: '#94a3b8' },
}

const sizes = {
  sm: { padding: '6px 14px', fontSize: '0.8rem' },
  md: { padding: '10px 20px', fontSize: '0.9rem' },
  lg: { padding: '14px 28px', fontSize: '1rem' },
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  type = 'button',
  style: extraStyle = {},
}) {
  const styles = {
    ...base,
    ...variants[variant] || variants.primary,
    ...sizes[size] || sizes.md,
    ...(fullWidth ? { width: '100%' } : {}),
    ...(disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}),
    ...extraStyle,
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} style={styles}>
      {children}
    </button>
  )
}
