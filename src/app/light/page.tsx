'use client';

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLoginPage() {
    const [pin, setPin] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();

    const handlePinChange = (index: number, value: string) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !pin[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = useCallback(async () => {
        const fullPin = pin.join("");
        if (fullPin.length !== 6) return;

        setIsLoading(true);
        setError(false);

        // Simple verification for now. In a real app, this would be an API call.
        if (fullPin === "241994") {
            // Set a cookie for the session
            document.cookie = "admin_session=true; path=/; max-age=86400"; // 24 hours
            router.push("/light/dashboard");
        } else {
            setError(true);
            setPin(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();
        }
        setIsLoading(false);
    }, [pin, router]);

    useEffect(() => {
        if (pin.every(digit => digit !== "")) {
            handleSubmit();
        }
    }, [pin, handleSubmit]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
            <div className="w-full max-w-md p-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl font-bold mb-2 tracking-tight">Access Control</h1>
                    <p className="text-gray-400 mb-10">Enter your 6-digit administration PIN</p>

                    <div className="flex justify-center gap-2 mb-8">
                        {pin.map((digit, i) => (
                            <input
                                key={i}
                                ref={(el) => { inputRefs.current[i] = el; }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handlePinChange(i, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(i, e)}
                                className={`w-12 h-16 text-center text-3xl font-bold bg-[#1a1a1a] border-2 rounded-xl transition-all duration-200 outline-none
                                    ${error ? 'border-red-500 text-red-500' : 'border-gray-800 focus:border-white focus:ring-4 focus:ring-white/10'}
                                `}
                            />
                        ))}
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-red-500 mb-6 text-sm font-medium"
                            >
                                Invalid PIN. Please try again.
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <p className="text-xs text-gray-500 mt-20 uppercase tracking-widest">
                        Balla Light Portfolio CMS
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
