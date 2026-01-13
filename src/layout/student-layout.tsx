import { Navigate, Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { AppSidebar } from "./navbar"

export const StudentLayout = () => {
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")

  // console.log("🔍 StudentLayout check:", { token: !!token, role });

  if (!token || role !== "student") {
    console.log("🔴 STUDENT REDIRECT TO /student/login")
    return <Navigate replace to="/student/login" />
  }

  console.log("🟢 STUDENT ACCESS GRANTED")

  return (
    <SidebarProvider>
      <AppSidebar role="student" />
      <main className="grow w-full">
        <div className="p-3 border-b">
          <SidebarTrigger className="cursor-pointer border border-black p-2" />
        </div>
        <div className="p-8 bg-gray-100 min-h-screen">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}