import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./layout/main-layout";
import adminRoute from "./routes/admin-route";
import { Dashboard } from "./pages/admin/dashboard/dashboard";
import { TeacherLogin } from "./pages/teacher/login";
import { TeacherOTPVerify } from "./pages/teacher/otp-verify";
import { TeacherDashboard } from "./pages/teacher/dashboard/dashboard";
import { Toaster } from "sonner";
import RoleSelect from "./landing/selct-role";
import Login from "./pages/auth/login";
import { TeacherLayout } from "./layout/teacher-layout";
import teacherRoute from "./routes/teacher-route";
import StudentDashboard from "./pages/student/dashboard/dashboard";
import studentRoute from "./routes/student-route";
import { StudentLayout } from "./layout/student-layout";
import StudentLogin from "./pages/student/login";
import Telegram from "./pages/student/telegram";

function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Routes>
       
        <Route path="/" element={<RoleSelect />} />

        <Route path="/telegram" element={<Telegram />} /> 
        <Route path="/student/login" element={<StudentLogin />} />
        
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          {studentRoute.map(({ page: Page, path }) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
        </Route>

        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route path="/teacher/otp-verify" element={<TeacherOTPVerify />} />

        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboard />} />
          {teacherRoute.map(({ page: Page, path }) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
        </Route>

        <Route path="/admin/login" element={<Login />} />

        <Route path="/app" element={<MainLayout />}>
          <Route path="admin">
            <Route index element={<Dashboard />} />
            {adminRoute.map(({ page: Page, path }) => (
              <Route key={path} path={path} element={<Page />} />
            ))}
          </Route>

          <Route path="superadmin">
            <Route index element={<Dashboard />} />
            {adminRoute.map(({ page: Page, path }) => (
              <Route key={path} path={path} element={<Page />} />
            ))}
          </Route>
        </Route>

        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;