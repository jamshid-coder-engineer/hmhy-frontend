import { useEffect } from "react";
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

  // ✅ Telegram WebApp: full/expand + theme
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    try {
      tg.ready?.();
      tg.expand?.();

      // ixtiyoriy: pastga swipe qilib yopilishini kamaytiradi (hamma clientda bo‘lmasligi mumkin)
      tg.disableVerticalSwipes?.();

      // Telegram header/background rangini moslaymiz
      tg.setHeaderColor?.("#0b0b0b");
      tg.setBackgroundColor?.("#0b0b0b");
    } catch (e) {
      // jim
    }
  }, []);

  if (!token || role !== "student") {
    return <Navigate replace to="/student/login" />;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* content */}
      <div className="pb-20 px-4">
        <Outlet />
      </div>

      {/* bottom tabbar */}
      <div
        className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-neutral-900"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="grid grid-cols-4">
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
