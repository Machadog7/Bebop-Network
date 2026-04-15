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
    localStorage.setItem(SESSION_KEY, JSON.stringify(found))
    setUser(found)
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
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser))
    setUser(newUser)
    return { user: newUser }
  }, [])

  const updateSession = useCallback((updates) => {
    const updated = { ...user, ...updates }
    localStorage.setItem(SESSION_KEY, JSON.stringify(updated))
    setUser(updated)
  }, [user])

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated: !!user, updateSession }}>
      {children}
    </AuthContext.Provider>
  )
}
