export const PaymentsSkeleton = () => {
    return (
        <div className="p-4 md:p-8 space-y-8 animate-pulse">
            <div className="space-y-2">
                <div className="h-8 w-48 bg-slate-200 rounded-lg" />
                <div className="h-4 w-64 bg-slate-100 rounded-md" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-6"
                    >
                        <div className="space-y-3">
                            <div className="h-4 w-20 bg-slate-200 rounded" />
                            <div className="h-5 w-5 bg-slate-100 rounded-full" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-8 w-32 bg-slate-200 rounded-lg" />
                            <div className="h-3 w-16 bg-slate-100 rounded" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 space-y-6">
                <div className="space-y-2">
                    <div className="h-5 w-32 bg-slate-200 rounded" />
                    <div className="h-3 w-48 bg-slate-100 rounded" />
                </div>

                <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="h-8 w-24 bg-slate-100 rounded-lg"
                        />
                    ))}
                </div>

                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl" />
                    <div className="space-y-2 flex flex-col items-center">
                        <div className="h-4 w-32 bg-slate-100 rounded" />
                        <div className="h-3 w-24 bg-slate-50 rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
};
