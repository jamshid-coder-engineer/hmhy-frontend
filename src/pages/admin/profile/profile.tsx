import { useProfile } from "../service/query/useProfile";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Skeleton } from "../../../components/ui/skeleton";
import {
    Pencil,
    Lock,
    User,
    Phone,
    Shield,
    Calendar,
    Save,
    X,
} from "lucide-react";
import { Spinner } from "../../../components/ui/spinner";
import {
    useEditProfile,
    useChangePassword,
} from "../service/mutate/useEditProfile";
import { useState } from "react";
import { toast } from "sonner";

export const ProfilePage = () => {
    const { data, isPending, refetch } = useProfile();
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [editedData, setEditedData] = useState({
        username: "",
        phoneNumber: "",
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const { mutate: updateProfile, isPending: isUpdating } = useEditProfile({
        username: editedData.username,
        phone: editedData.phoneNumber,
    });
    const { mutate: changePassword, isPending: isChangingPass } =
        useChangePassword();

    if (isPending) {
        return (
            <div>
                <div className="flex items-center justify-between mb-8">
                    <Skeleton className="h-9 w-40" />
                    <div className="flex gap-3">
                        <Skeleton className="h-10 w-32 rounded-md" />
                        <Skeleton className="h-10 w-40 rounded-md" />
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <div className="flex items-center gap-2 mb-8">
                        <Skeleton className="h-5 w-5 rounded" />
                        <Skeleton className="h-6 w-48" />
                    </div>

                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Skeleton className="h-4 w-4 rounded" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                            <Skeleton className="h-11 w-full rounded-md" />
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Skeleton className="h-4 w-4 rounded" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                            <Skeleton className="h-11 w-full rounded-md" />
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Skeleton className="h-4 w-4 rounded" />
                                <Skeleton className="h-4 w-12" />
                            </div>
                            <Skeleton className="h-7 w-24 rounded" />
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Skeleton className="h-4 w-4 rounded" />
                                <Skeleton className="h-4 w-28" />
                            </div>
                            <div className="bg-gray-50 border border-gray-200 rounded-md px-4 py-3">
                                <Skeleton className="h-5 w-48 mb-2" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        </div>

                        <div>
                            <Skeleton className="h-4 w-24 mb-3" />
                            <div className="bg-gray-50 border border-gray-200 rounded-md px-4 py-3">
                                <Skeleton className="h-5 w-48 mb-2" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const profile = data?.data
    console.log(profile)

    const handleEdit = () => {
        setEditedData({
            username: profile?.username || "",
            phoneNumber: profile?.phoneNumber || "",
        });
        setIsEditing(true);
        setIsChangingPassword(false);
    };

    const handleChangePasswordClick = () => {
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
        setIsChangingPassword(true);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setIsChangingPassword(false);
        setEditedData({
            username: "",
            phoneNumber: "",
        });
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    };

    const handleSave = () => {
        updateProfile(editedData, {
            onSuccess: () => {
                toast.success("Profile updated successfully!");
                setIsEditing(false);
                refetch();
            },
            onError: (error: any) => {
                toast.error(
                    error?.response?.data?.message || "Failed to update profile"
                );
            },
        });
    };

    const handlePasswordChange = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("New passwords do not match!");
            return;
        }

        changePassword(
            {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            },
            {
                onSuccess: () => {
                    toast.success("Password changed successfully!");
                    setIsChangingPassword(false);
                    setPasswordData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                    });
                },
                onError: (error: any) => {
                    toast.error(
                        error?.response?.data?.message ||
                            "Failed to change password"
                    );
                },
            }
        );
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                {!isEditing && !isChangingPassword && (
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={handleEdit}
                            className="flex items-center gap-2 bg-white hover:bg-gray-50 border-gray-300 text-black"
                        >
                            <Pencil className="h-4 w-4" />
                            Edit Profile
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleChangePasswordClick}
                            className="flex items-center gap-2 bg-white hover:bg-gray-50 border-gray-300 text-black"
                        >
                            <Lock className="h-4 w-4" />
                            Change Password
                        </Button>
                    </div>
                )}
            </div>

            {isChangingPassword && (
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <div className="flex items-center gap-2 mb-8">
                        <Lock className="h-5 w-5 text-gray-700" />
                        <h2 className="text-lg font-semibold text-gray-900">
                            Change Password
                        </h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                                Current Password
                            </label>
                            <Input
                                type="password"
                                value={passwordData.currentPassword}
                                onChange={(e) =>
                                    setPasswordData({
                                        ...passwordData,
                                        currentPassword: e.target.value,
                                    })
                                }
                                className="bg-white border-gray-300 text-gray-900"
                                placeholder="Enter current password"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                                New Password
                            </label>
                            <Input
                                type="password"
                                value={passwordData.newPassword}
                                onChange={(e) =>
                                    setPasswordData({
                                        ...passwordData,
                                        newPassword: e.target.value,
                                    })
                                }
                                className="bg-white border-gray-300 text-gray-900"
                                placeholder="Enter new password"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                                Confirm New Password
                            </label>
                            <Input
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={(e) =>
                                    setPasswordData({
                                        ...passwordData,
                                        confirmPassword: e.target.value,
                                    })
                                }
                                className="bg-white border-gray-300 text-gray-900"
                                placeholder="Confirm new password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200">
                        <Button
                            onClick={handlePasswordChange}
                            disabled={isChangingPass}
                            className="bg-black hover:bg-gray-800 text-white"
                        >
                            {isChangingPass ? (
                                <>
                                    <Spinner className="w-4 h-4 mr-2" />
                                    Changing...
                                </>
                            ) : (
                                <>
                                    <Lock className="h-4 w-4 mr-2" />
                                    Change Password
                                </>
                            )}
                        </Button>
                        <Button
                            onClick={handleCancel}
                            variant="outline"
                            disabled={isChangingPass}
                            className="border-gray-300 text-black"
                        >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            {!isChangingPassword && (
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <div className="flex items-center gap-2 mb-8">
                        <User className="h-5 w-5 text-gray-700" />
                        <h2 className="text-lg font-semibold text-gray-900">
                            Profile Information
                        </h2>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <User className="h-4 w-4 text-gray-600" />
                                <label className="text-sm font-medium text-gray-700">
                                    Username
                                </label>
                            </div>
                            {isEditing ? (
                                <Input
                                    value={editedData.username}
                                    onChange={(e) =>
                                        setEditedData({
                                            ...editedData,
                                            username: e.target.value,
                                        })
                                    }
                                    className="bg-white border-gray-300 text-gray-900"
                                />
                            ) : (
                                <div className="bg-gray-50 border border-gray-200 rounded-md px-4 py-3">
                                    <p className="text-gray-900 font-medium">
                                        {profile?.username || "superadmin"
                                        }
                                    </p>
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Phone className="h-4 w-4 text-gray-600" />
                                <label className="text-sm font-medium text-gray-700">
                                    Phone
                                </label>
                            </div>
                            {isEditing ? (
                                <Input
                                    value={editedData.phoneNumber}
                                    onChange={(e) =>
                                        setEditedData({
                                            ...editedData,
                                            phoneNumber: e.target.value,
                                        })
                                    }
                                    className="bg-white border-gray-300 text-gray-900"
                                    placeholder="+998991234568"
                                />
                            ) : (
                                <div className="bg-gray-50 border border-gray-200 rounded-md px-4 py-3">
                                    <p className="text-gray-900 font-medium">
                                        {profile?.phoneNumber ||
                                            "+998991234568"}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Shield className="h-4 w-4 text-gray-600" />
                                <label className="text-sm font-medium text-gray-700">
                                    Role
                                </label>
                            </div>
                            <div>
                                <span className="inline-flex items-center px-4 py-1.5 bg-red-50 text-red-700 text-sm font-bold rounded border border-red-200">
                                    {profile?.role?.toUpperCase() || "ADMIN"}
                                </span>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Calendar className="h-4 w-4 text-gray-600" />
                                <label className="text-sm font-medium text-gray-700">
                                    Member Since
                                </label>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 rounded-md px-4 py-3">
                                <p className="text-gray-900 font-medium">
                                    {profile?.createdAt
                                        ? new Date(
                                              profile.createdAt
                                          ).toLocaleDateString("uz-UZ", {
                                              day: "2-digit",
                                              month: "long",
                                              year: "numeric",
                                              hour: "2-digit",
                                              minute: "2-digit",
                                          })
                                        : "18 Dekabr 2025, 16:26"}
                                </p>
                                <p className="text-xs text-gray-500 mt-1.5">
                                    {profile?.createdAt
                                        ? new Date(
                                              profile.createdAt
                                          ).toLocaleTimeString("uz-UZ", {
                                              hour: "2-digit",
                                              minute: "2-digit",
                                          })
                                        : "16:26"}
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-3">
                                Last Updated
                            </label>
                            <div className="bg-gray-50 border border-gray-200 rounded-md px-4 py-3">
                                <p className="text-gray-900 font-medium">
                                    {profile?.updatedAt
                                        ? new Date(
                                              profile.updatedAt
                                          ).toLocaleDateString("uz-UZ", {
                                              day: "2-digit",
                                              month: "long",
                                              year: "numeric",
                                              hour: "2-digit",
                                              minute: "2-digit",
                                          })
                                        : "05 Yanvar 2026, 17:23"}
                                </p>
                                <p className="text-xs text-gray-500 mt-1.5">
                                    {profile?.updatedAt
                                        ? new Date(
                                              profile.updatedAt
                                          ).toLocaleTimeString("uz-UZ", {
                                              hour: "2-digit",
                                              minute: "2-digit",
                                          })
                                        : "17:23"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {isEditing && (
                        <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200">
                            <Button
                                onClick={handleSave}
                                disabled={isUpdating}
                                className="bg-black hover:bg-gray-800 text-white"
                            >
                                {isUpdating ? (
                                    <>
                                        <Spinner className="w-4 h-4 mr-2" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4 mr-2" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                            <Button
                                onClick={handleCancel}
                                variant="outline"
                                disabled={isUpdating}
                                className="border-gray-300 text-black"
                            >
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};