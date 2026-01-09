import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useHardDeleteTeacher = () => {
    return useMutation({
        mutationFn: (id: string) =>
            request.delete(`/teacher/hard-delete/${id}`),
    });
};
