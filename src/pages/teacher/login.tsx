import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { request } from '../../config/request'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'


export const TeacherLogin = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState('saribayevj1666@gmail.com')
  const [password, setPassword] = useState('qwerty12')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async () => {
  if (!email || !password) {
    toast.error('Please fill all fields')
    return
  }

  setLoading(true)
  try {
   const res = await request.post('/signin/teacher', { email, password })
email
console.log('LOGIN RESPONSE:', res.data)

const token = res.data.data

localStorage.setItem('token', token)
localStorage.setItem('role', 'teacher') 

toast.success('Login successful!')
navigate('/teacher/lesson')


  } catch (err: any) {
    toast.error(err?.response?.data?.message || 'Login failed')
  } finally {
    setLoading(false)
  }
}


 const handleGoogleLogin = () => {
  console.log('🔗 Redirecting to Google OAuth')
  window.location.href = `${BASE_URL}/api/v1/teacher/google`
}
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        width: '450px',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        padding: '40px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
            HMHY
          </h1>
          <p style={{ color: '#718096', marginTop: '8px' }}>Teacher Portal</p>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#2d3748' }}>
            Welcome Back! 👋
          </h2>
          <p style={{ color: '#718096', marginTop: '8px' }}>Sign in to continue</p>
        </div>

        <button
          onClick={handleGoogleLogin}
          type='button'
          style={{
            width: '100%',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            backgroundColor: 'white',
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '24px'
          }}
        >
          <span style={{ fontSize: '20px' }}>🔗</span>
          Continue with Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
          <span style={{ fontSize: '14px', color: '#718096' }}>or</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
            Email Address
          </label>
          <input
            type='email'
            autoComplete='email'
            placeholder='teacher@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              autoComplete='current-password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px 44px 12px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
            <button
              type='button'
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              disabled={loading}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                color: '#718096',
                padding: '4px'
              }}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          type='button'
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: loading ? '#718096' : '#1a202c',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '24px'
          }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <div style={{ textAlign: 'center', fontSize: '12px', color: '#718096', marginBottom: '16px' }}>
          By continuing, you agree to HMHY's Terms of Service and Privacy Policy
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href='/' style={{ fontSize: '14px', color: '#667eea', textDecoration: 'none' }}>
            ← Login as Admin
          </a>
        </div>
      </div>
    </div>
  )
}
