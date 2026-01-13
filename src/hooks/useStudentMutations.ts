// hooks/useStudentMutations.ts
import { request } from "../config/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateStudentData {
  id: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  email?: string;
  bio?: string;
  languageCode?: string;
  timezone?: string;
}

// Student ma'lumotlarini yangilash
export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, ...data }: UpdateStudentData) =>
      request.put(`/student/${id}`, data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["student_list"],
      });
      queryClient.invalidateQueries({
        queryKey: ["student_detail"],
      });
      queryClient.invalidateQueries({
        queryKey: ["student_stats"],
      });
    }
  });
};

// Studentni bloklash/faollashtirish
export const useBlockStudent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) =>
      request.post(`/student/${id}/block`).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["student_list"],
      });
      queryClient.invalidateQueries({
        queryKey: ["student_detail"],
      });
      queryClient.invalidateQueries({
        queryKey: ["student_stats"],
      });
    }
  });
};

// Studentni o'chirish
export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) =>
      request.delete(`/student/${id}`).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["student_list"],
      });
      queryClient.invalidateQueries({
        queryKey: ["student_stats"],
      });
    }
  });
};