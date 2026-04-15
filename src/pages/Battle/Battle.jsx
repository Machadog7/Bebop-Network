import React, { useState, useEffect } from 'react'
import { getBattles, createBattle, voteForBattle } from '../../services/localStorage/battles.js'
import { getUsers } from '../../services/localStorage/users.js'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import Input from '../../components/common/Input'
import Avatar from '../../components/common/Avatar'
import { useAuth } from '../../hooks/useAuth.js'
import { useApp } from '../../context/AppContext.jsx'
import { formatDate } from '../../utils/formatters.js'

export default function Battle() {
  const [battles, setBattles] = useState([])
  const [users, setUsers] = useState([])
  const [modal, setModal] = useState(false)
  const [voted, setVoted] = useState({})
  const { isAuthenticated, user } = useAuth()
  const { addNotification } = useApp()
  const [form, setForm] = useState({ challengedId: '', challengedSong: '', challengerSong: '' })

  useEffect(() => {
    setBattles(getBattles())
    setUsers(getUsers())
  }, [])

  const handleVote = (battleId, side) => {
    if (voted[battleId]) { addNotification('Você já votou nessa batalha', 'error'); return }
    const updated = voteForBattle(battleId, side)
    if (updated) {
      setBattles((prev) => prev.map((b) => b.id === battleId ? updated : b))
      setVoted((v) => ({ ...v, [battleId]: side }))
      addNotification('Voto registrado! ⚔️')
    }
  }

  const handleCreate = () => {
    if (!isAuthenticated) { addNotification('Faça login para criar uma batalha', 'error'); return }
    if (!form.challengedId || !form.challengerSong || !form.challengedSong) {
      addNotification('Preencha todos os campos', 'error'); return
    }
    const challenged = users.find((u) => u.id === form.challengedId)
    const battle = createBattle({
      challengerId: user.id,
      challengerName: user.name,
      challengerSong: form.challengerSong,
      challengedId: form.challengedId,
      challengedName: challenged?.name || '',
      challengedSong: form.challengedSong,
    })
    setBattles((prev) => [battle, ...prev])
    setModal(false)
    setForm({ challengedId: '', challengedSong: '', challengerSong: '' })
    addNotification('Batalha criada! ⚔️')
  }

  const getUserInfo = (id) => users.find((u) => u.id === id)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ color: '#e2e8f0', fontSize: '1.4rem' }}>⚔️ Batalhas Musicais</h1>
        {isAuthenticated && <Button onClick={() => setModal(true)}>+ Criar Batalha</Button>}
      </div>

      {battles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#475569' }}>
          <div style={{ fontSize: '4rem', marginBottom: '12px' }}>⚔️</div>
          <p>Nenhuma batalha ativa no momento</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {battles.map((b) => {
            const total = (b.votesChallenger + b.votesChallenged) || 1
            const pctC = Math.round((b.votesChallenger / total) * 100)
            const pctD = 100 - pctC
            const cUser = getUserInfo(b.challengerId)
            const dUser = getUserInfo(b.challengedId)

            return (
              <div key={b.id} style={{ background: '#12121a', border: '1px solid #1e1e2e', borderRadius: '16px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                  <span style={{ background: b.status === 'active' ? 'rgba(16,185,129,0.15)' : 'rgba(148,163,184,0.1)', color: b.status === 'active' ? '#10b981' : '#94a3b8', padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 600 }}>
                    {b.status === 'active' ? '🟢 Ativa' : '⚫ Encerrada'}
                  </span>
                  <span style={{ color: '#475569', fontSize: '0.8rem' }}>Criada {formatDate(b.createdAt)}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '16px', alignItems: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <Avatar src={cUser?.profilePicture} name={b.challengerName} size="md" />
                    <div style={{ fontWeight: 700, color: '#e2e8f0', marginTop: '8px', fontSize: '1rem' }}>{b.challengerName}</div>
                    <div style={{ color: '#f59e0b', fontSize: '0.85rem', margin: '4px 0 12px' }}>🎵 {b.challengerSong}</div>
                    <div style={{ fontWeight: 700, fontSize: '1.4rem', color: '#e2e8f0', marginBottom: '8px' }}>{b.votesChallenger} <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>votos</span></div>
                    <Button
                      size="sm"
                      variant={voted[b.id] === 'challenger' ? 'primary' : 'outline'}
                      onClick={() => handleVote(b.id, 'challenger')}
                      disabled={!!voted[b.id]}
                    >
                      {voted[b.id] === 'challenger' ? '✓ Votado' : 'Votar'}
                    </Button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '2rem' }}>⚔️</span>
                    <span style={{ fontWeight: 900, color: '#f59e0b', fontSize: '1rem' }}>VS</span>
                    <div style={{ width: '80px' }}>
                      <div style={{ background: '#1e1e2e', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                        <div style={{ width: `${pctC}%`, background: 'linear-gradient(90deg, #f59e0b, #fcd34d)', height: '100%' }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#475569', marginTop: '2px' }}>
                        <span>{pctC}%</span><span>{pctD}%</span>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#475569' }}>{total} votos</div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <Avatar src={dUser?.profilePicture} name={b.challengedName} size="md" />
                    <div style={{ fontWeight: 700, color: '#e2e8f0', marginTop: '8px', fontSize: '1rem' }}>{b.challengedName}</div>
                    <div style={{ color: '#f59e0b', fontSize: '0.85rem', margin: '4px 0 12px' }}>🎵 {b.challengedSong}</div>
                    <div style={{ fontWeight: 700, fontSize: '1.4rem', color: '#e2e8f0', marginBottom: '8px' }}>{b.votesChallenged} <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>votos</span></div>
                    <Button
                      size="sm"
                      variant={voted[b.id] === 'challenged' ? 'primary' : 'outline'}
                      onClick={() => handleVote(b.id, 'challenged')}
                      disabled={!!voted[b.id]}
                    >
                      {voted[b.id] === 'challenged' ? '✓ Votado' : 'Votar'}
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <Modal isOpen={modal} onClose={() => setModal(false)} title="⚔️ Criar Batalha Musical">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ background: '#1a1a26', borderRadius: '10px', padding: '14px' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '6px' }}>Você (Desafiante)</div>
            <Input label="Sua música" value={form.challengerSong} onChange={(e) => setForm((f) => ({ ...f, challengerSong: e.target.value }))} placeholder="Nome da música que você interpreta" fullWidth />
          </div>
          <div style={{ background: '#1a1a26', borderRadius: '10px', padding: '14px' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '10px' }}>Adversário</div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Escolher músico</label>
              <select
                value={form.challengedId}
                onChange={(e) => setForm((f) => ({ ...f, challengedId: e.target.value }))}
                style={{ width: '100%', background: '#12121a', border: '1.5px solid #1e1e2e', borderRadius: '8px', color: '#e2e8f0', padding: '10px 12px', fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none' }}
              >
                <option value="">Selecionar adversário</option>
                {users.filter((u) => u.id !== user?.id).map((u) => (
                  <option key={u.id} value={u.id}>{u.name} (@{u.username})</option>
                ))}
              </select>
            </div>
            <Input label="Música do adversário" value={form.challengedSong} onChange={(e) => setForm((f) => ({ ...f, challengedSong: e.target.value }))} placeholder="Nome da música do adversário" fullWidth />
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setModal(false)}>Cancelar</Button>
            <Button onClick={handleCreate}>Criar Batalha ⚔️</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
