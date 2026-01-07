import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../components/ui/sidebar"
import { links } from "./layout-data"
import { Link, useLocation } from "react-router-dom"
import { Button } from "../components/ui/button"
import { LogOut } from "lucide-react"
import { useLogout } from "../hooks/use-logout"
import { ActiveLink } from "../components/active-link"
import type { Role } from "../pages/auth/types"

export function AppSidebar({ role }: { role: Role }) {
    const location = useLocation()
    const logout = useLogout()
    const roleLinks = links[role as keyof typeof links] || []

    return (
        <Sidebar className="border-r">
            <SidebarHeader className="items-center h-20 p-3 bg-cyan-950">
                <Link to={`/app/${role}`}>
                    <h2 className="text-white text-2xl mt-4 font-bold">Admin Panel</h2>
                </Link>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroupContent className="p-0 h-full bg-gray-150">
                    <SidebarMenu>
                        {roleLinks.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <ActiveLink href={item.url}>
                                        <item.icon className="w-5 h-5" />
                                        <span>{item.title}</span>
                                    </ActiveLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>

                </SidebarGroupContent>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t">
                <Button
                    variant="destructive"
                    className="w-full flex items-center gap-2 justify-center"
                    onClick={logout}
                >
                    <LogOut className="w-4 h-4" />
                    <span>Chiqish</span>
                </Button>
            </SidebarFooter>
        </Sidebar>
    )
}


// import {
//     Sidebar,
//     SidebarContent,
//     SidebarHeader,
//     SidebarGroupContent,
//     SidebarMenu,
//     SidebarMenuButton,
//     SidebarMenuItem,
// } from "../components/ui/sidebar";
// import { Link } from "react-router-dom";
// import { ActiveLink } from "../components/active-link";
// import { links } from "./layout-data";
// import type { Role } from "../pages/auth/types";

// export function AppSidebar({ role }: { role: Role }) {
//     const menuLinks = links[role] ?? [];
//     const homePath =
//         role === "teacher" ? "/teacher/dashboard" : "/admin/dashboard";

//     return (
//         <Sidebar className="bg-[#1E2939]!">
//             <SidebarHeader className="bg-[#1E2939]! border-b border-gray-700/50">
//                 <Link
//                     to={homePath}
//                     className="flex items-center justify-center px-4 py-5"
//                 >
//                     <div className="inline-flex items-center justify-center">
//                         <span className="text-4xl font-bold tracking-wide">
//                             <span className="text-white italic">HM</span>
//                             <span className="text-teal-500 italic">H</span>
//                             <span className="text-gray-400 italic">Y</span>
//                         </span>
//                     </div>
//                 </Link>
//             </SidebarHeader>

//             {/* MENU */}
//             <SidebarContent className="bg-[#1E2939]! px-2 py-4">
//                 <SidebarGroupContent>
//                     <SidebarMenu>
//                         {menuLinks.map((item) => (
//                             <SidebarMenuItem key={item.url}>
//                                 <SidebarMenuButton
//                                     asChild
//                                     className="text-gray-300 hover:text-white hover:bg-gray-700/50! data-[active=true]:text-white! data-[active=true]:bg-[#353F4D]!"
//                                 >
//                                     <ActiveLink
//                                         href={item.url}
//                                         // className="flex items-center gap-3 px-3 py-2 data-[active=true]:bg-[#353F4D]! aria-[current=page]:bg-[#353F4D]!"
//                                     >
//                                         <item.icon className="h-5 w-5" />
//                                         <span>{item.title}</span>
//                                     </ActiveLink>
//                                 </SidebarMenuButton>
//                             </SidebarMenuItem>
//                         ))}
//                     </SidebarMenu>
//                 </SidebarGroupContent>
//             </SidebarContent>

//             {/* FOOTER */}
//         </Sidebar>
//     );
// }
