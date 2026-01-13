// src/components/LessonCard.tsx
import React from 'react';
import { Calendar, Clock, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { type Lesson, LessonStatus } from '../../../auth/types';

interface LessonCardProps {
    lesson: Lesson;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
    const getStatusColor = (status: LessonStatus): string => {
        const colors = {
            [LessonStatus.AVAILABLE]: 'bg-blue-100 text-blue-800 border-blue-200',
            [LessonStatus.BOOKED]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            [LessonStatus.COMPLETED]: 'bg-green-100 text-green-800 border-green-200',
            [LessonStatus.CANCELLED]: 'bg-red-100 text-red-800 border-red-200',
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const getStatusIcon = (status: LessonStatus) => {
        switch (status) {
            case LessonStatus.COMPLETED:
                return <CheckCircle className="w-4 h-4" />;
            case LessonStatus.CANCELLED:
                return <XCircle className="w-4 h-4" />;
            default:
                return null;
        }
    };

    const formatDateTime = (dateString: string): string => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('uz-UZ', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    const formatTime = (dateString: string): string => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('uz-UZ', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('uz-UZ').format(price);
    };

    const getDuration = (): string => {
        const start = new Date(lesson.startTime);
        const end = new Date(lesson.endTime);
        const diffMs = end.getTime() - start.getTime();
        const diffMins = Math.round(diffMs / 60000);
        return `${diffMins} min`;
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{lesson.name}</h3>
                    {lesson.student && (
                        <p className="text-sm text-gray-600">
                            Student: {lesson.student.firstName} {lesson.student.lastName}
                        </p>
                    )}
                </div>
                <span
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 border flex items-center gap-1 ${getStatusColor(
                        lesson.status
                    )}`}
                >
                    {getStatusIcon(lesson.status)}
                    {lesson.status}
                </span>
            </div>

            {/* Date & Time */}
            <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span>{formatDateTime(lesson.startTime)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span>
                        {formatTime(lesson.startTime)} - {formatTime(lesson.endTime)} ({getDuration()})
                    </span>
                </div>
            </div>

            {/* Google Meet Link */}
            {lesson.googleMeetUrl && (
                <div className="mb-4">
                    <a
                        href={lesson.googleMeetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 text-sm rounded-lg hover:bg-purple-100 transition-colors"
                    >
                        <span>📹</span>
                        <span>Join Google Meet</span>
                    </a>
                </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-semibold text-gray-900">
                        {formatPrice(lesson.price)} so'm
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {lesson.isPaid ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                            Paid
                        </span>
                    ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                            Unpaid
                        </span>
                    )}
                </div>
            </div>

            {/* Booked/Completed Info */}
            {lesson.bookedAt && lesson.status === LessonStatus.BOOKED && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                        Booked: {formatDateTime(lesson.bookedAt)}
                    </p>
                </div>
            )}
            {lesson.completedAt && lesson.status === LessonStatus.COMPLETED && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                        Completed: {formatDateTime(lesson.completedAt)}
                    </p>
                </div>
            )}
        </div>
    );
};

export default LessonCard;