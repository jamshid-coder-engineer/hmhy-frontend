import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useProfile = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: () => request.get("/teacher/me").then((res) => res.data),
    });
};
