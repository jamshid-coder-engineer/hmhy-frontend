import { MapPin, Clock, ExternalLink } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { format } from "date-fns";

export const LessonCard = ({ lesson }: { lesson: any }) => {
    const statusStyles: Record<string, string> = {
        AVAILABLE: "bg-green-100 text-green-700 hover:bg-green-100",
        BOOKED: "bg-blue-100 text-blue-700 hover:bg-blue-100",
        CANCELLED: "bg-red-100 text-red-700 hover:bg-red-100",
    };

    return (
        <div className="group relative bg-white border rounded-xl p-5 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                    <Badge
                        variant="secondary"
                        className={statusStyles[lesson.status] || ""}
                    >
                        {lesson.status}
                    </Badge>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {lesson.name}
                    </h3>
                </div>
                <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900">
                        {Number(lesson.price).toLocaleString()} UZS
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase font-medium tracking-wider">
                        Narxi
                    </p>
                </div>
            </div>

            <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-slate-600">
                    <Clock className="w-4 h-4 mr-2 text-slate-400" />
                    <span>
                        {format(new Date(lesson.startTime), "HH:mm")} -{" "}
                        {format(new Date(lesson.endTime), "HH:mm")}
                    </span>
                    <span className="mx-2 text-slate-300">|</span>
                    <span className="text-xs text-slate-500">
                        {format(new Date(lesson.startTime), "dd-MMMM, yyyy")}
                    </span>
                </div>

                {lesson.googleMeetUrl && (
                    <div className="flex items-center text-sm text-blue-600 bg-blue-50/50 p-2 rounded-lg">
                        <MapPin className="w-4 h-4 mr-2" />
                        <a
                            href={lesson.googleMeetUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="truncate hover:underline font-medium"
                        >
                            Google Meet Link
                        </a>
                        <ExternalLink className="w-3 h-3 ml-1" />
                    </div>
                )}
            </div>

            <Button
                variant="outline"
                className="w-full border-slate-200 text-slate-700 hover:bg-slate-50"
                asChild
            >
                <a href={lesson.googleMeetUrl} target="_blank" rel="noreferrer">
                    Darsga qo'shilish
                </a>
            </Button>
        </div>
    );
};
