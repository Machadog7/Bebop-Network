import React from 'react'
import Badge from '../Badge'
import { formatPrice } from '../../../utils/formatters.js'

const typeLabels = {
  equipment: { label: 'Equipamento', color: 'blue' },
  vinyl: { label: 'Vinyl', color: 'purple' },
  'sheet-music': { label: 'Partitura', color: 'green' },
}

const conditionLabels = {
  'like-new': 'Como novo',
  good: 'Bom estado',
  used: 'Usado',
  fair: 'Regular',
}

export default function ProductCard({ product }) {
  if (!product) return null
  const typeInfo = typeLabels[product.type] || { label: product.type, color: 'gray' }

  const cardStyle = {
    background: '#12121a', border: '1px solid #1e1e2e', borderRadius: '12px',
    overflow: 'hidden', transition: 'border-color 0.2s',
    display: 'flex', flexDirection: 'column',
  }

  return (
    <div style={cardStyle}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#f59e0b'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e1e2e'}
    >
      <div style={{ height: '140px', background: '#1a1a26', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
        {product.type === 'equipment' ? '🎸' : product.type === 'vinyl' ? '💿' : '🎼'}
      </div>
      <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
          <Badge label={typeInfo.label} color={typeInfo.color} size="sm" />
          {product.condition && (
            <span style={{ fontSize: '0.72rem', color: '#475569' }}>{conditionLabels[product.condition] || product.condition}</span>
          )}
        </div>
        <h3 style={{ margin: 0, color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.4 }}>{product.title}</h3>
        {product.description && (
          <p style={{ margin: 0, color: '#475569', fontSize: '0.78rem', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {product.description}
          </p>
        )}
        <div style={{ marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid #1e1e2e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 700, color: '#10b981', fontSize: '1rem' }}>{formatPrice(product.price)}</span>
          {product.location && <span style={{ fontSize: '0.75rem', color: '#475569' }}>📍 {product.location.split(',')[0]}</span>}
        </div>
        {product.seller && (
          <div style={{ fontSize: '0.75rem', color: '#475569' }}>Vendedor: {product.seller}</div>
        )}
      </div>
    </div>
  )
}
