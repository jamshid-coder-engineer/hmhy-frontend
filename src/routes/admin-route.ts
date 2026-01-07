import { Admins } from "../pages/admin/admins/admins";
import { Lesson } from "../pages/admin/lesson/lesson";
import { Payment } from "../pages/admin/payment/payment";
import { ProfilePage } from "../pages/admin/profile/profile";
import { Student } from "../pages/admin/student/student";
import { Teacher } from "../pages/admin/teacher/teacher";

export default [
    {
        path: "profile",
        page: ProfilePage
    },
    {
        path: "admins",
        page: Admins
    },
    {
        path: "payment",
        page: Payment
    },
    {
        path: "teacher",
        page: Teacher,
    },
    {
        path: "student",
        page: Student
    },
    {
        path: "lesson",
        page: Lesson,
    },
]