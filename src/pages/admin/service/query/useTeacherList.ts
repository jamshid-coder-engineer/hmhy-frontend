import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
export const useTeacherList = () => {
    return useQuery({
        queryKey: ["teacherList"],
        queryFn: () => request.get("/teacher").then((res) => res.data),
    });
};
