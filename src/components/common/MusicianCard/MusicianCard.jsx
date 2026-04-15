import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../Avatar'
import Badge from '../Badge'
import Button from '../Button'
import { formatNumber } from '../../../utils/formatters.js'

export default function MusicianCard({ musician }) {
  const [following, setFollowing] = useState(false)
  if (!musician) return null

  const cardStyle = {
    background: '#12121a', border: '1px solid #1e1e2e', borderRadius: '12px',
    padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px',
    transition: 'border-color 0.2s',
  }

  const rankColor = musician.ranking >= 80 ? 'gold' : musician.ranking >= 50 ? 'blue' : 'gray'

  return (
    <div style={cardStyle}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#f59e0b'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e1e2e'}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <Link to={`/profile/${musician.username}`}>
          <Avatar src={musician.profilePicture} name={musician.name} size="lg" />
        </Link>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Link to={`/profile/${musician.username}`} style={{ color: '#e2e8f0', fontWeight: 700, textDecoration: 'none', fontSize: '1rem', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {musician.name}
          </Link>
          <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>@{musician.username}</span>
          {musician.location && <div style={{ color: '#475569', fontSize: '0.78rem', marginTop: '2px' }}>📍 {musician.location}</div>}
        </div>
        <Badge label={`★ ${musician.ranking}`} color={rankColor} size="sm" />
      </div>

      {musician.bio && (
        <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: 0, lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {musician.bio}
        </p>
      )}

      {musician.instruments?.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {musician.instruments.map((inst) => (
            <span key={inst} style={{ background: '#1a1a26', border: '1px solid #22223a', color: '#94a3b8', fontSize: '0.75rem', padding: '3px 8px', borderRadius: '6px' }}>
              🎸 {inst}
            </span>
          ))}
        </div>
      )}

      {musician.genre?.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {musician.genre.slice(0, 3).map((g) => (
            <span key={g} style={{ background: 'rgba(245,158,11,0.08)', color: '#f59e0b', fontSize: '0.73rem', padding: '2px 8px', borderRadius: '4px' }}>
              {g}
            </span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid #1e1e2e' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '0.9rem' }}>{formatNumber(musician.followers || 0)}</div>
            <div style={{ color: '#475569', fontSize: '0.72rem' }}>seguidores</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '0.9rem' }}>Lv.{musician.level || 1}</div>
            <div style={{ color: '#475569', fontSize: '0.72rem' }}>nível</div>
          </div>
        </div>
        <Button
          variant={following ? 'secondary' : 'primary'}
          size="sm"
          onClick={() => setFollowing((f) => !f)}
        >
          {following ? 'Seguindo' : '+ Seguir'}
        </Button>
      </div>
    </div>
  )
}
