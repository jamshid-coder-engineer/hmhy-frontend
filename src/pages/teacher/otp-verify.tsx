import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Card, CardContent } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { toast } from 'sonner'
import { request } from '../../config/request'

export const TeacherOTPVerify = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [step, setStep] = useState<'send' | 'verify'>('send')
  const [isLoading, setIsLoading] = useState(false)

  const emailFromURL = searchParams.get('email') || ''
  
  // Form states
  const [email, setEmail] = useState(emailFromURL)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')

  console.log('📧 Email from URL:', emailFromURL)

  useEffect(() => {
    if (!emailFromURL) {
      toast.error('Email not found. Please try logging in again.')
      navigate('/teacher/login')
    }
  }, [emailFromURL, navigate])

  // Send OTP
  const handleSendOTP = async () => {
    console.log('🚀 Send OTP clicked!')
    console.log('📤 Data:', { email, phoneNumber, password: '***' })

    // Basic validation
    if (!phoneNumber || phoneNumber.length < 9) {
      toast.error('Please enter a valid phone number')
      return
    }

    if (!password || password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)
    try {
      const response = await request.post('/teacher/google/send-otp', {
        email,
        phoneNumber,
        password,
      })

      console.log('✅ OTP sent:', response.data)
      toast.success(response.data.message || 'OTP sent to your email!')
      setStep('verify')
    } catch (error: any) {
      console.error('❌ Error:', error)
      const message = error?.response?.data?.message || 'Failed to send OTP'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  // Verify OTP
  const handleVerifyOTP = async () => {
    console.log('🚀 Verify OTP clicked!')
    console.log('📤 OTP:', otp)

    if (!otp || otp.length !== 6) {
      toast.error('Please enter a 6-digit OTP')
      return
    }

    setIsLoading(true)
    try {
      const response = await request.post('/teacher/google/verify-otp', {
        email,
        otp,
      })

      console.log('✅ Verified:', response.data)
      toast.success(response.data.message || 'Account activated!')

      setTimeout(() => {
        navigate('/teacher/login')
      }, 2000)
    } catch (error: any) {
      console.error('❌ Error:', error)
      const message = error?.response?.data?.message || 'Invalid OTP'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='fixed bg-gradient-to-br from-blue-50 to-indigo-100 inset-0 flex items-center justify-center'>
      <Card className='w-[500px] shadow-2xl'>
        <CardContent className='p-8'>
          <div className='text-center mb-6'>
            <h2 className='text-2xl font-bold'>
              {step === 'send' ? 'Complete Your Registration' : 'Verify OTP'}
            </h2>
            <p className='text-gray-600 mt-2'>
              {step === 'send'
                ? 'Enter your phone number and create a password'
                : 'Enter the 6-digit code sent to your email'}
            </p>
          </div>

          <div className='space-y-4'>
            {/* Email */}
            <div>
              <label className='text-sm font-medium'>Email</label>
              <Input
                value={email}
                disabled
                className='bg-gray-100 mt-1'
              />
            </div>

            {step === 'send' ? (
              <>
                {/* Phone Number */}
                <div>
                  <label className='text-sm font-medium'>Phone Number</label>
                  <Input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder='+998901234567'
                    disabled={isLoading}
                    className='mt-1'
                  />
                </div>

                {/* Password */}
                <div>
                  <label className='text-sm font-medium'>Password</label>
                  <Input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Create a password (min 6 characters)'
                    disabled={isLoading}
                    className='mt-1'
                  />
                </div>

                <Button
                  onClick={handleSendOTP}
                  className='w-full'
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </Button>

                <Button
                  onClick={() => navigate('/teacher/login')}
                  variant='outline'
                  className='w-full'
                  disabled={isLoading}
                >
                  Back to Login
                </Button>
              </>
            ) : (
              <>
                {/* OTP */}
                <div>
                  <label className='text-sm font-medium'>OTP Code</label>
                  <Input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder='Enter 6-digit code'
                    maxLength={6}
                    disabled={isLoading}
                    className='mt-1'
                  />
                </div>

                <Button
                  onClick={handleVerifyOTP}
                  className='w-full'
                  disabled={isLoading}
                >
                  {isLoading ? 'Verifying...' : 'Verify & Complete'}
                </Button>

                <Button
                  onClick={() => setStep('send')}
                  variant='outline'
                  className='w-full'
                  disabled={isLoading}
                >
                  Resend OTP
                </Button>
              </>
            )}
          </div>

          <div className='mt-6 text-center text-sm text-gray-500'>
            <p>After verification, your account will be pending admin approval.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
