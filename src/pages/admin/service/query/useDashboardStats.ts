import { request } from "../../../../config/request";
import type { DashboardResponse } from "../../../auth/admin-type";
import { useQuery } from "@tanstack/react-query";

export const useDashboardStats = () => {
    return useQuery<DashboardResponse>({
        queryKey: ["dashboard-stats"],
        queryFn: () => request.get("/admin/stats").then((res) => res.data),
        refetchInterval: 30000,
    });
};
