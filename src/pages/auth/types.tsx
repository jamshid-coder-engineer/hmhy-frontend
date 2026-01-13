export interface LoginT {
  username: string;
  password: string;
}

export interface LoginResponse {
  statusCode: number;
  message: {
    uz: string;
    en: string;
    ru: string;
  };
  data: {
    username: string;
    token: any;
    accessToken: string;
    role: string; // "ADMIN" | "TEACHER" | "SUPER_ADMIN"
  };
}

export type Role = "admin" | "teacher" | "superadmin" | "student";

// Enums - const assertion bilan (erasableSyntaxOnly compatible)
export const AuthProvider = {
    LOCAL: 'LOCAL',
    GOOGLE: 'GOOGLE',
} as const;

export type AuthProvider = typeof AuthProvider[keyof typeof AuthProvider];

export const Roles = {
    ADMIN: 'ADMIN',
    TEACHER: 'TEACHER',
    STUDENT: 'STUDENT',
    SUPERADMIN: 'SUPERADMIN',
} as const;

export type Roles = typeof Roles[keyof typeof Roles];

export const TeacherSpecification = {
    IELTS: 'IELTS',
    SPEAKING: 'SPEAKING',
    GRAMMAR: 'GRAMMAR',
    BUSINESS: 'BUSINESS',
    KIDS: 'KIDS',
} as const;

export type TeacherSpecification = typeof TeacherSpecification[keyof typeof TeacherSpecification];

export const LessonStatus = {
    AVAILABLE: 'AVAILABLE',
    BOOKED: 'BOOKED',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
} as const;

export type LessonStatus = typeof LessonStatus[keyof typeof LessonStatus];

// Teacher Interface (Backend entity bilan bir xil)
export interface Teacher {
    id: string;
    email: string;
    phoneNumber: string;
    fullName: string;
    cardNumber?: string;
    isActive?: boolean;
    authProvider?: AuthProvider;
    isDelete?: boolean;
    isComplete?: boolean;
    role?: Roles;
    specification?: TeacherSpecification;
    level?: string;
    description?: string;
    hourPrice?: number;
    portfolioLink?: string;
    imageUrl?: string;
    rating: number;
    experience?: string;
    createdAt?: string;
    updatedAt?: string;
    // Relations
    lessonsCount?: number;
}

// Student Interface (Backend entity bilan bir xil)
export interface Student {
    id: string;
    lastName: string;
    firstName: string;
    phoneNumber?: string;
    role: Roles;
    tgId?: string;
    tgUsername?: string;
    isBlocked: boolean;
    blockedAt?: Date;
    blockedReason?: string;
    email?: string;
    createdAt: string;
    updatedAt: string;
}

// Lesson Interface (Backend entity bilan bir xil)
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
    // Relations
    teacher?: Teacher;
    student?: Student;
}

// Filter Types
export type SortField = 'fullName' | 'rating' | 'createdAt' | 'hourPrice';
export type SortOrder = 'ASC' | 'DESC';

export interface TeacherFilters {
    search?: string;
    specification?: TeacherSpecification | '';
    level?: string;
    minRating?: number;
    maxRating?: number;
    minPrice?: number;
    maxPrice?: number;
    isActive?: boolean;
    sortBy?: SortField;
    sortOrder?: SortOrder;
    page?: number;
    limit?: number;
}

export interface LessonFilters {
    teacherId?: string;
    studentId?: string;
    status?: LessonStatus | '';
    dateFrom?: string;
    dateTo?: string;
    isPaid?: boolean;
    sortBy?: 'startTime' | 'price' | 'createdAt';
    sortOrder?: SortOrder;
    page?: number;
    limit?: number;
}

// API Response Types
export interface PaginationData {
    currentPage: number;
    totalPages: number;
    totalElements: number,
    pageSize: number,
    from: number;
    to: number;
}

export interface ApiResponse<T> {
    data: T;
    statusCode: number;
    message: {
        uz: string;
        en: string;
        ru: string;
    };
}

export interface TeachersResponse {
    statusCode: number;
    message: {
        uz: string;
        en: string;
        ru: string;
    };
    data: Teacher[];
    currentPage: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
    from: number;
    to: number;
}


export interface LessonsResponse {
    data: Lesson[];
    currentPage: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
    from: number;
    to: number;
}



export interface TeacherDetailsResponse {
    teacher: Teacher;
    lessons: Lesson[];
    stats: {
        totalLessons: number;
        availableLessons: number;
        bookedLessons: number;
        completedLessons: number;
        totalEarnings: number;
    };

}
