import { Dialog, DialogContent } from "../../../components/ui/dialog";
import { useAdmin } from "../service/query/useAdmin";
import { Calendar, Copy, Loader2, Phone, User } from "lucide-react";
import { toast } from "sonner";

export const AdminDetailsModal = ({ id, open, onOpenChange }: any) => {
    const { data, isLoading } = useAdmin(id);
    const adminData = data?.data || {};
    const formatDate = (dateString: string) => {
        if (!dateString) return { date: "---", time: "--:--" };
        const date = new Date(dateString);
        const months = [
            "Yanvar",
            "Fevral",
            "Mart",
            "Aprel",
            "May",
            "Iyun",
            "Iyul",
            "Avgust",
            "Sentabr",
            "Oktabr",
            "Noyabr",
            "Dekabr",
        ];
        return {
            date: `${date.getDate()} ${
                months[date.getMonth()]
            } ${date.getFullYear()}`,
            time: date.toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };
    };
    const createdAt = formatDate(adminData.createdAt);
    const updatedAt = formatDate(adminData.updatedAt);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-125 p-0 overflow-hidden bg-white rounded-2xl">
                <div className="flex items-center justify-between p-6 pb-2">
                    <h2 className="text-xl font-bold text-slate-900">
                        Details
                    </h2>
                </div>
                {isLoading ? (
                    <div className="p-10 flex justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                    </div>
                ) : (
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between p-3 border border-slate-200 rounded-xl">
                            <div className="flex items-center gap-3 text-slate-500">
                                <User className="w-5 h-5" />
                                <span className="font-medium text-sm">ID</span>
                            </div>
                            <div className="flex items-center gap-2 max-w-62.5">
                                <span className="text-slate-900 font-mono text-sm truncate">
                                    {adminData.id || id}
                                </span>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            adminData.id || id
                                        );
                                        toast.success("ID copied!", {
                                            position: "top-right",
                                        });
                                    }}
                                    className="text-blue-600 p-1 rounded hover:bg-blue-50 cursor-pointer"
                                >
                                    <Copy className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border border-slate-200 rounded-xl">
                            <div className="flex items-center gap-3 text-slate-500">
                                <User className="w-5 h-5" />
                                <span className="font-medium text-sm">
                                    Username
                                </span>
                            </div>
                            <span className="text-slate-900 font-medium text-sm">
                                {adminData.username}
                            </span>
                        </div>

                        <div className="flex items-center justify-between p-3 border border-slate-200 rounded-xl">
                            <div className="flex items-center gap-3 text-slate-500">
                                <Phone className="w-5 h-5" />
                                <span className="font-medium text-sm">
                                    Phone
                                </span>
                            </div>
                            <div className="flex items-center gap-2 max-w-62.5">
                                <span className="text-slate-900 font-mono text-sm truncate">
                                    {adminData.phoneNumber || id}
                                </span>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            adminData.phoneNumber
                                        );
                                        toast.success("Phone number copied!", {
                                            position: "top-right",
                                        });
                                    }}
                                    className="text-blue-600 p-1 rounded hover:bg-blue-50 cursor-pointer"
                                >
                                    <Copy className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-3 border border-slate-100 bg-blue-50/30 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <span className="text-slate-700 font-medium text-sm">
                                    Created At
                                </span>
                            </div>
                            <div className="text-slate-900 font-bold text-sm text-right">
                                {createdAt.date}, {createdAt.time}
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-3 border border-slate-100 bg-blue-50/30 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <span className="text-slate-700 font-medium text-sm">
                                    Updated At
                                </span>
                            </div>
                            <div className="text-slate-900 font-bold text-sm text-right">
                                {updatedAt.date}, {updatedAt.time}
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};
