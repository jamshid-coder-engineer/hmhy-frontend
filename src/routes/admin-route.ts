import { AdminPage } from "../pages/admin/admins/admin";
import  Lesson  from "../pages/admin/lesson/lesson";
import TeacherLessonsPage from "../pages/admin/lessonDetail/TeacherLessonsPage";
import { Payment } from "../pages/admin/payment/payment";
import { ProfilePage } from "../pages/admin/profile/profile";
import Student from "../pages/admin/student/student";
import { TeacherPage } from "../pages/admin/teacher/teacher";

export default [
    {
        path: "profile",
        page: ProfilePage
    },
    {
        path: "admins",
        page: AdminPage
    },
    {
        path: "payment",
        page: Payment
    },
    {
        path: "teacher",
        page: TeacherPage,
    },
    {
        path: "student",
        page: Student,
    },
    {
        path: "lesson",
        page: Lesson,
    },
    {
        path: "teacher/:id/lessons",
        page: TeacherLessonsPage,
    },
]