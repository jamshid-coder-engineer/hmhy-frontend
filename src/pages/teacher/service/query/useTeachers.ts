import { useQuery } from "@tanstack/react-query";
import type { TeacherFilters, TeachersResponse } from "../../../auth/types";
import { request } from "../../../../config/request";

export const useTeachers = (filters: TeacherFilters) => {
    return useQuery({
        queryKey: ["teachersLessoon"],
        queryFn: () =>
            request
                .get<TeachersResponse>("/teacher", {
                    params: filters
                })
                .then((res) => res.data),
    });
};
