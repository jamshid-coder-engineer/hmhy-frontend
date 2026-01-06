import { Lesson } from "../pages/admin/lesson/lesson";
import { Payment } from "../pages/admin/payment/payment";
import { Student } from "../pages/admin/student/student";
import { Teacher } from "../pages/admin/teacher/teacher";
import { Profile } from "../pages/profile/profile";

export default [
    {
        path: "profile",
        page: Profile
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