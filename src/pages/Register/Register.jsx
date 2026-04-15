import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import { useApp } from '../../context/AppContext.jsx'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { validateEmail, validateUsername, validatePassword, validateRequired } from '../../utils/validators.js'

const INSTRUMENTS = ['guitar', 'bass', 'drums', 'piano', 'saxophone', 'violin', 'vocals', 'trumpet', 'flute', 'cello', 'percussion', 'viola']

export default function Register() {
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '', bio: '' })
  const [instruments, setInstruments] = useState([])
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const { addNotification } = useApp()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    const nameErr = validateRequired(form.name, 'Nome')
    const usernameErr = validateUsername(form.username)
    const emailErr = validateEmail(form.email)
    const passwordErr = validatePassword(form.password)
    if (nameErr) errs.name = nameErr
    if (usernameErr) errs.username = usernameErr
    if (emailErr) errs.email = emailErr
    if (passwordErr) errs.password = passwordErr
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    const result = register({ ...form, instruments })
    setLoading(false)
    if (result.error) {
      setErrors({ general: result.error })
      addNotification(result.error, 'error')
    } else {
      addNotification(`Bem-vindo à Bebop Network, ${form.name}! 🎵`)
      navigate('/')
    }
  }

  const toggleInst = (inst) => {
    setInstruments((prev) => prev.includes(inst) ? prev.filter((i) => i !== inst) : [...prev, inst])
  }

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: '#0a0a0f' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '6px' }}>🎷</div>
          <h1 style={{ color: '#f59e0b', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px' }}>Bebop Network</h1>
          <p style={{ color: '#475569', fontSize: '0.88rem' }}>Crie sua conta de músico</p>
        </div>

        <div style={{ background: '#12121a', border: '1px solid #1e1e2e', borderRadius: '16px', padding: '28px' }}>
          {errors.general && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', color: '#ef4444', fontSize: '0.85rem' }}>
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Input label="Nome completo" value={form.name} onChange={set('name')} placeholder="Seu nome" error={errors.name} fullWidth icon="👤" />
            <Input label="Nome de usuário" value={form.username} onChange={set('username')} placeholder="seu_username" error={errors.username} fullWidth icon="@" />
            <Input label="E-mail" type="email" value={form.email} onChange={set('email')} placeholder="email@exemplo.com" error={errors.email} fullWidth icon="✉️" />
            <Input label="Senha" type="password" value={form.password} onChange={set('password')} placeholder="Mínimo 6 caracteres" error={errors.password} fullWidth icon="🔒" />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>Bio (opcional)</label>
              <textarea
                value={form.bio}
                onChange={set('bio')}
                placeholder="Conta um pouco sobre você como músico..."
                rows={2}
                style={{ background: '#1a1a26', border: '1.5px solid #1e1e2e', borderRadius: '8px', color: '#e2e8f0', padding: '10px 12px', fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>Instrumentos que você toca</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {INSTRUMENTS.map((inst) => {
                  const sel = instruments.includes(inst)
                  return (
                    <button key={inst} type="button" onClick={() => toggleInst(inst)} style={{
                      padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem',
                      background: sel ? 'rgba(245,158,11,0.15)' : '#1a1a26',
                      color: sel ? '#f59e0b' : '#94a3b8',
                      border: sel ? '1.5px solid rgba(245,158,11,0.4)' : '1.5px solid #1e1e2e',
                      transition: 'all 0.2s',
                    }}>
                      {sel ? '✓ ' : ''}{inst}
                    </button>
                  )
                })}
              </div>
            </div>

            <Button type="submit" fullWidth disabled={loading} style={{ marginTop: '8px' }}>
              {loading ? 'Criando conta...' : 'Criar conta 🎵'}
            </Button>
          </form>

          <div style={{ marginTop: '18px', textAlign: 'center', color: '#475569', fontSize: '0.85rem' }}>
            Já tem conta?{' '}
            <Link to="/login" style={{ color: '#f59e0b', fontWeight: 600 }}>Faça login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
