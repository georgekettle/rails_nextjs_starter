'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '@/lib/api/auth'
import { ApiError } from '@/lib/api/client'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing token and validate it
    const token = localStorage.getItem('token')
    if (token) {
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const response = await authApi.getCurrentUser()
      setUser(response.data.user)
    } catch (error) {
      if (error instanceof ApiError) {
        // If token is invalid, it will be cleared in the API client
        console.error('Auth error:', error.message)
      } else {
        console.error('Unexpected error:', error)
      }
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await authApi.login({ email, password })
      const { user: userData, token } = response.data
      localStorage.setItem('token', token)
      setUser(userData)
      return { success: true }
    } catch (error) {
      if (error instanceof ApiError) {
        return { 
          success: false, 
          error: error.message,
          details: error.details
        }
      }
      return { 
        success: false, 
        error: 'An unexpected error occurred' 
      }
    }
  }

  const signUp = async (email, password, name) => {
    try {
      const response = await authApi.signup({ 
        email, 
        password,
        password_confirmation: password,
        name
      })
      const { user: userData, token } = response.data
      localStorage.setItem('token', token)
      setUser(userData)
      return { success: true }
    } catch (error) {
      if (error instanceof ApiError) {
        return { 
          success: false, 
          error: error.message,
          details: error.details
        }
      }
      return { 
        success: false, 
        error: 'An unexpected error occurred' 
      }
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Error during sign out:', error)
    } finally {
      setUser(null)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    }
  }

  const resetPassword = async ({ token, password }) => {
    try {
      const response = await authApi.resetPassword({ 
        token,
        password,
        password_confirmation: password
      })
      return { success: true }
    } catch (error) {
      if (error instanceof ApiError) {
        return { 
          success: false, 
          error: error.message,
          details: error.details
        }
      }
      return { 
        success: false, 
        error: 'An unexpected error occurred' 
      }
    }
  }

  const updateUser = async (data) => {
    try {
      const response = await authApi.updateUser(data)
      setUser(response.data.user)
      return { success: true }
    } catch (error) {
      if (error instanceof ApiError) {
        return { 
          success: false, 
          error: error.message,
          details: error.details
        }
      }
      return { 
        success: false, 
        error: 'An unexpected error occurred' 
      }
    }
  }

  const deleteUser = async ({ password_challenge }) => {
    try {
      await authApi.deleteUser({ password: password_challenge })
      setUser(null)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
      }
      return { success: true }
    } catch (error) {
      if (error instanceof ApiError) {
        return { 
          success: false, 
          error: error.message,
          details: error.details
        }
      }
      return { 
        success: false, 
        error: 'An unexpected error occurred' 
      }
    }
  }

  const updateEmail = async (data) => {
    try {
      const response = await authApi.updateEmail(data)
      setUser(response.data.user)
      return { success: true }
    } catch (error) {
      if (error instanceof ApiError) {
        return { 
          success: false, 
          error: error.message,
          details: error.details
        }
      }
      return { 
        success: false, 
        error: 'An unexpected error occurred' 
      }
    }
  }

  const updatePassword = async (data) => {
    try {
      await authApi.updatePassword(data)
      return { success: true }
    } catch (error) {
      if (error instanceof ApiError) {
        return { 
          success: false, 
          error: error.message,
          details: error.details
        }
      }
      return { 
        success: false, 
        error: 'An unexpected error occurred' 
      }
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      signUp,
      logout,
      resetPassword,
      updateUser,
      deleteUser,
      updateEmail,
      updatePassword
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 