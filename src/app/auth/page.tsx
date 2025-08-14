'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { SignInForm } from '@/components/auth/sign-in-form'
import { SignUpForm } from '@/components/auth/sign-up-form'

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode') || 'signin'
  const [currentMode, setCurrentMode] = useState(mode)

  const isSignUp = currentMode === 'signup'

  const handleSuccess = () => {
    router.push('/todos')
  }

  const handleError = (error: string) => {
    console.error('Auth error:', error)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-blue-600">
            {isSignUp ? 'Sign up to get started with TodoApp' : 'Sign in to access your account'}
          </p>
        </div>
        
        {isSignUp ? (
          <SignUpForm 
            onSuccess={handleSuccess}
            onError={handleError}
          />
        ) : (
          <SignInForm 
            onSuccess={handleSuccess}
            onError={handleError}
          />
        )}
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <Link 
                  href="/auth?mode=signin" 
                  className="text-blue-600 hover:text-blue-700 font-medium"
                  onClick={() => setCurrentMode('signin')}
                >
                  Sign in
                </Link>
              </>
            ) : (
              <>
                Don&apos;t have an account?{' '}
                <Link 
                  href="/auth?mode=signup" 
                  className="text-blue-600 hover:text-blue-700 font-medium"
                  onClick={() => setCurrentMode('signup')}
                >
                  Sign up
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}