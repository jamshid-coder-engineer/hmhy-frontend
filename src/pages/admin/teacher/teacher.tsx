import { useState } from "react";
import { useTeacherList } from "../service/query/useTeacherList";
import {
    Search,
    Mail,
    Phone,
    Star,
    Trash,
    Award,
    ArrowUpDown,
    ArrowDown,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";
import type { Teacher } from "../../auth/admin-type";
import { TeacherDetailsModal } from "../components/teacherDetail";
import { toast } from "sonner";
import { TeacherEditModal } from "../components/teacherEdit";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select";
import { TeacherDeleteModal } from "../components/teacherDelete";
import { useChangeTeacherStatus } from "../service/mutate/useChangeActiveTeacher";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";

export const TeacherPage = () => {
    const { data, isPending } = useTeacherList();
    const queryClient = useQueryClient()


    const role = Cookies.get("role");

    const navigate = useNavigate();

    const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(
        null
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");

    const [editTeacher, setEditTeacher] = useState<any | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const { mutate: changeStatus, isPending: isStatusPending } =
        useChangeTeacherStatus();

    const handleEditClick = (teacher: any) => {
        setEditTeacher(teacher);
        setIsEditModalOpen(true);
    };

    const [deleteTeacher, setDeleteTeacher] = useState<any | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDeleteClick = (teacher: any) => {
        setDeleteTeacher(teacher);
        setIsDeleteModalOpen(true);
    };

    if (isPending) {
        return (
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-9 w-32" />
                    <Skeleton className="h-10 w-48 rounded-md" />
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="p-4">
                            <Skeleton className="h-20 w-full" />
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    const teachers: Teacher[] = data?.data || [];

    const filteredTeachers = teachers.filter((t) =>
        (t.fullName || t.name || "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    const getInitials = (name: string) => {
        if (!name) return "??";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const handleOpenDetails = (id: string) => {
        console.log('🔍 Opening details for:', id) // ← Debug log

        setSelectedTeacherId(id);
        setIsModalOpen(true);
    };

    const handleStatusToggle = (id: string) => {
        console.log('🔄 Toggling status for:', id)
        queryClient.setQueryData(['teacher-list'], (oldData: any) => {
            if (!oldData) return oldData

            return {
                ...oldData,
                data: oldData.data.map((teacher: any) =>
                    teacher.id === id
                        ? { ...teacher, isActive: !teacher.isActive }
                        : teacher
                )
            }
        })

        // Backend'ga request
        changeStatus(id, {
            onSuccess: () => {
                toast.success('Status muvaffaqiyatli o\'zgartirildi!', {
                    position: 'top-right',
                })
                // Backend bilan sync qilish
                queryClient.invalidateQueries({ queryKey: ['teacher-list'] })
            },
            onError: (error) => {
                console.error('❌ Status change error:', error)
                toast.error('Xatolik yuz berdi')
                // Rollback - eski holatga qaytarish
                queryClient.invalidateQueries({ queryKey: ['teacher-list'] })
            },
        })
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Teachers</h1>


                {role === "superadmin" && (
                    <Button
                        onClick={() => navigate("/admin/teachers/deleted")}
                        className="bg-black hover:bg-gray-800 text-white flex items-center gap-2 cursor-pointer"
                    >
                        <Trash className="w-4 h-4" />
                        O'chirilgan Teacher'lar
                    </Button>
                )}
            </div>

            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="Search by name, email or bio"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-10 bg-white border-gray-300 text-black"
                    />
                </div>
                <Button
                    variant="outline"
                    onClick={() => setSearchQuery("")}
                    className="cursor-pointer text-black"
                >
                    Reset
                </Button>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <span>Status:</span>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-20 h-8 bg-gray-50/50">
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <span>Level:</span>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-30 h-8 bg-gray-50/50">
                            <SelectValue placeholder="All Levels" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Levels</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <span>Language:</span>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-35 h-8 bg-gray-50/50">
                            <SelectValue placeholder="All Languages" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Languages</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex items-center gap-8 text-[13px] font-medium text-gray-700 px-2 py-2 pt-4">
                <span className="text-gray-400">Sort by:</span>

                <div className="flex items-center gap-2 cursor-default min-w-20">
                    Name <ArrowDown className="w-3.5 h-3.5" />
                </div>

                <div className="flex items-center gap-2 cursor-default min-w-20">
                    Email <ArrowUpDown className="w-3.5 h-3.5" />
                </div>

                <div className="flex items-center gap-2 cursor-default min-w-20">
                    Rating <ArrowUpDown className="w-3.5 h-3.5" />
                </div>

                <div className="flex items-center gap-2 cursor-default min-w-20">
                    Price <ArrowUpDown className="w-3.5 h-3.5" />
                </div>

                <div className="flex items-center gap-2 cursor-default min-w-20">
                    Lessons <ArrowUpDown className="w-3.5 h-3.5" />
                </div>


                <div className="flex items-center gap-2 cursor-default min-w-20">
                    Created Date <ArrowUpDown className="w-3.5 h-3.5" />
                </div>
            </div>

            <div className="space-y-4">
                {filteredTeachers.length === 0 ? (
                    <Card className="p-12 text-center text-gray-500">
                        No teachers found
                    </Card>
                ) : (
                    filteredTeachers.map((teacher) => (
                        <Card
                            key={teacher.id}
                            className="pl-4 pr-12 py-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-4 w-[35%] min-w-[320px] shrink-0">
                                    <Avatar className="h-14 w-14 rounded-full border border-gray-100">
                                        <AvatarImage
                                            src={teacher.imageUrl}
                                            className="object-cover"
                                        />
                                        <AvatarFallback className="bg-gray-50 text-gray-500 font-bold">
                                            {getInitials(
                                                teacher.fullName || teacher.name
                                            )}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-1 overflow-hidden">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-gray-900 text-lg truncate">
                                                {teacher.fullName ||
                                                    teacher.name}
                                            </h3>
                                            <Badge
                                                className={`text-[10px] px-2 py-0.5 rounded-full border-none font-bold uppercase shadow-none 
    ${teacher.isActive
                                                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                                                        : "bg-gray-100 text-red-500 hover:bg-gray-100"
                                                    }`}
                                            >
                                                {teacher.isActive
                                                    ? "Active"
                                                    : "Inactive"}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <span className="text-blue-600 font-medium">
                                                🌐{" "}
                                                {teacher.specification || "❌"}
                                            </span>
                                            <span className="flex items-center gap-1 font-medium">
                                                <Award className="w-4 h-4 text-orange-500" />
                                                {teacher.level || 0}
                                            </span>
                                        </div>
                                    </div>
                                </div>


                                <div className="flex flex-col justify-center gap-1.5 w-[30%] px-6 border-l border-gray-100 shrink-0">
                                    <div
                                        className="flex items-center gap-3 text-sm text-gray-600 font-medium truncate cursor-pointer hover:text-blue-600 transition-colors"
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                teacher.email
                                            );
                                            toast.success("Email copied!", {
                                                position: "top-right",
                                            });
                                        }}
                                    >
                                        <Mail className="w-4 h-4 text-gray-400 shrink-0" />{" "}
                                        <span className="truncate">
                                            {teacher.email}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center gap-3 text-sm text-gray-600 font-medium cursor-pointer hover:text-blue-600 transition-colors"
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                teacher.phoneNumber
                                            );
                                            toast.success(
                                                "Phone number copied!",
                                                { position: "top-right" }
                                            );
                                        }}
                                    >
                                        <Phone className="w-4 h-4 text-gray-400 shrink-0" />{" "}
                                        <span>{teacher.phoneNumber}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center justify-center w-[10%] shrink-0">
                                    <div className="flex items-center gap-1 text-yellow-500 font-bold">
                                        <Star className="w-5 h-5 fill-yellow-500" />{" "}
                                        {Number(teacher.rating).toFixed(1)}
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-medium uppercase">
                                        Rating
                                    </span>
                                </div>

                                <div className="flex items-center justify-end gap-2 flex-1 border-l border-gray-100">
                                    {/* More Button */}
                                    <Button
                                        variant="outline"
                                        className="h-9 px-4 text-xs font-semibold cursor-pointer border-gray-200 hover:bg-gray-50"
                                        onClick={() => handleOpenDetails(teacher.id)}
                                    >
                                        More
                                    </Button>

                                    {/* Activate/Deactivate Button */}
                                    {teacher.isActive ? (
                                        <Button
                                            variant="outline"
                                            className="h-9 px-4 text-xs font-semibold hover:bg-gray-100 border-gray-200 cursor-pointer"
                                            onClick={() => handleStatusToggle(teacher.id)}
                                            disabled={isStatusPending}
                                        >
                                            Deactivate
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="default"
                                            className="h-9 px-4 text-xs font-semibold bg-black text-white hover:bg-gray-800 cursor-pointer"
                                            onClick={() => handleStatusToggle(teacher.id)}
                                            disabled={isStatusPending}
                                        >
                                            Activate
                                        </Button>
                                    )}

                                    {/* Edit Button */}
                                    <Button
                                        variant="outline"
                                        className="h-9 px-4 text-xs font-semibold cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleEditClick(teacher)}
                                    >
                                        Edit
                                    </Button>

                                    {/* Delete Button */}
                                    <Button
                                        variant="destructive"
                                        className="h-9 px-4 text-xs font-semibold bg-red-600 hover:bg-red-700 cursor-pointer"
                                        onClick={() => handleDeleteClick(teacher)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </Card>
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

            <TeacherEditModal
                teacher={editTeacher}
                open={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
            />

            <TeacherDeleteModal
                teacher={deleteTeacher}
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
            />
        </div>
    );
};
