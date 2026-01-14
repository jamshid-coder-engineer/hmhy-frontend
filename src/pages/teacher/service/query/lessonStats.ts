import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useLessonsStats = () => {
    return useQuery({
        queryKey: ["stats"],
        queryFn: () => request.get("/lessons/stats").then((res) => res.data),
    });
};
