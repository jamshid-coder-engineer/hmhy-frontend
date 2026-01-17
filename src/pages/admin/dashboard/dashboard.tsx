import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";

import {
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  CheckCircle,
  XCircle,
  Star,
  Loader2,
  TrendingUp,
  ArrowRight,
  LayoutDashboard,
  Sparkles,
  Activity,
} from "lucide-react";

import { useDashboardStats } from "../../../hooks/use-dashboard-stats";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const { data, isLoading, isError } = useDashboardStats();
  const username = localStorage.getItem("username") || "Admin";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            <LayoutDashboard className="h-6 w-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-400" />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 animate-pulse">
            Platforma yuklanmoqda...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] px-4">
        <Card className="w-full max-w-md border-none shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
            <CardTitle className="text-2xl font-black text-slate-900">
              Xatolik yuz berdi
            </CardTitle>
            <CardDescription className="text-slate-500 font-medium">
              Ma'lumotlarni olishda muammo paydo bo'ldi. Iltimos, internetingizni
              tekshiring.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => window.location.reload()}
              className="w-full h-11 font-bold"
            >
              Qayta urinish
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = data.data;

  const statsCards = [
    {
      title: "Jami Ustozlar",
      value: stats.totalTeachers,
      sub: "+2 yangi",
      icon: Users,
      accent: "bg-blue-600/10 text-blue-600 ring-blue-600/15",
      chip: "border-blue-200 text-blue-700 bg-blue-50",
    },
    {
      title: "Jami Talabalar",
      value: stats.totalStudents,
      sub: "+15 yangi",
      icon: GraduationCap,
      accent: "bg-emerald-600/10 text-emerald-600 ring-emerald-600/15",
      chip: "border-emerald-200 text-emerald-700 bg-emerald-50",
    },
    {
      title: "Faol Darslar",
      value: stats.totalLessons,
      sub: "Ayni vaqtda",
      icon: BookOpen,
      accent: "bg-violet-600/10 text-violet-600 ring-violet-600/15",
      chip: "border-violet-200 text-violet-700 bg-violet-50",
    },
    {
      title: "Umumiy Tushum",
      value: stats.totalRevenue.toLocaleString("uz-UZ"),
      sub: "UZS",
      icon: DollarSign,
      accent: "bg-amber-600/10 text-amber-600 ring-amber-600/15",
      chip: "border-amber-200 text-amber-700 bg-amber-50",
    },
  ] as const;

  const quickActions = [
    {
      title: "Ustozlar",
      icon: Users,
      link: "/app/admin/teacher",
      iconWrap: "bg-blue-50 text-blue-700",
    },
    {
      title: "Talabalar",
      icon: GraduationCap,
      link: "/app/admin/student",
      iconWrap: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Darslar",
      icon: BookOpen,
      link: "/app/admin/lesson",
      iconWrap: "bg-violet-50 text-violet-700",
    },
    {
      title: "To'lovlar",
      icon: DollarSign,
      link: "/app/admin/payment",
      iconWrap: "bg-amber-50 text-amber-700",
    },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 space-y-6">
        <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white shadow-2xl">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative z-10 p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-white/10 text-white border-white/10 hover:bg-white/15">
                    Admin Panel
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-white/10 text-white/80"
                  >
                    2026 Season
                  </Badge>
                  <div className="hidden sm:flex items-center gap-2 text-white/70 text-xs font-bold">
                    <Activity className="h-4 w-4" />
                    Real-time ko'rsatkichlar
                  </div>
                </div>

                <div className="space-y-1">
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                    Xush kelibsiz,{" "}
                    <span className="text-blue-300">{username}</span>!
                  </h1>
                  <p className="text-white/70 font-medium max-w-2xl">
                    Bugun platformangizda o'sish kuzatilmoqda. Barcha
                    ko'rsatkichlar nazorat ostida.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Card className="border-white/10 bg-white/5 text-white backdrop-blur-md">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="h-2 w-2 rounded-full bg-emerald-400" />
                        <div className="absolute inset-0 h-2 w-2 rounded-full bg-emerald-400 animate-ping opacity-60" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/60">
                          Status
                        </p>
                        <p className="text-sm font-black text-emerald-300">
                          Live
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-white/5 text-white backdrop-blur-md hidden md:block">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-2xl bg-blue-500/15 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-blue-300" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/60">
                          Tavsiya
                        </p>
                        <p className="text-sm font-black text-white">
                          Weekly review
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statsCards.map((s) => {
            const Icon = s.icon;
            return (
              <Card
                key={s.title}
                className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`h-12 w-12 rounded-2xl ring-1 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${s.accent}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <Badge
                      variant="outline"
                      className={`text-[10px] font-black uppercase tracking-widest ${s.chip}`}
                    >
                      {s.sub}
                    </Badge>
                  </div>

                  <div className="mt-4 space-y-1">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                      {s.title}
                    </p>
                    <div className="flex items-end justify-between">
                      <p className="text-3xl font-black text-slate-900 leading-none">
                        {s.value}
                      </p>
                      <span className="text-xs font-bold text-slate-400">
                        {s.title === "Umumiy Tushum" ? "UZS" : ""}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="border-none shadow-sm rounded-3xl">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg font-black text-slate-900">
                    Talabalar
                  </CardTitle>
                  <CardDescription className="text-xs font-bold">
                    O'sish dinamikasi
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border bg-emerald-50/60 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-700" />
                  <p className="font-bold text-slate-800">
                    Faol foydalanuvchilar
                  </p>
                </div>
                <p className="text-2xl font-black text-emerald-800">
                  {stats.totalStudents}
                </p>
              </div>

              <div className="rounded-2xl border bg-red-50/60 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <XCircle className="h-5 w-5 text-red-700" />
                  <p className="font-bold text-slate-800">Bloklanganlar</p>
                </div>
                <p className="text-2xl font-black text-red-800">0</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg font-black text-slate-900">
                    Ustozlar
                  </CardTitle>
                  <CardDescription className="text-xs font-bold">
                    Reyting ko'rsatkichlari
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border bg-blue-50/60 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-blue-700" />
                  <p className="font-bold text-slate-800">Jami mutaxassislar</p>
                </div>
                <p className="text-2xl font-black text-blue-800">
                  {stats.totalTeachers}
                </p>
              </div>

              <div className="rounded-2xl border bg-amber-50/60 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-amber-600 fill-amber-500" />
                  <p className="font-bold text-slate-800">O'rtacha sifat</p>
                </div>
                <p className="text-2xl font-black text-amber-800">4.9</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl bg-gradient-to-br from-white to-slate-50">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-violet-50 text-violet-700 flex items-center justify-center">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg font-black text-slate-900">
                    Moliya
                  </CardTitle>
                  <CardDescription className="text-xs font-bold">
                    Moliyaviy hisobot
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border bg-slate-900 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-blue-300" />
                  <p className="font-black">Sof foyda</p>
                </div>
                <p className="text-xl font-black">
                  {(stats.totalRevenue / 1000).toFixed(1)}K{" "}
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/60">
                    uzs
                  </span>
                </p>
              </div>

              <Button
                variant="outline"
                className="w-full h-12 rounded-2xl font-black border-dashed border-2 group"
                asChild
              >
                <Link to="/app/admin/payment">
                  Barcha to'lovlarni ko'rish
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-black text-slate-900">
              Tezkor Harakatlar
            </CardTitle>
            <CardDescription className="font-medium">
              Bo'limlarga tezkor o'tish tugmalari
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0">
            <Separator className="mb-4" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {quickActions.map((a) => {
                const Icon = a.icon;
                return (
                  <Link
                    key={a.title}
                    to={a.link}
                    className="group rounded-3xl border bg-white p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`h-11 w-11 rounded-2xl flex items-center justify-center ${a.iconWrap}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="h-9 w-9 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-black text-slate-900">
                        {a.title}
                      </p>
                      <p className="text-xs font-medium text-slate-500 mt-1">
                        Bolimga otish
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
