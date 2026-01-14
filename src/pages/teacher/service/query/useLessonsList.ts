import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";

export const useLessonsList = (status: string, date?: string) => {
    return useQuery({
        queryKey: ["lessonsList", status, date],
        queryFn: () =>
            request
                .get("/lessons/for-teacher", {
                    params: {
                        status:
                            status === "all" ? undefined : status.toUpperCase(),
                        date: date || undefined,
                    },
                })
                .then((res) => res.data),
    });
};
