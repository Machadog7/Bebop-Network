import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth.js'
import { useApp } from '../../context/AppContext.jsx'
import { updateUser } from '../../services/localStorage/users.js'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import Avatar from '../../components/common/Avatar'
import { useNavigate } from 'react-router-dom'

const INSTRUMENTS = ['guitar', 'bass', 'drums', 'piano', 'saxophone', 'violin', 'vocals', 'trumpet', 'flute', 'cello', 'percussion', 'viola']

export default function Settings() {
  const { user, isAuthenticated, updateSession, logout } = useAuth()
  const { theme, toggleTheme, addNotification } = useApp()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    location: user?.location || '',
    profilePicture: user?.profilePicture || '',
  })
  const [instruments, setInstruments] = useState(user?.instruments || [])
  const [saving, setSaving] = useState(false)

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', color: '#475569' }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🔒</div>
        <h2 style={{ color: '#e2e8f0', marginBottom: '12px' }}>Acesso restrito</h2>
        <p style={{ marginBottom: '20px' }}>Faça login para acessar as configurações.</p>
        <Button onClick={() => navigate('/login')}>Fazer Login</Button>
      </div>
    )
  }

  const handleSave = () => {
    setSaving(true)
    const updated = updateUser(user.id, { ...form, instruments })
    if (updated) {
      updateSession({ ...form, instruments })
      addNotification('Perfil atualizado com sucesso! ✨')
    }
    setSaving(false)
  }

  const toggleInstrument = (inst) => {
    setInstruments((prev) =>
      prev.includes(inst) ? prev.filter((i) => i !== inst) : [...prev, inst]
    )
  }

  const sectionStyle = {
    background: '#12121a', border: '1px solid #1e1e2e', borderRadius: '14px',
    padding: '24px', marginBottom: '20px',
  }

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
      <h1 style={{ color: '#e2e8f0', fontSize: '1.4rem', marginBottom: '24px' }}>⚙️ Configurações</h1>

      {/* Profile section */}
      <div style={sectionStyle}>
        <h2 style={{ color: '#e2e8f0', fontSize: '1rem', marginBottom: '20px' }}>👤 Informações do Perfil</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <Avatar src={form.profilePicture || user?.profilePicture} name={user?.name} size="xl" />
          <div style={{ flex: 1 }}>
            <div style={{ color: '#e2e8f0', fontWeight: 600 }}>{user?.name}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>@{user?.username}</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Input label="Nome completo" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Seu nome" fullWidth />
          <Input label="URL da foto de perfil" value={form.profilePicture} onChange={(e) => setForm((f) => ({ ...f, profilePicture: e.target.value }))} placeholder="https://..." fullWidth />
          <Input label="Localização" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} placeholder="Cidade, Estado" fullWidth />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>Bio</label>
            <textarea
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              placeholder="Conte um pouco sobre você..."
              rows={4}
              style={{ background: '#1a1a26', border: '1.5px solid #1e1e2e', borderRadius: '8px', color: '#e2e8f0', padding: '10px 12px', fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none', resize: 'vertical' }}
            />
          </div>
        </div>
      </div>

      {/* Instruments */}
      <div style={sectionStyle}>
        <h2 style={{ color: '#e2e8f0', fontSize: '1rem', marginBottom: '16px' }}>🎸 Instrumentos</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {INSTRUMENTS.map((inst) => {
            const selected = instruments.includes(inst)
            return (
              <button key={inst} onClick={() => toggleInstrument(inst)} style={{
                padding: '7px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500,
                background: selected ? 'rgba(245,158,11,0.15)' : '#1a1a26',
                color: selected ? '#f59e0b' : '#94a3b8',
                border: selected ? '1.5px solid rgba(245,158,11,0.4)' : '1.5px solid #1e1e2e',
                transition: 'all 0.2s',
              }}>
                {selected ? '✓ ' : ''}{inst}
              </button>
            )
          })}
        </div>
      </div>

      {/* Theme */}
      <div style={sectionStyle}>
        <h2 style={{ color: '#e2e8f0', fontSize: '1rem', marginBottom: '16px' }}>🎨 Aparência</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ color: '#e2e8f0', fontWeight: 500 }}>Tema {theme === 'dark' ? 'Escuro' : 'Claro'}</div>
            <div style={{ color: '#475569', fontSize: '0.82rem' }}>Atualmente: {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}</div>
          </div>
          <button onClick={toggleTheme} style={{
            background: theme === 'dark' ? '#1a1a26' : '#f59e0b',
            border: '1.5px solid #1e1e2e', borderRadius: '20px', width: '52px', height: '28px',
            cursor: 'pointer', position: 'relative', transition: 'all 0.3s',
          }}>
            <span style={{
              position: 'absolute', top: '3px',
              left: theme === 'dark' ? '4px' : '24px',
              width: '20px', height: '20px', borderRadius: '50%',
              background: theme === 'dark' ? '#475569' : '#0a0a0f',
              transition: 'left 0.3s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem',
            }}>
              {theme === 'dark' ? '🌙' : '☀️'}
            </span>
          </button>
        </div>
      </div>

      {/* Account info */}
      <div style={sectionStyle}>
        <h2 style={{ color: '#e2e8f0', fontSize: '1rem', marginBottom: '16px' }}>🔐 Conta</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#1a1a26', borderRadius: '8px' }}>
            <span style={{ color: '#94a3b8' }}>Nome de usuário</span>
            <span style={{ color: '#e2e8f0', fontWeight: 600 }}>@{user?.username}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#1a1a26', borderRadius: '8px' }}>
            <span style={{ color: '#94a3b8' }}>E-mail</span>
            <span style={{ color: '#e2e8f0' }}>{user?.email}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#1a1a26', borderRadius: '8px' }}>
            <span style={{ color: '#94a3b8' }}>Nível</span>
            <span style={{ color: '#f59e0b', fontWeight: 600 }}>Lv. {user?.level || 1}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#1a1a26', borderRadius: '8px' }}>
            <span style={{ color: '#94a3b8' }}>Ranking</span>
            <span style={{ color: '#f59e0b', fontWeight: 600 }}>★ {user?.ranking || 0}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Button variant="danger" onClick={() => { logout(); navigate('/') }}>Sair da conta</Button>
        <Button onClick={handleSave} disabled={saving}>{saving ? 'Salvando...' : 'Salvar alterações'}</Button>
      </div>
    </div>
  )
}
