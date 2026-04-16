import React, { useState, useEffect } from 'react'
import { getLives, createLive } from '../../services/localStorage/lives.js'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import Input from '../../components/common/Input'
import Avatar from '../../components/common/Avatar'
import Badge from '../../components/common/Badge'
import { useAuth } from '../../hooks/useAuth.js'
import { useApp } from '../../context/AppContext.jsx'
import { formatDate, formatNumber } from '../../utils/formatters.js'
import { getUsers } from '../../services/localStorage/users.js'

export default function Live() {
  const [lives, setLives] = useState([])
  const [modal, setModal] = useState(false)
  const { isAuthenticated, user } = useAuth()
  const { addNotification } = useApp()
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({ title: '', description: '', scheduledFor: '', genre: '' })

  useEffect(() => {
    setLives(getLives())
    setUsers(getUsers())
  }, [])

  const livesNow = lives.filter((l) => l.isLive)
  const scheduled = lives.filter((l) => !l.isLive)

  const handleCreate = () => {
    if (!isAuthenticated) { addNotification('Faça login para agendar uma live', 'error'); return }
    if (!form.title || !form.scheduledFor) { addNotification('Preencha título e data/hora', 'error'); return }
    const live = createLive({
      ...form,
      hostId: user.id,
      hostName: user.name,
      genre: form.genre ? form.genre.split(',').map((g) => g.trim()) : [],
      scheduledFor: new Date(form.scheduledFor).getTime(),
    })
    setLives((prev) => [live, ...prev])
    setModal(false)
    setForm({ title: '', description: '', scheduledFor: '', genre: '' })
    addNotification('Live agendada com sucesso! 📡')
  }

  const getHost = (hostId) => users.find((u) => u.id === hostId)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ color: '#e2e8f0', fontSize: '1.4rem' }}>📡 Lives</h1>
        {isAuthenticated && <Button onClick={() => setModal(true)}>+ Agendar Live</Button>}
      </div>

      {/* Live Now */}
      {livesNow.length > 0 && (
        <section style={{ marginBottom: '28px' }}>
          <h2 style={{ color: '#e2e8f0', fontSize: '1rem', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-block', width: '10px', height: '10px', background: '#ef4444', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
            Ao Vivo Agora
          </h2>
          <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {livesNow.map((live) => {
              const host = getHost(live.hostId)
              return (
                <div key={live.id} style={{ background: '#12121a', border: '2px solid #ef4444', borderRadius: '14px', padding: '20px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#ef4444', color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px', borderRadius: '20px' }}>🔴 AO VIVO</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <Avatar src={host?.profilePicture} name={live.hostName} size="md" />
                    <div>
                      <div style={{ fontWeight: 700, color: '#e2e8f0' }}>{live.hostName}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>👁 {formatNumber(live.viewers)} assistindo</div>
                    </div>
                  </div>
                  <h3 style={{ color: '#e2e8f0', fontSize: '1rem', marginBottom: '8px' }}>{live.title}</h3>
                  {live.description && <p style={{ color: '#94a3b8', fontSize: '0.83rem', lineHeight: 1.5, marginBottom: '12px' }}>{live.description}</p>}
                  {live.genre?.length > 0 && (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {live.genre.map((g) => <Badge key={g} label={g} color="red" size="sm" />)}
                    </div>
                  )}
                  <button style={{ marginTop: '14px', width: '100%', background: '#ef4444', border: 'none', borderRadius: '8px', color: '#fff', padding: '10px', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem' }}>
                    Assistir Agora
                  </button>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Scheduled */}
      <section>
        <h2 style={{ color: '#e2e8f0', fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>📅 Lives Agendadas</h2>
        {scheduled.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 20px', color: '#475569' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📡</div>
            <p>Nenhuma live agendada</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {scheduled.map((live) => {
              const host = getHost(live.hostId)
              const schedDate = new Date(live.scheduledFor)
              const dateStr = schedDate.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })
              const timeStr = schedDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

              return (
                <div key={live.id} style={{ background: '#12121a', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '16px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Avatar src={host?.profilePicture} name={live.hostName} size="md" />
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <h3 style={{ color: '#e2e8f0', fontSize: '0.95rem', margin: '0 0 4px' }}>{live.title}</h3>
                    <div style={{ color: '#94a3b8', fontSize: '0.82rem' }}>por {live.hostName}</div>
                    {live.description && <p style={{ color: '#475569', fontSize: '0.78rem', margin: '4px 0 0', lineHeight: 1.4 }}>{live.description}</p>}
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ color: '#f59e0b', fontWeight: 600, fontSize: '0.88rem' }}>📅 {dateStr}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.82rem' }}>🕐 {timeStr}</div>
                    {live.genre?.length > 0 && (
                      <div style={{ display: 'flex', gap: '4px', marginTop: '6px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                        {live.genre.map((g) => <Badge key={g} label={g} color="blue" size="sm" />)}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="📡 Agendar Live">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Input label="Título da Live" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Ex: Jazz ao Vivo" fullWidth />
          <Input label="Data e Hora" type="datetime-local" value={form.scheduledFor} onChange={(e) => setForm((f) => ({ ...f, scheduledFor: e.target.value }))} fullWidth />
          <Input label="Gêneros (separados por vírgula)" value={form.genre} onChange={(e) => setForm((f) => ({ ...f, genre: e.target.value }))} placeholder="Ex: Jazz, Blues" fullWidth />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>Descrição</label>
            <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Sobre o que será sua live..." rows={3} style={{ background: '#1a1a26', border: '1.5px solid #1e1e2e', borderRadius: '8px', color: '#e2e8f0', padding: '10px 12px', fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none', resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setModal(false)}>Cancelar</Button>
            <Button onClick={handleCreate}>Agendar Live 📡</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
