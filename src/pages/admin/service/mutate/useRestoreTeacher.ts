import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useRestoreTeacher = () => {
    return useMutation({
        mutationFn: (id: string) => request.patch(`/teacher/restore/${id}`),
    });
};
