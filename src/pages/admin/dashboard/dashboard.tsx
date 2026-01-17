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
  LayoutDashboard,
  Activity,
  Zap,
  Award
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
      <div className='flex items-center justify-center h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
        <div className='flex flex-col items-center gap-6'>
          <div className='relative'>
            <div className='absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse' />
            <Loader2 className='w-16 h-16 animate-spin text-blue-600 relative z-10' />
            <LayoutDashboard className='w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-400' />
          </div>
          <div className='text-center space-y-2'>
            <p className='text-slate-700 font-bold text-lg animate-pulse'>Platforma yuklanmoqda</p>
            <p className='text-slate-400 text-sm font-medium'>Iltimos kuting...</p>
          </div>
        </div>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6'>
        <Card className='max-w-md w-full border-red-200 shadow-2xl'>
          <CardContent className='p-8 text-center space-y-6'>
            <div className='w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center mx-auto shadow-lg'>
              <XCircle className='w-10 h-10 text-red-600' />
            </div>
            <div className='space-y-2'>
              <h2 className='text-2xl font-black text-slate-900'>Xatolik yuz berdi</h2>
              <p className='text-slate-600 font-medium'>Ma'lumotlarni olishda muammo paydo bo'ldi. Iltimos, internetingizni tekshiring.</p>
            </div>
            <Button 
              onClick={() => window.location.reload()} 
              className='w-full bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 font-bold h-12 rounded-xl shadow-lg'
            >
              Qayta urinish
            </Button>
          </CardContent>
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
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
    },
    {
      title: 'Jami Talabalar',
      value: stats.totalStudents,
      trend: '+15 yangi',
      icon: GraduationCap,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-500/10',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-200',
    },
    {
      title: 'Faol Darslar',
      value: stats.totalLessons,
      trend: 'Ayni vaqtda',
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200',
    },
    {
      title: 'Umumiy Tushum',
      value: stats.totalRevenue.toLocaleString('uz-UZ'),
      trend: 'Uzs',
      icon: DollarSign,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      iconColor: 'text-orange-600',
      borderColor: 'border-orange-200',
    }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 p-6 space-y-6'>
      
      {/* Hero Header */}
      <div className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8 md:p-12 shadow-2xl'>
        <div className='absolute inset-0 bg-grid-white/5 bg-[size:20px_20px]' />
        <div className='absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl' />
        <div className='absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl' />
        
        <div className='relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6'>
          <div className='space-y-4'>
            <div className='flex items-center gap-3 flex-wrap'>
              <Badge className='bg-blue-500/20 text-blue-200 border-blue-400/30 hover:bg-blue-500/30 backdrop-blur-sm font-bold px-4 py-1'>
                <Zap className='w-3 h-3 mr-1' />
                Admin Panel v2.0
              </Badge>
              <Badge className='bg-emerald-500/20 text-emerald-200 border-emerald-400/30 font-bold px-4 py-1'>
                <Activity className='w-3 h-3 mr-1' />
                2026 Season
              </Badge>
            </div>
            <div>
              <h1 className='text-4xl md:text-5xl font-black tracking-tight text-white'>
                Xush kelibsiz,
              </h1>
              <h2 className='text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mt-1'>
                {username}! 👋
              </h2>
            </div>
            <p className='text-blue-100 text-lg font-medium max-w-2xl'>
              Bugun platformangizda o'sish kuzatilmoqda. Barcha ko'rsatkichlar joyida.
            </p>
          </div>
          
          <div className='flex gap-4'>
            <Card className='bg-white/10 border-white/20 backdrop-blur-xl shadow-xl hover:bg-white/15 transition-all'>
              <CardContent className='p-6 text-white min-w-[140px]'>
                <p className='text-xs font-bold uppercase text-blue-200 mb-2 flex items-center gap-2'>
                  <Activity className='w-3 h-3' />
                  Status
                </p>
                <div className='flex items-center gap-2'>
                  <div className='relative'>
                    <div className='w-3 h-3 bg-emerald-400 rounded-full animate-pulse' />
                    <div className='w-3 h-3 bg-emerald-400 rounded-full absolute top-0 animate-ping' />
                  </div>
                  <p className='text-emerald-300 font-black text-xl'>Live</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {statsCards.map((stat) => ( 
          <Card 
            key={stat.title} 
            className={`border-2 ${stat.borderColor} bg-white shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden relative`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
            <CardContent className='p-6 relative z-10'>
              <div className='flex justify-between items-start mb-6'>
                <div className={`p-4 rounded-2xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
                </div>
                <Badge variant="outline" className='text-xs font-bold border-slate-200 bg-slate-50 px-3 py-1'>
                  {stat.trend}
                </Badge>
              </div>
              <div className='space-y-2'>
                <h3 className='text-slate-500 text-xs font-black uppercase tracking-wider'>{stat.title}</h3>
                <p className='text-4xl font-black text-slate-900'>{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Details Section */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Students Card */}
        <Card className='border-2 border-emerald-200 shadow-lg bg-gradient-to-br from-white to-emerald-50/30'>
          <CardHeader className='pb-4'>
            <div className='flex items-center gap-3'>
              <div className='p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg'>
                <GraduationCap className='w-6 h-6 text-white' />
              </div>
              <div>
                <CardTitle className='text-xl font-black text-slate-900'>Talabalar</CardTitle>
                <CardDescription className='text-sm font-bold text-emerald-600'>O'sish dinamikasi</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-between hover:border-emerald-300 transition-colors'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-emerald-500 rounded-xl'>
                  <CheckCircle className='w-5 h-5 text-white' />
                </div>
                <span className='font-bold text-slate-700'>Faol foydalanuvchilar</span>
              </div>
              <span className='text-3xl font-black text-emerald-700'>{stats.totalStudents}</span>
            </div>
            <div className='p-5 rounded-2xl bg-red-50 border-2 border-red-200 flex items-center justify-between hover:border-red-300 transition-colors'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-red-500 rounded-xl'>
                  <XCircle className='w-5 h-5 text-white' />
                </div>
                <span className='font-bold text-slate-700'>Bloklanganlar</span>
              </div>
              <span className='text-3xl font-black text-red-700'>0</span>
            </div>
          </CardContent>
        </Card>

        {/* Teachers Card */}
        <Card className='border-2 border-blue-200 shadow-lg bg-gradient-to-br from-white to-blue-50/30'>
          <CardHeader className='pb-4'>
            <div className='flex items-center gap-3'>
              <div className='p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg'>
                <Users className='w-6 h-6 text-white' />
              </div>
              <div>
                <CardTitle className='text-xl font-black text-slate-900'>Ustozlar</CardTitle>
                <CardDescription className='text-sm font-bold text-blue-600'>Reyting ko'rsatkichlari</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='p-5 rounded-2xl bg-blue-50 border-2 border-blue-200 flex items-center justify-between hover:border-blue-300 transition-colors'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-blue-500 rounded-xl'>
                  <TrendingUp className='w-5 h-5 text-white' />
                </div>
                <span className='font-bold text-slate-700'>Jami mutaxassislar</span>
              </div>
              <span className='text-3xl font-black text-blue-700'>{stats.totalTeachers}</span>
            </div>
            <div className='p-5 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center justify-between hover:border-amber-300 transition-colors'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl'>
                  <Star className='w-5 h-5 text-white fill-white' />
                </div>
                <span className='font-bold text-slate-700'>O'rtacha sifat</span>
              </div>
              <span className='text-3xl font-black text-amber-700'>4.9</span>
            </div>
          </CardContent>
        </Card>

        {/* Finance Card */}
        <Card className='border-2 border-purple-200 shadow-lg bg-gradient-to-br from-white to-purple-50/30'>
          <CardHeader className='pb-4'>
            <div className='flex items-center gap-3'>
              <div className='p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg'>
                <BookOpen className='w-6 h-6 text-white' />
              </div>
              <div>
                <CardTitle className='text-xl font-black text-slate-900'>Moliya & Ta'lim</CardTitle>
                <CardDescription className='text-sm font-bold text-purple-600'>Moliyaviy hisobot</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-blue-500/20 rounded-xl backdrop-blur-sm'>
                    <DollarSign className='w-5 h-5 text-blue-400' />
                  </div>
                  <span className='font-bold text-lg'>Sof foyda</span>
                </div>
                <div className='text-right'>
                  <span className='text-2xl font-black'>{(stats.totalRevenue / 1000).toFixed(1)}K</span>
                  <p className='text-xs text-slate-400 uppercase font-bold'>uzs</p>
                </div>
              </div>
            </div>
            <Button 
              variant="outline" 
              className='w-full h-14 rounded-2xl border-2 border-dashed border-purple-300 font-bold group hover:bg-purple-50 hover:border-purple-400 transition-all' 
              asChild
            >
              <Link to="/app/admin/payment">
                Barcha to'lovlarni ko'rish
                <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className='border-2 border-slate-200 shadow-lg bg-white'>
        <CardHeader className='pb-4'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl'>
              <Zap className='w-5 h-5 text-white' />
            </div>
            <div>
              <CardTitle className='text-2xl font-black text-slate-900'>Tezkor Harakatlar</CardTitle>
              <CardDescription className='font-medium text-slate-600'>Bo'limlarga tezkor o'tish tugmalari</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className='p-6'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {[
              { title: 'Ustozlar', icon: Users, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', iconBg: 'bg-blue-500', link: '/app/admin/teacher' },
              { title: 'Talabalar', icon: GraduationCap, color: 'from-emerald-500 to-emerald-600', bgColor: 'bg-emerald-50', iconBg: 'bg-emerald-500', link: '/app/admin/student' },
              { title: 'Darslar', icon: BookOpen, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50', iconBg: 'bg-purple-500', link: '/app/admin/lesson' },
              { title: "To'lovlar", icon: DollarSign, color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50', iconBg: 'bg-orange-500', link: '/app/admin/payment' }
            ].map((item) => (
              <Link
                key={item.title}
                to={item.link}
                className='group relative flex flex-col items-center p-6 rounded-2xl bg-white border-2 border-slate-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 overflow-hidden'
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className='relative z-10 space-y-4 flex flex-col items-center'>
                  <div className={`p-4 rounded-2xl ${item.bgColor} group-hover:bg-white/20 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                    <item.icon className={`w-7 h-7 text-${item.iconBg.replace('bg-', '')} group-hover:text-white transition-colors`} />
                  </div>
                  <p className='text-sm font-black text-slate-700 group-hover:text-white transition-colors text-center'>
                    {item.title}
                  </p>
                </div>
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${item.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}