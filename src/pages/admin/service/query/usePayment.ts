import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import type { PaymentResponse } from "../../../auth/admin-type";

export const usePaymentStats = () => {
    return useQuery<PaymentResponse>({
        queryKey: ["payment-stats"],
        queryFn: () =>
            request.get("/transaction/stats").then((res) => res.data),
        refetchInterval: 30000,
    });
};
