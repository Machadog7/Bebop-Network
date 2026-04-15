import React from 'react'

export default function Input({ label, value, onChange, placeholder, type = 'text', error, fullWidth = false, icon, style: extraStyle = {} }) {
  const wrapper = { display: 'flex', flexDirection: 'column', gap: '6px', ...(fullWidth ? { width: '100%' } : {}) }
  const labelStyle = { fontSize: '0.85rem', fontWeight: 500, color: '#94a3b8' }
  const inputWrapper = { position: 'relative', display: 'flex', alignItems: 'center' }
  const inputStyle = {
    width: '100%', background: '#1a1a26', border: `1.5px solid ${error ? '#ef4444' : '#1e1e2e'}`,
    borderRadius: '8px', color: '#e2e8f0', fontSize: '0.9rem',
    padding: icon ? '10px 12px 10px 38px' : '10px 12px',
    outline: 'none', fontFamily: 'inherit',
    transition: 'border-color 0.2s',
    ...extraStyle,
  }
  const iconStyle = { position: 'absolute', left: '12px', color: '#475569', fontSize: '1rem' }
  const errorStyle = { fontSize: '0.78rem', color: '#ef4444' }

  return (
    <div style={wrapper}>
      {label && <label style={labelStyle}>{label}</label>}
      <div style={inputWrapper}>
        {icon && <span style={iconStyle}>{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={inputStyle}
          onFocus={(e) => { e.target.style.borderColor = error ? '#ef4444' : '#f59e0b' }}
          onBlur={(e) => { e.target.style.borderColor = error ? '#ef4444' : '#1e1e2e' }}
        />
      </div>
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  )
}
