import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import { useApp } from '../../context/AppContext.jsx'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { validateRequired } from '../../utils/validators.js'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { addNotification } = useApp()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (validateRequired(username, 'Usuário')) errs.username = validateRequired(username, 'Usuário')
    if (validateRequired(password, 'Senha')) errs.password = validateRequired(password, 'Senha')
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    const result = login(username, password)
    setLoading(false)
    if (result.error) {
      setErrors({ general: result.error })
      addNotification(result.error, 'error')
    } else {
      addNotification(`Bem-vindo de volta, ${result.user?.name || username}! 🎵`)
      navigate('/')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: '#0a0a0f' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🎷</div>
          <h1 style={{ color: '#f59e0b', fontSize: '1.8rem', fontWeight: 800, margin: '0 0 6px' }}>Bebop Network</h1>
          <p style={{ color: '#475569', fontSize: '0.9rem' }}>A rede social para músicos</p>
        </div>

        <div style={{ background: '#12121a', border: '1px solid #1e1e2e', borderRadius: '16px', padding: '32px' }}>
          <h2 style={{ color: '#e2e8f0', fontSize: '1.2rem', marginBottom: '24px', textAlign: 'center' }}>Entrar na sua conta</h2>

          {errors.general && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', color: '#ef4444', fontSize: '0.85rem' }}>
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              label="Usuário ou E-mail"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="seu_usuario"
              error={errors.username}
              fullWidth
              icon="👤"
            />
            <Input
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              error={errors.password}
              fullWidth
              icon="🔒"
            />
            <Button type="submit" fullWidth disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar 🎵'}
            </Button>
          </form>

          <div style={{ marginTop: '20px', textAlign: 'center', color: '#475569', fontSize: '0.85rem' }}>
            Não tem conta?{' '}
            <Link to="/register" style={{ color: '#f59e0b', fontWeight: 600 }}>Cadastre-se grátis</Link>
          </div>

          <div style={{ marginTop: '20px', padding: '14px', background: '#1a1a26', borderRadius: '8px', fontSize: '0.78rem' }}>
            <div style={{ color: '#94a3b8', marginBottom: '8px', fontWeight: 600 }}>Contas de demonstração:</div>
            {[
              { user: 'carlos_jazz', pwd: '123456' },
              { user: 'ana_blues', pwd: '123456' },
            ].map((demo) => (
              <div key={demo.user} style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', marginBottom: '4px' }}>
                <span>{demo.user}</span>
                <button
                  onClick={() => { setUsername(demo.user); setPassword(demo.pwd) }}
                  style={{ background: 'none', border: 'none', color: '#f59e0b', cursor: 'pointer', fontSize: '0.78rem', padding: 0 }}
                >
                  Usar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
