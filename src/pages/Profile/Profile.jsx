import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserByUsername } from '../../services/localStorage/users.js'
import { getPostsByUserId } from '../../services/localStorage/posts.js'
import Avatar from '../../components/common/Avatar'
import Badge from '../../components/common/Badge'
import PostCard from '../../components/common/PostCard'
import Button from '../../components/common/Button'
import { formatNumber } from '../../utils/formatters.js'

const TABS = ['Posts', 'Músicas', 'Equipamentos']

export default function Profile() {
  const { username } = useParams()
  const [musician, setMusician] = useState(null)
  const [posts, setPosts] = useState([])
  const [tab, setTab] = useState('Posts')
  const [following, setFollowing] = useState(false)

  useEffect(() => {
    const found = getUserByUsername(username)
    setMusician(found)
    if (found) setPosts(getPostsByUserId(found.id))
  }, [username])

  if (!musician) return (
    <div style={{ textAlign: 'center', padding: '80px 20px', color: '#475569' }}>
      <div style={{ fontSize: '4rem' }}>🎸</div>
      <h2 style={{ color: '#e2e8f0', margin: '16px 0 8px' }}>Músico não encontrado</h2>
      <p>O perfil @{username} não existe ou foi removido.</p>
    </div>
  )

  const rankColor = musician.ranking >= 80 ? 'gold' : musician.ranking >= 50 ? 'blue' : 'gray'
  const levelProgress = ((musician.level % 1 || 0.6) * 100)

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      {/* Cover */}
      <div style={{ height: '180px', background: musician.coverPicture ? `url(${musician.coverPicture}) center/cover` : 'linear-gradient(135deg, #1a1a26 0%, #0d0d1a 50%, #1a0d1a 100%)', borderRadius: '16px', marginBottom: '-50px', position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '16px', border: '1px solid #1e1e2e' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', borderRadius: '16px' }} />
        <div style={{ position: 'relative', fontSize: '3rem', opacity: 0.3 }}>🎷🎸🥁🎹</div>
      </div>

      {/* Profile Header */}
      <div style={{ background: '#12121a', border: '1px solid #1e1e2e', borderRadius: '16px', padding: '20px 24px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div style={{ marginTop: '-60px' }}>
            <div style={{ border: '4px solid #12121a', borderRadius: '50%', display: 'inline-block' }}>
              <Avatar src={musician.profilePicture} name={musician.name} size="xl" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <Badge label={`★ ${musician.ranking}`} color={rankColor} />
            <Button variant={following ? 'secondary' : 'primary'} size="sm" onClick={() => setFollowing((f) => !f)}>
              {following ? '✓ Seguindo' : '+ Seguir'}
            </Button>
          </div>
        </div>

        <h1 style={{ margin: '0 0 4px', color: '#e2e8f0', fontSize: '1.4rem' }}>{musician.name}</h1>
        <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '4px' }}>@{musician.username}</div>
        {musician.location && <div style={{ color: '#475569', fontSize: '0.82rem', marginBottom: '12px' }}>📍 {musician.location}</div>}
        {musician.bio && <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '16px' }}>{musician.bio}</p>}

        {/* Genre Tags */}
        {musician.genre?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
            {musician.genre.map((g) => (
              <span key={g} style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', fontSize: '0.78rem', padding: '3px 10px', borderRadius: '20px', border: '1px solid rgba(245,158,11,0.2)' }}>{g}</span>
            ))}
          </div>
        )}

        {/* Level Progress */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Nível {musician.level || 1}</span>
            <span style={{ fontSize: '0.75rem', color: '#475569' }}>{Math.round(levelProgress)}% para Lv.{(musician.level || 1) + 1}</span>
          </div>
          <div style={{ background: '#1e1e2e', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
            <div style={{ width: `${levelProgress}%`, background: 'linear-gradient(90deg, #f59e0b, #fcd34d)', height: '100%', borderRadius: '4px', transition: 'width 0.5s ease' }} />
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '24px', paddingTop: '16px', borderTop: '1px solid #1e1e2e' }}>
          {[
            { label: 'Seguidores', value: formatNumber(musician.followers || 0) },
            { label: 'Seguindo', value: formatNumber(musician.following || 0) },
            { label: 'Posts', value: posts.length },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#e2e8f0' }}>{stat.value}</div>
              <div style={{ color: '#475569', fontSize: '0.75rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0', marginTop: '16px', background: '#12121a', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '4px', marginBottom: '16px' }}>
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: '10px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600, transition: 'all 0.2s',
            background: tab === t ? '#f59e0b' : 'transparent',
            color: tab === t ? '#0a0a0f' : '#94a3b8',
          }}>{t}</button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'Posts' && (
        <div>
          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#475569' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📭</div>
              <p>Nenhum post ainda</p>
            </div>
          ) : posts.map((post) => (
            <PostCard key={post.id} post={post} user={musician} />
          ))}
        </div>
      )}

      {tab === 'Músicas' && (
        <div style={{ background: '#12121a', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ color: '#e2e8f0', marginBottom: '16px', fontSize: '1rem' }}>Repertório</h3>
          {musician.songs?.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {musician.songs.map((song, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: '#1a1a26', borderRadius: '8px' }}>
                  <span style={{ color: '#f59e0b', fontWeight: 700, fontSize: '0.85rem', minWidth: '24px' }}>{i + 1}</span>
                  <span style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>🎵 {song}</span>
                </div>
              ))}
            </div>
          ) : <p style={{ color: '#475569' }}>Nenhuma música adicionada</p>}

          <div style={{ marginTop: '20px' }}>
            <h3 style={{ color: '#e2e8f0', marginBottom: '12px', fontSize: '1rem' }}>Instrumentos</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {musician.instruments?.map((inst) => (
                <span key={inst} style={{ background: '#1a1a26', border: '1px solid #22223a', color: '#94a3b8', padding: '6px 14px', borderRadius: '8px', fontSize: '0.85rem' }}>🎸 {inst}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'Equipamentos' && (
        <div style={{ background: '#12121a', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '20px' }}>
          <p style={{ color: '#475569', textAlign: 'center', padding: '20px' }}>Nenhum equipamento listado ainda</p>
        </div>
      )}
    </div>
  )
}
