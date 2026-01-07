import { useQuery } from '@tanstack/react-query'
import { request } from '../../../../config/request'

interface PaymentStats {
  totalRevenue: number
  pendingPayments: number
  pendingAmount: number
  successRate: number
  completedCount: number
  canceledCount: number
  canceledAmount: number
  totalTransactions: number
  transactions: Array<{
    id: string
    date: string
    student: {
      id: string
      name: string
    } | null
    teacher: {
      id: string
      name: string
    } | null
    amount: number
    status: string
    provider: string
  }>
}

interface PaymentResponse {
  statusCode: number
  message: {
    uz: string
    en: string
    ru: string
  }
  data: PaymentStats
}

export const usePaymentStats = () => {
  return useQuery<PaymentResponse>({
    queryKey: ['payment-stats'],
    queryFn: () => request.get('/transaction/stats').then(res => res.data),
    refetchInterval: 30000,
  })
}