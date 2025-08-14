'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { User, LogOut, Settings, ChevronDown, Menu, X } from 'lucide-react'
import { Button } from './button'
import { useSession } from '@/hooks/use-session'
import { authClient } from '@/libs/auth-client'
import { useRouter } from 'next/navigation'

export function Navbar() {
  const { data: session, isLoading } = useSession()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
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
      setIsDropdownOpen(false)
      setIsMobileMenuOpen(false)
      router.push('/')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const handleProfile = () => {
    setIsDropdownOpen(false)
    setIsMobileMenuOpen(false)
    router.push('/profile')
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center font-extrabold text-blue-500 gap-2 font-sans text-lg">
              <Image
                src="/polygon.png"
                alt="TodoApp"
                width={28}
                height={28}
                className="text-gray-900"
              />
              To-Do
            </Link>
            
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center">
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="h-8 w-16 animate-pulse rounded bg-gray-200"></div>
                <div className="h-8 w-16 animate-pulse rounded bg-gray-200"></div>
              </div>
            ) : session?.user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors border border-gray-200"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden lg:block">{session.user.email.split('@')[0]}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-md border border-gray-200 bg-white p-1 shadow-lg">
                    <div className="px-3 py-2 text-sm border-b border-gray-100">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium text-gray-900">{session.user.email.split('@')[0]}</p>
                        <p className="text-xs text-gray-500">{session.user.email}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleProfile}
                      className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Profile
                    </button>
                    
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/auth?mode=signin">
                  <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-gray-50">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth?mode=signup">
                  <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 py-3 space-y-2">
              {isLoading ? (
                <div className="flex flex-col gap-2">
                  <div className="h-10 w-full animate-pulse rounded bg-gray-200"></div>
                  <div className="h-10 w-full animate-pulse rounded bg-gray-200"></div>
                </div>
              ) : session?.user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-md">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{session.user.email.split('@')[0]}</p>
                      <p className="text-xs text-gray-500">{session.user.email}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleProfile}
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Profile
                  </button>
                  
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link 
                    href="/auth?mode=signin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block"
                  >
                    <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50">
                      Sign In
                    </Button>
                  </Link>
                  <Link 
                    href="/auth?mode=signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block"
                  >
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}