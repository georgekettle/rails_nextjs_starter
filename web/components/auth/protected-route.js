'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/auth'

export function ProtectedRoute({ children }) {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/login?alert=Please login to access this page')
    }
  }, [user, loading, router])

  if (loading) {
    return <div>Loading...</div> // Or your loading component
  }

  if (!user) {
    return null
  }

  return children
}
