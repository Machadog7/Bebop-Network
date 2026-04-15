import React, { useState, useEffect } from 'react'
import { getItemsByType } from '../../services/localStorage/marketplace.js'
import ProductCard from '../../components/common/ProductCard'

const TABS = [
  { key: 'equipment', label: '🎸 Equipamentos' },
  { key: 'vinyl', label: '💿 Vinyls' },
  { key: 'sheet-music', label: '🎼 Partituras' },
]

export default function Marketplace() {
  const [tab, setTab] = useState('equipment')
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    setItems(getItemsByType(tab))
    setSearch('')
  }, [tab])

  const filtered = items.filter((i) => {
    const q = search.toLowerCase()
    return !q || i.title.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q) || i.seller?.toLowerCase().includes(q)
  })

  return (
    <div>
      <h1 style={{ color: '#e2e8f0', fontSize: '1.4rem', marginBottom: '20px' }}>🛍️ Marketplace Musical</h1>

      {/* Tab nav */}
      <div style={{ display: 'flex', gap: '0', background: '#12121a', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '4px', marginBottom: '20px' }}>
        {TABS.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            flex: 1, padding: '10px 8px', border: 'none', borderRadius: '8px', cursor: 'pointer',
            fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.2s',
            background: tab === t.key ? '#f59e0b' : 'transparent',
            color: tab === t.key ? '#0a0a0f' : '#94a3b8',
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Buscar no marketplace..."
          style={{ width: '100%', maxWidth: '400px', background: '#1a1a26', border: '1.5px solid #1e1e2e', borderRadius: '8px', color: '#e2e8f0', padding: '10px 14px', fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none' }}
        />
        <div style={{ color: '#475569', fontSize: '0.8rem', marginTop: '8px' }}>
          {filtered.length} ite{filtered.length !== 1 ? 'ns' : 'm'} encontrado{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#475569' }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>
            {tab === 'equipment' ? '🎸' : tab === 'vinyl' ? '💿' : '🎼'}
          </div>
          <p>Nenhum item encontrado</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
          {filtered.map((item) => <ProductCard key={item.id} product={item} />)}
        </div>
      )}
    </div>
  )
}
