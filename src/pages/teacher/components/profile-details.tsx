import {
    User,
    Phone,
    Briefcase,
    Star,
    DollarSign,
    CreditCard,
    Languages,
    FileText,
    Save,
    X,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Loader2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select";
import { TEACHER_SPECIFICATIONS } from "../../auth/admin-type";

interface ProfileDetailsProps {
    isEditing: boolean;
    profile: any;
    editedData: any;
    setEditedData: (data: any) => void;
    isUpdating: boolean;
    onSave: () => void;
    onCancel: () => void;
}

export const ProfileDetails = ({
    isEditing,
    profile,
    editedData,
    setEditedData,
    isUpdating,
    onSave,
    onCancel,
}: ProfileDetailsProps) => {
    return (
        <>
            <CardHeader className="border-b bg-slate-50/50 py-4">
                <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-slate-500" />
                    <CardTitle className="text-lg font-semibold">
                        Profile Information
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="grid gap-6 p-8 md:grid-cols-2">
                <div className="space-y-2">
                    <Label className="flex items-center text-xs font-medium text-slate-500 uppercase">
                        <User className="mr-2 h-3.5 w-3.5" /> FULL NAME
                    </Label>
                    {isEditing ? (
                        <Input
                            value={editedData.fullName}
                            onChange={(e) =>
                                setEditedData({
                                    ...editedData,
                                    fullName: e.target.value,
                                })
                            }
                        />
                    ) : (
                        <div className="bg-slate-50 border border-slate-200 rounded-md px-4 py-2.5 text-sm font-medium">
                            {profile?.fullName || "Not set"}
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <Label className="flex items-center text-xs font-medium text-slate-500 uppercase">
                        <Phone className="mr-2 h-3.5 w-3.5" /> PHONE
                    </Label>
                    {isEditing ? (
                        <Input
                            value={editedData.phoneNumber}
                            onChange={(e) =>
                                setEditedData({
                                    ...editedData,
                                    phoneNumber: e.target.value,
                                })
                            }
                        />
                    ) : (
                        <div className="bg-slate-50 border border-slate-200 rounded-md px-4 py-2.5 text-sm font-medium">
                            {profile?.phoneNumber || "Not set"}
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <Label className="flex items-center text-xs font-medium text-slate-500 uppercase">
                        <Languages className="mr-2 h-3.5 w-3.5" /> TEACHING
                        LANGUAGE
                    </Label>
                    {isEditing ? (
                        <Select
                            value={editedData.specification}
                            onValueChange={(val) =>
                                setEditedData({
                                    ...editedData,
                                    specification: val,
                                })
                            }
                        >
                            <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Select Language" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(TEACHER_SPECIFICATIONS).map(
                                    (lang) => (
                                        <SelectItem key={lang} value={lang}>
                                            {lang}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                    ) : (
                        <div className="bg-slate-50 border border-slate-200 rounded-md px-4 py-2.5 text-sm font-medium">
                            {profile?.specification || "Not set"}
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <Label className="flex items-center text-xs font-medium text-slate-500 uppercase">
                        <Briefcase className="mr-2 h-3.5 w-3.5" /> EXPERIENCE
                    </Label>
                    {isEditing ? (
                        <Input
                            value={editedData.experience}
                            onChange={(e) =>
                                setEditedData({
                                    ...editedData,
                                    experience: e.target.value,
                                })
                            }
                        />
                    ) : (
                        <div className="bg-slate-50 border border-slate-200 rounded-md px-4 py-2.5 text-sm font-medium">
                            {profile?.experience || "Not set"}
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <Label className="flex items-center text-xs font-medium text-slate-500 uppercase">
                        <Star className="mr-2 h-3.5 w-3.5" /> LEVEL
                    </Label>
                    {isEditing ? (
                        <Input
                            value={editedData.level}
                            onChange={(e) =>
                                setEditedData({
                                    ...editedData,
                                    level: e.target.value,
                                })
                            }
                        />
                    ) : (
                        <div className="bg-slate-50 border border-slate-200 rounded-md px-4 py-2.5 text-sm font-medium">
                            {profile?.level || "Not set"}
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <Label className="flex items-center text-xs font-medium text-slate-500 uppercase">
                        <DollarSign className="mr-2 h-3.5 w-3.5" /> HOUR PRICE
                        (UZS)
                    </Label>
                    {isEditing ? (
                        <Input
                            type="number"
                            value={editedData.hourPrice}
                            onChange={(e) =>
                                setEditedData({
                                    ...editedData,
                                    hourPrice: e.target.value,
                                })
                            }
                        />
                    ) : (
                        <div className="bg-slate-50 border border-slate-200 rounded-md px-4 py-2.5 text-sm font-medium">
                            {profile?.hourPrice
                                ? `${profile.hourPrice.toLocaleString()} UZS`
                                : "Not set"}
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <Label className="flex items-center text-xs font-medium text-slate-500 uppercase">
                        <CreditCard className="mr-2 h-3.5 w-3.5" /> CARD NUMBER
                    </Label>
                    {isEditing ? (
                        <Input
                            value={editedData.cardNumber}
                            onChange={(e) =>
                                setEditedData({
                                    ...editedData,
                                    cardNumber: e.target.value,
                                })
                            }
                            maxLength={16}
                        />
                    ) : (
                        <div className="bg-slate-50 border border-slate-200 rounded-md px-4 py-2.5 text-sm font-medium">
                            {profile?.cardNumber || "Not set"}
                        </div>
                    )}
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label className="flex items-center text-xs font-medium text-slate-500 uppercase">
                        <FileText className="mr-2 h-3.5 w-3.5" /> BIO
                    </Label>
                    {isEditing ? (
                        <textarea
                            className="flex min-h-24 w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400"
                            value={editedData.description}
                            onChange={(e) =>
                                setEditedData({
                                    ...editedData,
                                    description: e.target.value,
                                })
                            }
                        />
                    ) : (
                        <div className="min-h-20 w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                            {profile?.description || "No bio added"}
                        </div>
                    )}
                </div>

                {isEditing && (
                    <div className="flex items-center gap-3 pt-4 md:col-span-2 border-t">
                        <Button
                            onClick={onSave}
                            disabled={isUpdating}
                            className="bg-black text-white hover:bg-gray-800"
                        >
                            {isUpdating ? (
                                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                            ) : (
                                <Save className="h-4 w-4 mr-2" />
                            )}
                            Save Changes
                        </Button>
                        <Button
                            variant="outline"
                            onClick={onCancel}
                            disabled={isUpdating}
                        >
                            <X className="h-4 w-4 mr-2" /> Cancel
                        </Button>
                    </div>
                )}
            </CardContent>
        </>
    );
};
