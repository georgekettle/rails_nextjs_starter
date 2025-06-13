'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { toast } from 'sonner'

/**
 * Displays toast notifications based on URL parameters
 * 
 * Supports two types of notifications:
 * - Success messages via ?notice=message
 * - Error messages via ?alert=message
 * 
 * The component automatically cleans up URL parameters after displaying the toast
 * to keep the URL clean and prevent notifications from showing again on refresh.
 */
export function ToastNotificationsFromUrl() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const notice = searchParams.get('notice')
    const alert = searchParams.get('alert')
    
    // Create a new URLSearchParams instance for manipulation
    const params = new URLSearchParams(searchParams)
    let hasNotification = false

    if (notice) {
      toast.success(decodeURIComponent(notice))
      params.delete('notice')
      hasNotification = true
    }

    if (alert) {
      toast.error(decodeURIComponent(alert))
      params.delete('alert')
      hasNotification = true
    }

    // Clean up the URL if we displayed any notifications
    if (hasNotification) {
      // Preserve other query parameters while removing notice/alert
      const newQuery = params.toString()
      const newUrl = newQuery ? `${pathname}?${newQuery}` : pathname
      router.replace(newUrl)
    }
  }, [searchParams, router, pathname])

  return null
}