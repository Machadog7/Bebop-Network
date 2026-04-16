import React, { createContext, useState, useContext, useCallback } from 'react'
import { generateId } from '../utils/formatters.js'

export const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [theme, setTheme] = useState('dark')
  const [notifications, setNotifications] = useState([])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  const addNotification = useCallback((msg, type = 'info') => {
    const notif = { id: generateId(), msg, type, createdAt: Date.now() }
    setNotifications((prev) => [notif, ...prev].slice(0, 20))
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== notif.id))
    }, 4000)
  }, [])

  const clearNotifications = useCallback(() => setNotifications([]), [])

  return (
    <AppContext.Provider value={{ theme, toggleTheme, notifications, addNotification, clearNotifications }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
