"use client";

import Image from "next/image";

const Banner = ({ data, festival }) => {
    const slides = Array.isArray(data) ? data : [data];
    // Use third slide (index 2), fallback to first if not available
    const slideData = slides[2] || slides[0];

    if (!slideData) return null;

    return (
        <section className="banner-section h-[90vh] overflow-hidden">
                {/* Background Image */}
                <div className="bg-section">
                    <Image
                        src={slideData.image}
                        alt={slideData.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                        style={{ objectPosition: 'center bottom' }}
                    />
                </div>

                {/* Content */}
                {slideData.displayInfo && slideData.displayInfo === true && (
                    <div className="container h-full flex flex-col justify-center items-center gap-[13px] relative z-10 text-center">
                        <p className="text-white max-w-[800px] font-museo">
                            {slideData.subtitle}
                        </p>
                        <h1 className="text-white max-w-[800px] font-display">
                            {festival?.title || slideData.title}
                        </h1>
                        <div className="flex items-center gap-2">
                            {festival?.indonesian_date && festival?.location && (
                                <p className="text-white md:text-[24px] sm:text-[16px] text-[14px] font-bold font-museo">
                                    {`${festival?.indonesian_date || ''} • ${festival?.location || ''}`}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </section>
    );
};

export default Banner;
