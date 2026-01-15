import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { label: "Ustozlar", to: "/student/teachers" },
  { label: "Jadval", to: "/student/schedule" },
  { label: "Tarix", to: "/student/history" },
  { label: "Profil", to: "/student/profile" },
];

export const StudentLayout = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const location = useLocation();
  const navigate = useNavigate();

  if (!token || role !== "student") {
    return <Navigate replace to="/student/login" />;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* content */}
      <div className="mx-auto max-w-md pb-20">
        <Outlet />
      </div>

      {/* bottom tabbar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-neutral-900">
        <div className="mx-auto max-w-md grid grid-cols-4">
          {tabs.map((t) => {
            const active =
              location.pathname === t.to ||
              (t.to === "/student/teachers" && location.pathname === "/student");

            return (
              <button
                key={t.to}
                onClick={() => navigate(t.to)}
                className={`py-3 text-sm ${
                  active ? "text-white font-semibold" : "text-white/60"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
