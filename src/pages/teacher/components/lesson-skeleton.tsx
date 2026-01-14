import { Skeleton } from "../../../components/ui/skeleton";
import { Card } from "../../../components/ui/card";

export const LessonsSkeleton = () => {
    return (
        <div className="min-h-screen p-4 space-y-6 md:p-8">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-10 w-32" />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <Card
                        key={i}
                        className="flex items-center justify-between p-6 bg-white border-none shadow-sm"
                    >
                        <div className="space-y-2">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-8 w-12" />
                        </div>
                        <Skeleton className="h-10 w-10 rounded-lg" />
                    </Card>
                ))}
            </div>

            <Card className="flex flex-col items-center justify-center min-h-100 p-8 bg-white border-none shadow-sm">
                <Skeleton className="h-20 w-20 rounded-full mb-4" />
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-60" />
            </Card>
        </div>
    );
};
