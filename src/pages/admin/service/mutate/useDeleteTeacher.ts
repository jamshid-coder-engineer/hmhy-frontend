import { request } from "../../../../config/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTeacher = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, reason }: { id: string; reason: string }) =>
            request.patch(`/teacher/soft-delete/${id}`, { reason }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teacherList"] });
        },
    });
};
