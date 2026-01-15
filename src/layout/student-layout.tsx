import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { label: "Ustozlar", to: "/student/teachers", icon: "👨‍🏫" },
  { label: "Jadval", to: "/student/schedule", icon: "📅" },
  { label: "Tarix", to: "/student/history", icon: "🕘" },
  { label: "Profil", to: "/student/profile", icon: "👤" },
];

export const StudentLayout = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    tg.ready?.();
    tg.expand?.();
    tg.disableVerticalSwipes?.();

    tg.setHeaderColor?.("#0b0b0b");
    tg.setBackgroundColor?.("#0b0b0b");
  }, []);

  if (!token || role !== "student") {
    return <Navigate replace to="/student/login" />;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* content */}
      <div className="pb-24 px-4">
        <Outlet />
      </div>

      {/* bottom tabbar */}
      <div
        className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-neutral-900/95 backdrop-blur"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="grid grid-cols-4">
          {tabs.map((t) => {
            const active = location.pathname === t.to;
            return (
              <button
                key={t.to}
                onClick={() => navigate(t.to)}
                className={`py-2.5 flex flex-col items-center justify-center gap-1 ${
                  active ? "text-white" : "text-white/60"
                }`}
              >
                <span className="text-base leading-none">{t.icon}</span>
                <span className={`text-[11px] ${active ? "font-semibold" : ""}`}>
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
