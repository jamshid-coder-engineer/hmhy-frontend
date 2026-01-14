import { Home, Users, GraduationCap, DollarSign, BookOpen, User, Shield } from "lucide-react"

export const links = {
    superadmin: [
        {
            title: "Dashboard",
            url: "/app/admin",
            icon: Home,
        },
        {
            title: "Admins",
            url: "/app/admin/admins",
            icon: Shield
        },
        {
            title: "Profile",
            url: "/app/admin/profile",
            icon: User,
        },
        {
            title: "Student",
            url: "/app/admin/student",
            icon: Users,
        },
        {
            title: "Teacher",
            url: "/app/admin/teacher",
            icon: GraduationCap,
        },
        {
            title: "Lesson",
            url: "/app/admin/lesson",
            icon: BookOpen,
        },
        {
            title: "Payment",
            url: "/app/admin/payment",
            icon: DollarSign,
        },
    ],

    admin: [
        {
            title: "Dashboard",
            url: "/app/admin",
            icon: Home,
        },
        {
            title: "Profile",
            url: "/app/admin/profile",
            icon: User,
        },
        {
            title: "Student",
            url: "/app/admin/student",
            icon: Users,
        },
        {
            title: "Teacher",
            url: "/app/admin/teacher",
            icon: GraduationCap,
        },
        {
            title: "Lesson",
            url: "/app/admin/lesson",
            icon: BookOpen,
        },
        {
            title: "Payment",
            url: "/app/admin/payment",
            icon: DollarSign,
        },
    ],

  teacher: [
     {
        title: "Lesson",
        url: "/teacher/lesson",
        icon: BookOpen,
    },
     {
        title: "Table",
        url: "/teacher/table", 
        icon: Home,
    },
    {
        title: "Payment",
        url: "/teacher/payment",
        icon: DollarSign,
    },
    {
        title: "Profile",
        url: "/teacher/profile", 
        icon: User,
    }
],

}