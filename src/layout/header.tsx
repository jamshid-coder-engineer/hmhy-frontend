import { SidebarTrigger } from "../components/ui/sidebar";
import { Button } from "../components/ui/button";
import { LogOut, User } from "lucide-react";
import Cookies from "js-cookie";
import type { Role } from "../pages/auth/types";
import { useNavigate } from "react-router-dom";

export function AppHeader({ role }: { role: Role }) {
    const navigate = useNavigate();
    return (
        <header className="sticky top-0 z-50 border-b bg-[#1E2939] border-gray-800 px-6 py-3 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="text-gray-300 hover:text-white hover:bg-[#353F4D] rounded p-2 transition-colors" />
                <h1 className="text-xl font-semibold text-white">
                    Admin Panel
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <div
                    className="flex items-center gap-3"
                    onClick={() =>
                        navigate(
                            role === "superadmin"
                                ? "/admin/profile"
                                : `/${role}/profile`
                        )
                    }
                >
                    <div className="flex items-center gap-2 text-gray-300">
                        <User className="h-5 w-5" />
                        <span className="text-sm font-medium">{role}</span>
                    </div>
                    <span className="px-3 py-1 bg-teal-500 text-white text-xs font-semibold rounded uppercase tracking-wide">
                        {role}
                    </span>
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-300 hover:text-white hover:bg-[#353F4D]"
                    onClick={() => {
                        Cookies.remove("token2");
                        Cookies.remove("role");
                        window.location.href = "/login/admin";
                    }}
                >
                    <LogOut className="h-5 w-5" />
                </Button>
            </div>
        </header>
    );
}
