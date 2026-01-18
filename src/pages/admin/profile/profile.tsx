import { useState } from "react";
import { toast } from "sonner";
import { 
    Pencil, Lock, User, Shield, 
    Calendar, Save, Clock, 
} from "lucide-react";

import { useProfile } from "../service/query/useProfile";
import { useEditProfile, useChangePassword } from "../service/mutate/useEditProfile";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Skeleton } from "../../../components/ui/skeleton";
import { Spinner } from "../../../components/ui/spinner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Separator } from "../../../components/ui/separator";

export const ProfilePage = () => {
    const { data, isPending, refetch } = useProfile();
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState("info");
    
    const [editedData, setEditedData] = useState({ username: "", phoneNumber: "" });
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const { mutate: updateProfile, isPending: isUpdating } = useEditProfile({
        username: editedData.username,
        phone: editedData.phoneNumber,
    });
    const { mutate: changePassword, isPending: isChangingPass } = useChangePassword();

    const profile = data?.data;

    if (isPending) return <ProfileSkeleton />;

    const handleEdit = () => {
        setEditedData({
            username: profile?.username || "",
            phoneNumber: profile?.phoneNumber || "",
        });
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedData({ username: "", phoneNumber: "" });
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    };

    const handleSave = () => {
        updateProfile(editedData as any, {
            onSuccess: () => {
                toast.success("Profil muvaffaqiyatli yangilandi!");
                setIsEditing(false);
                refetch();
            },
            onError: (err) => toast.error(err?.message || "Xatolik yuz berdi"),
        });
    };

    const handlePasswordChange = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            return toast.error("Yangi parollar mos kelmadi!");
        }
        changePassword({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
        }, {
            onSuccess: () => {
                toast.success("Parol o'zgartirildi!");
                setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                setActiveTab("info");
            },
            onError: (err) => toast.error(err?.message || "Xatolik yuz berdi"),
        });
    };

    return (
        <div className=" space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Kabinet</h1>
                    <p className="text-slate-500 mt-2">Shaxsiy ma'lumotlaringiz va xavfsizlik sozlamalari</p>
                </div>
                {!isEditing && activeTab === "info" && (
                    <Button onClick={handleEdit} size="lg" className="shadow-lg hover:shadow-xl transition-all">
                        <Pencil className="w-4 h-4 mr-2" /> Tahrirlash
                    </Button>
                )}
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full max-w-[400px] grid-cols-2 mb-8">
                    <TabsTrigger value="info">Ma'lumotlar</TabsTrigger>
                    <TabsTrigger value="security">Xavfsizlik</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-6">
                    <Card className="border-none shadow-md overflow-hidden bg-white/50 backdrop-blur-sm">
                        <CardHeader className="bg-slate-50/50 border-b">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                    <User className="w-5 h-5" />
                                </div>
                                <div>
                                    <CardTitle>Profil ma'lumotlari</CardTitle>
                                    <CardDescription>Boshqa foydalanuvchilar ko'radigan ma'lumotlar</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-600">Foydalanuvchi nomi</label>
                                    {isEditing ? (
                                        <Input 
                                            value={editedData.username} 
                                            onChange={(e) => setEditedData({...editedData, username: e.target.value})}
                                            className="focus-visible:ring-blue-500"
                                        />
                                    ) : (
                                        <div className="flex items-center text-slate-900 font-medium py-2 px-1 border-b border-transparent">
                                            {profile?.username || "Admin"}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-600">Telefon raqam</label>
                                    {isEditing ? (
                                        <Input 
                                            value={editedData.phoneNumber} 
                                            onChange={(e) => setEditedData({...editedData, phoneNumber: e.target.value})}
                                            className="focus-visible:ring-blue-500"
                                        />
                                    ) : (
                                        <div className="flex items-center text-slate-900 font-medium py-2 px-1 border-b border-transparent">
                                            {profile?.phoneNumber || "+998 -- --- -- --"}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-600">Roli</label>
                                    <div>
                                        <Badge variant="secondary" className="bg-rose-50 text-rose-600 border-rose-100 px-3 py-1 uppercase tracking-wider">
                                            <Shield className="w-3 h-3 mr-1" />
                                            {profile?.role || "ADMIN"}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-600">A'zo bo'lgan sana</label>
                                    <div className="flex items-center text-slate-500 text-sm">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('uz-UZ') : "18.12.2025"}
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex items-center gap-6 text-xs text-slate-400">
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Oxirgi yangilanish: {profile?.updatedAt ? new Date(profile.updatedAt).toLocaleString('uz-UZ') : "Hozirgina"}
                                </div>
                            </div>
                        </CardContent>
                        {isEditing && (
                            <CardFooter className="bg-slate-50 p-4 flex gap-3 border-t">
                                <Button onClick={handleSave} disabled={isUpdating} className="bg-blue-600 hover:bg-blue-700">
                                    {isUpdating ? <Spinner className="mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                    Saqlash
                                </Button>
                                <Button onClick={handleCancel} variant="ghost">Bekor qilish</Button>
                            </CardFooter>
                        )}
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <Card className="border-none shadow-md">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <CardTitle>Xavfsizlik sozlamalari</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4 max-w-md">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Hozirgi parol</label>
                                <Input 
                                    type="password" 
                                    placeholder="••••••••"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Yangi parol</label>
                                <Input 
                                    type="password" 
                                    placeholder="Kamida 6 belgi"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Yangi parolni tasdiqlang</label>
                                <Input 
                                    type="password" 
                                    placeholder="••••••••"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="border-t p-4 mt-4">
                            <Button 
                                onClick={handlePasswordChange} 
                                disabled={isChangingPass}
                                className="bg-slate-900"
                            >
                                {isChangingPass ? <Spinner className="mr-2" /> : <Lock className="w-4 h-4 mr-2" />}
                                Parolni yangilash
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

const ProfileSkeleton = () => (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
        <div className="flex justify-between items-end">
            <div className="space-y-2">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-11 w-32" />
        </div>
        <Skeleton className="h-12 w-full max-w-[400px]" />
        <Card className="border-none shadow-sm">
            <CardHeader><Skeleton className="h-20 w-full" /></CardHeader>
            <CardContent className="space-y-6 p-6">
                <div className="grid grid-cols-2 gap-8">
                    {[1,2,3,4].map(i => <Skeleton key={i} className="h-16 w-full" />)}
                </div>
            </CardContent>
        </Card>
    </div>
);