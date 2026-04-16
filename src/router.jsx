import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'))
const Profile = lazy(() => import('./pages/Profile'))
const Musicians = lazy(() => import('./pages/Musicians'))
const Gigs = lazy(() => import('./pages/Gigs'))
const Marketplace = lazy(() => import('./pages/Marketplace'))
const Battle = lazy(() => import('./pages/Battle'))
const Live = lazy(() => import('./pages/Live'))
const Settings = lazy(() => import('./pages/Settings'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))

const Fallback = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: '12px' }}>
    <div className="spinner" />
    <span style={{ color: '#475569', fontSize: '0.9rem' }}>Carregando...</span>
  </div>
)

export default function Router() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/musicians" element={<Musicians />} />
        <Route path="/gigs" element={<Gigs />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/marketplace/equipment" element={<Marketplace />} />
        <Route path="/marketplace/vinyl" element={<Marketplace />} />
        <Route path="/marketplace/sheets" element={<Marketplace />} />
        <Route path="/battles" element={<Battle />} />
        <Route path="/live" element={<Live />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#475569' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎷</div>
            <h2 style={{ color: '#e2e8f0', marginBottom: '8px' }}>Página não encontrada</h2>
            <p>A página que você procura não existe.</p>
          </div>
        } />
      </Routes>
    </Suspense>
  )
}
