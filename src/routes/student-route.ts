
import HistoryPage from "../pages/student/history";
import ProfilePage from "../pages/student/profile";
import SchedulePage from "../pages/student/schedule";
import TeachersPage from "../pages/student/teacher";

export default [
    {
        path: "teachers",
        page: TeachersPage
    },  
    {
        path: "schedule",
        page: SchedulePage
    },
    {
        path: "history",
        page: HistoryPage
    },
    {
        path: "profile",
        page: ProfilePage
    }
]