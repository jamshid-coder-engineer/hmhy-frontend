import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { request } from '../../../config/request'
import { toast } from 'sonner'
import type { Role } from '../../auth/types'

interface TeacherProfile {
  id: string
  email: string
  fullName: string
  phoneNumber?: string
  imageUrl?: string
  specification?: string
  level?: string
  experience?: number
  hourPrice?: number
  rating?: number
  portfolioLink?: string
  description?: string
  cardNumber?: string
}

export const TeacherDashboard = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<TeacherProfile | null>(null)
  const [loading, setLoading] = useState(true)

  // Handle token from Google OAuth redirect
  useEffect(() => {
    const tokenFromURL = searchParams.get('token')
    
    if (tokenFromURL) {
      localStorage.setItem('token', tokenFromURL)
      localStorage.setItem('role', 'teacher')
      navigate('/teacher/dashboard', { replace: true })
    }
  }, [searchParams, navigate])

useEffect(() => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role') as Role

  console.log('🟣 TEACHER DASHBOARD')
  console.log('🟡 TOKEN:', token)
  console.log('🟡 ROLE:', role)

  if (!token || role !== 'teacher') {
    console.log('🔴 REDIRECT TO /')
    navigate('/')
  }
}, [])


  // Fetch teacher profile
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token')
      
      if (!token) {
        toast.error('Please login first')
        navigate('/teacher/login')
        return
      }

      try {
        setLoading(true)
        const res = await request.get('/teacher/me')
        const teacherData = res.data?.data || res.data
        setProfile(teacherData)
      } catch (err: any) {
        console.error('Profile fetch error:', err)
        
        if (err?.response?.status === 401) {
          toast.error('Session expired. Please login again.')
          localStorage.removeItem('token')
          localStorage.removeItem('role')
          navigate('/teacher/login')
        } else {
          toast.error('Failed to load profile')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [navigate])

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      {/* Welcome Section */}
      <div className='bg-white rounded-lg shadow p-6 mb-8'>
        <div className='flex items-center gap-6'>
          {profile?.imageUrl ? (
            <img
              src={profile.imageUrl}
              alt={profile.fullName}
              className='w-20 h-20 rounded-full object-cover'
            />
          ) : (
            <div className='w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold'>
              {profile?.fullName?.charAt(0) || 'T'}
            </div>
          )}
          <div>
            <h2 className='text-3xl font-bold text-gray-900'>
              Welcome, {profile?.fullName || 'Teacher'}! 👋
            </h2>
            <p className='text-gray-600 mt-1'>{profile?.email}</p>
            {profile?.phoneNumber && (
              <p className='text-gray-600'>{profile.phoneNumber}</p>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <div className='bg-white p-6 rounded-lg shadow'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Rating</p>
              <p className='text-3xl font-bold text-yellow-600 mt-2'>
                {profile?.rating ? `${profile.rating.toFixed(1)} ⭐` : '—'}
              </p>
            </div>
            <div className='w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center'>
              <span className='text-2xl'>⭐</span>
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Experience</p>
              <p className='text-3xl font-bold text-green-600 mt-2'>
                {profile?.experience ? `${profile.experience} years` : '—'}
              </p>
            </div>
            <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center'>
              <span className='text-2xl'>📚</span>
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Hourly Rate</p>
              <p className='text-3xl font-bold text-blue-600 mt-2'>
                {profile?.hourPrice ? `${profile.hourPrice.toLocaleString()} so'm` : '—'}
              </p>
            </div>
            <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
              <span className='text-2xl'>💰</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-white rounded-lg shadow p-6'>
          <h3 className='text-xl font-bold mb-4'>Profile Information</h3>
          <div className='space-y-3'>
            <div>
              <p className='text-sm text-gray-600'>Specialization</p>
              <p className='font-medium'>{profile?.specification || 'Not set'}</p>
            </div>
            <div>
              <p className='text-sm text-gray-600'>Level</p>
              <p className='font-medium'>{profile?.level || 'Not set'}</p>
            </div>
            <div>
              <p className='text-sm text-gray-600'>Portfolio</p>
              {profile?.portfolioLink ? (
                <a
                  href={profile.portfolioLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 hover:underline'
                >
                  View Portfolio
                </a>
              ) : (
                <p className='font-medium'>Not set</p>
              )}
            </div>
            <div>
              <p className='text-sm text-gray-600'>Card Number</p>
              <p className='font-medium'>{profile?.cardNumber || 'Not set'}</p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow p-6'>
          <h3 className='text-xl font-bold mb-4'>About</h3>
          <p className='text-gray-700'>
            {profile?.description || 'No description available.'}
          </p>
        </div>
      </div>

      {/* Coming Soon */}
      <div className='mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-8 text-white text-center'>
        <h3 className='text-2xl font-bold mb-2'>More Features Coming Soon! 🚀</h3>
        <p className='text-blue-100'>
          Schedule management, student tracking, and earnings analytics are under development.
        </p>
      </div>
    </div>
  )
}