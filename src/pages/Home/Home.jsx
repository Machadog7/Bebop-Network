import React, { useState, useEffect } from 'react'
import PostCard from '../../components/common/PostCard'
import { useFeed } from '../../hooks/useFeed.js'
import { getUsers } from '../../services/localStorage/users.js'
import { getBattles, voteForBattle } from '../../services/localStorage/battles.js'
import { createPost } from '../../services/localStorage/posts.js'
import { useAuth } from '../../hooks/useAuth.js'
import { useApp } from '../../context/AppContext.jsx'
import Avatar from '../../components/common/Avatar'
import Button from '../../components/common/Button'
import Badge from '../../components/common/Badge'

const FILTERS = [
  { key: 'all', label: '📋 Todos' },
  { key: 'text', label: '✍️ Texto' },
  { key: 'monetized', label: '💰 Monetizados' },
]

export default function Home() {
  const [filter, setFilter] = useState('all')
  const { posts, hasMore, loadMore, refresh } = useFeed(filter)
  const [topUsers, setTopUsers] = useState([])
  const [battles, setBattles] = useState([])
  const { user, isAuthenticated } = useAuth()
  const { addNotification } = useApp()
  const [newPost, setNewPost] = useState('')
  const [votedBattles, setVotedBattles] = useState({})

  useEffect(() => {
    const users = getUsers().sort((a, b) => b.ranking - a.ranking)
    setTopUsers(users.slice(0, 4))
    setBattles(getBattles().filter((b) => b.status === 'active').slice(0, 1))
  }, [])

  const handlePost = () => {
    if (!newPost.trim()) return
    if (!isAuthenticated) { addNotification('Faça login para postar', 'error'); return }
    createPost({ userId: user.id, content: newPost.trim(), mediaType: 'text' })
    setNewPost('')
    refresh()
    addNotification('Post publicado com sucesso! 🎵')
  }

  const handleVote = (battleId, side) => {
    if (votedBattles[battleId]) return
    const updated = voteForBattle(battleId, side)
    if (updated) {
      setBattles((prev) => prev.map((b) => b.id === battleId ? updated : b))
      setVotedBattles((v) => ({ ...v, [battleId]: side }))
      addNotification('Voto registrado! ⚔️')
    }
  }

  const highlights = [
    { title: '🎷 Músico da Semana', user: topUsers[0], color: '#f59e0b' },
    { title: '🏆 Músico do Mês', user: topUsers[1], color: '#8b5cf6' },
    { title: '🎵 Top Gênero', user: topUsers[2], color: '#3b82f6' },
    { title: '🎸 Banda do Mês', user: topUsers[3], color: '#10b981' },
  ]

  return (
    <div>
      {/* Highlights */}
      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ color: '#e2e8f0', fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>🌟 Destaques</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
          {highlights.map((h, i) => (
            <div key={i} style={{ background: '#12121a', border: `1px solid ${h.color}30`, borderRadius: '12px', padding: '16px', borderLeft: `4px solid ${h.color}` }}>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '8px' }}>{h.title}</div>
              {h.user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Avatar src={h.user.profilePicture} name={h.user.name} size="sm" />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#e2e8f0' }}>{h.user.name}</div>
                    <div style={{ color: h.color, fontSize: '0.75rem' }}>★ {h.user.ranking}</div>
                  </div>
                </div>
              ) : <div style={{ color: '#475569', fontSize: '0.82rem' }}>—</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Battle Section */}
      {battles.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ color: '#e2e8f0', fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>⚔️ Batalha em Destaque</h2>
          {battles.map((battle) => {
            const total = battle.votesChallenger + battle.votesChallenged || 1
            const pctC = Math.round((battle.votesChallenger / total) * 100)
            const pctD = 100 - pctC
            return (
              <div key={battle.id} style={{ background: '#12121a', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: '4px' }}>{battle.challengerName}</div>
                    <div style={{ color: '#f59e0b', fontSize: '0.85rem', marginBottom: '12px' }}>🎵 {battle.challengerSong}</div>
                    <Button
                      variant={votedBattles[battle.id] === 'challenger' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleVote(battle.id, 'challenger')}
                      disabled={!!votedBattles[battle.id]}
                    >
                      Votar ({battle.votesChallenger})
                    </Button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '1.5rem' }}>⚔️</span>
                    <span style={{ color: '#f59e0b', fontWeight: 800, fontSize: '0.8rem' }}>VS</span>
                    <div style={{ width: '100px', background: '#1e1e2e', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                      <div style={{ width: `${pctC}%`, background: '#f59e0b', height: '100%' }} />
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#475569' }}>{pctC}% · {pctD}%</div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: '4px' }}>{battle.challengedName}</div>
                    <div style={{ color: '#f59e0b', fontSize: '0.85rem', marginBottom: '12px' }}>🎵 {battle.challengedSong}</div>
                    <Button
                      variant={votedBattles[battle.id] === 'challenged' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleVote(battle.id, 'challenged')}
                      disabled={!!votedBattles[battle.id]}
                    >
                      Votar ({battle.votesChallenged})
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </section>
      )}

      {/* Post composer */}
      {isAuthenticated && (
        <div style={{ background: '#12121a', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <Avatar src={user?.profilePicture} name={user?.name} size="sm" />
            <div style={{ flex: 1 }}>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Compartilhe algo com a comunidade musical... 🎵"
                rows={3}
                style={{ width: '100%', background: '#1a1a26', border: '1px solid #1e1e2e', borderRadius: '8px', color: '#e2e8f0', padding: '10px 12px', fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none', resize: 'vertical' }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                <Button onClick={handlePost} size="sm" disabled={!newPost.trim()}>Publicar</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {FILTERS.map((f) => (
          <button key={f.key} onClick={() => setFilter(f.key)} style={{
            padding: '8px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600,
            background: filter === f.key ? '#f59e0b' : '#12121a',
            color: filter === f.key ? '#0a0a0f' : '#94a3b8',
            transition: 'all 0.2s',
          }}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div>
        {posts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#475569' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎵</div>
            <p>Nenhum post ainda. Seja o primeiro!</p>
          </div>
        )}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} user={post.user} onUpdate={refresh} />
        ))}
        {hasMore && (
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Button variant="secondary" onClick={loadMore}>Carregar mais</Button>
          </div>
        )}
      </div>
    </div>
  )
}
