import { Home, Users, GraduationCap, DollarSign, BookOpen, User } from "lucide-react"

export const links = {
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
}