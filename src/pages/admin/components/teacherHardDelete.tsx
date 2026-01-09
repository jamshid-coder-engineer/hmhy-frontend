import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { AlertTriangle, Loader2 } from "lucide-react";
import type { Props } from "../../auth/admin-type";

export const TeacherHardDeleteModal = ({
    teacher,
    open,
    onOpenChange,
    onConfirm,
    isPending,
}: Props) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-120 p-0 overflow-hidden border-none rounded-3xl">
                <div className="p-8 space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-red-50 p-3 rounded-2xl">
                            <AlertTriangle className="w-6 h-6 text-red-500" />
                        </div>
                        <div className="space-y-1">
                            <DialogTitle className="text-xl font-bold text-slate-900">
                                Ustozni to'liq o'chirish
                            </DialogTitle>
                            <DialogDescription className="text-slate-500">
                                <span className="font-bold text-slate-900">
                                    {teacher?.fullName}
                                </span>{" "}
                                ustozni to'liq o'chirmoqchimisiz?
                            </DialogDescription>
                        </div>
                    </div>

                    <div className="bg-red-50/50 border border-red-100 p-5 rounded-2xl space-y-2">
                        <div className="flex items-center gap-2 text-red-600">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="font-bold text-sm uppercase tracking-wider">
                                Diqqat!
                            </span>
                        </div>
                        <p className="text-sm text-red-600/80 leading-relaxed font-medium">
                            Bu operatsiya qaytarib bo'lmaydi! Barcha bog'liq
                            ma'lumotlar (darslar, tarix, tranzaksiyalar) ham
                            o'chiriladi.
                        </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                            className="flex-1 h-12 rounded-2xl font-bold text-slate-600 hover:bg-slate-100"
                        >
                            Bekor qilish
                        </Button>
                        <Button
                            onClick={onConfirm}
                            disabled={isPending}
                            className="flex-1 h-12 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg shadow-red-200"
                        >
                            {isPending ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                "To'liq o'chirish"
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
