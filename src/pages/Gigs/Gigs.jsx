import React, { useState, useEffect } from 'react'
import { getGigs, getVenues, createGig } from '../../services/localStorage/gigs.js'
import GigCard from '../../components/common/GigCard'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import Input from '../../components/common/Input'
import { useAuth } from '../../hooks/useAuth.js'
import { useApp } from '../../context/AppContext.jsx'

export default function Gigs() {
  const [gigs, setGigs] = useState([])
  const [venues, setVenues] = useState([])
  const [modal, setModal] = useState(false)
  const { isAuthenticated, user } = useAuth()
  const { addNotification } = useApp()
  const [form, setForm] = useState({ title: '', venueName: '', date: '', time: '', genre: '', description: '', price: '' })

  useEffect(() => {
    setGigs(getGigs())
    setVenues(getVenues())
  }, [])

  const sortedVenues = [...venues].sort((a, b) => b.hotRanking - a.hotRanking)

  const handleCreate = () => {
    if (!form.title || !form.date) { addNotification('Preencha título e data', 'error'); return }
    const gig = createGig({
      ...form,
      genre: form.genre ? form.genre.split(',').map((g) => g.trim()) : [],
      price: parseFloat(form.price) || 0,
      createdBy: user?.id || '',
    })
    setGigs((prev) => [gig, ...prev])
    setModal(false)
    setForm({ title: '', venueName: '', date: '', time: '', genre: '', description: '', price: '' })
    addNotification('Show criado com sucesso! 🎤')
  }

  const getVenue = (gig) => venues.find((v) => v.id === gig.venueId)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ color: '#e2e8f0', fontSize: '1.4rem' }}>🎤 Shows & Eventos</h1>
        {isAuthenticated && <Button onClick={() => setModal(true)}>+ Criar Show</Button>}
      </div>

      {/* Map Placeholder */}
      <div style={{ background: '#12121a', border: '1px solid #1e1e2e', borderRadius: '16px', height: '200px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, #1a1a26 0%, #0a0a0f 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <span style={{ fontSize: '3rem' }}>🗺️</span>
          <p style={{ color: '#475569', margin: '8px 0 0', fontSize: '0.9rem' }}>Mapa de Shows — Em breve</p>
          <p style={{ color: '#1e1e2e', fontSize: '0.78rem', margin: '4px 0 0' }}>Integração com Google Maps / Leaflet</p>
        </div>
      </div>

      {/* Hot Venues */}
      {sortedVenues.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ color: '#e2e8f0', fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>🔥 Casas de Show em Alta</h2>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
            {sortedVenues.map((v, i) => (
              <div key={v.id} style={{ background: '#12121a', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '14px 18px', flexShrink: 0, minWidth: '180px', borderLeft: i < 3 ? '3px solid #f59e0b' : '3px solid #1e1e2e' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, color: '#f59e0b' }}>#{i + 1}</span>
                  <span style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.9rem' }}>{v.name}</span>
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>📍 {v.city}</div>
                <div style={{ display: 'flex', gap: '4px', marginTop: '6px', flexWrap: 'wrap' }}>
                  {v.genre?.slice(0, 2).map((g) => <span key={g} style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px' }}>{g}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Gigs */}
      <h2 style={{ color: '#e2e8f0', fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>📅 Próximos Shows</h2>
      {gigs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#475569' }}>
          <div style={{ fontSize: '3rem' }}>🎤</div>
          <p style={{ marginTop: '12px' }}>Nenhum show cadastrado ainda</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
          {gigs.map((gig) => <GigCard key={gig.id} gig={gig} venue={getVenue(gig)} />)}
        </div>
      )}

      <Modal isOpen={modal} onClose={() => setModal(false)} title="🎤 Criar Show">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Input label="Título do Show" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Ex: Jazz Night" fullWidth />
          <Input label="Nome do Venue" value={form.venueName} onChange={(e) => setForm((f) => ({ ...f, venueName: e.target.value }))} placeholder="Ex: Blue Note SP" fullWidth />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Input label="Data" type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} fullWidth />
            <Input label="Horário" type="time" value={form.time} onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))} fullWidth />
          </div>
          <Input label="Gêneros (separados por vírgula)" value={form.genre} onChange={(e) => setForm((f) => ({ ...f, genre: e.target.value }))} placeholder="Ex: Jazz, Blues" fullWidth />
          <Input label="Preço (R$)" type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} placeholder="0 para gratuito" fullWidth />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>Descrição</label>
            <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Descreva o show..." rows={3} style={{ background: '#1a1a26', border: '1.5px solid #1e1e2e', borderRadius: '8px', color: '#e2e8f0', padding: '10px 12px', fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none', resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setModal(false)}>Cancelar</Button>
            <Button onClick={handleCreate}>Criar Show</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
