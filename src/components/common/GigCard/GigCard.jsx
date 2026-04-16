import React from 'react'
import Badge from '../Badge'

export default function GigCard({ gig, venue }) {
  if (!gig) return null

  const venueName = venue?.name || gig.venueName || 'Local a definir'
  const venueCity = venue?.city || ''

  const cardStyle = {
    background: '#12121a', border: '1px solid #1e1e2e', borderRadius: '12px',
    padding: '16px', transition: 'border-color 0.2s', cursor: 'default',
  }

  const dateObj = gig.date ? new Date(gig.date + 'T' + (gig.time || '00:00')) : null
  const dateStr = dateObj ? dateObj.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' }) : gig.date || '—'
  const timeStr = gig.time || ''

  return (
    <div style={cardStyle}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#f59e0b'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e1e2e'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
        <div>
          <h3 style={{ margin: 0, color: '#e2e8f0', fontSize: '1rem', fontWeight: 700 }}>{gig.title}</h3>
          <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginTop: '4px' }}>🏛️ {venueName}{venueCity ? ` · ${venueCity}` : ''}</div>
        </div>
        {gig.price > 0 && (
          <span style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '6px', padding: '4px 10px', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
            R$ {Number(gig.price).toFixed(2).replace('.', ',')}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '10px' }}>
        <span>📅 {dateStr}</span>
        {timeStr && <span>🕐 {timeStr}</span>}
      </div>

      {gig.musicians?.length > 0 && (
        <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '8px' }}>
          🎵 {gig.musicians.join(', ')}
        </div>
      )}

      {gig.genre?.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {gig.genre.map((g) => (
            <Badge key={g} label={g} color="purple" size="sm" />
          ))}
        </div>
      )}
    </div>
  )
}
