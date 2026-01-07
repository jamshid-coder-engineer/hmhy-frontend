import { Route, Routes } from "react-router-dom"
import Login from "./pages/auth/login"
import { MainLayout } from "./layout/main-layout"
import adminRoute from "./routes/admin-route"
import { Dashboard } from "./pages/admin/dashboard/dashboard"
import { TeacherLogin } from "./pages/teacher/login"
import { TeacherOTPVerify } from "./pages/teacher/otp-verify"
import { TeacherDashboard } from "./pages/teacher/dashboard/dashboard"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
 <Route path="/teacher/login" element={<TeacherLogin />} />
      <Route path="/teacher/otp-verify" element={<TeacherOTPVerify />} />
       <Route path="/teacher/dashboard" element={<TeacherDashboard />} />

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
  )
}

export default App