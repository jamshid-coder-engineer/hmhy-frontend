import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import type { ApiResponse, TeacherDetailsResponse } from "../../../auth/types";

export const useTeacher = (id: string) => {
    return useQuery({
        queryKey: ['teacher', id],
        queryFn: () =>
            request.get<ApiResponse<TeacherDetailsResponse>>(`/teacher/${id}`)
                .then((res) => res.data),
    });
};