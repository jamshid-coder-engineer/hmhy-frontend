import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

export const TeacherDashboard = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  useEffect(() => {
    if (token) {
      // Token'ni localStorage'ga saqlash
      localStorage.setItem('token', token)
      localStorage.setItem('role', 'teacher')
      
      // URL'dan token'ni o'chirish
      navigate('/teacher/dashboard', { replace: true })
    }
  }, [token, navigate])

  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8'>Teacher Dashboard 🎓</h1>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='bg-white p-6 rounded-lg shadow'>
            <h3 className='text-lg font-semibold mb-2'>My Lessons</h3>
            <p className='text-3xl font-bold text-blue-600'>0</p>
          </div>
          
          <div className='bg-white p-6 rounded-lg shadow'>
            <h3 className='text-lg font-semibold mb-2'>Students</h3>
            <p className='text-3xl font-bold text-green-600'>0</p>
          </div>
          
          <div className='bg-white p-6 rounded-lg shadow'>
            <h3 className='text-lg font-semibold mb-2'>Earnings</h3>
            <p className='text-3xl font-bold text-yellow-600'>0 so'm</p>
          </div>
        </div>

        <div className='mt-8 bg-white p-6 rounded-lg shadow'>
          <h2 className='text-2xl font-bold mb-4'>Welcome!</h2>
          <p className='text-gray-600'>
            Teacher dashboard is under construction. Coming soon!
          </p>
        </div>
      </div>
    </div>
  )
}