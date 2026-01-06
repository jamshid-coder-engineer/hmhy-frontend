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

export function AppSidebar({ role }: { role: string }) {
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