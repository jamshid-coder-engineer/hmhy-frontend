import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription 
} from "../../../components/ui/dialog"
import {
    Calendar,
    Copy,
    Loader2,
    Mail,
    Phone,
    User,
    Globe,
    Award,
    Star,
    Briefcase,
    DollarSign,
    BookOpen,
    CheckCircle,
    XCircle,
} from "lucide-react"
import { toast } from "sonner"
import { useTeacher } from "../service/query/useTeacher"

export const TeacherDetailsModal = ({ id, open, onOpenChange }: any) => {
    console.log('📝 Modal props:', { id, open })

    const { data, isLoading } = useTeacher(id)
    const adminData = data?.data || {}

    const formatDate = (dateString: string) => {
        if (!dateString) return { date: "---", time: "--:--" }
        const date = new Date(dateString)
        const months = [
            "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
            "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr",
        ]
        return {
            date: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`,
            time: date.toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
            }),
        }
    }

    const createdAt = formatDate(adminData.createdAt)
    const updatedAt = formatDate(adminData.updatedAt)

    const DetailItem = ({
        icon: Icon,
        label,
        value,
        copyable = false,
        color = "text-slate-500",
        isStatus = false,
    }: any) => (
        <div className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-white shadow-sm">
            <div className="flex items-center gap-3 text-slate-500">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className="font-medium text-[13px]">{label}</span>
            </div>
            <div className="flex items-center gap-2">
                {isStatus ? (
                    <div
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            value
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                        }`}
                    >
                        {value ? (
                            <CheckCircle className="w-3 h-3" />
                        ) : (
                            <XCircle className="w-3 h-3" />
                        )}
                        {value ? "Ha" : "Yo'q"}
                    </div>
                ) : (
                    <span className="text-slate-900 font-semibold text-[13px] truncate max-w-45">
                        {value || "0"}
                    </span>
                )}
                {copyable && value && (
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(value)
                            toast.success("Data copied!", {
                                position: "top-right",
                            })
                        }}
                        className="text-blue-500 hover:bg-blue-50 p-1 rounded transition-colors"
                    >
                        <Copy className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>
        </div>
    )

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden bg-[#f8fafc] border-none shadow-2xl rounded-2xl">
                {/* ✅ Accessibility: DialogHeader qo'shildi */}
                <DialogHeader className="sr-only">
                    <DialogTitle>
                        {adminData.fullName || "Teacher Details"}
                    </DialogTitle>
                    <DialogDescription>
                        View detailed information about the teacher
                    </DialogDescription>
                </DialogHeader>

                {isLoading ? (
                    <div className="p-20 flex justify-center">
                        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
                    </div>
                ) : (
                    <div className="relative">
                        {/* Header with Avatar */}
                        <div className="bg-white p-6 pb-6 flex flex-col items-center border-b border-slate-100">
                            <h3 className="font-bold text-lg mb-4 text-slate-800">
                                {adminData.fullName || "Teacher Details"}
                            </h3>
                            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-2 shadow-lg overflow-hidden">
                                {adminData.imageUrl ? (
                                    <img
                                        src={adminData.imageUrl}
                                        alt={adminData.fullName || "Teacher"}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    adminData.fullName?.charAt(0) || "T"
                                )}
                            </div>
                        </div>

                        {/* Details */}
                        <div className="p-5 space-y-3 max-h-[65vh] overflow-y-auto">
                            <DetailItem
                                icon={User}
                                label="ID"
                                value={adminData.id}
                                copyable
                                color="text-slate-400"
                            />
                            <DetailItem
                                icon={Mail}
                                label="Email"
                                value={adminData.email}
                                copyable
                                color="text-blue-500"
                            />
                            <DetailItem
                                icon={Phone}
                                label="Phone"
                                value={adminData.phoneNumber}
                                copyable
                                color="text-blue-500"
                            />
                            <DetailItem
                                icon={Globe}
                                label="O'qitiladigan til"
                                value={adminData.specification}
                                color="text-purple-500"
                            />
                            <DetailItem
                                icon={Award}
                                label="Level"
                                value={adminData.level}
                                color="text-purple-400"
                            />

                            {/* Rating */}
                            <div className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-white shadow-sm">
                                <div className="flex items-center gap-3 text-slate-500">
                                    <Star className="w-4 h-4 text-orange-400" />
                                    <span className="font-medium text-[13px]">
                                        Rating
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star
                                            key={s}
                                            className={`w-3 h-3 ${
                                                s <= Math.round(Number(adminData.rating))
                                                    ? "fill-orange-400 text-orange-400"
                                                    : "text-slate-200"
                                            }`}
                                        />
                                    ))}
                                    <span className="ml-1 text-sm font-bold text-slate-700">
                                        {Number(adminData.rating).toFixed(1)}
                                    </span>
                                </div>
                            </div>

                            <DetailItem
                                icon={Briefcase}
                                label="Experience"
                                value={adminData.experience}
                                color="text-indigo-500"
                            />

                            {/* Hour Price */}
                            <div className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-white shadow-sm">
                                <div className="flex items-center gap-3 text-slate-500">
                                    <DollarSign className="w-4 h-4 text-green-500" />
                                    <span className="font-medium text-[13px]">
                                        Soatlik narx
                                    </span>
                                </div>
                                <span className="text-green-600 font-bold text-sm">
                                    {adminData.hourPrice || 0} so'm
                                </span>
                            </div>

                            <DetailItem
                                icon={BookOpen}
                                label="Darslar soni"
                                value={adminData.lessons?.length || 0}
                                color="text-slate-600"
                            />
                            <DetailItem
                                icon={CheckCircle}
                                label="Faol"
                                value={adminData.isActive}
                                isStatus
                            />

                            {/* Dates */}
                            <div className="grid grid-cols-1 gap-3 pt-2">
                                <div className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm">
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-[11px] font-bold uppercase">
                                            Yaratilgan
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[12px] font-bold text-slate-700">
                                            {createdAt.date}
                                        </div>
                                        <div className="text-[10px] text-slate-400">
                                            {createdAt.time}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm">
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-[11px] font-bold uppercase">
                                            Yangilangan
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[12px] font-bold text-slate-700">
                                            {updatedAt.date}
                                        </div>
                                        <div className="text-[10px] text-slate-400">
                                            {updatedAt.time}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}