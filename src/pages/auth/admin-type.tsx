import type { LucideIcon } from "lucide-react";

export interface MessageTranslations {
    uz: string;
    en: string;
    ru: string;
}

export interface PaginationData {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
    from: number;
    to: number;
}

export interface ApiResponse<T> extends Partial<PaginationData> {
    statusCode: number;
    message: MessageTranslations;
    data: T;
}

export type SortOrder = "asc" | "desc";

export interface Admin {
    phoneNumber: any;
    id: string;
    username: string;
    phone: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateAdmin {
    username: string;
    phoneNumber: string;
    password: string;
}

export type EditAdmin = Partial<CreateAdmin>;

export interface DetailsModalState {
    isOpen: boolean;
    admin: Admin | null;
}

export interface EditModalState extends DetailsModalState {
    username: string;
    phone: string;
    password?: string;
}

export interface DeleteConfirmState {
    isOpen: boolean;
    admin: Admin | null;
}

export const TEACHER_SPECIFICATIONS = {
    ENGLISH: "ENGLISH",
    RUSSIAN: "RUSSIAN",
    DEUTSCH: "DEUTSCH",
    SPANISH: "SPANISH",
    FRENCH: "FRENCH",
    ITALIAN: "ITALIAN",
    JAPANESE: "JAPANESE",
    CHINESE: "CHINESE",
    ARABIC: "ARABIC",
    KOREAN: "KOREAN",
} as const;

export type TeacherSpecification = keyof typeof TEACHER_SPECIFICATIONS;
export const TEACHER_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type TeacherLevel = (typeof TEACHER_LEVELS)[number];

export interface Teacher {
    id: string;
    name: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    imageUrl: string;
    isActive: boolean;
    status: string;
    language: string;
    specification: TeacherSpecification | null;
    level: TeacherLevel | null;
    description: string | null;
    hourPrice: number | null;
    price: number;
    rating: string;
    experience: string | null;
    portfolioLink: string | null;
    lessonsCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface EditProfile {
    fullName: string;
    phoneNumber: string;
    language: string;
    specification: TeacherSpecification | null;
    level: TeacherLevel | null;
    description: string | null;
    hourPrice: number | null;
    experience: string | null;
    portfolioLink: string | null;
}

export interface ChangePassword {
    currentPassword: string;
    newPassword: string;
}

export type TeacherSortField =
    | "name"
    | "email"
    | "rating"
    | "price"
    | "lessons"
    | "createdAt";

export interface TeacherFilters {
    search?: string;
    specification?: TeacherSpecification | "";
    level?: TeacherLevel | "";
    minRating?: number;
    maxRating?: number;
    minPrice?: number;
    maxPrice?: number;
    isActive?: boolean;
    sortBy?: TeacherSortField;
    sortOrder?: SortOrder;
    page?: number;
    limit?: number;
}

export const LessonStatus = {
    AVAILABLE: "AVAILABLE",
    BOOKED: "BOOKED",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
} as const;

export type LessonStatus = (typeof LessonStatus)[keyof typeof LessonStatus];

export type TeacherSpecificationForLesson =
    (typeof TEACHER_SPECIFICATIONS)[keyof typeof TEACHER_SPECIFICATIONS];
export interface Student {
    lastName: any;
    firstName: any;
    id: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    bio?: string;
    languageCode?: string;
    timezone?: string;
}

export interface Lesson {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    teacherId: string;
    studentId?: string;
    googleMeetUrl?: string;
    status: LessonStatus;
    googleEventId?: string;
    price: number;
    isPaid: boolean;
    bookedAt?: string;
    completedAt?: string;
    createdAt: string;
    updatedAt: string;
    teacher?: Teacher;
    student?: Student;
}


export interface LessonFilters {
    teacherId?: string;
    studentId?: string;
    status?: LessonStatus | "";
    dateFrom?: string;
    dateTo?: string;
    isPaid?: boolean;
    sortBy?: "startTime" | "price" | "createdAt";
    sortOrder?: SortOrder;
    page?: number;
    limit?: number;
}

export interface DashboardStats {
    totalStudents: number;
    totalTeachers: number;
    totalLessons: number;
    totalRevenue: number;
    charts: {
        lessonsByStatus: { status: LessonStatus; count: number }[];
    };
}

export interface PaymentStats {
    totalRevenue: number;
    pendingPayments: number;
    pendingAmount: number;
    successRate: number;
    completedCount: number;
    canceledCount: number;
    canceledAmount: number;
    totalTransactions: number;
    transactions: Array<{
        id: string;
        date: string;
        student: { id: string; name: string } | null;
        teacher: { id: string; name: string } | null;
        amount: number;
        status: string;
        provider: string;
    }>;
}

export interface StatsCardProps {
    label: string;
    value: number | string;
    icon: LucideIcon;
    iconColor: string;
    labelColor: string;
}

export interface IStatsDetail {
    amount: number;
    count: number;
}

export interface ITeacherStats {
    paid: IStatsDetail;
    unpaid: IStatsDetail;
    cancelled: IStatsDetail;
}

export interface LoginResponse {
    statusCode: number;
    message: {
        uz: string;
        en: string;
        ru: string;
    };
    data: {
        data: { role: string; accessToken: string };
    };
}

export interface AdminLoginInput {
    username: string;
    password: string;
}

export type Role = "admin" | "teacher" | "superadmin";
