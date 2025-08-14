import { useEffect, useState } from 'react'
import { authClient } from '@/libs/auth-client'

interface User {
  id: string
  email: string
  name: string
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
  image?: string | null
}

interface SessionData {
  user: User
  session: {
    id: string
    userId: string
    expiresAt: Date
    token: string
    ipAddress?: string | null
    userAgent?: string | null
  }
}

export function useSession() {
  const [session, setSession] = useState<SessionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data } = await authClient.getSession()
        setSession(data)
      } catch (error) {
        console.error('Failed to get session:', error)
        setSession(null)
      } finally {
        setIsLoading(false)
      }
    }

    getSession()

    // Better auth uses a different pattern for session changes
    // We'll poll for session changes or use the useSession hook from better-auth if available
    const interval = setInterval(async () => {
      try {
        const { data } = await authClient.getSession()
        setSession(data)
      } catch (error) {
        setSession(null)
      }
    }, 30000) // Check every 30 seconds

    return () => {
      clearInterval(interval)
    }
  }, [])

  return { data: session, isLoading }
}