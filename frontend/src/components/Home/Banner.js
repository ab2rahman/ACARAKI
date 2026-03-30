"use client";

import Image from "next/image";
import CountdownTimer from "./CountdownTimer";

const Banner = ({ data, festival }) => {
    const slides = Array.isArray(data) ? data : [data];
    // Use third slide (index 2), fallback to first if not available
    const slideData = slides[2] || slides[0];

    if (!slideData) return null;

    const ornamentImages = [
        "/imgs/Ornaments-02.png",
        "/imgs/Ornaments-03.png",
        "/imgs/Ornaments-04.png",
        "/imgs/Ornaments-11.png",
        "/imgs/Ornaments-12.png",
    ];

    return (
        <section className="banner-section h-[90vh] overflow-hidden relative bg-gradient-to-b from-[#E8DCC8] to-[#d9c7a5]">
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#5C4033]/20 via-transparent to-[#3C2A20]/30" />

                {/* Decorative Frame - SVG */}
                <div className="absolute inset-4 md:inset-8 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Corner ornaments */}
                        <g opacity="0.4">
                            {/* Top Left */}
                            <path d="M0 0 Q100 0, 150 50 Q170 75, 180 100" stroke="#D4A84B" strokeWidth="3" fill="none" />
                            <path d="M0 0 Q80 0, 130 45 Q150 65, 160 90" stroke="#5C4033" strokeWidth="2" fill="none" />
                            <ellipse cx="40" cy="30" rx="20" ry="10" fill="#4A7C59" opacity="0.5" transform="rotate(-30 40 30)" />
                            <circle cx="20" cy="20" r="5" fill="#D4A84B" />
                            <circle cx="60" cy="15" r="3" fill="#5C4033" />

                            {/* Top Right */}
                            <path d="M1200 0 Q1100 0, 1050 50 Q1030 75, 1020 100" stroke="#D4A84B" strokeWidth="3" fill="none" />
                            <path d="M1200 0 Q1120 0, 1070 45 Q1050 65, 1040 90" stroke="#5C4033" strokeWidth="2" fill="none" />
                            <ellipse cx="1160" cy="30" rx="20" ry="10" fill="#4A7C59" opacity="0.5" transform="rotate(30 1160 30)" />
                            <circle cx="1180" cy="20" r="5" fill="#D4A84B" />
                            <circle cx="1140" cy="15" r="3" fill="#5C4033" />

                            {/* Bottom Left */}
                            <path d="M0 800 Q100 800, 150 750 Q170 725, 180 700" stroke="#D4A84B" strokeWidth="3" fill="none" />
                            <path d="M0 800 Q80 800, 130 755 Q150 735, 160 710" stroke="#5C4033" strokeWidth="2" fill="none" />
                            <ellipse cx="40" cy="770" rx="20" ry="10" fill="#4A7C59" opacity="0.5" transform="rotate(30 40 770)" />
                            <circle cx="20" cy="780" r="5" fill="#D4A84B" />
                            <circle cx="60" cy="785" r="3" fill="#5C4033" />

                            {/* Bottom Right */}
                            <path d="M1200 800 Q1100 800, 1050 750 Q1030 725, 1020 700" stroke="#D4A84B" strokeWidth="3" fill="none" />
                            <path d="M1200 800 Q1120 800, 1070 755 Q1050 735, 1040 710" stroke="#5C4033" strokeWidth="2" fill="none" />
                            <ellipse cx="1160" cy="770" rx="20" ry="10" fill="#4A7C59" opacity="0.5" transform="rotate(-30 1160 770)" />
                            <circle cx="1180" cy="780" r="5" fill="#D4A84B" />
                            <circle cx="1140" cy="785" r="3" fill="#5C4033" />
                        </g>

                        {/* Top decorative pattern */}
                        <g opacity="0.3">
                            <line x1="250" y1="8" x2="950" y2="8" stroke="#D4A84B" strokeWidth="2" />
                            <circle cx="300" cy="8" r="5" fill="#D4A84B" />
                            <circle cx="400" cy="8" r="4" fill="#5C4033" />
                            <circle cx="500" cy="8" r="6" fill="#D4A84B" />
                            <circle cx="600" cy="8" r="4" fill="#5C4033" />
                            <circle cx="700" cy="8" r="5" fill="#D4A84B" />
                            <circle cx="800" cy="8" r="4" fill="#5C4033" />
                            <circle cx="900" cy="8" r="5" fill="#D4A84B" />
                        </g>

                        {/* Bottom decorative pattern */}
                        <g opacity="0.3">
                            <line x1="250" y1="792" x2="950" y2="792" stroke="#D4A84B" strokeWidth="2" />
                            <circle cx="300" cy="792" r="5" fill="#D4A84B" />
                            <circle cx="400" cy="792" r="4" fill="#5C4033" />
                            <circle cx="500" cy="792" r="6" fill="#D4A84B" />
                            <circle cx="600" cy="792" r="4" fill="#5C4033" />
                            <circle cx="700" cy="792" r="5" fill="#D4A84B" />
                            <circle cx="800" cy="792" r="4" fill="#5C4033" />
                            <circle cx="900" cy="792" r="5" fill="#D4A84B" />
                        </g>
                    </svg>
                </div>

                {/* Floating ornament images */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {ornamentImages.map((ornament, index) => (
                        <div
                            key={index}
                            className="absolute opacity-20"
                            style={{
                                left: `${8 + (index * 18) % 80}%`,
                                top: `${10 + (index * 15) % 80}%`,
                                transform: `rotate(${(index % 6) * 30 - 90}deg) scale(${0.8 + (index % 3) * 0.3})`,
                            }}
                        >
                            <Image
                                src={ornament}
                                alt={`Ornament ${index}`}
                                width={120 + (index % 4) * 40}
                                height={120 + (index % 4) * 40}
                                className="object-contain drop-shadow-lg"
                            />
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className="container h-full flex flex-col justify-center items-center gap-6 relative z-10 text-center">
                    <div className="bg-gradient-to-br from-[#5C4033]/80 to-[#3C2A20]/90 backdrop-blur-sm rounded-[20px] py-[20px] px-[30px] border border-[#D4A84B]/30 shadow-2xl">
                        {/* Decorative line above */}
                        <div className="flex justify-center mb-4">
                            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#D4A84B] to-transparent"></div>
                        </div>

                        <p className="text-[#E8DCC8] max-w-[800px] font-museo text-lg md:text-xl mb-4 font-medium">
                            Festival jamu terbesar di Indonesia<br />yang menyatukan tradisi dan generasi masa kini.
                        </p>
                        <h1 className="text-white max-w-[800px] font-display text-4xl md:text-6xl mb-4 tracking-widest" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}>
                            BPOM x acaraki Jamu Festival
                        </h1>
                        <div className="flex items-center justify-center gap-2">
                            <p className="text-[#D4A84B] md:text-[24px] sm:text-[16px] text-[14px] font-bold font-museo">
                                Sabtu-Minggu, 6-7 Juni 2026 • Hutan Kota GBK
                            </p>
                        </div>

                        {/* Decorative line below */}
                        <div className="flex justify-center mt-4">
                            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#D4A84B] to-transparent"></div>
                        </div>
                    </div>

                    {/* Countdown Timer - Separate Component */}
                    <CountdownTimer />
                </div>
            </section>
    );
};

export default Banner;
