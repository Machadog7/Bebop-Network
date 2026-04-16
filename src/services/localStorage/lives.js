import { generateId } from '../../utils/formatters.js'
import { getUsers } from './users.js'

const KEY = 'bebop_lives'

export function getLives() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}
export function getLiveById(id) { return getLives().find((l) => l.id === id) || null }

export function createLive(data) {
  const lives = getLives()
  const live = {
    id: generateId(),
    title: data.title || '',
    hostId: data.hostId || '',
    hostName: data.hostName || '',
    description: data.description || '',
    scheduledFor: data.scheduledFor || Date.now(),
    isLive: data.isLive || false,
    viewers: data.viewers || 0,
    genre: data.genre || [],
    createdAt: Date.now(),
  }
  lives.unshift(live)
  localStorage.setItem(KEY, JSON.stringify(lives))
  return live
}

export function updateLive(id, updates) {
  const lives = getLives()
  const idx = lives.findIndex((l) => l.id === id)
  if (idx === -1) return null
  lives[idx] = { ...lives[idx], ...updates, id }
  localStorage.setItem(KEY, JSON.stringify(lives))
  return lives[idx]
}

export function seedLives() {
  if (getLives().length > 0) return
  const users = getUsers()
  if (users.length === 0) return
  const now = Date.now()
  const sample = [
    {
      id: generateId(),
      title: 'Jazz ao Vivo com Carlos',
      hostId: users[0]?.id || '',
      hostName: users[0]?.name || '',
      description: 'Uma hora de jazz ao vivo: estâncias, improvisação e muito bebop.',
      scheduledFor: now + 3600000 * 2,
      isLive: false,
      viewers: 0,
      genre: ['Jazz', 'Bebop'],
      createdAt: now,
    },
    {
      id: generateId(),
      title: 'Blues Session ao Vivo',
      hostId: users[1]?.id || '',
      hostName: users[1]?.name || '',
      description: 'Blues e soul raiz com a Ana Paula.',
      scheduledFor: now + 3600000 * 5,
      isLive: false,
      viewers: 0,
      genre: ['Blues', 'Soul'],
      createdAt: now,
    },
    {
      id: generateId(),
      title: 'Recital de Violino - Ao Vivo',
      hostId: users[4]?.id || '',
      hostName: users[4]?.name || '',
      description: 'Vivaldi, Bach e obras contemporâneas ao vivo.',
      scheduledFor: now - 1800000,
      isLive: true,
      viewers: 342,
      genre: ['Classical'],
      createdAt: now - 7200000,
    },
  ]
  localStorage.setItem(KEY, JSON.stringify(sample))
}
