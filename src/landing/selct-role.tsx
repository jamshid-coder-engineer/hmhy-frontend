import { useNavigate } from "react-router-dom";
import { Shield, GraduationCap, Users, ArrowRight } from "lucide-react";

export default function RoleSelect() {
  const navigate = useNavigate();

  const roles = [
    {
      title: "Admin",
      desc: "Tizimni boshqarish va nazorat",
      icon: <Shield className="w-6 h-6" />,
      path: "/admin/login",
      color: "from-slate-800 to-slate-900",
      hover: "hover:shadow-cyan-800"
    },
    {
      title: "O'qituvchi",
      desc: "Darslar va guruhlarni boshqarish",
      icon: <GraduationCap className="w-6 h-6" />,
      path: "/teacher/login",
      color: "from-blue-600 to-indigo-600",
      hover: "hover:shadow-blue-800"
    },
    {
      title: "Talaba",
      desc: "Telegram bot orqali ro'yxatdan o'tish",
      icon: <Users className="w-6 h-6" />,
      path: "/telegram",
      color: "from-emerald-500 to-teal-600",
      hover: "hover:shadow-emerald-800"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 p-4 font-sans relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100 rounded-full blur-3xl opacity-50" />

      <div className="z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 mb-2">
            Xush Kelibsiz
          </h1>
          <h2 className="text-3xl font-black text-slate-800">
            CRM tizimiga kirish
          </h2>
          <p className="text-slate-500 mt-2">Davom etish uchun rolingizni tanlang</p>
        </div>

        <div className="grid gap-4">
          {roles.map((role) => (
            <button
              key={role.path}
              onClick={() => navigate(role.path)}
              className={`group relative flex items-center p-4 bg-white border border-slate-100 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:border-transparent shadow-sm hover:shadow-xl ${role.hover}`}
            >
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center text-white shadow-lg`}>
                {role.icon}
              </div>
              
              <div className="ml-4 text-left flex-grow">
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {role.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {role.desc}
                </p>
              </div>

              <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-slate-400">
                <ArrowRight className="w-5 h-5" />
              </div>
            </button>
          ))}
        </div>

        <p className="text-center mt-10 text-slate-400 text-xs font-medium">
          © 2026 HMHY Platform. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </div>
  );
}