import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { request } from "../../config/request";

type TelegramWebApp = NonNullable<Window["Telegram"]>["WebApp"];

const StudentLogin = () => {
  const [tg, setTg] = useState<TelegramWebApp | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🟢 StudentLogin component mounted");
    
    if (window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp;
      console.log("✅ Telegram WebApp detected");
      console.log("📱 InitData:", webApp.initData);
      console.log("👤 User:", webApp.initDataUnsafe.user);
      
      setTg(webApp);
      webApp.expand();
      
      if (webApp.initData) {
        handleLogin(webApp);
      }
    } else {
      console.warn("⚠️ Telegram WebApp not found. Are you running inside Telegram?");
      toast.error("Please open this page inside Telegram bot");
    }
  }, []);

  const handleLogin = async (webApp?: TelegramWebApp) => {
    const telegramApp = webApp || tg;
    
    if (!telegramApp?.initData) {
      toast.error("Telegram data not found");
      return;
    }

    if (!telegramApp.initDataUnsafe.user) {
      toast.error("User data not found");
      return;
    }

    console.log("🔵 Starting login...");
    setLoading(true);

    try {
      console.log("📤 Sending request to /telegram/login");
      
      const response = await request.post("/telegram/login", {
        initData: telegramApp.initData,
      });

      console.log("✅ Login response:", response.data);

      const { accessToken, student } = response.data.data;

      if (!accessToken) {
        throw new Error("No access token received");
      }

      localStorage.setItem("token", accessToken);
      localStorage.setItem("role", "student");
      
      if (student) {
        localStorage.setItem("studentName", `${student.firstName} ${student.lastName}`);
      }

      console.log("💾 Saved to localStorage");
      console.log("🎯 Navigating to /student");

      toast.success(`Welcome, ${student?.firstName || 'Student'}!`);

      setTimeout(() => {
        navigate("/student");
      }, 500);

    } catch (error: any) {
      console.error("❌ Login error:", error);
      console.error("❌ Error response:", error?.response?.data);

      const message = 
        error?.response?.data?.message || 
        error?.response?.data?.error ||
        "Login failed. Please try again.";

      toast.error(message);

      if (error?.response?.status === 401) {
        toast.error("Please use /start command in bot first", {
          duration: 5000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">HMHY</h1>
          <p className="text-gray-600">Student Portal</p>
        </div>

        {tg?.initDataUnsafe.user ? (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Logged in as:</p>
              <p className="font-semibold text-gray-800">
                {tg.initDataUnsafe.user.first_name} {tg.initDataUnsafe.user.last_name || ''}
              </p>
              {tg.initDataUnsafe.user.username && (
                <p className="text-sm text-gray-500">@{tg.initDataUnsafe.user.username}</p>
              )}
            </div>

            <button
              onClick={() => handleLogin()}
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Logging in..." : "Continue to Dashboard"}
            </button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-gray-500">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p>Connecting to Telegram...</p>
                </>
              ) : (
                <>
                   <a>
                  <p className="mb-4">Please open this page inside Telegram bot</p>
                  
                    href="https://t.me/crmhmhybot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  
                    Open Telegram Bot
                  </a>
                </>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>By continuing, you agree to HMHY's Terms of Service</p>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
