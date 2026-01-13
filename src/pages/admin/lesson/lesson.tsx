// src/pages/admin/lesson/LessonsPage.tsx
import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { useTeachers } from '../../../hooks/use-lesson';
import type { SortField, TeacherFilters } from '../../auth/types';
import TeacherCard from '../../admin/lesson/components/TeacherCard';

const Lesson = () => {
    const [filters, setFilters] = useState<TeacherFilters>({
        search: '',
        level: '',
        minRating: undefined,
        maxRating: undefined,
        sortBy: 'fullName',
        sortOrder: 'ASC',
        page: 1,
        limit: 12,
    });

    const { data, isLoading } = useTeachers(filters);
    console.log(data);

    const teachers = data?.data ?? [];
    const pagination = data;

    const handleSearch = (value: string) => {
        setFilters((prev) => ({ ...prev, search: value, page: 1 }));
    };

    const handleSort = (sortBy: SortField) => {
        setFilters((prev) => ({
            ...prev,
            sortBy,
            sortOrder: prev.sortOrder === 'ASC' ? 'DESC' : 'ASC',
            page: 1,
        }));
    };

    const handlePageChange = (page: number) => {
        setFilters((prev) => ({ ...prev, page }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">

                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Teachers</h1>
                    <p className="text-gray-600">View and manage all teachers</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">

                        <input
                            type="text"
                            placeholder="Search by teacher name..."
                            value={filters.search || ''}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full"
                        />

                        <select
                            className="border rounded-lg px-3 py-2"
                            value={filters.level || ''}
                            onChange={(e) =>
                                setFilters((prev) => ({ ...prev, level: e.target.value, page: 1 }))
                            }
                        >
                            <option value="">All Levels</option>
                            <option value="A1">A1</option>
                            <option value="A2">A2</option>
                            <option value="B1">B1</option>
                            <option value="B2">B2</option>
                            <option value="C1">C1</option>
                        </select>

                        <select
                            className="border rounded-lg px-3 py-2"
                            value={filters.minRating ?? ''}
                            onChange={(e) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    minRating: e.target.value ? Number(e.target.value) : undefined,
                                    page: 1,
                                }))
                            }
                        >
                            <option value="">All Ratings</option>
                            <option value="4">4+ ⭐</option>
                            <option value="3">3+ ⭐</option>
                            <option value="2">2+ ⭐</option>
                        </select>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button onClick={() => handleSort('fullName')}>Name</button>
                        <button onClick={() => handleSort('rating')}>Rating</button>
                        <button onClick={() => handleSort('createdAt')}>Date</button>
                    </div>
                </div>

                {isLoading && <div className="text-center py-10">Loading...</div>}

                {!isLoading && teachers.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                            {teachers.map((teacher) => (
                                <TeacherCard key={teacher.id} teacher={teacher} />
                            ))}
                        </div>

                        {pagination && pagination.totalPages > 1 && (
                            <div className="flex justify-center gap-2">
                                <button
                                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                                    disabled={pagination.currentPage === 1}
                                >
                                    Previous
                                </button>

                                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
                                    (page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={page === pagination.currentPage ? 'font-bold' : ''}
                                        >
                                            {page}
                                        </button>
                                    )
                                )}

                                <button
                                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                                    disabled={pagination.currentPage === pagination.totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}

                {!isLoading && teachers.length === 0 && (
                    <div className="text-center py-10">No teachers found</div>
                )}
            </div>
        </div>
    );
};


export default Lesson;
