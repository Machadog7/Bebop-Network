export function formatDate(timestamp) {
  const now = Date.now()
  const diff = now - timestamp
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (seconds < 60) return 'agora mesmo'
  if (minutes < 60) return `há ${minutes} minuto${minutes > 1 ? 's' : ''}`
  if (hours < 24) return `há ${hours} hora${hours > 1 ? 's' : ''}`
  if (days < 7) return `há ${days} dia${days > 1 ? 's' : ''}`
  if (weeks < 4) return `há ${weeks} semana${weeks > 1 ? 's' : ''}`
  if (months < 12) return `há ${months} mês${months > 1 ? 'es' : ''}`
  return `há ${years} ano${years > 1 ? 's' : ''}`
}

export function formatNumber(n) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

export function formatPrice(n) {
  return `R$ ${Number(n).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}

export function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // Fallback for environments without crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const arr = new Uint8Array(1)
    crypto.getRandomValues(arr)
    const r = arr[0] % 16
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function getInitials(name) {
  if (!name) return '?'
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || '')
    .join('')
}
