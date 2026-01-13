import { request as apiClient } from '../../../../config/request';
import type {
    ApiResponse,
    Lesson,
    LessonFilters,
    LessonsResponse,
} from '../../../auth/types';

export const lessonQueries = {
   
    getLessons: async (): Promise<LessonsResponse> => {
        const response = await apiClient.get<LessonsResponse>('/lessons/for-teacher');
        return response.data;
    },

  
    getTeacherLessons: async (
        teacherId: string,
        filters?: LessonFilters
    ): Promise<LessonsResponse> => {
        const response = await apiClient.get<LessonsResponse>(
            `/lessons/${teacherId}/lessons`,
            { params: filters }
        );
        return response.data;
    },

   
    getLessonById: async (id: string): Promise<ApiResponse<Lesson>> => {
        const response = await apiClient.get<ApiResponse<Lesson>>(`/lessons/${id}`);
        return response.data;
    },

  
    createLesson: async (lessonData: Partial<Lesson>): Promise<ApiResponse<Lesson>> => {
        const response = await apiClient.post<ApiResponse<Lesson>>('/lessons', lessonData);
        return response.data;
    },


    updateLesson: async (id: string, lessonData: Partial<Lesson>): Promise<ApiResponse<Lesson>> => {
        const response = await apiClient.put<ApiResponse<Lesson>>(`/lessons/${id}`, lessonData);
        return response.data;
    },

   
    deleteLesson: async (id: string): Promise<ApiResponse<void>> => {
        const response = await apiClient.delete<ApiResponse<void>>(`/lessons/${id}`);
        return response.data;
    },

    bookLesson: async (id: string, studentId: string): Promise<ApiResponse<Lesson>> => {
        const response = await apiClient.post<ApiResponse<Lesson>>(`/lessons/${id}/book`, {
            studentId,
        });
        return response.data;
    },

   
    cancelLesson: async (id: string, reason?: string): Promise<ApiResponse<Lesson>> => {
        const response = await apiClient.post<ApiResponse<Lesson>>(`/lessons/${id}/cancel`, {
            reason,
        });
        return response.data;
    },


    completeLesson: async (id: string): Promise<ApiResponse<Lesson>> => {
        const response = await apiClient.post<ApiResponse<Lesson>>(`/lessons/${id}/complete`);
        return response.data;
    },
};