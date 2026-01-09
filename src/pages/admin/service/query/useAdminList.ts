import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
export const useAdminList = () => {
    return useQuery({
        queryKey: ["adminList"],
        queryFn: () => request.get("/admin").then((res) => res.data),
    });
};
