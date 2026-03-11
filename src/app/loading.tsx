export default function Loading() {
    return (
        <div className="min-h-screen">
            {/* Hero Skeleton */}
            <div className="h-screen skeleton" />

            {/* Stats Skeleton */}
            <div className="py-16 bg-slate-50">
                <div className="container-custom">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 skeleton rounded-2xl" />
                                <div className="h-8 w-20 mx-auto mb-2 skeleton" />
                                <div className="h-4 w-24 mx-auto skeleton" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* News Skeleton */}
            <div className="py-20 bg-slate-50">
                <div className="container-custom">
                    <div className="h-8 w-48 mx-auto mb-2 skeleton" />
                    <div className="h-4 w-72 mx-auto mb-12 skeleton" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden">
                                <div className="h-52 skeleton" />
                                <div className="p-5 space-y-3">
                                    <div className="h-5 skeleton" />
                                    <div className="h-4 w-3/4 skeleton" />
                                    <div className="h-4 w-1/2 skeleton" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
