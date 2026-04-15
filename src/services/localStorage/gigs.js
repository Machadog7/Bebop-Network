import { generateId } from '../../utils/formatters.js'

const GIGS_KEY = 'bebop_gigs'
const VENUES_KEY = 'bebop_venues'

export function getGigs() {
  try { return JSON.parse(localStorage.getItem(GIGS_KEY) || '[]') } catch { return [] }
}
export function getGigById(id) { return getGigs().find((g) => g.id === id) || null }

export function createGig(data) {
  const gigs = getGigs()
  const gig = {
    id: generateId(),
    title: data.title || '',
    venueId: data.venueId || '',
    venueName: data.venueName || '',
    date: data.date || '',
    time: data.time || '',
    musicians: data.musicians || [],
    genre: data.genre || [],
    description: data.description || '',
    price: data.price || 0,
    createdBy: data.createdBy || '',
    createdAt: Date.now(),
  }
  gigs.push(gig)
  localStorage.setItem(GIGS_KEY, JSON.stringify(gigs))
  return gig
}

export function updateGig(id, updates) {
  const gigs = getGigs()
  const idx = gigs.findIndex((g) => g.id === id)
  if (idx === -1) return null
  gigs[idx] = { ...gigs[idx], ...updates, id }
  localStorage.setItem(GIGS_KEY, JSON.stringify(gigs))
  return gigs[idx]
}

export function deleteGig(id) {
  localStorage.setItem(GIGS_KEY, JSON.stringify(getGigs().filter((g) => g.id !== id)))
}

export function getVenues() {
  try { return JSON.parse(localStorage.getItem(VENUES_KEY) || '[]') } catch { return [] }
}
export function getVenueById(id) { return getVenues().find((v) => v.id === id) || null }

export function createVenue(data) {
  const venues = getVenues()
  const venue = {
    id: generateId(),
    name: data.name || '',
    address: data.address || '',
    city: data.city || '',
    capacity: data.capacity || 0,
    hotRanking: data.hotRanking || 0,
    genre: data.genre || [],
    createdAt: Date.now(),
  }
  venues.push(venue)
  localStorage.setItem(VENUES_KEY, JSON.stringify(venues))
  return venue
}

export function updateVenue(id, updates) {
  const venues = getVenues()
  const idx = venues.findIndex((v) => v.id === id)
  if (idx === -1) return null
  venues[idx] = { ...venues[idx], ...updates, id }
  localStorage.setItem(VENUES_KEY, JSON.stringify(venues))
  return venues[idx]
}

export function seedVenues() {
  if (getVenues().length > 0) return
  const sample = [
    { id: generateId(), name: 'Blue Note SP', address: 'Rua Bela Cintra, 374', city: 'São Paulo, SP', capacity: 200, hotRanking: 98, genre: ['Jazz', 'Blues'], createdAt: Date.now() },
    { id: generateId(), name: 'Carioca Club', address: 'Av. Mem de Sá, 25', city: 'Rio de Janeiro, RJ', capacity: 350, hotRanking: 91, genre: ['MPB', 'Samba', 'Bossa Nova'], createdAt: Date.now() },
    { id: generateId(), name: 'A Loca', address: 'Rua da Consolação, 2202', city: 'São Paulo, SP', capacity: 150, hotRanking: 84, genre: ['Rock', 'Indie'], createdAt: Date.now() },
    { id: generateId(), name: 'Café da Manhã', address: 'Rua Padre Chagas, 10', city: 'Porto Alegre, RS', capacity: 80, hotRanking: 76, genre: ['Jazz', 'Classical'], createdAt: Date.now() },
    { id: generateId(), name: 'Manifesto', address: 'Av. do Contorno, 6061', city: 'Belo Horizonte, MG', capacity: 500, hotRanking: 88, genre: ['Rock', 'Metal', 'Pop'], createdAt: Date.now() },
  ]
  localStorage.setItem(VENUES_KEY, JSON.stringify(sample))
}

export function seedGigs() {
  if (getGigs().length > 0) return
  const venues = getVenues()
  if (venues.length === 0) return
  const now = Date.now()
  const day = 1000 * 60 * 60 * 24
  const sample = [
    { id: generateId(), title: 'Jazz Night', venueId: venues[0]?.id, venueName: venues[0]?.name, date: new Date(now + day * 2).toISOString().split('T')[0], time: '21:00', musicians: ['Carlos Mendonça', 'Priya Sharma'], genre: ['Jazz'], description: 'Uma noite de jazz clássico e bebop.', price: 40, createdBy: '', createdAt: now },
    { id: generateId(), title: 'Blues na Lapa', venueId: venues[1]?.id, venueName: venues[1]?.name, date: new Date(now + day * 4).toISOString().split('T')[0], time: '22:00', musicians: ['Ana Paula Ferreira'], genre: ['Blues'], description: 'Blues raiz com Ana Paula.', price: 30, createdBy: '', createdAt: now },
    { id: generateId(), title: 'Rock Progressivo', venueId: venues[2]?.id, venueName: venues[2]?.name, date: new Date(now + day * 6).toISOString().split('T')[0], time: '20:30', musicians: ['Lucas Drummond'], genre: ['Rock', 'Progressive Rock'], description: 'Uma noite de rock progressivo.', price: 35, createdBy: '', createdAt: now },
    { id: generateId(), title: 'Noite Clássica', venueId: venues[3]?.id, venueName: venues[3]?.name, date: new Date(now + day * 8).toISOString().split('T')[0], time: '19:00', musicians: ['Priya Sharma'], genre: ['Classical'], description: 'Violino e violoncelo ao vivo.', price: 50, createdBy: '', createdAt: now },
  ]
  localStorage.setItem(GIGS_KEY, JSON.stringify(sample))
}
