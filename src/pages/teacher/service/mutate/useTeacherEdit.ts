import { request } from "../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useEditProfile = () => {
    return useMutation({
        mutationFn: (data: any) => request.patch("/teacher/update", data),
    });
};

export const useChangePassword = () => {
    return useMutation({
        mutationFn: (data: any) =>
            request.patch("/teacher/changePassword", data),
    });
};
