import { useEffect } from 'react'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'

export const TeacherLogin = () => {
  const [searchParams] = useSearchParams()
  
  useEffect(() => {
    const error = searchParams.get('error')
    if (error) {
      toast.error(decodeURIComponent(error))
    }
  }, [searchParams])

  // ✅ To'g'rilangan handleGoogleLogin
  const handleGoogleLogin = () => {
    // Backend'dagi Google OAuth endpoint'ga redirect
    window.location.href = `${BASE_URL}/teacher/google`
  }

  return (
    <div className='fixed bg-gradient-to-br from-blue-50 to-indigo-100 inset-0 flex items-center justify-center'>
      <Card className='w-[450px] shadow-2xl'>
        <CardContent className='p-8'>
          {/* Logo */}
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold text-gray-800'>HMHY</h1>
            <p className='text-gray-500 mt-2'>Teacher Portal</p>
          </div>

          {/* Welcome Text */}
          <div className='text-center mb-8'>
            <h2 className='text-2xl font-semibold text-gray-800'>
              Welcome Back! 👋
            </h2>
            <p className='text-gray-600 mt-2'>
              Sign in with your Google account to continue
            </p>
          </div>

          {/* Google Login Button */}
          <Button
            onClick={handleGoogleLogin}
            className='w-full h-12 flex items-center justify-center gap-3 bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all'
          >
            <svg className='w-6 h-6' viewBox='0 0 24 24'>
              <path
                fill='#4285F4'
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
              />
              <path
                fill='#34A853'
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
              />
              <path
                fill='#FBBC05'
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
              />
              <path
                fill='#EA4335'
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
              />
            </svg>
            Continue with Google
          </Button>

          {/* Info */}
          <div className='mt-8 text-center'>
            <p className='text-xs text-gray-500'>
              By continuing, you agree to HMHY's Terms of Service and Privacy Policy
            </p>
          </div>

          {/* Admin Link */}
          <div className='mt-6 text-center'>
            <a 
              href='/' 
              className='text-sm text-blue-600 hover:underline'
            >
              ← Login as Admin
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}