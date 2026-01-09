import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useDeleteAdmin = () => {
    return useMutation({
        mutationFn: (id: string) => request.delete(`/admin/${id}`),
    });
};
