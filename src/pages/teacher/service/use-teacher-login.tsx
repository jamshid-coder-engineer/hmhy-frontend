import { useMutation } from '@tanstack/react-query'
import { request } from '../../../config/request'
import { toast } from 'sonner'

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  token: string
  role: string
}

const teacherLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await request.post('/teacher/login', data)
  return response.data
}

export const UseTeacherLogin = () => {
  return useMutation({
    mutationFn: teacherLogin,
    onError: (error: any) => {
      const message = 
        error?.response?.data?.message || 
        error?.response?.data?.error || 
        'Login failed'
      
      toast.error(message, {
        position: 'top-right'
      })
    }
  })
}