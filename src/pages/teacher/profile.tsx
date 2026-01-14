import { useState } from "react";
import { Edit3, Lock, Loader2 } from "lucide-react";
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

type SpecificationType = keyof typeof TEACHER_SPECIFICATIONS;

export const TeacherProfile = () => {
    const { data, isLoading, error, refetch } = useProfile();
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    console.log(data);

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

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const profile = data?.data;
    const { mutate: updateProfile, isPending: isUpdating } = useEditProfile();
    const { mutate: changePassword, isPending: isChangingPass } =
        useChangePassword();

    if (isLoading) return <ProfileSkeleton />;
    if (error || !profile)
        return (
            <div className="p-8 text-center text-red-500">
                Xatolik yuz berdi.
            </div>
        );

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
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    };

    const handleSaveProfile = () => {
        const payload: any = {
            ...editedData,
            hourPrice: editedData.hourPrice
                ? Number(editedData.hourPrice)
                : undefined,
        };
        updateProfile(payload, {
            onSuccess: () => {
                toast.success("Yangilandi!", { position: "top-right" });
                setIsEditing(false);
                refetch();
            },
            onError: (err: any) =>
                toast.error(err?.response?.data?.message || "Xatolik", {
                    position: "top-right",
                }),
        });
    };

    const handlePasswordChange = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("Parollar mos kelmadi!", { position: "top-right" });
            return;
        }
        changePassword(
            {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            },
            {
                onSuccess: () => {
                    toast.success("Parol o'zgartirildi!", {
                        position: "top-right",
                    });
                    handleCancel();
                },
                onError: (err: any) =>
                    toast.error(err?.response?.data?.message || "Xatolik", {
                        position: "top-right",
                    }),
            }
        );
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="mx-auto max-w-8xl space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">
                        My Profile
                    </h1>
                    {!isEditing && !isChangingPassword && (
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={handleEditClick}
                                className="bg-white text-black"
                            >
                                <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setIsChangingPassword(true)}
                                className="bg-white text-black"
                            >
                                <Lock className="mr-2 h-4 w-4" /> Change
                                Password
                            </Button>
                        </div>
                    )}
                </div>

                <Card className="overflow-hidden border-none shadow-sm bg-white">
                    <div className="h-24 w-full bg-linear-to-r from-slate-100 to-slate-200" />
                    <div className="px-8 pb-6">
                        <div className="relative -top-12 flex flex-col items-center sm:flex-row sm:items-end sm:gap-6">
                            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                                <AvatarImage src={profile?.imageUrl} />
                                <AvatarFallback className="bg-slate-200">
                                    {profile?.fullName?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="mt-4 sm:mt-0 text-center sm:text-left pb-2">
                                <h2 className="text-2xl font-bold text-slate-900">
                                    {profile?.fullName}
                                </h2>
                                <p className="text-sm text-slate-500">
                                    {profile?.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                {isChangingPassword ? (
                    <Card className="border-none shadow-sm p-8 bg-white">
                        <div className="flex items-center gap-2 mb-8">
                            <Lock className="h-5 w-5" />
                            <h2 className="text-lg font-semibold">
                                Change Password
                            </h2>
                        </div>
                        <div className="space-y-4 max-w-md">
                            <div className="space-y-2">
                                <Label>Current Password</Label>
                                <Input
                                    type="password"
                                    value={passwordData.currentPassword}
                                    onChange={(e) =>
                                        setPasswordData({
                                            ...passwordData,
                                            currentPassword: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>New Password</Label>
                                <Input
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={(e) =>
                                        setPasswordData({
                                            ...passwordData,
                                            newPassword: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Confirm New Password</Label>
                                <Input
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) =>
                                        setPasswordData({
                                            ...passwordData,
                                            confirmPassword: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <Button
                                    onClick={handlePasswordChange}
                                    disabled={isChangingPass}
                                    className="bg-black text-white"
                                >
                                    {isChangingPass ? (
                                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                    ) : (
                                        <Lock className="h-4 w-4 mr-2" />
                                    )}{" "}
                                    Update Password
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </Card>
                ) : (
                    <Card className="border-none shadow-sm bg-white">
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
        </div>
    );
};
