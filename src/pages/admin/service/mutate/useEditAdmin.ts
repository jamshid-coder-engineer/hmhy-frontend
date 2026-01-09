import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useUpdateAdmin = () => {
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) =>
            request.patch(`/admin/${id}`, data),
        
    });
};
