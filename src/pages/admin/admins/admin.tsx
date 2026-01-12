import { useState, useMemo } from "react";
import {
    Search,
    Plus,
    Phone,
    Loader2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../../components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select";

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
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<
        "username" | "createdAt" | "updatedAt"
    >("username");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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
    const { data, isLoading } = useAdminList(page, pageSize);
    const { mutate: createAdmin, isPending: isCreating } = useCreateAdmin();
    const { mutate: deleteAdmin, isPending: isDeleting } = useDeleteAdmin();

    const admins = data?.data || [];
    const totalElements = data?.totalElements || 0;
    const totalPages = data?.totalPages || 1;
    const from = data?.from || 0;
    const to = data?.to || 0;

    const filteredAndSortedAdmins = useMemo(() => {
        return admins
            .filter((admin: Admin) => {
                const query = searchQuery.toLowerCase();
                return (
                    admin.username?.toLowerCase().includes(query) ||
                    admin.phoneNumber?.toLowerCase().includes(query) ||
                    admin.role?.toLowerCase().includes(query)
                );
            })
            .sort((a: Admin, b: Admin) => {
                let comparison = 0;
                if (sortBy === "username") {
                    comparison = (a.username || "").localeCompare(
                        b.username || ""
                    );
                } else if (sortBy === "createdAt") {
                    comparison =
                        new Date(a.createdAt || 0).getTime() -
                        new Date(b.createdAt || 0).getTime();
                } else if (sortBy === "updatedAt") {
                    comparison =
                        new Date(a.updatedAt || 0).getTime() -
                        new Date(b.updatedAt || 0).getTime();
                }
                return sortOrder === "asc" ? comparison : -comparison;
            });
    }, [admins, searchQuery, sortBy, sortOrder]);

    const toggleSort = (field: "username" | "createdAt" | "updatedAt") => {
        if (sortBy === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setSortOrder("asc");
        }
    };

    const handleCreate = () => {
        if (
            !createFormData.username ||
            !createFormData.phoneNumber ||
            !createFormData.password
        ) {
            toast.error("Iltimos, barcha maydonlarni to'ldiring");
            return;
        }
        createAdmin(createFormData, {
            onSuccess: () => {
                toast.success("Admin muvaffaqiyatli yaratildi!");
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
                    error?.response?.data?.message || "Xatolik yuz berdi"
                ),
        });
    };

    const handleDelete = () => {
        if (!adminToDelete?.id) return;
        deleteAdmin(adminToDelete.id, {
            onSuccess: () => {
                toast.success("Admin o'chirildi!");
                queryClient.invalidateQueries({ queryKey: ["adminList"] });
                setAdminToDelete(null);
            },
        });
    };

    if (isLoading) {
        return (
            <div className="p-8 min-h-screen">
                <div className="flex items-center justify-between mb-8 gap-4">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-11 flex-1 max-w-4xl" />
                    <Skeleton className="h-11 w-32" />
                </div>
                <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                        <Card
                            key={i}
                            className="p-4 border-none shadow-sm w-full bg-white rounded-4xl"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-12 w-12 rounded-full" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-5 w-24" />
                                        <Skeleton className="h-4 w-32" />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Skeleton className="h-9 w-16" />
                                    <Skeleton className="h-9 w-16" />
                                    <Skeleton className="h-9 w-16" />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 min-h-screen font-sans">
            <div className="flex items-center justify-between mb-8 gap-4">
                <h1 className="text-3xl font-bold text-slate-900">Admins</h1>
                <div className="flex-1 max-w-4xl mx-4 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search by username, phone or role"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-11 bg-white border-slate-200 shadow-sm w-full rounded-md text-black"
                    />
                </div>
                <Button
                    onClick={() => setOpenCreate(true)}
                    className="h-11 px-4 bg-[#121826] hover:bg-slate-800 text-white rounded-md flex gap-2 font-medium cursor-pointer"
                >
                    <Plus className="h-4 w-4" /> Add Admin
                </Button>
            </div>

            <div className="mb-4 flex items-center gap-4 text-sm">
                <span className="text-slate-600 font-medium">Sort by:</span>
                <Button
                    variant="ghost"
                    onClick={() => toggleSort("username")}
                    className="h-8 px-3 text-slate-700 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                >
                    Username{" "}
                    {sortBy === "username" && (sortOrder === "asc" ? "↑" : "↓")}
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => toggleSort("createdAt")}
                    className="h-8 px-3 text-slate-700 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                >
                    Created Date{" "}
                    {sortBy === "createdAt" &&
                        (sortOrder === "asc" ? "↑" : "↓")}
                </Button>
            </div>

            <div className="space-y-4 mb-6">
                {filteredAndSortedAdmins.length > 0 ? (
                    filteredAndSortedAdmins.map((admin: Admin) => (
                        <Card
                            key={admin.id}
                            className="p-4 flex border-none shadow-sm hover:shadow-md transition-shadow bg-white rounded-xl"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center justify-start gap-4">
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
                                            <Badge className="bg-[#e0e7ff] text-[#4338ca] text-[10px] uppercase border-none">
                                                {admin.role || "ADMIN"}
                                            </Badge>
                                        </div>
                                        <p className="text-[13px] text-slate-500 flex items-center gap-1.5 font-medium">
                                            <Phone className="w-3.5 h-3.5" />
                                            {admin.phoneNumber}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-end justify-end gap-2.5">
                                    <Button
                                        variant="outline"
                                        onClick={() => setSelectedAdminId(admin.id)}
                                        className="h-9 px-4 cursor-pointer"
                                    >
                                        More
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => setAdminToEdit(admin)}
                                        className="h-9 px-4 cursor-pointer"
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
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="bg-white p-20 rounded-2xl text-center text-slate-400 border border-dashed border-slate-200">
                        Ma'lumotlar topilmadi
                    </div>
                )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-t border-slate-200 mt-6">
                <div className="flex items-center gap-6 text-sm text-slate-600">
                    <p>
                        Showing{" "}
                        <span className="font-semibold text-slate-900">
                            {from}
                        </span>{" "}
                        to{" "}
                        <span className="font-semibold text-slate-900">
                            {to}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-slate-900">
                            {totalElements}
                        </span>{" "}
                        results
                    </p>
                    <div className="flex items-center gap-2">
                        <span>Show:</span>
                        <Select
                            value={pageSize.toString()}
                            onValueChange={(v) => {
                                setPageSize(Number(v));
                                setPage(1);
                            }}
                        >
                            <SelectTrigger className="h-8 w-30 bg-white border-slate-200">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="5">5 per page</SelectItem>
                                <SelectItem value="10">10 per page</SelectItem>
                                <SelectItem value="20">20 per page</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="text-slate-600 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                    </Button>

                    <div className="flex items-center gap-1">
                        {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                        ).map((p) => (
                            <Button
                                key={p}
                                variant={page === p ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setPage(p)}
                                className={`h-8 w-8 p-0 rounded-md transition-colors ${page === p
                                        ? "bg-[#334155] text-white hover:bg-[#1e293b]"
                                        : "text-slate-600 hover:bg-slate-100"
                                    }`}
                            >
                                {p}
                            </Button>
                        ))}
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="text-slate-600 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                    >
                        Next <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>
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
                            <Label className="text-slate-500 text-sm">
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
                                className="bg-slate-50 border-slate-200"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-slate-500 text-sm">
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
                                className="bg-slate-50 border-slate-200"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-slate-500 text-sm">
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
                                className="bg-slate-50 border-slate-200"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setOpenCreate(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCreate}
                            disabled={isCreating}
                            className="bg-black text-white hover:bg-slate-800"
                        >
                            {isCreating ? (
                                <Loader2 className="animate-spin h-4 w-4" />
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