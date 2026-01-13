import { request } from "../config/request";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "../pages/auth/types";

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  tgUsername?: string;
  tgId?: string;
  phoneNumber?: string;
  email?: string;
  avatar?: string;
  languageCode?: string;
  timezone?: string;
  bio?: string;
  isBlocked: boolean;
  blockedReason?: string;
  createdAt: string;
  updatedAt: string;
  lessons?: any[];
}

export interface StudentStats {
  totalStudents: number;
  activeStudents: number;
  blockedStudents: number;
}

// Barcha studentlar ro'yxati
export const useStudentList = () => {
  return useQuery({
    queryKey: ["student_list"],
    queryFn: () =>
      request.get<ApiResponse<Student[]>>("/student").then((res) => res.data),
  });
};

// Bitta student ma'lumoti
export const useStudentDetail = (id: string) => {
  return useQuery({
    queryKey: ["student_detail", id],
    queryFn: () =>
      request.get<ApiResponse<Student>>(`/student/${id}`).then((res) => res.data),
    enabled: !!id,
  });
};

// Student statistikasi
export const useStudentStats = () => {
  return useQuery({
    queryKey: ["student_stats"],
    queryFn: () =>
      request.get<ApiResponse<StudentStats>>("/student/stats").then((res) => res.data),
  });
};
