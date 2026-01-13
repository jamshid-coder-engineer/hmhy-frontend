import Lesson from "../pages/teacher/lesson/lesson";
import { TeacherDashboard } from "../pages/teacher/dashboard/dashboard";
import { TeacherProfile } from "../pages/teacher/profile/profile";
import { Student } from "../pages/teacher/student/student";


export default [
    {
        path: "dashboard",
        page: TeacherDashboard
    },
    {
        path: "profile",
        page: TeacherProfile
    },
    {
        path: "student",
        page: Student
    },
    {
        path: 'lesson',
        page: Lesson
    }
]



