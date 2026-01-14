import { Skeleton } from "../../../components/ui/skeleton";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";

export const ProfileSkeleton = () => {
    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-10 w-48" />
                    <div className="flex gap-3">
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-40" />
                    </div>
                </div>

                <Card className="overflow-hidden border-none shadow-sm bg-white">
                    <Skeleton className="h-24 w-full" />
                    <div className="px-8 pb-6">
                        <div className="relative -top-12 flex flex-col items-center sm:flex-row sm:items-end sm:gap-6">
                            <Skeleton className="h-24 w-24 rounded-full border-4 border-white" />
                            <div className="mt-4 sm:mt-0 space-y-2 pb-2">
                                <Skeleton className="h-8 w-48" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="border-b bg-slate-50/50 py-4">
                        <Skeleton className="h-6 w-40" />
                    </CardHeader>
                    <CardContent className="grid gap-6 p-8 md:grid-cols-2">
                        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        ))}
                        <div className="space-y-2 md:col-span-2">
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-24 w-full" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
