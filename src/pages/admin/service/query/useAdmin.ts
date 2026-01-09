import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";

export const useAdmin = (id: string | null) => {
    return useQuery({
        queryKey: ["admin", id],
        queryFn: () => request.get(`/admin/${id}`).then((res) => res.data),
        enabled: !!id,
    });
};
