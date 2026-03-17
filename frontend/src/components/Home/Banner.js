"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Banner = ({ data, festival }) => {
    const slides = Array.isArray(data) ? data : [data];
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    // Auto-slide functionality
    useEffect(() => {
        if (!isPlaying || slides.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [isPlaying, slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const handleMouseEnter = () => setIsPlaying(false);
    const handleMouseLeave = () => setIsPlaying(true);

    const currentSlideData = slides[currentSlide];

    return (
        <section 
            className="banner-section"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Background Images */}
            <div className="bg-section">
                {slides.map((slide, index) => (
                    <Image 
                        key={index}
                        src={slide.image} 
                        alt={slide.title} 
                        fill 
                        className={`object-cover transition-opacity duration-500 ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                ))}
            </div>

            {/* Navigation Arrows (only show if more than 1 slide) */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm cursor-pointer"
                        aria-label="Previous slide"
                        style={{ pointerEvents: 'auto' }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm cursor-pointer"
                        aria-label="Next slide"
                        style={{ pointerEvents: 'auto' }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </>
            )}

            {/* Content */}
            { currentSlideData.displayInfo && currentSlideData.displayInfo === true && (
                <div className="container h-full flex flex-col justify-center gap-[13px] relative z-10">
                    <p className="text-white max-w-[800px] transition-all duration-500">
                        {currentSlideData.subtitle}
                    </p>
                    <h1 className="text-white max-w-[800px] transition-all duration-500">
                        {festival.title}
                    </h1>
                    <div className="flex items-center gap-2">
                        {festival.indonesian_date && festival.location && (
                            <Link href={currentSlideData.url} target="_blank">
                            <p className="text-white md:text-[24px] sm:text-[16px] text-[14px] font-bold">
                                {`${festival.indonesian_date} • ${festival.location}`}
                                </p>
                            </Link>
                        )}
                        {currentSlideData.url && currentSlideData.url !== "" && (
                        <Link href={currentSlideData.url} target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26" fill="none">
                                <path d="M18.4167 7.58337L7.58337 18.4167M18.4167 7.58337H8.66671M18.4167 7.58337V17.3334" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        )}
                    </div>
                </div>
            )}

            {/* Slide Indicators (only show if more than 1 slide) */}
            {slides.length > 1 && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                                index === currentSlide 
                                    ? 'bg-white scale-125' 
                                    : 'bg-white/50 hover:bg-white/75'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                            style={{ pointerEvents: 'auto' }}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default Banner;