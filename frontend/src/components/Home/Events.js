"use client";
import Link from 'next/link';
import Image from 'next/image';
import Cloud from '../Cloud';

const Events = ({ data }) => {
    return (
        <section id="kompetisi" className="events-section relative min-h-[80vh] py-20">
            <Cloud />
            <div className="container relative z-10 flex flex-col items-center">
                {/* Title - matching Tickets section style */}
                <h2 className="font-display text-[#5C4033] text-3xl md:text-4xl mb-8 text-center">
                    {data.title}
                </h2>

                {/* 3-Box Grid Layout - Centered */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">
                    {data.events.map((event) => (
                        <Link
                            key={event.id}
                            href={event.link || '#'}
                            className={`event-card group relative overflow-hidden rounded-xl border-2 border-[#D4A84B] bg-white shadow-lg transition-all duration-300 hover:shadow-2xl ${
                                !event.link ? 'cursor-not-allowed opacity-80' : ''
                            }`}
                        >
                            {/* Image */}
                            <div className="aspect-[4/5] relative overflow-hidden">
                                {event.img && (
                                    <Image
                                        src={event.img}
                                        alt={event.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6 text-center">
                                <h3 className="font-display text-[#5C4033] text-xl font-bold mb-4">
                                    {event.name}
                                </h3>
                                <div className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all w-full ${
                                    event.link
                                        ? 'bg-[#FCA311] text-black hover:bg-[#e5940f]'
                                        : 'bg-gray-400 text-white cursor-not-allowed'
                                }`}>
                                    <span>{event.cta}</span>
                                    {event.link && (
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                            <path d="M6.3 2.8L11 7.5L6.3 12.2" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Events;
