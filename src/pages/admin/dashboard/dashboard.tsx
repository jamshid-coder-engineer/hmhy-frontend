import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  DollarSign,
  CheckCircle,
  XCircle,
  Star,
  // Clock,
  Loader2
} from 'lucide-react'
import { useDashboardStats } from '../../../hooks/use-dashboard-stats'
import { Link } from 'react-router-dom'

export const Dashboard = () => {
  const { data, isLoading, isError } = useDashboardStats()

  const username = localStorage.getItem('username') || 'Admin'

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-[80vh]'>
        <div className='flex flex-col items-center gap-3'>
          <Loader2 className='w-10 h-10 animate-spin text-blue-600' />
          <p className='text-gray-600'>Yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className='flex items-center justify-center h-[80vh]'>
        <div className='text-center'>
          <XCircle className='w-16 h-16 text-red-500 mx-auto mb-4' />
          <p className='text-xl font-semibold text-gray-700'>Ma'lumotlarni yuklashda xatolik</p>
          <p className='text-gray-500 mt-2'>Iltimos, qaytadan urinib ko'ring</p>
        </div>
      </div>
    )
  }

  const stats = data.data

  // Stats cards ma'lumotlari
  const statsCards = [
    {
      title: 'Ustozlar',
      value: stats.totalTeachers,
      subtitle: `${stats.totalTeachers} faol`,
      icon: Users,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Talabalar',
      value: stats.totalStudents,
      subtitle: `${stats.totalStudents} faol`,
      icon: GraduationCap,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Darslar',
      value: stats.totalLessons,
      subtitle: 'Jami darslar',
      icon: BookOpen,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Daromad',
      value: stats.totalRevenue.toLocaleString('uz-UZ'),
      subtitle: 'Jami daromad (so\'m)',
      icon: DollarSign,
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ]

  const tezkorHarakatlar = [
    { 
      title: 'Ustozlar', 
      icon: Users, 
      color: 'bg-blue-100', 
      iconColor: 'text-blue-600',
      link: '/app/admin/teacher'
    },
    { 
      title: 'Talabalar', 
      icon: GraduationCap, 
      color: 'bg-green-100', 
      iconColor: 'text-green-600',
      link: '/app/admin/student'
    },
    { 
      title: 'Darslar', 
      icon: BookOpen, 
      color: 'bg-purple-100', 
      iconColor: 'text-purple-600',
      link: '/app/admin/lesson'
    },
    { 
      title: "To'lovlar", 
      icon: DollarSign, 
      color: 'bg-yellow-100', 
      iconColor: 'text-yellow-600',
      link: '/app/admin/payment'
    }
  ]

  return (
    <div className='space-y-6'>
      <Card className='bg-gradient-to-r from-cyan-500 to-blue-600 border-none shadow-lg'>
        <CardContent className='p-8 text-white'>
          <h1 className='text-3xl font-bold mb-2'>
            Xush kelibsiz, {username}! 👋
          </h1>
          <p className='text-white/90'>
            Bugungi platformangiz statistikasi
          </p>
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {statsCards.map((stat) => (
          <Card key={stat.title} className='hover:shadow-lg transition-shadow'>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className='text-sm font-medium text-gray-600'>
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold text-gray-900'>{stat.value}</div>
              <p className='text-xs text-gray-500 mt-1'>{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-green-600'>
              <GraduationCap className='w-5 h-5' />
              Talabalar
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='flex items-center justify-between p-3 rounded-lg border bg-green-50 text-green-600 border-green-200'>
              <div className='flex items-center gap-2'>
                <CheckCircle className='w-5 h-5' />
                <span className='font-medium'>Faol</span>
              </div>
              <span className='text-xl font-bold'>{stats.totalStudents}</span>
            </div>
            <div className='flex items-center justify-between p-3 rounded-lg border bg-red-50 text-red-600 border-red-200'>
              <div className='flex items-center gap-2'>
                <XCircle className='w-5 h-5' />
                <span className='font-medium'>Bloklangan</span>
              </div>
              <span className='text-xl font-bold'>0</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-blue-600'>
              <Users className='w-5 h-5' />
              Ustozlar
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='flex items-center justify-between p-3 rounded-lg border bg-blue-50 text-blue-600 border-blue-200'>
              <div className='flex items-center gap-2'>
                <CheckCircle className='w-5 h-5' />
                <span className='font-medium'>Jami</span>
              </div>
              <span className='text-xl font-bold'>{stats.totalTeachers}</span>
            </div>
            <div className='flex items-center justify-between p-3 rounded-lg border bg-purple-50 text-purple-600 border-purple-200'>
              <div className='flex items-center gap-2'>
                <Star className='w-5 h-5 fill-current' />
                <span className='font-medium'>O'rtacha reyting</span>
              </div>
              <span className='text-xl font-bold'>4.5</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-purple-600'>
              <BookOpen className='w-5 h-5' />
              Darslar & Daromad
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='flex items-center justify-between p-3 rounded-lg border bg-purple-50 text-purple-600 border-purple-200'>
              <div className='flex items-center gap-2'>
                <BookOpen className='w-5 h-5' />
                <span className='font-medium'>Jami darslar</span>
              </div>
              <span className='text-xl font-bold'>{stats.totalLessons}</span>
            </div>
            <div className='flex items-center justify-between p-3 rounded-lg border bg-yellow-50 text-yellow-600 border-yellow-200'>
              <div className='flex items-center gap-2'>
                <DollarSign className='w-5 h-5' />
                <span className='font-medium'>Daromad</span>
              </div>
              <span className='text-xl font-bold'>
                {(stats.totalRevenue / 1000).toFixed(1)}K
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

    <Card>
  <CardHeader>
    <CardTitle>Tezkor harakatlar</CardTitle>
  </CardHeader>
  <CardContent>
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
      {tezkorHarakatlar.map((item) => (
        <Link
          key={item.title}
          to={item.link}
          className={`${item.color} p-6 rounded-lg hover:scale-105 transition-transform cursor-pointer border border-gray-200 block`}
        >
          <item.icon className={`w-8 h-8 ${item.iconColor} mx-auto mb-2`} />
          <p className='text-sm font-medium text-gray-700 text-center'>
            {item.title}
          </p>
        </Link>
      ))}
    </div>
  </CardContent>
</Card>
    </div>
  )
}