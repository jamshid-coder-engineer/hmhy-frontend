import { useEffect, useState } from "react";
import { 
    Edit3, Lock, RefreshCw, Trash2, Loader2, 
     Mail, ShieldCheck, User as UserIcon, CameraIcon 
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { toast } from "sonner";
import { useProfile } from "./service/query/useProfile";
import {
    useChangePassword,
    useEditProfile,
} from "./service/mutate/useTeacherEdit";
import { ProfileSkeleton } from "./components/profile-skeleton";
import { ProfileDetails } from "./components/profile-details";
import type { TEACHER_SPECIFICATIONS } from "../auth/admin-type";
// import { cn } from "@/lib/utils";

type SpecificationType = keyof typeof TEACHER_SPECIFICATIONS;

export const TeacherProfile = () => {
    const { data, isLoading, error, refetch } = useProfile();
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const [editedData, setEditedData] = useState({
        fullName: "",
        phoneNumber: "",
        experience: "",
        level: "",
        hourPrice: "",
        cardNumber: "",
        specification: "" as SpecificationType | "",
        description: "",
    });
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState("");

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const profile = data?.data;
    const { mutate: updateProfile, isPending: isUpdating } = useEditProfile();
    const { mutate: changePassword, isPending: isChangingPass } = useChangePassword();

    useEffect(() => {
        return () => {
            if (avatarPreview) URL.revokeObjectURL(avatarPreview);
        };
    }, [avatarPreview]);

    if (isLoading) return <ProfileSkeleton />;
    if (error || !profile) return <div className="p-8 text-center text-red-500 font-medium">Ma'lumotlarni yuklashda xatolik...</div>;

    const handleEditClick = () => {
        setEditedData({
            fullName: profile.fullName || "",
            phoneNumber: profile.phoneNumber || "",
            experience: profile.experience || "",
            level: profile.level || "",
            hourPrice: profile.hourPrice?.toString() || "",
            cardNumber: profile.cardNumber || "",
            specification: (profile.specification as SpecificationType) || "",
            description: profile.description || "",
        });
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setIsChangingPassword(false);
        setAvatarFile(null);
        setAvatarPreview("");
    };

    const handleSaveProfile = () => {
        const payload: any = { ...editedData, hourPrice: editedData.hourPrice ? Number(editedData.hourPrice) : undefined };
        const hasAvatar = Boolean(avatarFile);
        const requestData = hasAvatar ? new FormData() : payload;
        
        if (hasAvatar && avatarFile) {
            Object.entries(payload).forEach(([key, value]) => {
                if (value !== undefined) requestData.append(key, String(value));
            });
            requestData.append("image", avatarFile);
        }
        
        updateProfile(requestData, {
            onSuccess: () => {
                toast.success("Profil muvaffaqiyatli yangilandi");
                setIsEditing(false);
                setAvatarFile(null);
                setAvatarPreview("");
                refetch();
            },
        });
    };

    return (
            <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 transition-colors duration-800">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Shaxsiy Kabinet</h1>
                        <p className="text-slate-500 mt-1">Profilingizni boshqaring va ma'lumotlarni yangilang.</p>
                    </div>
                    {!isEditing && !isChangingPassword && (
                        <div className="flex items-center gap-3">
                            <Button 
                                onClick={handleEditClick}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 transition-all active:scale-95"
                            >
                                <Edit3 className="mr-2 h-4 w-4" /> Tahrirlash
                            </Button>
                            <Button 
                                variant="outline" 
                                onClick={() => setIsChangingPassword(true)}
                                className="border-slate-200 bg-white hover:bg-slate-50 shadow-sm"
                            >
                                <Lock className="mr-2 h-4 w-4" /> Parol
                            </Button>
                        </div>
                    )}
                </div>

                <Card className="relative overflow-hidden border-none shadow-2xl bg-white/80 backdrop-blur-md">
                    <div className="absolute top-0 left-0 h-32 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                    
                    <div className="relative px-8 pt-16 pb-8">
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                            
                            <div className="relative group">
                                <div className="relative h-32 w-32 rounded-full p-1 bg-white shadow-xl">
                                    <Avatar className="h-full w-full border-2 border-slate-50">
                                        <AvatarImage src={avatarPreview || profile?.imageUrl} className="object-cover" />
                                        <AvatarFallback className="bg-indigo-100 text-indigo-600 text-2xl font-bold">
                                            {profile?.fullName?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    
                                    <label htmlFor="avatar-upload" className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-300">
                                        <CameraIcon className="text-slate-500 h-8 w-8" />
                                    </label>
                                </div>

                                <div className="absolute -bottom-2 -right-2 flex gap-1">
                                    <input 
                                        id="avatar-upload" type="file" accept="image/*" className="hidden" 
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                if (!isEditing) handleEditClick();
                                                setAvatarFile(file);
                                                setAvatarPreview(URL.createObjectURL(file));
                                            }
                                        }} 
                                    />
                                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-md bg-white hover:bg-indigo-50 text-indigo-600">
                                        <RefreshCw className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                        size="icon" variant="destructive" 
                                        onClick={() => { setAvatarFile(null); setAvatarPreview(""); }}
                                        className="h-8 w-8 rounded-full shadow-md"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex-1 text-center md:text-left space-y-1">
                                <div className="flex items-center justify-center md:justify-start gap-2">
                                    <h2 className="text-3xl font-bold text-slate-900">{profile?.fullName}</h2>
                                    <ShieldCheck className="h-6 w-6 text-blue-500" />
                                </div>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 font-medium">
                                    <span className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> {profile?.email}</span>
                                    <span className="flex items-center gap-1.5"><UserIcon className="h-4 w-4" /> O'qituvchi</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 gap-8 transition-all duration-500">
                    {isChangingPassword ? (
                        <Card className="border-none shadow-xl p-8 bg-white animate-in slide-in-from-bottom-4 duration-300">
                            <div className="flex items-center gap-3 mb-8 border-b pb-4">
                                <div className="p-2 bg-amber-50 rounded-lg">
                                    <Lock className="h-6 w-6 text-amber-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Xavfsizlik</h2>
                                    <p className="text-sm text-slate-500">Parolni muntazam yangilab turish xavfsizlikni ta'minlaydi.</p>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-slate-700 font-semibold text-sm">Joriy parol</Label>
                                        <Input 
                                            type="password" 
                                            className="bg-slate-50/50 border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all"
                                            value={passwordData.currentPassword}
                                            onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-700 font-semibold text-sm">Yangi parol</Label>
                                        <Input 
                                            type="password" 
                                            className="bg-slate-50/50 border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all"
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-700 font-semibold text-sm">Parolni tasdiqlang</Label>
                                        <Input 
                                            type="password" 
                                            className="bg-slate-50/50 border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all"
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                        />
                                    </div>
                                    <div className="flex gap-4 pt-4">
                                        <Button onClick={handleSaveProfile} disabled={isChangingPass} className="bg-indigo-600 text-white w-full md:w-auto">
                                            {isChangingPass && <Loader2 className="animate-spin mr-2 h-4 w-4" />} Yangilash
                                        </Button>
                                        <Button variant="ghost" onClick={handleCancel}>Bekor qilish</Button>
                                    </div>
                                </div>
                                <div className="hidden md:flex items-center justify-center bg-indigo-50 rounded-2xl p-6">
                                    <div className="text-center space-y-2">
                                        <ShieldCheck className="h-16 w-16 text-indigo-200 mx-auto" />
                                        <p className="text-indigo-400 text-sm font-medium">Parol kamida 8 ta belgidan iborat bo'lishi tavsiya etiladi.</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ) : (
                        <Card className="border-none shadow-xl bg-white overflow-hidden animate-in fade-in duration-500">
                            <ProfileDetails
                                isEditing={isEditing}
                                profile={profile}
                                editedData={editedData}
                                setEditedData={setEditedData}
                                isUpdating={isUpdating}
                                onSave={handleSaveProfile}
                                onCancel={handleCancel}
                            />
                        </Card>
                    )}
                </div>
            </div>    );
};