import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { request } from '../../../config/request'
import { toast } from 'sonner'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'

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
  portfolioLink?: string
  description?: string
  cardNumber?: string
}

export const TeacherProfile = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState<TeacherProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    specification: '',
    level: '',
    experience: 0,
    hourPrice: 0,
    portfolioLink: '',
    description: '',
    cardNumber: '',
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const res = await request.get('/teacher/me')
      const data = res.data?.data || res.data
      setProfile(data)
      setFormData({
        fullName: data.fullName || '',
        phoneNumber: data.phoneNumber || '',
        specification: data.specification || '',
        level: data.level || '',
        experience: data.experience || 0,
        hourPrice: data.hourPrice || 0,
        portfolioLink: data.portfolioLink || '',
        description: data.description || '',
        cardNumber: data.cardNumber || '',
      })
    } catch (err) {
      toast.error('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await request.patch('/teacher/update', formData)
      toast.success('Profile updated successfully!')
      setEditing(false)
      fetchProfile()
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
      </div>
    )
  }

  return (
    <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <div className='bg-white rounded-lg shadow p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold'>My Profile</h1>
          {!editing ? (
            <Button onClick={() => setEditing(true)}>Edit Profile</Button>
          ) : (
            <div className='flex gap-2'>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </Button>
              <Button variant='outline' onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          )}
        </div>

        <div className='space-y-4'>
          <div>
            <label className='text-sm font-medium'>Full Name</label>
            <Input
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              disabled={!editing}
              className='mt-1'
            />
          </div>

          <div>
            <label className='text-sm font-medium'>Email (cannot be changed)</label>
            <Input value={profile?.email || ''} disabled className='mt-1 bg-gray-100' />
          </div>

          <div>
            <label className='text-sm font-medium'>Phone Number</label>
            <Input
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              disabled={!editing}
              className='mt-1'
            />
          </div>

          <div>
            <label className='text-sm font-medium'>Specialization</label>
            <Input
              value={formData.specification}
              onChange={(e) => setFormData({ ...formData, specification: e.target.value })}
              disabled={!editing}
              className='mt-1'
            />
          </div>

          <div>
            <label className='text-sm font-medium'>Level</label>
            <Input
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              disabled={!editing}
              className='mt-1'
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='text-sm font-medium'>Experience (years)</label>
              <Input
                type='number'
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: Number(e.target.value) })}
                disabled={!editing}
                className='mt-1'
              />
            </div>

            <div>
              <label className='text-sm font-medium'>Hourly Price (so'm)</label>
              <Input
                type='number'
                value={formData.hourPrice}
                onChange={(e) => setFormData({ ...formData, hourPrice: Number(e.target.value) })}
                disabled={!editing}
                className='mt-1'
              />
            </div>
          </div>

          <div>
            <label className='text-sm font-medium'>Portfolio Link</label>
            <Input
              value={formData.portfolioLink}
              onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })}
              disabled={!editing}
              className='mt-1'
            />
          </div>

          <div>
            <label className='text-sm font-medium'>Card Number</label>
            <Input
              value={formData.cardNumber}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              disabled={!editing}
              className='mt-1'
            />
          </div>

          <div>
            <label className='text-sm font-medium'>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={!editing}
              rows={4}
              className='w-full mt-1 px-3 py-2 border rounded-md'
            />
          </div>
        </div>
      </div>
    </div>
  )
}