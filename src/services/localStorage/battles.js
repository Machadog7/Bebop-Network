import { generateId } from '../../utils/formatters.js'
import { getUsers } from './users.js'

const KEY = 'bebop_battles'

export function getBattles() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}
export function getBattleById(id) { return getBattles().find((b) => b.id === id) || null }

export function createBattle(data) {
  const battles = getBattles()
  const battle = {
    id: generateId(),
    challengerId: data.challengerId || '',
    challengerName: data.challengerName || '',
    challengerSong: data.challengerSong || '',
    challengedId: data.challengedId || '',
    challengedName: data.challengedName || '',
    challengedSong: data.challengedSong || '',
    votesChallenger: 0,
    votesChallenged: 0,
    status: 'active',
    createdAt: Date.now(),
    endsAt: Date.now() + 1000 * 60 * 60 * 48,
  }
  battles.unshift(battle)
  localStorage.setItem(KEY, JSON.stringify(battles))
  return battle
}

export function updateBattle(id, updates) {
  const battles = getBattles()
  const idx = battles.findIndex((b) => b.id === id)
  if (idx === -1) return null
  battles[idx] = { ...battles[idx], ...updates, id }
  localStorage.setItem(KEY, JSON.stringify(battles))
  return battles[idx]
}

export function voteForBattle(battleId, side) {
  const battles = getBattles()
  const idx = battles.findIndex((b) => b.id === battleId)
  if (idx === -1) return null
  if (side === 'challenger') battles[idx].votesChallenger += 1
  else if (side === 'challenged') battles[idx].votesChallenged += 1
  localStorage.setItem(KEY, JSON.stringify(battles))
  return battles[idx]
}

export function seedBattles() {
  if (getBattles().length > 0) return
  const users = getUsers()
  if (users.length < 2) return
  const sample = [
    {
      id: generateId(),
      challengerId: users[0]?.id || '',
      challengerName: users[0]?.name || '',
      challengerSong: 'Autumn Leaves',
      challengedId: users[1]?.id || '',
      challengedName: users[1]?.name || '',
      challengedSong: 'Sweet Home Chicago',
      votesChallenger: 124,
      votesChallenged: 98,
      status: 'active',
      createdAt: Date.now() - 86400000,
      endsAt: Date.now() + 86400000,
    },
    {
      id: generateId(),
      challengerId: users[2]?.id || '',
      challengerName: users[2]?.name || '',
      challengerSong: 'Garota de Ipanema',
      challengedId: users[4]?.id || '',
      challengedName: users[4]?.name || '',
      challengedSong: 'Four Seasons',
      votesChallenger: 87,
      votesChallenged: 143,
      status: 'active',
      createdAt: Date.now() - 43200000,
      endsAt: Date.now() + 129600000,
    },
  ]
  localStorage.setItem(KEY, JSON.stringify(sample))
}
