import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import type { LessonFilters, LessonsResponse } from "../../../auth/types";

export const useTeacherLessons = (
    teacherId: string,
    filters?: LessonFilters,
    enabled: boolean = true
) => {
    return useQuery({
        queryKey: ['teacher-lessons', teacherId, filters],
        queryFn: () =>
            request
                .get<LessonsResponse>(`/lessons/${teacherId}/lessons`, { params: filters })
                .then((res) => res.data),
        enabled: enabled && !!teacherId,
        placeholderData: (prev) => prev,
    });
};