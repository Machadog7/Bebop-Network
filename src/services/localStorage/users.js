import { generateId } from '../../utils/formatters.js'

const KEY = 'bebop_users'

export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function getUserById(id) {
  return getUsers().find((u) => u.id === id) || null
}

export function getUserByUsername(username) {
  return getUsers().find((u) => u.username === username) || null
}

export function createUser(userData) {
  const users = getUsers()
  const user = {
    id: generateId(),
    username: userData.username || '',
    name: userData.name || '',
    email: userData.email || '',
    password: userData.password || '',
    bio: userData.bio || '',
    instruments: userData.instruments || [],
    profilePicture: userData.profilePicture || '',
    coverPicture: userData.coverPicture || '',
    ranking: userData.ranking || Math.floor(Math.random() * 60) + 1,
    level: userData.level || 1,
    followers: userData.followers || 0,
    following: userData.following || 0,
    songs: userData.songs || [],
    location: userData.location || '',
    genre: userData.genre || [],
    createdAt: Date.now(),
  }
  users.push(user)
  localStorage.setItem(KEY, JSON.stringify(users))
  return user
}

export function updateUser(id, updates) {
  const users = getUsers()
  const idx = users.findIndex((u) => u.id === id)
  if (idx === -1) return null
  users[idx] = { ...users[idx], ...updates, id }
  localStorage.setItem(KEY, JSON.stringify(users))
  return users[idx]
}

export function deleteUser(id) {
  const users = getUsers().filter((u) => u.id !== id)
  localStorage.setItem(KEY, JSON.stringify(users))
}

export function seedUsers() {
  if (getUsers().length > 0) return
  const sample = [
    {
      id: generateId(),
      username: 'carlos_jazz',
      name: 'Carlos Mendonça',
      email: 'carlos@bebop.net',
      password: '123456',
      bio: 'Saxofonista e compositor. Apaixonado por jazz e bebop desde os 12 anos.',
      instruments: ['saxophone', 'piano'],
      profilePicture: 'https://i.pravatar.cc/150?img=1',
      coverPicture: '',
      ranking: 92,
      level: 8,
      followers: 1240,
      following: 310,
      songs: ['Autumn Leaves', 'So What', 'Blue in Green'],
      location: 'São Paulo, SP',
      genre: ['Jazz', 'Bebop', 'Soul'],
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 180,
    },
    {
      id: generateId(),
      username: 'ana_blues',
      name: 'Ana Paula Ferreira',
      email: 'ana@bebop.net',
      password: '123456',
      bio: 'Guitarrista de blues e soul. Tocando desde os 15 anos.',
      instruments: ['guitar', 'vocals'],
      profilePicture: 'https://i.pravatar.cc/150?img=5',
      coverPicture: '',
      ranking: 85,
      level: 7,
      followers: 980,
      following: 220,
      songs: ['Sweet Home Chicago', 'The Thrill Is Gone', 'Stormy Monday'],
      location: 'Rio de Janeiro, RJ',
      genre: ['Blues', 'Soul', 'R&B'],
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 120,
    },
    {
      id: generateId(),
      username: 'rafael_bossa',
      name: 'Rafael Costa',
      email: 'rafael@bebop.net',
      password: '123456',
      bio: 'Violonista e cantor. Bossa nova é minha vida.',
      instruments: ['guitar', 'vocals'],
      profilePicture: 'https://i.pravatar.cc/150?img=8',
      coverPicture: '',
      ranking: 78,
      level: 6,
      followers: 760,
      following: 180,
      songs: ['Garota de Ipanema', 'Corcovado', 'Samba de Uma Nota Só'],
      location: 'Belo Horizonte, MG',
      genre: ['Bossa Nova', 'MPB', 'Samba'],
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 90,
    },
    {
      id: generateId(),
      username: 'lucas_rock',
      name: 'Lucas Drummond',
      email: 'lucas@bebop.net',
      password: '123456',
      bio: 'Baterista de rock progressivo. Na estrada há 10 anos.',
      instruments: ['drums', 'percussion'],
      profilePicture: 'https://i.pravatar.cc/150?img=12',
      coverPicture: '',
      ranking: 70,
      level: 6,
      followers: 640,
      following: 290,
      songs: ['Comfortably Numb', 'Tom Sawyer', 'YYZ'],
      location: 'Curitiba, PR',
      genre: ['Rock', 'Progressive Rock', 'Metal'],
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 60,
    },
    {
      id: generateId(),
      username: 'priya_classical',
      name: 'Priya Sharma',
      email: 'priya@bebop.net',
      password: '123456',
      bio: 'Violinista clássica com influências do mundo todo.',
      instruments: ['violin', 'viola'],
      profilePicture: 'https://i.pravatar.cc/150?img=16',
      coverPicture: '',
      ranking: 88,
      level: 9,
      followers: 1520,
      following: 140,
      songs: ['Four Seasons', 'Violin Concerto in E minor', 'Caprice No. 24'],
      location: 'Porto Alegre, RS',
      genre: ['Classical', 'Contemporary', 'World'],
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 200,
    },
  ]
  localStorage.setItem(KEY, JSON.stringify(sample))
}
