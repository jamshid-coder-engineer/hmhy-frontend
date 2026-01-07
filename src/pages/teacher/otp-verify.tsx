import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent } from '../../components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { toast } from 'sonner'
import { request } from '../../config/request'

const otpFormSchema = z.object({
  email: z.string().email('Invalid email'),
  phoneNumber: z.string().min(9, 'Phone number minimum 9 digits'),
  password: z.string().min(6, 'Password minimum 6 characters'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

export const TeacherOTPVerify = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [step, setStep] = useState<'send' | 'verify'>('send')
  const [isLoading, setIsLoading] = useState(false)
  
  const emailFromURL = searchParams.get('email') || ''
  
  const form = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      email: emailFromURL,
      phoneNumber: '',
      password: '',
      otp: '',
    },
  })

  // Send OTP
  const handleSendOTP = async (values: { email: string; phoneNumber: string; password: string }) => {
    setIsLoading(true)
    try {
      const response = await request.post('/teacher/google/send-otp', {
        email: values.email,
        phoneNumber: values.phoneNumber,
        password: values.password,
      })

      toast.success(response.data.message || 'OTP sent to your email!')
      setStep('verify')
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to send OTP')
    } finally {
      setIsLoading(false)
    }
  }

  // Verify OTP
  const handleVerifyOTP = async (values: z.infer<typeof otpFormSchema>) => {
    setIsLoading(true)
    try {
      const response = await request.post('/teacher/google/verify-otp', {
        email: values.email,
        otp: values.otp,
      })

      toast.success(response.data.message || 'Account activated!')
      
      setTimeout(() => {
        navigate('/teacher/login')
      }, 2000)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Invalid OTP')
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = (values: z.infer<typeof otpFormSchema>) => {
    if (step === 'send') {
      handleSendOTP(values)
    } else {
      handleVerifyOTP(values)
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

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              {/* Email (readonly) */}
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} disabled className='bg-gray-100' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {step === 'send' ? (
                <>
                  {/* Phone Number */}
                  <FormField
                    control={form.control}
                    name='phoneNumber'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder='+998901234567'
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password */}
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type='password'
                            placeholder='Create a password'
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type='submit' className='w-full' disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send OTP'}
                  </Button>
                </>
              ) : (
                <>
                  {/* OTP */}
                  <FormField
                    control={form.control}
                    name='otp'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OTP Code</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder='Enter 6-digit code'
                            maxLength={6}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type='submit' className='w-full' disabled={isLoading}>
                    {isLoading ? 'Verifying...' : 'Verify & Activate'}
                  </Button>

                  <Button 
                    type='button' 
                    variant='outline' 
                    className='w-full'
                    onClick={() => setStep('send')}
                  >
                    Back
                  </Button>
                </>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}