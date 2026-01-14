import { useState } from "react";
import { Clock, Banknote, CalendarCheck } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select";
import { format } from "date-fns";
import { uz } from "date-fns/locale";
import { useCreateLesson } from "../service/mutate/useCreateLesson";

export const CreateLessonForm = ({
    selectedDate,
    onCancel,
}: {
    selectedDate: string;
    onCancel: () => void;
}) => {
    const { mutate, isPending } = useCreateLesson();

    const [startH, setStartH] = useState("09");
    const [startM, setStartM] = useState("00");
    const [endH, setEndH] = useState("10");
    const [endM, setEndM] = useState("00");
    const [price, setPrice] = useState(50000);
    const [name, setName] = useState("English");

    const hours = Array.from({ length: 24 }, (_, i) =>
        i.toString().padStart(2, "0")
    );
    const minutes = ["00", "15", "30", "45"];

    const handleSubmit = () => {
        const start = new Date(`${selectedDate}T${startH}:${startH}:00`);
        const end = new Date(`${selectedDate}T${endH}:${endM}:00`);

        const offset = 5 * 60 * 60 * 1000;

        const startTimeAdjusted = new Date(
            start.getTime() + offset
        ).toISOString();
        const endTimeAdjusted = new Date(end.getTime() + offset).toISOString();

        mutate(
            {
                name,
                startTime: startTimeAdjusted,
                endTime: endTimeAdjusted,
                price: Number(price),
            },
            { onSuccess: onCancel }
        );
    };

    return (
        <div className="bg-white border rounded-xl p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2 font-bold text-slate-800">
                <CalendarCheck className="w-5 h-5" />
                Create Lesson for{" "}
                {format(new Date(selectedDate), "EEEE, MMMM d, yyyy", {
                    locale: uz,
                })}
            </div>

            <div className="bg-emerald-50 text-emerald-700 p-3 rounded-lg text-sm flex items-center gap-2 border border-emerald-100">
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                    ✓
                </div>
                Google Calendar connected. Lesson will be added to your
                calendar.
            </div>

            <div className="space-y-4 text-black">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Dars nomi</label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="h-10"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">
                            Narxi (UZS)
                        </label>
                        <div className="relative">
                            <Banknote className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                            <Input
                                type="number"
                                value={price}
                                onChange={(e) =>
                                    setPrice(Number(e.target.value))
                                }
                                className="pl-10 h-10"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-1.5 text-black">
                    <label className="text-sm font-medium flex items-center gap-1">
                        <Clock className="w-4 h-4" /> Start Time *
                    </label>
                    <div className="flex items-center gap-2">
                        <Select value={startH} onValueChange={setStartH}>
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {hours.map((h) => (
                                    <SelectItem key={h} value={h}>
                                        {h}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <span className="font-bold">:</span>
                        <Select value={startM} onValueChange={setStartM}>
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {minutes.map((m) => (
                                    <SelectItem key={m} value={m}>
                                        {m}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-1.5 text-black">
                    <label className="text-sm font-medium flex items-center gap-1">
                        <Clock className="w-4 h-4" /> End Time *
                    </label>
                    <div className="flex items-center gap-2">
                        <Select value={endH} onValueChange={setEndH}>
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {hours.map((h) => (
                                    <SelectItem key={h} value={h}>
                                        {h}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <span className="font-bold">:</span>
                        <Select value={endM} onValueChange={setEndM}>
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {minutes.map((m) => (
                                    <SelectItem key={m} value={m}>
                                        {m}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-xs text-slate-400">
                    Duration:{" "}
                    <span className="font-bold text-slate-600">1h 0m</span>
                </span>
                <div className="flex gap-4">
                    <Button
                        variant="ghost"
                        onClick={onCancel}
                        disabled={isPending}
                        className="h-11 px-6 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors rounded-xl font-medium"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isPending}
                        className="bg-black text-white px-12 hover:bg-slate-800"
                    >
                        {isPending ? "Creating..." : "Create Lesson"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
