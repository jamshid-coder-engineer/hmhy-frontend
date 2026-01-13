// src/pages/TeacherLessonsPage.tsx
import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Calendar,
    Loader2,
    AlertCircle,
    Filter,
    Search,
} from 'lucide-react';
import { useLessons, useTeacher, useTeacherLessons } from '../../../hooks/use-lesson';
import { type Lesson, type LessonFilters, LessonStatus } from '../../auth/types';
import LessonCard from '../lesson/components/LessonCard';

const TeacherLessonsPage = () => {
    const navigate = useNavigate();

    const [lessonFilters, setLessonFilters] = useState<LessonFilters>({
        status: '',
        sortBy: 'startTime',
        sortOrder: 'DESC',
        page: 1,
        limit: 20,
    });

    // const cleanFilters = {
    //     ...lessonFilters,
    //     status: lessonFilters.status || undefined,
    // };

    const [searchQuery, setSearchQuery] = useState('');

    // Fetch teacher info (faqat ism va asosiy ma'lumot uchun)
    // const { data: teacherData, isLoading: teacherLoading } = useTeacher(teacherId);
    // console.log(teacherData)

    // Fetch teacher lessons
    const {
        data: lessonsData,
        isLoading: lessonsLoading,
        error: lessonsError,
    } = useLessons();
    console.log(lessonsData)

    // const teacher = teacherData?.data?.teacher;
    const lessons = lessonsData?.data || [];

    const pagination = lessonsData
        ? {
            currentPage: lessonsData.currentPage,
            totalPages: lessonsData.totalPages,
            totalElements: lessonsData.totalElements,
            pageSize: lessonsData.pageSize,
            from: lessonsData.from,
            to: lessonsData.to,
        }
        : null;

        console.log(lessons)
        console.log(pagination)

    const handleStatusFilter = (status: LessonStatus | '') => {
        setLessonFilters((prev: LessonFilters) => ({ ...prev, status, page: 1 }));
    };

    const handlePageChange = (page: number) => {
        setLessonFilters((prev: LessonFilters) => ({ ...prev, page }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getStatusColor = (status: LessonStatus | ''): string => {
        const colors: Record<LessonStatus | '', string> = {
            '': 'bg-gray-500',
            [LessonStatus.AVAILABLE]: 'bg-blue-500',
            [LessonStatus.BOOKED]: 'bg-yellow-500',
            [LessonStatus.COMPLETED]: 'bg-green-500',
            [LessonStatus.CANCELLED]: 'bg-red-500',
        };
        return colors[status] || 'bg-gray-500';
    };

    const getStatusLabel = (status: LessonStatus | ''): string => {
        if (!status) return 'All';
        return status.charAt(0) + status.slice(1).toLowerCase();
    };

    // Filter lessons by search query
    const filteredLessons = lessons.filter((lesson: Lesson) =>
        lesson.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.student?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.student?.lastName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // if (teacherLoading) {
    //     return (
    //         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    //             <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
    //         </div>
    //     );
    // }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Back to Teachers</span>
                </button>

                {/* Page Header
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {teacher?.fullName || 'Teacher'}'s Lessons
                            </h1>
                            <p className="text-gray-600">Manage and view all lessons for this teacher</p>
                        </div>
                        {teacher && (
                            <div className="text-right">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm text-gray-600">Level:</span>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                                        {teacher.level || 'N/A'}
                                    </span>
                                </div>
                                {teacher.hourPrice && (
                                    <p className="text-lg font-semibold text-gray-900">
                                        {new Intl.NumberFormat('uz-UZ').format(teacher.hourPrice)} so'm/h
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div> */}

                {/* Filters Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter className="w-5 h-5 text-gray-600" />
                        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by lesson name or student..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>

                        {/* Status Filter Buttons */}
                        <div className="flex flex-wrap gap-2">
                            {['', LessonStatus.AVAILABLE, LessonStatus.BOOKED, LessonStatus.COMPLETED, LessonStatus.CANCELLED].map(
                                (status) => (
                                    <button
                                        key={status}
                                        onClick={() => handleStatusFilter(status as LessonStatus | '')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${lessonFilters.status === status
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        <span
                                            className={`w-2 h-2 rounded-full ${getStatusColor(status as LessonStatus | '')}`}
                                        ></span>
                                        {getStatusLabel(status as LessonStatus | '')}
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* Lessons Loading */}
                {lessonsLoading && (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    </div>
                )}

                {/* Lessons Error */}
                {lessonsError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-red-800 font-semibold">Error</h3>
                            <p className="text-red-700 text-sm">{lessonsError.message}</p>
                        </div>
                    </div>
                )}

                {/* Lessons Grid */}
                {!lessonsLoading && !lessonsError && filteredLessons.length > 0 && (
                    <>
                        <div className="mb-4 flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                                Showing {filteredLessons.length} of {pagination?.totalElements || 1} lessons
                            </span>
                            {pagination && pagination.totalPages > 1 && (
                                <span className="text-sm text-gray-600">
                                    Page {pagination.currentPage} of {pagination.totalPages}
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                            {filteredLessons.map((lesson: Lesson) => (
                                <LessonCard key={lesson.id} lesson={lesson} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination && pagination.totalPages > 1 && (
                            <div className="flex justify-center gap-2">
                                <button
                                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                                    disabled={pagination.currentPage === 1}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Previous
                                </button>
                                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                    const page = i + 1;
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`px-4 py-2 border rounded-lg transition-all ${page === pagination.currentPage
                                                ? 'bg-blue-500 text-white border-blue-500'
                                                : 'border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                                    disabled={pagination.currentPage === pagination.totalPages}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}

                {/* Empty Lessons */}
                {!lessonsLoading && !lessonsError && filteredLessons.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg">
                        <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No lessons found</h3>
                        <p className="text-gray-600">
                            {searchQuery || lessonFilters.status
                                ? 'Try adjusting your filters or search query'
                                : 'This teacher has no lessons yet'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeacherLessonsPage;