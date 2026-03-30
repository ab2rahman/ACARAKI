"use client";

import Image from "next/image";
import CountdownTimer from "./CountdownTimer";

const HeroOrnaments = () => {
    return (
        <section className="relative min-h-screen bg-gradient-to-b from-[#E8DCC8] to-[#d9c7a5] py-12 md:py-16 overflow-hidden">
            {/* Decorative Frame Border - Full */}
            <div className="absolute inset-4 md:inset-8 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Outer border */}
                    <rect x="10" y="10" width="1180" height="780" fill="none" stroke="#5C4033" strokeWidth="2" opacity="0.3" />
                    <rect x="15" y="15" width="1170" height="770" fill="none" stroke="#D4A84B" strokeWidth="1" opacity="0.4" />

                    {/* Top Left Corner - Elaborate */}
                    <g opacity="0.35">
                        {/* Main scroll */}
                        <path d="M0 0 Q80 0, 120 40 Q140 60, 150 80" stroke="#5C4033" strokeWidth="2.5" fill="none" />
                        <path d="M0 0 Q60 0, 100 35 Q120 55, 130 75" stroke="#D4A84B" strokeWidth="1.5" fill="none" />
                        {/* Inner scroll */}
                        <path d="M5 5 Q70 5, 105 40 Q120 55, 125 70" stroke="#5C4033" strokeWidth="1" fill="none" />
                        {/* Decorative leaves */}
                        <ellipse cx="35" cy="25" rx="18" ry="8" fill="#4A7C59" transform="rotate(-25 35 25)" />
                        <ellipse cx="55" cy="20" rx="15" ry="7" fill="#7BA37B" transform="rotate(-35 55 20)" />
                        <ellipse cx="25" cy="45" rx="12" ry="6" fill="#4A7C59" transform="rotate(-15 25 45)" />
                        {/* Dots */}
                        <circle cx="15" cy="15" r="4" fill="#D4A84B" />
                        <circle cx="40" cy="10" r="3" fill="#5C4033" />
                        <circle cx="70" cy="18" r="2.5" fill="#D4A84B" />
                        <circle cx="95" cy="30" r="3" fill="#5C4033" />
                        {/* Diamond accents */}
                        <rect x="20" y="20" width="10" height="10" fill="none" stroke="#D4A84B" strokeWidth="1" transform="rotate(45 25 25)" />
                    </g>

                    {/* Top Right Corner - Mirror */}
                    <g opacity="0.35">
                        <path d="M1200 0 Q1120 0, 1080 40 Q1060 60, 1050 80" stroke="#5C4033" strokeWidth="2.5" fill="none" />
                        <path d="M1200 0 Q1140 0, 1100 35 Q1080 55, 1070 75" stroke="#D4A84B" strokeWidth="1.5" fill="none" />
                        <path d="M1195 5 Q1130 5, 1095 40 Q1080 55, 1075 70" stroke="#5C4033" strokeWidth="1" fill="none" />
                        <ellipse cx="1165" cy="25" rx="18" ry="8" fill="#4A7C59" transform="rotate(25 1165 25)" />
                        <ellipse cx="1145" cy="20" rx="15" ry="7" fill="#7BA37B" transform="rotate(35 1145 20)" />
                        <ellipse cx="1175" cy="45" rx="12" ry="6" fill="#4A7C59" transform="rotate(15 1175 45)" />
                        <circle cx="1185" cy="15" r="4" fill="#D4A84B" />
                        <circle cx="1160" cy="10" r="3" fill="#5C4033" />
                        <circle cx="1130" cy="18" r="2.5" fill="#D4A84B" />
                        <circle cx="1105" cy="30" r="3" fill="#5C4033" />
                        <rect x="1170" y="20" width="10" height="10" fill="none" stroke="#D4A84B" strokeWidth="1" transform="rotate(-45 1175 25)" />
                    </g>

                    {/* Bottom Left Corner */}
                    <g opacity="0.35">
                        <path d="M0 800 Q80 800, 120 760 Q140 740, 150 720" stroke="#5C4033" strokeWidth="2.5" fill="none" />
                        <path d="M0 800 Q60 800, 100 765 Q120 745, 130 725" stroke="#D4A84B" strokeWidth="1.5" fill="none" />
                        <path d="M5 795 Q70 795, 105 760 Q120 745, 125 730" stroke="#5C4033" strokeWidth="1" fill="none" />
                        <ellipse cx="35" cy="775" rx="18" ry="8" fill="#4A7C59" transform="rotate(25 35 775)" />
                        <ellipse cx="55" cy="780" rx="15" ry="7" fill="#7BA37B" transform="rotate(35 55 780)" />
                        <ellipse cx="25" cy="755" rx="12" ry="6" fill="#4A7C59" transform="rotate(15 25 755)" />
                        <circle cx="15" cy="785" r="4" fill="#D4A84B" />
                        <circle cx="40" cy="790" r="3" fill="#5C4033" />
                        <circle cx="70" cy="782" r="2.5" fill="#D4A84B" />
                        <circle cx="95" cy="770" r="3" fill="#5C4033" />
                        <rect x="20" y="770" width="10" height="10" fill="none" stroke="#D4A84B" strokeWidth="1" transform="rotate(-45 25 775)" />
                    </g>

                    {/* Bottom Right Corner */}
                    <g opacity="0.35">
                        <path d="M1200 800 Q1120 800, 1080 760 Q1060 740, 1050 720" stroke="#5C4033" strokeWidth="2.5" fill="none" />
                        <path d="M1200 800 Q1140 800, 1100 765 Q1080 745, 1070 725" stroke="#D4A84B" strokeWidth="1.5" fill="none" />
                        <path d="M1195 795 Q1130 795, 1095 760 Q1080 745, 1075 730" stroke="#5C4033" strokeWidth="1" fill="none" />
                        <ellipse cx="1165" cy="775" rx="18" ry="8" fill="#4A7C59" transform="rotate(-25 1165 775)" />
                        <ellipse cx="1145" cy="780" rx="15" ry="7" fill="#7BA37B" transform="rotate(-35 1145 780)" />
                        <ellipse cx="1175" cy="755" rx="12" ry="6" fill="#4A7C59" transform="rotate(-15 1175 755)" />
                        <circle cx="1185" cy="785" r="4" fill="#D4A84B" />
                        <circle cx="1160" cy="790" r="3" fill="#5C4033" />
                        <circle cx="1130" cy="782" r="2.5" fill="#D4A84B" />
                        <circle cx="1105" cy="770" r="3" fill="#5C4033" />
                        <rect x="1170" y="770" width="10" height="10" fill="none" stroke="#D4A84B" strokeWidth="1" transform="rotate(45 1175 775)" />
                    </g>

                    {/* Top decorative pattern */}
                    <g opacity="0.25">
                        <line x1="200" y1="5" x2="1000" y2="5" stroke="#D4A84B" strokeWidth="1.5" />
                        <circle cx="250" cy="8" r="4" fill="#5C4033" />
                        <circle cx="300" cy="5" r="3" fill="#D4A84B" />
                        <circle cx="350" cy="8" r="4" fill="#5C4033" />
                        <circle cx="400" cy="5" r="2.5" fill="#D4A84B" />
                        <circle cx="450" cy="8" r="4" fill="#5C4033" />
                        <circle cx="500" cy="5" r="3" fill="#D4A84B" />
                        <circle cx="550" cy="8" r="5" fill="#5C4033" />
                        <circle cx="600" cy="5" r="3" fill="#D4A84B" />
                        <circle cx="650" cy="8" r="4" fill="#5C4033" />
                        <circle cx="700" cy="5" r="2.5" fill="#D4A84B" />
                        <circle cx="750" cy="8" r="4" fill="#5C4033" />
                        <circle cx="800" cy="5" r="3" fill="#D4A84B" />
                        <circle cx="850" cy="8" r="4" fill="#5C4033" />
                        <circle cx="900" cy="5" r="3" fill="#D4A84B" />
                        <circle cx="950" cy="8" r="4" fill="#5C4033" />
                    </g>

                    {/* Bottom decorative pattern */}
                    <g opacity="0.25">
                        <line x1="200" y1="795" x2="1000" y2="795" stroke="#D4A84B" strokeWidth="1.5" />
                        <circle cx="250" cy="792" r="4" fill="#5C4033" />
                        <circle cx="300" cy="795" r="3" fill="#D4A84B" />
                        <circle cx="350" cy="792" r="4" fill="#5C4033" />
                        <circle cx="400" cy="795" r="2.5" fill="#D4A84B" />
                        <circle cx="450" cy="792" r="4" fill="#5C4033" />
                        <circle cx="500" cy="795" r="3" fill="#D4A84B" />
                        <circle cx="550" cy="792" r="5" fill="#5C4033" />
                        <circle cx="600" cy="795" r="3" fill="#D4A84B" />
                        <circle cx="650" cy="792" r="4" fill="#5C4033" />
                        <circle cx="700" cy="795" r="2.5" fill="#D4A84B" />
                        <circle cx="750" cy="792" r="4" fill="#5C4033" />
                        <circle cx="800" cy="795" r="3" fill="#D4A84B" />
                        <circle cx="850" cy="792" r="4" fill="#5C4033" />
                        <circle cx="900" cy="795" r="3" fill="#D4A84B" />
                        <circle cx="950" cy="792" r="4" fill="#5C4033" />
                    </g>

                    {/* Side patterns - Left */}
                    <g opacity="0.2">
                        <circle cx="8" cy="200" r="3" fill="#D4A84B" />
                        <circle cx="5" cy="250" r="4" fill="#5C4033" />
                        <circle cx="8" cy="300" r="3" fill="#D4A84B" />
                        <circle cx="5" cy="350" r="4" fill="#5C4033" />
                        <circle cx="8" cy="400" r="3" fill="#D4A84B" />
                        <circle cx="5" cy="450" r="4" fill="#5C4033" />
                        <circle cx="8" cy="500" r="3" fill="#D4A84B" />
                        <circle cx="5" cy="550" r="4" fill="#5C4033" />
                        <circle cx="8" cy="600" r="3" fill="#D4A84B" />
                    </g>

                    {/* Side patterns - Right */}
                    <g opacity="0.2">
                        <circle cx="1192" cy="200" r="3" fill="#D4A84B" />
                        <circle cx="1195" cy="250" r="4" fill="#5C4033" />
                        <circle cx="1192" cy="300" r="3" fill="#D4A84B" />
                        <circle cx="1195" cy="350" r="4" fill="#5C4033" />
                        <circle cx="1192" cy="400" r="3" fill="#D4A84B" />
                        <circle cx="1195" cy="450" r="4" fill="#5C4033" />
                        <circle cx="1192" cy="500" r="3" fill="#D4A84B" />
                        <circle cx="1195" cy="550" r="4" fill="#5C4033" />
                        <circle cx="1192" cy="600" r="3" fill="#D4A84B" />
                    </g>
                </svg>
            </div>

            {/* Top Left Ornament - Mirrored */}
            <div className="absolute -top-16 left-0 w-48 h-48 md:w-64 md:h-64 pointer-events-none opacity-60 scale-x-[-1]">
                <Image
                    src="/imgs/Ornaments-17.png"
                    alt="Top Left Ornament"
                    fill
                    className="object-contain"
                />
            </div>

            {/* Top Right Ornament */}
            <div className="absolute -top-20 right-0 w-64 h-64 md:w-80 md:h-80 pointer-events-none opacity-70">
                <Image
                    src="/imgs/Ornaments-17.png"
                    alt="Top Right Ornament"
                    fill
                    className="object-contain"
                />
            </div>

            {/* Floating Ornaments - closer together, no overlap */}
            <div className="absolute top-12 left-[28%] w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-50">
                <Image src="/imgs/Ornaments-03.png" alt="Ornament" fill className="object-contain" />
            </div>
            {/* <div className="absolute top-36 left-[42%] w-20 h-20 md:w-28 md:h-28 pointer-events-none opacity-40">
                <Image src="/imgs/Ornaments-04.png" alt="Ornament" fill className="object-contain" />
            </div> */}
            <div className="absolute top-16 left-[50%] -translate-x-1/2 w-32 h-32 md:w-40 md:h-40 pointer-events-none opacity-45">
                <Image src="/imgs/Ornaments-05.png" alt="Ornament" fill className="object-contain" />
            </div>
            {/* <div className="absolute top-40 right-[42%] w-20 h-20 md:w-28 md:h-28 pointer-events-none opacity-35">
                <Image src="/imgs/Ornaments-03.png" alt="Ornament" fill className="object-contain" />
            </div> */}
            <div className="absolute top-20 right-[28%] w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-40">
                <Image src="/imgs/Ornaments-04.png" alt="Ornament" fill className="object-contain" />
            </div>

            {/* Bottom Left Ornament */}
            <div className="absolute bottom-0 -left-20 w-96 h-96 md:-left-32 md:w-[500px] md:h-[500px] pointer-events-none opacity-90">
                <Image
                    src="/imgs/Ornaments-19.png"
                    alt="Bottom Left Ornament"
                    fill
                    className="object-contain"
                />
            </div>

            {/* Bottom Right Ornament - Mirrored */}
            <div className="absolute bottom-0 -right-16 w-64 h-64 md:-right-24 md:w-80 md:h-80 pointer-events-none opacity-70 scale-x-[-1]">
                <Image
                    src="/imgs/Ornaments-19.png"
                    alt="Bottom Right Ornament"
                    fill
                    className="object-contain"
                />
            </div>

            {/* Main Content */}
            <div className="container h-full flex flex-col justify-center items-center gap-6 relative z-10 text-center pt-32 pb-20 md:pt-40">
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

                {/* Countdown Timer */}
                <CountdownTimer />
            </div>
        </section>
    );
};

export default HeroOrnaments;
