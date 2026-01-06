import { Navigate, Outlet } from 'react-router-dom'
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { AppSidebar } from './navbar'

export const MainLayout = () => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (!token || !role) {
    return <Navigate replace to={"/"} />
  }

  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <main className='grow w-full'>
        <div className='p-3 border-b'>
          <SidebarTrigger className='cursor-pointer border border-black p-2'/>
        </div>
        <div className='p-8 bg-gray-100 min-h-screen'>
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}