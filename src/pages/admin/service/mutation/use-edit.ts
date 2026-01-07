import { request } from "../../../../config/request";
import type { ChangePassword, EditProfile } from "../../../auth/admin-type";
import { useMutation } from "@tanstack/react-query";

export const useEditProfile = (p0: { username: string; phone: string; }) => {
    return useMutation({
        mutationFn: (data: EditProfile) => request.patch("/admin/update", data),
    });
};

export const useChangePassword = () => {
    return useMutation({
        mutationFn: (data: ChangePassword) =>
            request.patch("/admin/changePassword", data),
    });
};
