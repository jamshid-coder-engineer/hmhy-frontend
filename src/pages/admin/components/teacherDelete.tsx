import { useState } from "react";
import { useDeleteTeacher } from "../service/mutate/useDeleteTeacher";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Textarea } from "../../../components/ui/textarea";
import type { TeacherDeleteModalProps } from "../../auth/admin-type";

export const TeacherDeleteModal = ({
    teacher,
    open,
    onOpenChange,
}: TeacherDeleteModalProps) => {
    const [reason, setReason] = useState("");
    const { mutate, isPending } = useDeleteTeacher();

    const handleDelete = () => {
        if (!reason.trim()) {
            toast.error("O'chirish sababini kiriting", {
                position: "top-right",
            });
            return;
        }

        mutate(
            { id: teacher.id, reason },
            {
                onSuccess: () => {
                    toast.success("Ustoz muvaffaqiyatli o'chirildi", {
                        position: "top-right",
                    });
                    onOpenChange(false);
                    setReason("");
                },
                onError: () => {
                    toast.error("Xatolik yuz berdi!");
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-112.5 p-6 rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        O'chirishni tasdiqlang
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        Ushbu amalni ortga qaytarib bo'lmaydi. Iltimos, sababini
                        ko'rsating.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mt-2">
                    <p className="text-sm text-gray-600 font-medium">
                        "
                        <span className="text-gray-900 font-bold">
                            {teacher?.fullName || teacher?.name}
                        </span>
                        "ni o'chirishga ishonchingiz komilmi?
                    </p>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold flex items-center gap-1">
                            O'chirish sababi{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                            placeholder="Nima uchun o'chirilayotganini tushuntiring..."
                            className="min-h-30 bg-slate-50 border-slate-200 resize-none focus-visible:ring-red-500/20 focus-visible:border-red-500 transition-all"
                            maxLength={500}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                        <div className="flex justify-between items-center">
                            <p className="text-[11px] text-gray-400">
                                {reason.length}/500 belgi
                            </p>
                            {reason.length < 5 && reason.length > 0 && (
                                <p className="text-[10px] text-red-400 italic">
                                    Kamida 5 ta belgi kiritish tavsiya etiladi
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="h-10 px-6 font-semibold text-gray-500 hover:bg-gray-100 rounded-xl"
                    >
                        Bekor qilish
                    </Button>
                    <Button
                        onClick={handleDelete}
                        disabled={isPending || reason.trim().length < 3}
                        className="h-10 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold border-none rounded-xl shadow-lg shadow-red-200 transition-all active:scale-95"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                O'chirilmoqda...
                            </>
                        ) : (
                            "Ha, o'chirilsin"
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
