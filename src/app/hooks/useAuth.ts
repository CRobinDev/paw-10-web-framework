"use client"

import { useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
  role: string
}

export default function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token")
      
      if (!token) {
        setLoggedIn(false)
        setUser(null)
        setLoading(false)
        return
      }

      try {
        // Kirim token ke backend untuk validasi dan ekstrak data user
        const response = await fetch('/api/middleware', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          setLoggedIn(true)
          setUser(data.user) 
        } else {
         
          localStorage.removeItem("token")
          document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
          setLoggedIn(false)
          setUser(null)
        }
      } catch (error) {
        console.error('Token validation error:', error)
        localStorage.removeItem("token")
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        setLoggedIn(false)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    validateToken()
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    setLoggedIn(false)
    setUser(null)
  }

  return { 
    loggedIn, 
    user, 
    loading, 
    logout 
  }
}