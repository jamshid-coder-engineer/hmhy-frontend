import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import type { ApiResponse, PaymentStats } from "../../../auth/admin-type";

export const usePaymentStats = () => {
  return useQuery<ApiResponse<PaymentStats>>({
    queryKey: ["payment-stats"],
    queryFn: () =>
      request.get("/transaction/stats").then((res) => res.data),
    refetchInterval: 30000,
  });
};
