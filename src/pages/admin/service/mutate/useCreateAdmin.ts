import { request } from "../../../../config/request";
import type { CreateAdmin } from "../../../auth/admin-type";
import { useMutation } from "@tanstack/react-query";

export const useCreateAdmin = () => {
    return useMutation({
        mutationFn: (data: CreateAdmin) => request.post("/admin", data),
    });
};
