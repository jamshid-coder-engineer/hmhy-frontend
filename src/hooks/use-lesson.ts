// src/hooks/useLessons.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { teacherQueries } from '../pages/teacher/lesson/services/teacher.queries';
import { lessonQueries } from '../pages/teacher/lesson/services/lesson.queries';
import type {
    ApiResponse,
    Teacher,
    Lesson,
    TeacherFilters,
    LessonFilters,
    TeachersResponse,
    LessonsResponse,
    TeacherDetailsResponse,
} from '../pages/auth/types';

// ==================== TEACHERS HOOKS ====================

export const useTeachers = (
  filters?: TeacherFilters
): UseQueryResult<TeachersResponse, Error> => {
  return useQuery({
    queryKey: ['teachers', filters],
    queryFn: () => teacherQueries.getTeachers(filters),
    placeholderData: (prev) => prev,
  });
};


export const useTeacher = (
    id: string,
): UseQueryResult<ApiResponse<TeacherDetailsResponse>, Error> => {
    return useQuery({
        queryKey: ['teacher', id],
        queryFn: () => teacherQueries.getTeacherById(id),
    });
};

export const useCreateTeacher = (): UseMutationResult<
    ApiResponse<Teacher>,
    Error,
    Partial<Teacher>
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (teacherData: Partial<Teacher>) => teacherQueries.createTeacher(teacherData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['teachers'] });
        },
    });
};

export const useUpdateTeacher = (): UseMutationResult<
    ApiResponse<Teacher>,
    Error,
    { id: string; data: Partial<Teacher> }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Teacher> }) =>
            teacherQueries.updateTeacher(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['teachers'] });
            queryClient.invalidateQueries({ queryKey: ['teacher', variables.id] });
        },
    });
};

export const useDeleteTeacher = (): UseMutationResult<ApiResponse<void>, Error, string> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => teacherQueries.deleteTeacher(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['teachers'] });
        },
    });
};

export const useToggleTeacherStatus = (): UseMutationResult<
    ApiResponse<Teacher>,
    Error,
    { id: string; isActive: boolean }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
            teacherQueries.toggleTeacherStatus(id, isActive),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['teachers'] });
            queryClient.invalidateQueries({ queryKey: ['teacher', variables.id] });
        },
    });
};

// ==================== LESSONS HOOKS ====================

export const useLessons = (): UseQueryResult<LessonsResponse, Error> => {
  return useQuery({
    queryKey: ['lessons'],
    queryFn: () => lessonQueries.getLessons(),
    placeholderData: (prev) => prev,
  });
};

export const useTeacherLessons = (
  teacherId: string,
  filters?: LessonFilters,
  enabled: boolean = true
): UseQueryResult<LessonsResponse, Error> => {
  return useQuery({
    queryKey: ['teacher-lessons', teacherId, filters],
    queryFn: () => lessonQueries.getTeacherLessons(teacherId, filters),
    enabled: enabled && !!teacherId,
    placeholderData: (prev) => prev,
  });
};


export const useLesson = (
    id: string,
    enabled: boolean = true
): UseQueryResult<ApiResponse<Lesson>, Error> => {
    return useQuery({
        queryKey: ['lesson', id],
        queryFn: () => lessonQueries.getLessonById(id),
        enabled: enabled && !!id,
    });
};


export const useCreateLesson = (): UseMutationResult<
    ApiResponse<Lesson>,
    Error,
    Partial<Lesson>
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (lessonData: Partial<Lesson>) => lessonQueries.createLesson(lessonData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lessons'] });
            queryClient.invalidateQueries({ queryKey: ['teacher-lessons'] });
            queryClient.invalidateQueries({ queryKey: ['teachers'] });
        },
    });
};

export const useUpdateLesson = (): UseMutationResult<
    ApiResponse<Lesson>,
    Error,
    { id: string; data: Partial<Lesson> }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Lesson> }) =>
            lessonQueries.updateLesson(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['lessons'] });
            queryClient.invalidateQueries({ queryKey: ['lesson', variables.id] });
            queryClient.invalidateQueries({ queryKey: ['teacher-lessons'] });
        },
    });
};

export const useDeleteLesson = (): UseMutationResult<ApiResponse<void>, Error, string> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => lessonQueries.deleteLesson(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lessons'] });
            queryClient.invalidateQueries({ queryKey: ['teacher-lessons'] });
        },
    });
};

export const useBookLesson = (): UseMutationResult<
    ApiResponse<Lesson>,
    Error,
    { id: string; studentId: string }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, studentId }: { id: string; studentId: string }) =>
            lessonQueries.bookLesson(id, studentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lessons'] });
            queryClient.invalidateQueries({ queryKey: ['teacher-lessons'] });
        },
    });
};

export const useCancelLesson = (): UseMutationResult<
    ApiResponse<Lesson>,
    Error,
    { id: string; reason?: string }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
            lessonQueries.cancelLesson(id, reason),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lessons'] });
            queryClient.invalidateQueries({ queryKey: ['teacher-lessons'] });
        },
    });
};

export const useCompleteLesson = (): UseMutationResult<ApiResponse<Lesson>, Error, string> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => lessonQueries.completeLesson(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lessons'] });
            queryClient.invalidateQueries({ queryKey: ['teacher-lessons'] });
        },
    });
};
