import { generateId } from '../../utils/formatters.js'
import { getUsers } from './users.js'

const KEY = 'bebop_posts'

export function getPosts() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function getPostById(id) {
  return getPosts().find((p) => p.id === id) || null
}

export function getPostsByUserId(userId) {
  return getPosts().filter((p) => p.userId === userId)
}

export function createPost(postData) {
  const posts = getPosts()
  const post = {
    id: generateId(),
    userId: postData.userId || '',
    content: postData.content || '',
    mediaUrl: postData.mediaUrl || '',
    mediaType: postData.mediaType || 'text',
    likes: 0,
    shares: 0,
    comments: [],
    monetized: postData.monetized || false,
    tags: postData.tags || [],
    createdAt: Date.now(),
  }
  posts.unshift(post)
  localStorage.setItem(KEY, JSON.stringify(posts))
  return post
}

export function updatePost(id, updates) {
  const posts = getPosts()
  const idx = posts.findIndex((p) => p.id === id)
  if (idx === -1) return null
  posts[idx] = { ...posts[idx], ...updates, id }
  localStorage.setItem(KEY, JSON.stringify(posts))
  return posts[idx]
}

export function deletePost(id) {
  const posts = getPosts().filter((p) => p.id !== id)
  localStorage.setItem(KEY, JSON.stringify(posts))
}

export function likePost(id) {
  const posts = getPosts()
  const idx = posts.findIndex((p) => p.id === id)
  if (idx === -1) return null
  posts[idx].likes = (posts[idx].likes || 0) + 1
  localStorage.setItem(KEY, JSON.stringify(posts))
  return posts[idx]
}

export function sharePost(id) {
  const posts = getPosts()
  const idx = posts.findIndex((p) => p.id === id)
  if (idx === -1) return null
  posts[idx].shares = (posts[idx].shares || 0) + 1
  localStorage.setItem(KEY, JSON.stringify(posts))
  return posts[idx]
}

export function addComment(postId, comment) {
  const posts = getPosts()
  const idx = posts.findIndex((p) => p.id === postId)
  if (idx === -1) return null
  const newComment = {
    id: generateId(),
    userId: comment.userId,
    userName: comment.userName,
    text: comment.text,
    createdAt: Date.now(),
  }
  posts[idx].comments = [...(posts[idx].comments || []), newComment]
  localStorage.setItem(KEY, JSON.stringify(posts))
  return posts[idx]
}

export function seedPosts() {
  if (getPosts().length > 0) return
  const users = getUsers()
  if (users.length === 0) return
  const sample = [
    {
      id: generateId(),
      userId: users[0]?.id || '',
      content: 'Acabei de gravar uma nova versão de Autumn Leaves no estúdio! 🎷 O som ficou incrível, mal posso esperar para compartilhar.',
      mediaUrl: '',
      mediaType: 'text',
      likes: 47,
      shares: 12,
      comments: [
        { id: generateId(), userId: users[1]?.id || '', userName: users[1]?.name || '', text: 'Mando ver! Adoro essa música 🎶', createdAt: Date.now() - 3600000 },
      ],
      monetized: false,
      tags: ['jazz', 'saxophone', 'studio'],
      createdAt: Date.now() - 1000 * 60 * 60 * 2,
    },
    {
      id: generateId(),
      userId: users[1]?.id || '',
      content: 'Sessão de blues hoje à noite no Bar do Léo. Quem vem? 🎸🔥',
      mediaUrl: '',
      mediaType: 'text',
      likes: 63,
      shares: 28,
      comments: [],
      monetized: false,
      tags: ['blues', 'guitar', 'live'],
      createdAt: Date.now() - 1000 * 60 * 60 * 5,
    },
    {
      id: generateId(),
      userId: users[2]?.id || '',
      content: 'Trabalhando em novas composições de bossa nova. A harmonia desse acorde me deixou encantado ✨',
      mediaUrl: '',
      mediaType: 'text',
      likes: 89,
      shares: 31,
      comments: [],
      monetized: true,
      tags: ['bossanova', 'composition', 'guitar'],
      createdAt: Date.now() - 1000 * 60 * 60 * 8,
    },
    {
      id: generateId(),
      userId: users[3]?.id || '',
      content: 'Novo kit de bateria chegou! 🥁 Próximas semanas de muito treino pela frente.',
      mediaUrl: '',
      mediaType: 'text',
      likes: 54,
      shares: 9,
      comments: [],
      monetized: false,
      tags: ['drums', 'rock', 'gear'],
      createdAt: Date.now() - 1000 * 60 * 60 * 12,
    },
    {
      id: generateId(),
      userId: users[4]?.id || '',
      content: 'Recital das Quatro Estações de Vivaldi na próxima sexta! 🎻 Ingressos disponíveis no link da bio.',
      mediaUrl: '',
      mediaType: 'text',
      likes: 120,
      shares: 45,
      comments: [],
      monetized: true,
      tags: ['classical', 'violin', 'concert'],
      createdAt: Date.now() - 1000 * 60 * 60 * 24,
    },
  ]
  localStorage.setItem(KEY, JSON.stringify(sample))
}
