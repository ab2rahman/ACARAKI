"use client";

import { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate = "2026-06-06T00:00:00" }) => {
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const target = new Date(targetDate).getTime();

        const calculateCountdown = () => {
            const now = new Date().getTime();
            const difference = target - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setCountdown({ days, hours, minutes, seconds });
            }
        };

        calculateCountdown();
        const interval = setInterval(calculateCountdown, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className="flex items-center justify-center gap-6 md:gap-8">
            {[
                { label: 'Hari', value: countdown.days },
                { label: 'Jam', value: countdown.hours },
                { label: 'Menit', value: countdown.minutes },
                { label: 'Detik', value: countdown.seconds },
            ].map((item) => (
                <div key={item.label} className="flex flex-col items-center">
                    <div className="bg-black/50 rounded-lg px-6 py-4 min-w-[90px] md:min-w-[110px] shadow-lg" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                        <span className="text-white text-4xl md:text-5xl font-bold font-display">
                            {String(item.value).padStart(2, '0')}
                        </span>
                    </div>
                    <span className="text-white text-base md:text-lg mt-2 font-museo font-bold tracking-wide" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>{item.label}</span>
                </div>
            ))}
        </div>
    );
};

export default CountdownTimer;
