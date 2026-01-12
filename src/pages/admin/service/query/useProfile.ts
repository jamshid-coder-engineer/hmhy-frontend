import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: () => request.get("admin/me").then((res) => res.data),
    });
};
