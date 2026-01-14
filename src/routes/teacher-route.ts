import { TeacherLessons } from "../pages/teacher/lessons";
import { Payments } from "../pages/teacher/payments";
import { TeacherProfile } from "../pages/teacher/profile";
import { Schedule } from "../pages/teacher/schedule";


export default [
    {
        path: "lesson",
        page: TeacherLessons
    },
    {
        path: "table",
        page: Schedule
    },
    {
        path: 'payment',
        page: Payments
    },
    {
        path: "profile",
        page: TeacherProfile    },
]



