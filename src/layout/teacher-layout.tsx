import { Navigate, Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import type { Role } from "../pages/auth/types"
import { AppSidebar } from "./navbar";

export const TeacherLayout = () => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role') as Role

  

  if (!token || role !== 'teacher') {
    console.log('🔴 REDIRECTING TO /teacher/login')
    return <Navigate replace to="/teacher/login" />
  }

  console.log('🟢 ACCESS GRANTED')

  return (
    <SidebarProvider>
      <AppSidebar role="teacher" />
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
