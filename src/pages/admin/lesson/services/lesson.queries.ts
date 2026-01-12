// src/services/lesson.queries.ts
import { apiClient } from './api.client';
import type {
    ApiResponse,
    Lesson,
    LessonFilters,
    LessonsResponse,
} from '../../../auth/types';

export const lessonQueries = {
    /**
     * Get all lessons with filters
     * GET /lessons
     */
    getLessons: async (filters?: LessonFilters): Promise<ApiResponse<LessonsResponse>> => {
        const response = await apiClient.get<ApiResponse<LessonsResponse>>('/lessons', {
            params: filters,
        });
        return response.data;
    },

    /**
     * Get lessons by teacher ID
     * GET /lessons/teacher/:teacherId
     */
    getTeacherLessons: async (
        teacherId: string,
        filters?: LessonFilters
    ): Promise<ApiResponse<LessonsResponse>> => {
        const response = await apiClient.get<ApiResponse<LessonsResponse>>(
            `/lessons/${teacherId}/lessons`,
            { params: filters }
        );
        return response.data;
    },

    /**
     * Get lesson by ID
     * GET /lessons/:id
     */
    getLessonById: async (id: string): Promise<ApiResponse<Lesson>> => {
        const response = await apiClient.get<ApiResponse<Lesson>>(`/lessons/${id}`);
        return response.data;
    },

    /**
     * Create new lesson
     * POST /lessons
     */
    createLesson: async (lessonData: Partial<Lesson>): Promise<ApiResponse<Lesson>> => {
        const response = await apiClient.post<ApiResponse<Lesson>>('/lessons', lessonData);
        return response.data;
    },

    /**
     * Update lesson
     * PUT /lessons/:id
     */
    updateLesson: async (id: string, lessonData: Partial<Lesson>): Promise<ApiResponse<Lesson>> => {
        const response = await apiClient.put<ApiResponse<Lesson>>(`/lessons/${id}`, lessonData);
        return response.data;
    },

    /**
     * Delete lesson
     * DELETE /lessons/:id
     */
    deleteLesson: async (id: string): Promise<ApiResponse<void>> => {
        const response = await apiClient.delete<ApiResponse<void>>(`/lessons/${id}`);
        return response.data;
    },

    /**
     * Book a lesson (student books available lesson)
     * POST /lessons/:id/book
     */
    bookLesson: async (id: string, studentId: string): Promise<ApiResponse<Lesson>> => {
        const response = await apiClient.post<ApiResponse<Lesson>>(`/lessons/${id}/book`, {
            studentId,
        });
        return response.data;
    },

    /**
     * Cancel a lesson
     * POST /lessons/:id/cancel
     */
    cancelLesson: async (id: string, reason?: string): Promise<ApiResponse<Lesson>> => {
        const response = await apiClient.post<ApiResponse<Lesson>>(`/lessons/${id}/cancel`, {
            reason,
        });
        return response.data;
    },

    /**
     * Complete a lesson
     * POST /lessons/:id/complete
     */
    completeLesson: async (id: string): Promise<ApiResponse<Lesson>> => {
        const response = await apiClient.post<ApiResponse<Lesson>>(`/lessons/${id}/complete`);
        return response.data;
    },
};