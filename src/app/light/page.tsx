'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const router = useRouter();

    useEffect(() => {
        // Since we are hosting locally, we bypass the login and go straight to dashboard
        router.push("/light/dashboard");
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-pulse text-gray-400 font-medium">
                Redirecting to dashboard...
            </div>
        </div>
    );
}
