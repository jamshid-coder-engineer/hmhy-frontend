import { useState } from "react";
import { Search, Plus, Phone, Loader2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Card } from "../../../components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../../components/ui/dialog";

import { useQueryClient } from "@tanstack/react-query";
import { useAdminList } from "../service/query/useAdminList";
import { useCreateAdmin } from "../service/mutate/useCreateAdmin";
import { useDeleteAdmin } from "../service/mutate/useDeleteAdmin";
import type { Admin } from "../../auth/admin-type";
import { toast } from "sonner";
import { AdminDetailsModal } from "../components/adminDetail";
import { DeleteConfirmationModal } from "../components/adminDelete";
import { EditAdminModal } from "../components/adminEdit";

export const AdminPage = () => {
    const [openCreate, setOpenCreate] = useState(false);
    const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);
    const [adminToDelete, setAdminToDelete] = useState<Admin | null>(null);
    const [adminToEdit, setAdminToEdit] = useState<Admin | null>(null);

    const [createFormData, setCreateFormData] = useState({
        username: "",
        phoneNumber: "",
        password: "",
    });

    const queryClient = useQueryClient();
    const { data, isLoading } = useAdminList();
    const { mutate: createAdmin, isPending: isCreating } = useCreateAdmin();
    const { mutate: deleteAdmin, isPending: isDeleting } = useDeleteAdmin();

    const admins = data?.data || [];

    const handleCreate = () => {
        if (
            !createFormData.username ||
            !createFormData.phoneNumber ||
            !createFormData.password
        ) {
            toast.error("Iltimos, barcha maydonlarni to'ldiring", {
                position: "top-right",
            });
            return;
        }

        createAdmin(createFormData, {
            onSuccess: () => {
                toast.success("Admin successfully created!", {
                    position: "top-right",
                });
                queryClient.invalidateQueries({ queryKey: ["adminList"] });
                setOpenCreate(false);
                setCreateFormData({
                    username: "",
                    phoneNumber: "",
                    password: "",
                });
            },
            onError: (error: any) =>
                toast.error(
                    error?.response?.data?.message ||
                    "Xatolik yuz berdi, username allaqachon mavjud",
                    { position: "top-right" }
                ),
        });
    };

    const handleDelete = () => {
        if (!adminToDelete?.id) return;
        deleteAdmin(adminToDelete.id, {
            onSuccess: () => {
                toast.success("Admin muvaffaqiyatli o'chirildi!", {
                    position: "top-right",
                });
                queryClient.invalidateQueries({ queryKey: ["adminList"] });
                setAdminToDelete(null);
            },
        });
    };

    if (isLoading)
        return (
            <div className="p-10 text-center font-medium text-slate-500">
                Yuklanmoqda...
            </div>
        );

    return (
        <div className="p-8 min-h-screen font-sans">
            <div className="flex items-center justify-between mb-8 gap-4">
                <h1 className="text-3xl font-bold text-slate-900">Admins</h1>
                <div className="flex-1 max-w-4xl mx-4 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search..."
                        className="pl-10 h-11 bg-white border-none text-black shadow-sm w-full rounded-md"
                    />
                </div>
                <Button
                    onClick={() => setOpenCreate(true)}
                    className="h-11 px-4 bg-[#121826] hover:bg-slate-800 text-white rounded-md flex gap-2 font-medium cursor-pointer"
                >
                    <Plus className="h-4 w-4" /> Add Admin
                </Button>
            </div>

            {/* LIST */}
            <div className="space-y-4">
                {admins.length > 0 ? (
                    admins.map((admin: Admin) => (
                        <Card
                            key={admin.id}

                            className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                        >
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarFallback className="bg-[#475569] text-white font-semibold">
                                        {admin.username
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-slate-800">
                                            {admin.username}
                                        </h3>
                                        <Badge className="bg-[#e0e7ff] text-[#4338ca] text-[10px] uppercase border-none hover:bg-[#e0e7ff] cursor-default">
                                            {admin.role || "ADMIN"}
                                        </Badge>
                                    </div>
                                    <p className="text-[13px] text-slate-500 flex items-center gap-1.5 font-medium">
                                        <Phone className="w-3.5 h-3.5" />
                                        {admin.phoneNumber}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2.5">
                                <Button
                                    variant="outline"
                                    onClick={() => setSelectedAdminId(admin.id)}
                                    className="h-9 px-4 text-slate-700 hover:bg-slate-50 border-slate-200 cursor-pointer"
                                >
                                    More
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setAdminToEdit(admin)}
                                    className="h-9 px-4 text-slate-700 hover:bg-slate-50 border-slate-200 cursor-pointer"
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => setAdminToDelete(admin)}
                                    className="h-9 px-4 bg-red-600 hover:bg-red-700 cursor-pointer"
                                >
                                    Delete
                                </Button>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="bg-white p-20 rounded-2xl text-center text-slate-400 border border-dashed border-slate-200">
                        Ma'lumotlar topilmadi
                    </div>
                )}
            </div>

            <Dialog open={openCreate} onOpenChange={setOpenCreate}>
                <DialogContent className="sm:max-w-106.25 bg-white p-6 rounded-xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">
                            Add New Admin
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label className="text-slate-500 font-medium text-sm">
                                Username
                            </Label>
                            <Input
                                placeholder="Enter username"
                                value={createFormData.username}
                                onChange={(e) =>
                                    setCreateFormData({
                                        ...createFormData,
                                        username: e.target.value,
                                    })
                                }
                                className="h-10 bg-slate-50 border-slate-200"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-slate-500 font-medium text-sm">
                                Phone number
                            </Label>
                            <Input
                                placeholder="+998..."
                                value={createFormData.phoneNumber}
                                onChange={(e) =>
                                    setCreateFormData({
                                        ...createFormData,
                                        phoneNumber: e.target.value,
                                    })
                                }
                                className="h-10 bg-slate-50 border-slate-200"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-slate-500 font-medium text-sm">
                                Password
                            </Label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={createFormData.password}
                                onChange={(e) =>
                                    setCreateFormData({
                                        ...createFormData,
                                        password: e.target.value,
                                    })
                                }
                                className="h-10 bg-slate-50 border-slate-200"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setOpenCreate(false)}
                            className="h-10 px-6 border-slate-200 text-slate-700 cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCreate}
                            disabled={isCreating}
                            className="h-10 px-6 bg-black hover:bg-slate-800 text-white cursor-pointer"
                        >
                            {isCreating ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                "Add Admin"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AdminDetailsModal
                open={!!selectedAdminId}
                id={selectedAdminId}
                onOpenChange={() => setSelectedAdminId(null)}
            />
            <DeleteConfirmationModal
                open={!!adminToDelete}
                adminName={adminToDelete?.username}
                onConfirm={handleDelete}
                isDeleting={isDeleting}
                onOpenChange={() => setAdminToDelete(null)}
            />
            <EditAdminModal
                open={!!adminToEdit}
                admin={adminToEdit}
                onOpenChange={(isOpen) => !isOpen && setAdminToEdit(null)}
            />
        </div>
    );
};
