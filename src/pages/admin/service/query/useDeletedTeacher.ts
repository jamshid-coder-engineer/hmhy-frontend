import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
export const useDeletedTeacher = () => {
    return useQuery({
        queryKey: ["teacherDeletedList"],
        queryFn: () => request.get("/teacher/deleted").then((res) => res.data),
    });
};
