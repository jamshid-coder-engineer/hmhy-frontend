// src/services/teacher.queries.ts
import { request as apiClient } from '../../../../config/request';
import type {
    ApiResponse,
    Teacher,
    TeacherFilters,
    TeachersResponse,
    TeacherDetailsResponse,
} from '../../../auth/types';

export const teacherQueries = {
   
    getTeachers: async (filters?: TeacherFilters): Promise<TeachersResponse> => {
        const response = await apiClient.get<TeachersResponse>('/teacher', {
            params: filters,
        });
        return response.data;
    },

   
    getTeacherById: async (id: string): Promise<ApiResponse<TeacherDetailsResponse>> => {
        const response = await apiClient.get<ApiResponse<TeacherDetailsResponse>>(`/teacher/${id}`);
        return response.data;
    },

   
    createTeacher: async (teacherData: Partial<Teacher>): Promise<ApiResponse<Teacher>> => {
        const response = await apiClient.post<ApiResponse<Teacher>>('/teacher', teacherData);
        return response.data;
    },

   
    updateTeacher: async (id: string, teacherData: Partial<Teacher>): Promise<ApiResponse<Teacher>> => {
        const response = await apiClient.put<ApiResponse<Teacher>>(`/teacher/${id}`, teacherData);
        return response.data;
    },

    deleteTeacher: async (id: string): Promise<ApiResponse<void>> => {
        const response = await apiClient.delete<ApiResponse<void>>(`/teacher/${id}`);
        return response.data;
    },

    toggleTeacherStatus: async (id: string, isActive: boolean): Promise<ApiResponse<Teacher>> => {
        const response = await apiClient.patch<ApiResponse<Teacher>>(`/teacher/${id}/status`, {
            isActive,
        });
        return response.data;
    },
};