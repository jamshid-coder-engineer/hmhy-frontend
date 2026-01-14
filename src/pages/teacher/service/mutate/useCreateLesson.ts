import { request } from "../../../../config/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateLesson = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => request.post("/lessons", data),

        onSuccess: () => {
            toast.success("Dars muvaffaqiyatli yaratildi!", {
                position: "top-right",
            });
            queryClient.invalidateQueries({ queryKey: ["lessonsList"] });
        },

        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message;

            if (errorMessage?.includes("oauth2.googleapis.com")) {
                toast.error("Google tizimi bilan bog'lanishda xatolik!", {
                    description:
                        "Iltimos, qaytadan urinib ko'ring yoki Google hisobingizni tekshiring.",
                    duration: 5000,
                    position: "top-right",
                });
            } else if (errorMessage) {
                toast.error(errorMessage, { position: "top-right" });
            } else {
                toast.error(
                    "Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.",
                    { position: "top-right" }
                );
            }
        },
    });
};
