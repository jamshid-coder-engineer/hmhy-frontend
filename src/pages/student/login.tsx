import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { request } from "../../config/request";

type TelegramWebApp = NonNullable<Window["Telegram"]>["WebApp"];

const BOT_URL = "https://t.me/crmhmhybot";

const StudentLogin = () => {
  const [tg, setTg] = useState<TelegramWebApp | null>(null);
  const [connecting, setConnecting] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const autoLoginStarted = useRef(false);

  const handleLogin = async (webApp?: TelegramWebApp) => {
    const telegramApp = webApp || tg;

    if (!telegramApp?.initData) {
      toast.error("Telegram data not found");
      return;
    }

    if (!telegramApp.initDataUnsafe?.user) {
      toast.error("User data not found");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      const response = await request.post("/telegram/login", {
        initData: telegramApp.initData,
      });

      const { accessToken, student } = response.data?.data || {};

      if (!accessToken) throw new Error("No access token received");

      localStorage.setItem("token", accessToken);
      localStorage.setItem("role", "student");

      if (student) {
        localStorage.setItem(
          "studentName",
          `${student.firstName ?? ""} ${student.lastName ?? ""}`.trim()
        );
      }

      toast.success(`Welcome, ${student?.firstName || "Student"}!`);

      setTimeout(() => {
        navigate("/student");
      }, 300);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Login failed. Please try again.";

      toast.error(message);

      if (error?.response?.status === 401) {
        toast.error("Please use /start command in bot first", { duration: 5000 });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("🟢 StudentLogin mounted. Waiting for Telegram WebApp...");

    let tries = 0;
    const maxTries = 25;

    const timer = setInterval(() => {
      tries += 1;

      const webApp = window.Telegram?.WebApp;

      if (webApp) {
        setTg(webApp);
        setConnecting(false);

        document.documentElement.classList.add("telegram-dark");

        webApp.ready?.();
        webApp.expand?.();

        if (webApp.initData && !autoLoginStarted.current) {
          autoLoginStarted.current = true;
          handleLogin(webApp);
        }

        clearInterval(timer);
        return;
      }

      if (tries >= maxTries) {
        clearInterval(timer);
        setConnecting(false);
        toast.error("Please open this page inside Telegram bot");
      }
    }, 120);

    return () => clearInterval(timer);
  }, []);

  const user = tg?.initDataUnsafe?.user;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">HMHY</h1>
          <p className="text-gray-600">Student Portal</p>
        </div>

        {connecting ? (
          <div className="text-center space-y-4 text-gray-600">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p>Connecting to Telegram...</p>
          </div>
        ) : user ? (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Logged in as:</p>
              <p className="font-semibold text-gray-800">
                {user.first_name} {user.last_name || ""}
              </p>
              {user.username && (
                <p className="text-sm text-gray-500">@{user.username}</p>
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
            <p className="mb-2 text-gray-600">
              Please open this page inside Telegram bot
            </p>
            <a
              href={BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Open Telegram Bot
            </a>
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
