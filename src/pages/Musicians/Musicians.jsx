import React, { useState, useEffect } from 'react'
import { getUsers } from '../../services/localStorage/users.js'
import MusicianCard from '../../components/common/MusicianCard'

const ALL_INSTRUMENTS = ['guitar', 'bass', 'drums', 'piano', 'saxophone', 'violin', 'vocals', 'trumpet', 'flute', 'cello', 'percussion', 'viola']
const ALL_GENRES = ['Jazz', 'Blues', 'Rock', 'Classical', 'MPB', 'Bossa Nova', 'Samba', 'Metal', 'Pop', 'Soul', 'R&B', 'Progressive Rock']

export default function Musicians() {
  const [all, setAll] = useState([])
  const [search, setSearch] = useState('')
  const [instrFilter, setInstrFilter] = useState('')
  const [genreFilter, setGenreFilter] = useState('')

  useEffect(() => {
    setAll(getUsers())
  }, [])

  const filtered = all.filter((m) => {
    const q = search.toLowerCase()
    const matchSearch = !q || m.name.toLowerCase().includes(q) || m.username.toLowerCase().includes(q) || m.location?.toLowerCase().includes(q)
    const matchInstr = !instrFilter || m.instruments?.includes(instrFilter)
    const matchGenre = !genreFilter || m.genre?.includes(genreFilter)
    return matchSearch && matchInstr && matchGenre
  })

  const selectStyle = {
    background: '#1a1a26', border: '1.5px solid #1e1e2e', borderRadius: '8px',
    color: '#e2e8f0', padding: '10px 12px', fontSize: '0.88rem', fontFamily: 'inherit', outline: 'none', cursor: 'pointer',
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: '#e2e8f0', fontSize: '1.4rem', marginBottom: '16px' }}>👥 Músicos</h1>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Buscar músicos..."
            style={{ flex: 1, minWidth: '200px', background: '#1a1a26', border: '1.5px solid #1e1e2e', borderRadius: '8px', color: '#e2e8f0', padding: '10px 14px', fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none' }}
          />
          <select value={instrFilter} onChange={(e) => setInstrFilter(e.target.value)} style={selectStyle}>
            <option value="">🎸 Instrumento</option>
            {ALL_INSTRUMENTS.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
          <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)} style={selectStyle}>
            <option value="">🎵 Gênero</option>
            {ALL_GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
          {(instrFilter || genreFilter || search) && (
            <button onClick={() => { setSearch(''); setInstrFilter(''); setGenreFilter('') }} style={{ background: 'none', border: '1px solid #1e1e2e', color: '#94a3b8', borderRadius: '8px', padding: '10px 14px', cursor: 'pointer', fontSize: '0.85rem' }}>
              Limpar
            </button>
          )}
        </div>

        <div style={{ color: '#475569', fontSize: '0.82rem', marginTop: '10px' }}>
          {filtered.length} músico{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#475569' }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎸</div>
          <p>Nenhum músico encontrado com os filtros selecionados.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {filtered.map((m) => <MusicianCard key={m.id} musician={m} />)}
        </div>
      )}
    </div>
  )
}
