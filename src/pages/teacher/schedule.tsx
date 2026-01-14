import { useState } from "react";
import { Plus, Info } from "lucide-react";
import { format } from "date-fns";
import { uz } from "date-fns/locale";
import { Button } from "../../components/ui/button";
import { useLessonsList } from "./service/query/useLessonsList";
import { WeekCalendar } from "./components/week-calendar";
import { LessonCard } from "./components/lesson-card";
import { LessonsSkeleton } from "./components/lesson-skeleton";
import { CreateLessonForm } from "./components/create-lesson";

export const Schedule = () => {
    const [selectedDate, setSelectedDate] = useState(
        format(new Date(), "yyyy-MM-dd")
    );
    const [isCreating, setIsCreating] = useState(false); 

    const { data, isPending } = useLessonsList("all", selectedDate);
    const lessons = data?.data || [];

    const handleDateChange = (date: string) => {
        setSelectedDate(date);
        setIsCreating(false);
    };

    return (
        <div className="min-h-screen p-4 md:p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Mening Darslarim
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Dars jadvalingizni boshqaring
                    </p>
                </div>
                {!isCreating && (
                    <Button
                        onClick={() => setIsCreating(true)}
                        className="bg-slate-900 hover:bg-slate-800 text-white gap-2"
                    >
                        <Plus className="w-4 h-4" /> Dars yaratish
                    </Button>
                )}
            </div>

            <WeekCalendar
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
            />

            {isCreating ? (
                <CreateLessonForm
                    selectedDate={selectedDate}
                    onCancel={() => setIsCreating(false)}
                />
            ) : (
                <>
                    <div className="pt-4 border-t flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">
                                {format(
                                    new Date(selectedDate),
                                    "EEEE, d-MMMM, yyyy",
                                    { locale: uz }
                                )}
                            </h2>
                            <p className="text-sm text-slate-500">
                                {lessons.length > 0
                                    ? `${lessons.length} ta dars rejalashtirilgan`
                                    : "Darslar rejalashtirilmagan"}
                            </p>
                        </div>
                    </div>

                    {isPending ? (
                        <LessonsSkeleton />
                    ) : lessons.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {lessons.map((lesson: any) => (
                                <LessonCard key={lesson.id} lesson={lesson} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center min-h-75 bg-white border border-dashed rounded-2xl p-12 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                <Info className="w-8 h-8 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900">
                                Ushbu kun uchun darslar mavjud emas
                            </h3>
                            <Button
                                variant="outline"
                                className="mt-6 border-slate-200 text-black"
                                onClick={() => setIsCreating(true)}
                            >
                                <Plus className="w-4 h-4 mr-2" /> Yangi dars
                                qo'shish
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
