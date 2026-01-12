import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-150 h-90">
        <h1 className="text-2xl font-medium text-center mb-2">
          Assalom Aleykum!
        </h1>
        <h1 className="text-2xl font-semibold text-center mb-6">
          CRM tizimiga kirish
        </h1>

        <div className="flex flex-col gap-6">

          <button
            onClick={() => navigate("/admin/login")}
            className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-black"
          >
            🛡 Admin Login
          </button>

          <button
            onClick={() => navigate("/teacher/login")}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            🎓 Teacher (Google orqali)
          </button>

          <button
            onClick={() => navigate("/telegram")}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            👨‍🎓 Student Login
          </button>

        </div>
      </div>
    </div>
  );
}
