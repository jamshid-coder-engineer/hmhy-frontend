import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const useLogout = () => {
  const navigate = useNavigate()
  
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    
    toast.success('Tizimdan muvaffaqiyatli chiqdingiz!', {
      position: 'bottom-right'
    })
    
    navigate('/')
  }
  
  return logout
}