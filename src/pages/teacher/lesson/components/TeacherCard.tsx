// src/components/TeacherCard.tsx
import React from 'react';
import { Star, ChevronRight, User, Award } from 'lucide-react';
import { type Teacher, TeacherSpecification } from '../../../auth/types';
import { useNavigate } from 'react-router-dom';

interface TeacherCardProps {
    teacher: Teacher;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
    const navigate = useNavigate();

    const getInitials = (name: string): string => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const getAvatarColor = (name: string): string => {
        const colors = [
            'bg-purple-500',
            'bg-blue-500',
            'bg-green-500',
            'bg-orange-500',
            'bg-pink-500',
            'bg-indigo-500',
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('uz-UZ').format(price);
    };

    const getSpecificationLabel = (spec?: TeacherSpecification): string => {
        const labels: Record<TeacherSpecification, string> = {
            [TeacherSpecification.IELTS]: 'IELTS',
            [TeacherSpecification.SPEAKING]: 'Speaking',
            [TeacherSpecification.GRAMMAR]: 'Grammar',
            [TeacherSpecification.BUSINESS]: 'Business',
            [TeacherSpecification.KIDS]: 'Kids',
        };
        return spec ? labels[spec] : 'General';
    };

    const handleViewLessons = () => {
        navigate(`/app/admin/teacher/${teacher.id}/lessons`);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 p-6 border border-gray-100">
            {/* Teacher Header */}
            <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                    {teacher.imageUrl ? (
                        <img
                            src={teacher.imageUrl}
                            alt={teacher.fullName}
                            className="w-16 h-16 rounded-full object-cover"
                        />
                    ) : (
                        <div
                            className={`w-16 h-16 rounded-full ${getAvatarColor(
                                teacher.fullName
                            )} flex items-center justify-center text-white text-xl font-bold`}
                        >
                            {getInitials(teacher.fullName)}
                        </div>
                    )}
                    {teacher.isActive && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                    {!teacher.isActive && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 rounded-full border-2 border-white"></div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <h3
                        className="font-semibold text-gray-900 mb-1 truncate hover:text-blue-600 cursor-pointer"
                        onClick={handleViewLessons}
                    >
                        {teacher.fullName}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <User className="w-4 h-4 flex-shrink-0" />
                        <span>{teacher.level || 'Not specified'}</span>
                    </div>
                    {teacher.specification && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Award className="w-4 h-4 flex-shrink-0" />
                            <span>{getSpecificationLabel(teacher.specification)}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Teacher Stats */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold text-gray-900">{teacher.rating}</span>
                    {teacher.lessonsCount !== undefined && (
                        <span className="text-xs text-gray-500">({teacher.lessonsCount} lessons)</span>
                    )}
                </div>
                {teacher.hourPrice && (
                    <span className="text-sm font-semibold text-gray-900">
                        {formatPrice(teacher.hourPrice)} so'm/h
                    </span>
                )}
            </div>

            {/* Contact Info */}
            <div className="space-y-1 mb-3 text-xs text-gray-600">
                {teacher.email && <p className="truncate">📧 {teacher.email}</p>}
                {teacher.phoneNumber && <p>📱 {teacher.phoneNumber}</p>}
            </div>

            {/* Experience */}
            {teacher.experience && (
                <p className="text-sm text-gray-600 mb-4">{teacher.experience} experience</p>
            )}

            {/* Description */}
            {teacher.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{teacher.description}</p>
            )}

            {/* View Lessons Button */}
            <button
                onClick={handleViewLessons}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all text-blue-700 font-medium"
            >
                View Lessons
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
};

export default TeacherCard;