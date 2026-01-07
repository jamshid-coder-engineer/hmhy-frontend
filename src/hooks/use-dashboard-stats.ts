import { useQuery } from '@tanstack/react-query'
import { request } from '../config/request'

interface DashboardStats {
  totalStudents: number
  totalTeachers: number
  totalLessons: number
  totalRevenue: number
  charts: {
    lessonsByStatus: any[]
  }
}

interface DashboardResponse {
  statusCode: number
  message: {
    uz: string
    en: string
    ru: string
  }
  data: DashboardStats
}

export const useDashboardStats = () => {
  return useQuery<DashboardResponse>({
    queryKey: ['dashboard-stats'],
    queryFn: () => request.get('/admin/stats').then(res => res.data),
    refetchInterval: 30000, 
  })
}