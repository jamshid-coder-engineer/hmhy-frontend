import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card'
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  DollarSign,
  CheckCircle,
  XCircle,
  Star,
  Loader2,
  TrendingUp,
  ArrowRight,
  LayoutDashboard
} from 'lucide-react'
import { useDashboardStats } from '../../../hooks/use-dashboard-stats'
import { Link } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'

export const Dashboard = () => {
  const { data, isLoading, isError } = useDashboardStats()
  const username = localStorage.getItem('username') || 'Admin'

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-[80vh]'>
        <div className='flex flex-col items-center gap-4'>
          <div className='relative'>
            <Loader2 className='w-12 h-12 animate-spin text-blue-600' />
            <LayoutDashboard className='w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-400' />
          </div>
          <p className='text-slate-500 font-bold animate-pulse uppercase tracking-widest text-xs'>Platforma yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className='flex items-center justify-center h-[80vh] p-6'>
        <Card className='max-w-md w-full border-none shadow-2xl text-center p-8'>
          <div className='w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6'>
            <XCircle className='w-10 h-10 text-red-500' />
          </div>
          <h2 className='text-2xl font-black text-slate-800 mb-2'>Xatolik yuz berdi</h2>
          <p className='text-slate-500 font-medium mb-6'>Ma'lumotlarni olishda muammo paydo bo'ldi. Iltimos, internetingizni tekshiring.</p>
          <Button onClick={() => window.location.reload()} className='w-full bg-slate-900 font-bold'>Qayta urinish</Button>
        </Card>
      </div>
    )
  }

  const stats = data.data

  const statsCards = [
    {
      title: 'Jami Ustozlar',
      value: stats.totalTeachers,
      trend: '+2 yangi',
      icon: Users,
      color: 'blue',
    },
    {
      title: 'Jami Talabalar',
      value: stats.totalStudents,
      trend: '+15 yangi',
      icon: GraduationCap,
      color: 'emerald',
    },
    {
      title: 'Faol Darslar',
      value: stats.totalLessons,
      trend: 'Ayni vaqtda',
      icon: BookOpen,
      color: 'purple',
    },
    {
      title: 'Umumiy Tushum',
      value: stats.totalRevenue.toLocaleString('uz-UZ'),
      trend: 'Uzs',
      icon: DollarSign,
      color: 'orange',
    }
  ]

  return (
    <div className='space-y-4 bg-[#f8faff] min-h-screen'>
      
      <div className='relative overflow-hidden rounded-3xl bg-cyan-950 p-8 text-white shadow-2xl'>
        <div className='relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6'>
          <div>
            <div className='flex items-center gap-2 mb-2'>
                <Badge className='bg-blue-500/20 text-blue-300 border-none hover:bg-blue-500/30'>
                    Admin Panel v2.0
                </Badge>
                <span className='text-slate-400 text-xs font-bold'>• 2026 Season</span>
            </div>
            <h1 className='text-4xl font-black tracking-tight'>
              Xush kelibsiz, <span className='text-blue-400'>{username}</span>! 👋
            </h1>
            <p className='text-slate-400 mt-2 font-medium max-w-max'>
              Bugun platformangizda o'sish kuzatilmoqda. Barcha ko'rsatkichlar joyida.
            </p>
          </div>
          <div className='flex gap-4'>
            <Card className='bg-white/5 border-white/10 backdrop-blur-md text-white p-4 min-w-32'>
                <p className='text-[10px] font-bold uppercase text-slate-400'>Status</p>
                <p className='text-emerald-400 font-black flex items-center gap-2'>
                    <div className='w-2 h-2 bg-emerald-400 rounded-full animate-ping' /> Live
                </p>
            </Card>
          </div>
        </div>
        <div className='absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl' />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {statsCards.map((stat) => ( 
          <Card key={stat.title} className='bg-gray-200 border-none shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden'>
            <CardContent className='p-6'>
              <div className='flex justify-between items-start mb-4'>
                <div className={`p-3 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className='w-6 h-6' />
                </div>
                <Badge variant="outline" className='text-[10px] font-bold border-slate-100'>{stat.trend}</Badge>
              </div>
              <div>
                <h3 className='text-slate-500 text-xs font-black uppercase tracking-wider'>{stat.title}</h3>
                <p className='text-3xl font-black text-slate-900 mt-1'>{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <Card className='border-none shadow-sm'>
          <CardHeader>
            <div className='flex items-center gap-3'>
                <div className='p-2 bg-emerald-50 rounded-lg'><GraduationCap className='w-5 h-5 text-emerald-600' /></div>
                <div>
                    <CardTitle className='text-lg font-black'>Talabalar</CardTitle>
                    <CardDescription className='text-xs font-bold'>O'sish dinamikasi</CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <CheckCircle className='w-5 h-5 text-emerald-600' />
                    <span className='font-bold text-slate-700'>Faol foydalanuvchilar</span>
                </div>
                <span className='text-2xl font-black text-emerald-700'>{stats.totalStudents}</span>
            </div>
            <div className='p-4 rounded-2xl bg-red-50/50 border border-red-100 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <XCircle className='w-5 h-5 text-red-600' />
                    <span className='font-bold text-slate-700'>Bloklanganlar</span>
                </div>
                <span className='text-2xl font-black text-red-700'>0</span>
            </div>
          </CardContent>
        </Card>

        <Card className='border-none shadow-sm'>
          <CardHeader>
            <div className='flex items-center gap-3'>
                <div className='p-2 bg-blue-50 rounded-lg'><Users className='w-5 h-5 text-blue-600' /></div>
                <div>
                    <CardTitle className='text-lg font-black'>Ustozlar</CardTitle>
                    <CardDescription className='text-xs font-bold'>Reyting ko'rsatkichlari</CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <TrendingUp className='w-5 h-5 text-blue-600' />
                    <span className='font-bold text-slate-700'>Jami mutaxassislar</span>
                </div>
                <span className='text-2xl font-black text-blue-700'>{stats.totalTeachers}</span>
            </div>
            <div className='p-4 rounded-2xl bg-amber-50/50 border border-amber-100 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <Star className='w-5 h-5 text-amber-500 fill-amber-500' />
                    <span className='font-bold text-slate-700'>O'rtacha sifat</span>
                </div>
                <span className='text-2xl font-black text-amber-700'>4.9</span>
            </div>
          </CardContent>
        </Card>

        <Card className='border-none shadow-sm bg-gradient-to-br from-white to-slate-50'>
          <CardHeader>
            <div className='flex items-center gap-3'>
                <div className='p-2 bg-purple-50 rounded-lg'><BookOpen className='w-5 h-5 text-purple-600' /></div>
                <div>
                    <CardTitle className='text-lg font-black'>Moliya & Ta'lim</CardTitle>
                    <CardDescription className='text-xs font-bold'>Moliyaviy hisobot</CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='p-4 rounded-2xl bg-cyan-950 text-white flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <DollarSign className='w-5 h-5 text-blue-400' />
                    <span className='font-bold'>Sof foyda</span>
                </div>
                <span className='text-xl font-black'>{(stats.totalRevenue / 1000).toFixed(1)}K <small className='text-[10px] text-slate-400 uppercase'>uzs</small></span>
            </div>
            <Button variant="outline" className='w-full h-14 rounded-2xl border-dashed border-2 font-bold group' asChild>
                <Link to="/app/admin/payment">
                    Barcha to'lovlarni ko'rish
                    <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
                </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className='border-none shadow-sm overflow-hidden'>
        <CardHeader className='pb-2'>
            <CardTitle className='text-xl font-black'>Tezkor Harakatlar</CardTitle>
            <CardDescription className='font-medium italic'>Bo'limlarga tezkor o'tish tugmalari</CardDescription>
        </CardHeader>
        <CardContent className='p-2'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {[
                    { title: 'Ustozlar', icon: Users, color: 'blue', link: '/app/admin/teacher' },
                    { title: 'Talabalar', icon: GraduationCap, color: 'emerald', link: '/app/admin/student' },
                    { title: 'Darslar', icon: BookOpen, color: 'purple', link: '/app/admin/lesson' },
                    { title: "To'lovlar", icon: DollarSign, color: 'orange', link: '/app/admin/payment' }
                ].map((item) => (
                    <Link
                        key={item.title}
                        to={item.link}
                        className='group relative flex flex-col items-center p-6 rounded-2xl bg-gray-200 border border-slate-100 hover:bg-cyan-700 transition-all duration-300 hover:shadow-xl overflow-hidden'
                    >
                        <div className={`p-4 rounded-xl bg-${item.color}-50 text-${item.color}-600 group-hover:bg-white/10 group-hover:text-white transition-colors mb-3`}>
                            <item.icon className='w-6 h-6' />
                        </div>
                        <p className='text-sm font-black text-slate-700 group-hover:text-white transition-colors'>
                            {item.title}
                        </p>
                        <div className='absolute bottom-0 left-0 w-full h-1 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform' />
                    </Link>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  )
}