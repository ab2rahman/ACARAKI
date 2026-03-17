"use client";

import { useState, useEffect, useRef } from 'react';

const Statistik = ({data}) => {
    const [counters, setCounters] = useState(data.statistik.map(() => 0));
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    data.statistik.forEach((item, index) => {
                        const duration = 2000; // 2 seconds
                        const steps = 60; // 60 steps for smooth animation
                        const increment = item.number / steps;
                        let currentStep = 0;

                        const interval = setInterval(() => {
                            currentStep++;
                            setCounters(prev => {
                                const newCounters = [...prev];
                                newCounters[index] = Math.min(
                                    Math.round(increment * currentStep),
                                    item.number
                                );
                                return newCounters;
                            });

                            if (currentStep >= steps) {
                                clearInterval(interval);
                            }
                        }, duration / steps);
                    });
                }
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [data.statistik, hasAnimated]);

    return (
        <section className="statistik-section" ref={sectionRef}>
            <div className="container flex items-center justify-around sm:gap-[60px] gap-[20px]">
                {data.statistik.map((item, index) => (
                    <div key={index} className="flex items-center flex-col gap-1">
                        <h3 className="text-white font-bold">{item.plus ? "+" : ""}<span className="counter">{counters[index]}</span></h3>
                        <p className="text-white lg:text-[24px] sm:text-[12px] text-[10px] font-medium text-center">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Statistik;