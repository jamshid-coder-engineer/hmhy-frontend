import { Navigate, Outlet } from 'react-router-dom'
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { AppSidebar } from './navbar'
import type { Role } from '../pages/auth/types'

export const MainLayout = () => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role') as Role | undefined

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

// import { Navigate, Outlet } from "react-router-dom";
// import { SidebarProvider } from "../components/ui/sidebar";
// import { AppSidebar } from "./navbar";
// import Cookies from "js-cookie";
// import type { Role } from "../pages/auth/types";
// import { AppHeader } from "./header";

// export const MainLayout = () => {
//     const token = localStorage.getItem("token2");
//     const role = localStorage.getItem("role") as Role | undefined;

//     console.log(token, role);

//     if (!token || !role) {
//         return <Navigate to="/login/admin" replace />;
//     }

//     return (
//         <SidebarProvider>
//             <AppSidebar role={role} />

//             <main className="flex-1 w-full min-h-screen text-gray-100">
//                 <AppHeader role={role} />

//                 <section className="p-6 bg-[#E0E0E0]">
//                     <div className="rounded-xl bg-[#E0E0E0]">
//                         <Outlet />
//                     </div>
//                 </section>
//             </main>
//         </SidebarProvider>
//     );
// };
