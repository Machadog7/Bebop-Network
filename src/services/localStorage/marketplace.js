import { generateId } from '../../utils/formatters.js'

const KEY = 'bebop_marketplace'

export function getItems() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}
export function getItemById(id) { return getItems().find((i) => i.id === id) || null }
export function getItemsByType(type) { return getItems().filter((i) => i.type === type) }

export function createItem(data) {
  const items = getItems()
  const item = {
    id: generateId(),
    type: data.type || 'equipment',
    title: data.title || '',
    description: data.description || '',
    price: data.price || 0,
    condition: data.condition || 'used',
    imageUrl: data.imageUrl || '',
    seller: data.seller || '',
    sellerId: data.sellerId || '',
    location: data.location || '',
    createdAt: Date.now(),
  }
  items.unshift(item)
  localStorage.setItem(KEY, JSON.stringify(items))
  return item
}

export function updateItem(id, updates) {
  const items = getItems()
  const idx = items.findIndex((i) => i.id === id)
  if (idx === -1) return null
  items[idx] = { ...items[idx], ...updates, id }
  localStorage.setItem(KEY, JSON.stringify(items))
  return items[idx]
}

export function deleteItem(id) {
  localStorage.setItem(KEY, JSON.stringify(getItems().filter((i) => i.id !== id)))
}

export function seedMarketplace() {
  if (getItems().length > 0) return
  const sample = [
    { id: generateId(), type: 'equipment', title: 'Gibson Les Paul Standard 2019', description: 'Guitarra em excelente estado, poucas marcas de uso. Acompanha case.', price: 8500, condition: 'used', imageUrl: '', seller: 'Lucas Drummond', sellerId: '', location: 'Curitiba, PR', createdAt: Date.now() - 86400000 * 3 },
    { id: generateId(), type: 'equipment', title: 'Saxofone Alto Yamaha YAS-280', description: 'Saxofone alto intermediário, ideal para estudo e apresentações.', price: 3200, condition: 'used', imageUrl: '', seller: 'Carlos Mendonça', sellerId: '', location: 'São Paulo, SP', createdAt: Date.now() - 86400000 * 5 },
    { id: generateId(), type: 'equipment', title: 'Bateria Pearl Export EXX', description: 'Kit completo com prato de ataque e chimbal. Ótimo para iniciantes.', price: 4800, condition: 'used', imageUrl: '', seller: 'Lucas Drummond', sellerId: '', location: 'Curitiba, PR', createdAt: Date.now() - 86400000 * 7 },
    { id: generateId(), type: 'vinyl', title: 'Miles Davis - Kind of Blue (Original Pressing)', description: 'Vinil original de 1959 em ótimo estado. Uma relíquia do jazz.', price: 950, condition: 'good', imageUrl: '', seller: 'Carlos Mendonça', sellerId: '', location: 'São Paulo, SP', createdAt: Date.now() - 86400000 * 2 },
    { id: generateId(), type: 'vinyl', title: 'Led Zeppelin - Physical Graffiti', description: 'Duplo vinil, edição remasterizada. Quase sem uso.', price: 280, condition: 'like-new', imageUrl: '', seller: 'Rafael Costa', sellerId: '', location: 'Belo Horizonte, MG', createdAt: Date.now() - 86400000 * 4 },
    { id: generateId(), type: 'vinyl', title: 'João Gilberto - Chega de Saudade', description: 'Edição histórica da bossa nova. Disco raro e valioso.', price: 1200, condition: 'good', imageUrl: '', seller: 'Ana Paula Ferreira', sellerId: '', location: 'Rio de Janeiro, RJ', createdAt: Date.now() - 86400000 * 6 },
    { id: generateId(), type: 'sheet-music', title: 'Real Book Vol. 1 - Hal Leonard', description: 'O melhor fakebook de jazz. Cópia original em ótimas condições.', price: 120, condition: 'good', imageUrl: '', seller: 'Carlos Mendonça', sellerId: '', location: 'São Paulo, SP', createdAt: Date.now() - 86400000 },
    { id: generateId(), type: 'sheet-music', title: 'Partituras - Beethoven Sonatas para Piano', description: 'Coleção completa das sonatas de Beethoven, editora Henle.', price: 180, condition: 'like-new', imageUrl: '', seller: 'Priya Sharma', sellerId: '', location: 'Porto Alegre, RS', createdAt: Date.now() - 86400000 * 8 },
  ]
  localStorage.setItem(KEY, JSON.stringify(sample))
}
