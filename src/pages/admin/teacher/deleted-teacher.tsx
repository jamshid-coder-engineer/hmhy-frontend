

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search,
    ArrowLeft,
    ArrowUpDown,
    ArrowDown,
    AlertCircle,
} from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";
import { useDeletedTeacher } from "../service/query/useDeletedTeacher";
import { TeacherDetailsModal } from "../components/teacherDetail";
import { TeacherCard } from "../components/teacherCard";
import { useRestoreTeacher } from "../service/mutate/useRestoreTeacher";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useHardDeleteTeacher } from "../service/mutate/useHardDeleteTeacher";
import { TeacherHardDeleteModal } from "../components/teacherHardDelete";

export const DeletedTeachersPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(
        null
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, isPending } = useDeletedTeacher();

    const {} = useHardDeleteTeacher();

    const [hardDeleteTeacher, setHardDeleteTeacher] = useState<any | null>(
        null
    );
    const [isHardDeleteModalOpen, setIsHardDeleteModalOpen] = useState(false);

    const { mutate: hardDelete, isPending: isDeleting } =
        useHardDeleteTeacher();

    const { mutate: restoreTeacher, isPending: isRestoring } =
        useRestoreTeacher();

    const handleRestore = (id: string) => {
        restoreTeacher(id, {
            onSuccess: () => {
                toast.success("Ustoz muvaffaqiyatli tiklandi!", {
                    position: "top-right",
                });
                queryClient.invalidateQueries({
                    queryKey: ["teacherDeletedList"],
                });
                queryClient.invalidateQueries({ queryKey: ["teachers"] });
            },
            onError: () => {
                toast.error("Tiklashda xatolik yuz berdi");
            },
        });
    };

    const handleHardDelete = () => {
        if (!hardDeleteTeacher) return;

        hardDelete(hardDeleteTeacher.id, {
            onSuccess: () => {
                toast.success("Ustoz tizimdan butunlay o'chirildi", {
                    position: "top-right",
                });
                queryClient.invalidateQueries({
                    queryKey: ["teacherDeletedList"],
                });
                setIsHardDeleteModalOpen(false);
            },
            onError: () => {
                toast.error("O'chirishda xatolik yuz berdi");
            },
        });
    };

    const openHardDeleteModal = (teacher: any) => {
        setHardDeleteTeacher(teacher);
        setIsHardDeleteModalOpen(true);
    };

    const deletedTeachers: any[] = data?.data || [];

    const filteredTeachers = deletedTeachers.filter(
        (teacher) =>
            (teacher.fullName || "")
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            (teacher.email || "")
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
    );

    const getInitials = (name: string) => {
        if (!name) return "??";
        return name
            .trim()
            .split(" ")
            .map((n: any) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const handleOpenDetails = (id: string) => {
        setSelectedTeacherId(id);
        setIsModalOpen(true);
    };

    if (isPending) {
        return (
            <div className="p-8 space-y-6 min-h-screen">
                <Skeleton className="h-20 w-full rounded-2xl" />
                {[1, 2].map((i) => (
                    <Skeleton key={i} className="h-64 w-full rounded-2xl" />
                ))}
            </div>
        );
    }


    return (
        <div className="p-8 space-y-6 min-h-screen font-sans">
            {" "}
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm text-[#64748b] hover:text-slate-900 transition-colors mb-2 cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" /> Orqaga
                    </button>
                    <h1 className="text-[28px] font-bold text-[#0f172a]">
                        O'chirilgan Ustozlar
                    </h1>
                    <p className="text-[#64748b] text-sm">
                        O'chirilgan ustozlarni ko'rish va boshqarish
                    </p>
                </div>

                <div className="relative w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                        placeholder="Ism, email yoki telefon bo'yicha"
                        className="pl-10 bg-white border-[#e2e8f0] h-11 rounded-xl shadow-sm text-black"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <Card className="p-4 px-6 flex items-center gap-6 text-[13px] font-medium text-[#64748b] border-[#e2e8f0] shadow-sm bg-white rounded-xl">
                <span className="text-[#94a3b8] font-semibold uppercase tracking-wider text-[11px]">
                    Saralash:
                </span>
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900">
                    Yaratilgan vaqt{" "}
                    <ArrowDown className="w-4 h-4 text-slate-400" />
                </div>
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900">
                    Ism <ArrowUpDown className="w-3.5 h-3.5 text-slate-300" />
                </div>
            </Card>
            <div className="space-y-5">
                {filteredTeachers.length === 0 ? (
                    <Card className="p-24 flex flex-col items-center justify-center border-dashed border-2 border-[#e2e8f0] bg-white rounded-3xl text-center">
                        <div className="bg-[#f1f5f9] p-5 rounded-full mb-4">
                            <AlertCircle className="w-12 h-12 text-[#94a3b8]" />
                        </div>
                        <h3 className="text-xl font-bold text-[#1e293b]">
                            O'chirilgan ustozlar topilmadi
                        </h3>
                        <p className="text-[#64748b] mt-1">
                            Hozircha o'chirilgan ustozlar mavjud emas
                        </p>
                    </Card>
                ) : (
                    filteredTeachers.map((teacher) => (
                        <TeacherCard
                            key={teacher.id}
                            teacher={teacher}
                            onOpenDetails={handleOpenDetails}
                            getInitials={getInitials}
                            onRestore={() => handleRestore(teacher.id)}
                            isRestoring={isRestoring}
                            onHardDelete={() => openHardDeleteModal(teacher)}
                        />
                    ))
                )}
            </div>
            {selectedTeacherId && (
                <TeacherDetailsModal
                    id={selectedTeacherId}
                    open={isModalOpen}
                    onOpenChange={setIsModalOpen}
                />
            )}
            <TeacherHardDeleteModal
                teacher={hardDeleteTeacher}
                open={isHardDeleteModalOpen}
                onOpenChange={setIsHardDeleteModalOpen}
                onConfirm={handleHardDelete}
                isPending={isDeleting}
            />
        </div>

    );
};
