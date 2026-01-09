import { useEffect, useState } from 'react'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import  {request } from '../../config/request'

const BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'

export const TeacherLogin = () => {
  const [searchParams] = useSearchParams()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    try {
     const res = await request.post('/teacher/login', {
  email,
  password,
})

localStorage.setItem('token', res.data.token)

if (res.data.role === 'TEACHER') {
  window.location.href = '/teacher/dashboard'
} else {
  window.location.href = '/admin/dashboard'
}

      toast.success('Login successful')

      setTimeout(() => {
        window.location.href = '/teacher/dashboard'
      }, 300)
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const error = searchParams.get('error')
    if (error) {
      toast.error(decodeURIComponent(error))
    }
  }, [searchParams])

  const handleGoogleLogin = () => {
    window.location.href = `${BASE_URL}/teacher/google`
  }

  return (
    <div className='fixed bg-gradient-to-br from-blue-50 to-indigo-100 inset-0 flex items-center justify-center'>
      <Card className='w-[450px] shadow-2xl'>
        <CardContent className='p-8'>
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold text-gray-800'>HMHY</h1>
            <p className='text-gray-500 mt-2'>Teacher Portal</p>
          </div>

          <div className='text-center mb-8'>
            <h2 className='text-2xl font-semibold text-gray-800'>
              Welcome Back! 👋
            </h2>
            <p className='text-gray-600 mt-2'>
              Sign in to continue
            </p>
          </div>

          <Button
            onClick={handleGoogleLogin}
            className='w-full h-12 flex items-center justify-center gap-3 bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50'
          >
            Continue with Google
          </Button>

          <div className='flex items-center gap-3 my-6'>
            <div className='flex-1 h-px bg-gray-300' />
            <span className='text-sm text-gray-500'>or</span>
            <div className='flex-1 h-px bg-gray-300' />
          </div>

          <Input
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type='password'
            placeholder='Password'
            className='mt-3'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            className='w-full mt-4 bg-black text-white'
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>

          <div className='mt-8 text-center text-xs text-gray-500'>
            By continuing, you agree to HMHY's Terms of Service and Privacy Policy
          </div>

          <div className='mt-6 text-center'>
            <a href='/' className='text-sm text-blue-600 hover:underline'>
              ← Login as Admin
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
