import { useState } from "react";
import { BookOpen, CalendarDays, Layers, Filter } from "lucide-react";
import { useLessonsList } from "./service/query/useLessonsList";
import { StatsCard } from "./components/stats-card";

import { LessonsSkeleton } from "./components/lesson-skeleton";
import { useLessonsStats } from "./service/query/lessonStats";
import { LessonCard } from "./components/lesson-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

export const TeacherLessons = () => {
    const [filter, setFilter] = useState("all");

    const { data: lessonsData, isPending: lessonsPending } =
        useLessonsList(filter);
    const { data: statsData, isPending: statsPending } = useLessonsStats();

    if (lessonsPending || statsPending) return <LessonsSkeleton />;
    console.log(statsData)

    const stats = statsData?.data ||
        statsData || {
            totalLessons: 0,
            bookedLessons: 0,
            totalPages: 0,
            currentPage: 1,
        };

    const lessons = lessonsData?.data || [];

    return (
        <div className="min-h-screen p-4 space-y-6 md:p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
                        <BookOpen className="w-6 h-6" /> Mening Darslarim
                    </h1>
                    <p className="text-sm text-slate-500">
                        O'quvchilar tomonidan band qilingan darslar ro'yxati
                    </p>
                </div>

                <div className="flex items-center gap-2 text-black">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-35 bg-white">
                            <SelectValue placeholder="Saralash" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Barchasi</SelectItem>
                            <SelectItem value="booked">Band</SelectItem>
                            <SelectItem value="available">Bo'sh</SelectItem>
                            <SelectItem value="completed">Tugagan</SelectItem>
                            <SelectItem value="canceled">
                                Bekor qilingan
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <StatsCard
                    label="Jami Darslar"
                    value={stats.totalLessons}
                    icon={BookOpen}
                    labelColor="text-blue-600"
                    iconColor="bg-blue-50 text-blue-600"
                />
                <StatsCard
                    label="Band Darslar"
                    value={stats.bookedLessons}
                    icon={CalendarDays}
                    labelColor="text-green-600"
                    iconColor="bg-green-50 text-green-600"
                />
                <StatsCard
                    label="Sahifa"
                    value={`${stats.currentPage || 1} / ${
                        stats.totalPages || 0
                    }`}
                    icon={Layers}
                    labelColor="text-purple-600"
                    iconColor="bg-purple-50 text-purple-600"
                />
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Darslar jadvali
                    </h2>
                    <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded border">
                        Jami: {lessons.length} ta dars
                    </span>
                </div>

                {lessons.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {lessons.map((lesson: any) => (
                            <LessonCard key={lesson.id} lesson={lesson} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center min-h-75 bg-white border border-dashed rounded-xl">
                        <div className="p-4 mb-4 rounded-full bg-slate-50">
                            <BookOpen className="w-12 h-12 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">
                            Darslar topilmadi
                        </h3>
                    </div>
                )}
            </div>
        </div>
    );
};
