import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";

export const useAdminList = (page: number = 1, limit: number = 10) => {
    return useQuery({
        queryKey: ["adminList", page, limit],

        queryFn: () =>
            request
                .get("/admin", {
                    params: {
                        page,
                        limit,
                    },
                })
                .then((res) => res.data),
    });
};