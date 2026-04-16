export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) return 'E-mail é obrigatório'
  if (!re.test(email)) return 'E-mail inválido'
  return null
}

export function validateUsername(username) {
  if (!username) return 'Nome de usuário é obrigatório'
  if (username.length < 3) return 'Nome de usuário deve ter pelo menos 3 caracteres'
  if (username.length > 20) return 'Nome de usuário deve ter no máximo 20 caracteres'
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Nome de usuário só pode conter letras, números e _'
  return null
}

export function validatePassword(password) {
  if (!password) return 'Senha é obrigatória'
  if (password.length < 6) return 'Senha deve ter pelo menos 6 caracteres'
  return null
}

export function validateRequired(value, fieldName) {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} é obrigatório`
  }
  return null
}
