// src/services/teacher.queries.ts
import { apiClient } from './api.client';
import type {
    ApiResponse,
    Teacher,
    TeacherFilters,
    TeachersResponse,
    TeacherDetailsResponse,
} from '../../../auth/types';

export const teacherQueries = {
    /**
     * Get all teachers with filters
     * GET /teachers
     */
    getTeachers: async (filters?: TeacherFilters): Promise<TeachersResponse> => {
        const response = await apiClient.get<TeachersResponse>('/teacher', {
            params: filters,
        });
        return response.data;
    },

    /**
     * Get teacher by ID with lessons and stats
     * GET /teachers/:id
     */
    getTeacherById: async (id: string): Promise<ApiResponse<TeacherDetailsResponse>> => {
        const response = await apiClient.get<ApiResponse<TeacherDetailsResponse>>(`/teacher/${id}`);
        return response.data;
    },

    /**
     * Create new teacher
     * POST /teachers
     */
    createTeacher: async (teacherData: Partial<Teacher>): Promise<ApiResponse<Teacher>> => {
        const response = await apiClient.post<ApiResponse<Teacher>>('/teacher', teacherData);
        return response.data;
    },

    /**
     * Update teacher
     * PUT /teachers/:id
     */
    updateTeacher: async (id: string, teacherData: Partial<Teacher>): Promise<ApiResponse<Teacher>> => {
        const response = await apiClient.put<ApiResponse<Teacher>>(`/teacher/${id}`, teacherData);
        return response.data;
    },

    /**
     * Delete teacher
     * DELETE /teachers/:id
     */
    deleteTeacher: async (id: string): Promise<ApiResponse<void>> => {
        const response = await apiClient.delete<ApiResponse<void>>(`/teacher/${id}`);
        return response.data;
    },

    /**
     * Activate/Deactivate teacher
     * PATCH /teachers/:id/status
     */
    toggleTeacherStatus: async (id: string, isActive: boolean): Promise<ApiResponse<Teacher>> => {
        const response = await apiClient.patch<ApiResponse<Teacher>>(`/teacher/${id}/status`, {
            isActive,
        });
        return response.data;
    },
};