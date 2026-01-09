import { Card } from "../../../components/ui/card";
import { useAdmin } from "../service/query/useAdmin";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import {
    Calendar,
    CheckCircle2,
    Info,
    RotateCcw,
    Trash2,
    User,
} from "lucide-react";
import { Badge } from "../../../components/ui/badge";

export const TeacherCard = ({
    teacher,
    onOpenDetails,
    getInitials,
    onRestore,
    isRestoring,
    onHardDelete,
}: any) => {
    const { data: dataAdmin, isLoading: isAdminLoading } = useAdmin(
        teacher.deletedBy
    );

    return (
        <Card className="p-8 rounded-[24px] border-[#e2e8f0] shadow-sm hover:shadow-md transition-all bg-white relative overflow-hidden">
            <div className="flex justify-between items-start">
                <div className="flex gap-6">
                    <Avatar className="h-21 w-21 rounded-2xl border-2 border-slate-50 shadow-sm">
                        <AvatarImage
                            src={teacher.imageUrl}
                            className="object-cover"
                        />
                        <AvatarFallback className="text-2xl bg-[#334155] text-white font-bold">
                            {getInitials(teacher.fullName)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1.5">
                        <h3 className="text-[22px] font-bold text-[#0f172a] leading-none">
                            {teacher.fullName}
                        </h3>
                        <p className="text-[#64748b] font-medium">
                            {teacher.email}
                        </p>
                        <p className="text-[#64748b] text-sm">
                            {teacher.phoneNumber}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2.5 min-w-35">
                    <Button
                        variant="outline"
                        disabled={isRestoring}
                        onClick={onRestore}
                        className="w-full gap-2 h-10 border-[#e2e8f0] text-[#475569] font-semibold rounded-xl hover:bg-slate-50 cursor-pointer"
                    >
                        <RotateCcw
                            className={`w-4 h-4 ${
                                isRestoring ? "animate-spin" : ""
                            }`}
                        />
                        {isRestoring ? "Tiklanmoqda..." : "Tiklash"}
                    </Button>
                    <Button
                        onClick={onHardDelete}
                        className="w-full gap-2 h-10 bg-[#ef4444] hover:bg-red-600 text-white font-semibold rounded-xl border-none shadow-sm shadow-red-200 cursor-pointer"
                    >
                        <Trash2 className="w-4 h-4" /> O'chirish
                    </Button>
                    <button
                        onClick={() => onOpenDetails(teacher.id)}
                        className="text-sm font-semibold text-[#64748b] hover:text-blue-600 transition-colors mt-1 underline-offset-4 hover:underline cursor-pointer"
                    >
                        Batafsil
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-[#f8fafc] p-3.5 px-5 rounded-2xl flex items-center gap-3 border border-slate-50 text-[13px] text-[#64748b]">
                    <Calendar className="w-4 h-4 text-[#94a3b8]" />
                    O'chirilgan:{" "}
                    <b className="text-[#334155] ml-1">08 Yanvar 2026</b>
                </div>
                <div className="bg-[#f8fafc] p-3.5 px-5 rounded-2xl flex items-center gap-3 border border-slate-50 text-[13px] text-[#64748b]">
                    <User className="w-4 h-4 text-[#94a3b8]" />
                    O'chirgan:{" "}
                    <b className="text-[#334155] ml-1 truncate">
                        {isAdminLoading
                            ? "Yuklanmoqda..."
                            : dataAdmin?.data?.username || "Admin"}
                    </b>
                </div>
                <div className="bg-[#f8fafc] p-3.5 px-5 rounded-2xl flex items-center justify-between border border-slate-50 col-span-2">
                    <div className="flex items-center gap-3 text-[13px] text-[#64748b]">
                        <Info className="w-4 h-4 text-[#94a3b8]" />
                        Tiklash muddati:{" "}
                        <b className="text-[#334155] ml-1">22 Yanvar 2026</b>
                    </div>
                    <Badge className="bg-[#dcfce7] text-[#15803d] hover:bg-[#dcfce7] border-none px-3 py-1 rounded-lg flex gap-1.5 font-bold text-[11px]">
                        <CheckCircle2 className="w-3 h-3" /> TIKLASH MUMKIN
                    </Badge>
                </div>
            </div>

            {teacher.reasonDelete && (
                <div className="mt-5 p-4 px-6 bg-[#fffbeb] border border-[#fef3c7] rounded-2xl">
                    <p className="text-[14px]">
                        <span className="font-bold text-[#b45309] mr-2">
                            Sabab:
                        </span>
                        <span className="text-[#d97706] font-medium leading-relaxed">
                            {teacher.reasonDelete}
                        </span>
                    </p>
                </div>
            )}
        </Card>
    );
};
