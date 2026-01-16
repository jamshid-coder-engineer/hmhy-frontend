import { request } from "../../../../config/request";
import type { ApiResponse, DashboardStats } from "../../../auth/admin-type";
import { useQuery } from "@tanstack/react-query";

export const useDashboardStats = () => {
  return useQuery<ApiResponse<DashboardStats>>({
    queryKey: ["dashboard-stats"],
    queryFn: () => request.get("/admin/stats").then((res) => res.data),
    refetchInterval: 30000,
  });
};
