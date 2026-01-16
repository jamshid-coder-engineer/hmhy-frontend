import { useTeacherStats } from "./service/query/useTeacherStats";
import { CheckCircle2, TrendingUp, XCircle, Wallet } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { PaymentsSkeleton } from "./components/payments-skeleton";

export const Payments = () => {
    const { data: stats, isPending } = useTeacherStats();
    const [filter, setFilter] = useState("Barchasi");

    const statCards = [
        {
            title: "To'langan",
            amount: stats?.paid?.amount || 0,
            count: stats?.paid?.count || 0,
            icon: <CheckCircle2 className="text-emerald-500 w-4 h-4" />,
            color: "text-emerald-500",
            countLabel: "ta to'lov",
        },
        {
            title: "To'lanmagan",
            amount: stats?.unpaid?.amount || 0,
            count: stats?.unpaid?.count || 0,
            icon: <TrendingUp className="text-orange-500 w-4 h-4" />,
            color: "text-orange-500",
            countLabel: "ta dars",
        },
        {
            title: "Bekor qilingan",
            amount: stats?.cancelled?.amount || 0,
            count: stats?.cancelled?.count || 0,
            icon: <XCircle className="text-red-500 w-4 h-4" />,
            color: "text-red-500",
            countLabel: "ta",
        },
    ];

    if (isPending) return <PaymentsSkeleton />;

    return (
        <div className="p-4 md:p-8 space-y-8 min-h-screen">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold text-slate-900">
                    To'lovlarim
                </h1>
                <p className="text-sm text-slate-500 font-medium">
                    O'tkazilgan to'lovlar va statistika
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6"
                    >
                        <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                                <span className="text-[13px] font-bold text-slate-900">
                                    {card.title}
                                </span>
                            </div>
                            {card.icon}
                        </div>

                        <div className="space-y-1">
                            <h2
                                className={cn("text-2xl font-bold", card.color)}
                            >
                                {card.amount.toLocaleString()} so'm
                            </h2>
                            <p className="text-[12px] text-slate-400 font-medium">
                                {card.count} {card.countLabel}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
                <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">
                        To'lovlar tarixi
                    </h3>
                    <p className="text-[12px] text-slate-400 font-medium">
                        Sizga amalga oshirilgan barcha to'lovlar ro'yxati
                    </p>
                </div>

                <div className="flex gap-2">
                    {["Barchasi", "To'langan", "Bekor qilingan"].map((item) => (
                        <button
                            key={item}
                            onClick={() => setFilter(item)}
                            className={cn(
                                "px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all border",
                                filter === item
                                    ? "bg-slate-100 border-slate-200 text-slate-900"
                                    : "bg-white border-transparent text-slate-500 hover:bg-slate-50"
                            )}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col items-center justify-center py-20 space-y-3">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-slate-300" />
                    </div>
                    <div className="text-center">
                        <h4 className="text-sm font-bold text-slate-700">
                            To'lovlar topilmadi
                        </h4>
                        <p className="text-[12px] text-slate-400 font-medium">
                            To'lovlar ro'yxati bo'sh
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
