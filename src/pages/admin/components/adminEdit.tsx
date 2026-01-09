import { useEffect, useState } from "react";
import { useUpdateAdmin } from "../service/mutate/useEditAdmin";
import type { Admin } from "../../auth/admin-type";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Loader2 } from "lucide-react";

export const EditAdminModal = ({
    admin,
    open,
    onOpenChange,
}: {
    admin: Admin | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) => {
    const { mutate: updateAdmin, isPending } = useUpdateAdmin();
    const [formData, setFormData] = useState({
        username: "",
        phoneNumber: "",
        password: "",
    });

    useEffect(() => {
        if (admin) {
            setFormData({
                username: admin.username || "",
                phoneNumber: admin.phoneNumber || "",
                password: "",
            });
        }
    }, [admin]);

    const queryClient = useQueryClient();

    const handleSave = () => {
        if (!admin?.id) return;

        const { password, ...otherData } = formData;

        const updateData: any = { ...otherData };

        if (password && password.trim() !== "") {
            updateData.password = password;
        }

        updateAdmin(
            { id: admin.id, data: updateData },
            {
                onSuccess: () => {
                    toast.success("Admin muvaffaqiyatli yangilandi!", {
                        position: "top-right",
                    });
                    onOpenChange(false);
                    queryClient.invalidateQueries({ queryKey: ["adminList"] });
                },
                onError: (error: any) =>
                    toast.error(
                        error?.response?.data?.message ||
                            "Yangilashda xatolik yuz berdi, username allaqachon mavjud",
                        {
                            position: "top-right",
                        }
                    ),
            }
        );
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-106.25 bg-white p-6 rounded-2xl border-none shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-slate-900">
                        Update Item
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Input
                        placeholder="Username"
                        value={formData.username}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                username: e.target.value,
                            })
                        }
                        className="h-12 bg-white border-slate-200 rounded-lg focus-visible:ring-1 focus-visible:ring-slate-400"
                    />
                    <Input
                        placeholder="Phone number"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                phoneNumber: e.target.value,
                            })
                        }
                        className="h-12 bg-white border-slate-200 rounded-lg focus-visible:ring-1 focus-visible:ring-slate-400"
                    />
                    <Input
                        type="password"
                        placeholder="Password (ixtiyoriy)"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                        className="h-12 bg-white border-slate-200 rounded-lg focus-visible:ring-1 focus-visible:ring-slate-400"
                    />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="h-11 px-6 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium cursor-pointer"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={isPending}
                        className="h-11 px-8 bg-[#121826] hover:bg-slate-800 text-white rounded-lg font-medium cursor-pointer"
                    >
                        {isPending ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            "Save"
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
