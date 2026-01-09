import { Button } from "../../../components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../../components/ui/dialog";
import { Loader2 } from "lucide-react";

export const DeleteConfirmationModal = ({
    open,
    onOpenChange,
    onConfirm,
    isDeleting,
    adminName,
}: any) => (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-112.5 bg-white p-6 rounded-xl gap-4">
            <DialogHeader className="space-y-3">
                <DialogTitle className="text-xl font-bold text-slate-900">
                    O'chirishni tasdiqlang
                </DialogTitle>
                <DialogDescription className="text-[15px] text-slate-500 font-medium italic">
                    "{adminName}"ni o'chirishga ishonchingiz komilmi?
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4 gap-2 sm:gap-0">
                <Button
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    className="h-10 px-6 border-slate-200 text-slate-700 font-medium hover:bg-slate-50 cursor-pointer"
                >
                    Bekor qilish
                </Button>
                <Button
                    onClick={onConfirm}
                    disabled={isDeleting}
                    variant="destructive"
                    className="h-10 px-6 bg-red-600 hover:bg-red-700 text-white font-medium cursor-pointer"
                >
                    {isDeleting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                            O'chirilmoqda...
                        </>
                    ) : (
                        "Ha, o'chirish"
                    )}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);
