'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Settings, LogOut, ChevronDown } from 'lucide-react'
import { Button } from './button'
import { authClient } from '@/libs/auth-client'

interface UserDropdownProps {
  userEmail: string
}

export function UserDropdown({ userEmail }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSignOut = async () => {
    try {
      await authClient.signOut()
      setIsOpen(false)
      router.push('/')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const handleProfile = () => {
    setIsOpen(false)
    router.push('/profile')
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 h-8 data-[state=open]:bg-accent"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
          <User className="h-3 w-3" />
        </div>
        <span className="hidden text-sm font-medium md:inline-block">
          {userEmail.split('@')[0]}
        </span>
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-1 w-56 rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
          <div className="px-2 py-1.5 text-sm font-medium">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{userEmail.split('@')[0]}</p>
              <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
            </div>
          </div>
          <div className="h-px bg-border my-1" />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleProfile}
            className="w-full justify-start px-2 py-1.5 h-auto font-normal"
          >
            <Settings className="mr-2 h-4 w-4" />
            Profile
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="w-full justify-start px-2 py-1.5 h-auto font-normal text-red-600 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      )}
    </div>
  )
}