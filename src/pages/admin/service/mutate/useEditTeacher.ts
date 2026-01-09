import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useEditTeacher = () => {
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) =>
            request.patch(`/teacher/${id}`, data),
        
    });
};
