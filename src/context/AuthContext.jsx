import React, { createContext, useState, useEffect, useCallback } from 'react'
import { getUserByUsername, createUser } from '../services/localStorage/users.js'

export const AuthContext = createContext(null)

const SESSION_KEY = 'bebop_current_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const login = useCallback((username, password) => {
    const found = getUserByUsername(username)
    if (!found) return { error: 'Usuário não encontrado' }
    if (found.password !== password) return { error: 'Senha incorreta' }
    const { password: _, ...safeUser } = found
    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser))
    setUser(safeUser)
    return { user: safeUser }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }, [])

  const register = useCallback((userData) => {
    const existing = getUserByUsername(userData.username)
    if (existing) return { error: 'Nome de usuário já está em uso' }
    const newUser = createUser(userData)
    const { password: _, ...safeUser } = newUser
    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser))
    setUser(safeUser)
    return { user: safeUser }
  }, [])

  const updateSession = useCallback((updates) => {
    const { password: _, ...safeUpdates } = updates
    const updated = { ...user, ...safeUpdates }
    localStorage.setItem(SESSION_KEY, JSON.stringify(updated))
    setUser(updated)
  }, [user])

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated: !!user, updateSession }}>
      {children}
    </AuthContext.Provider>
  )
}
