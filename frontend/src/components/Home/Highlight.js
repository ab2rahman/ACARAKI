"use client"

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import './Highlight.scss';
import Cloud from '../Cloud';

const Highlight = ({ data }) => {
    const [currentSlide, setCurrentSlide] = useState(data.aktivitas[0].title);
    const menuRef = useRef(null);

    // Event images for looping
    const eventImages = [
        '/imgs/event1-bakul-jamu.png',
        '/imgs/event2-fit.png',
        '/imgs/event3-vibrant.png'
    ];

    const dataAktivitas = data.aktivitas.map((item, index) => ({
        title: item.title,
        // Loop through event images: 1, 2, 3, 1, 2, 3, ...
        image: eventImages[index % 3],
        description: item.description || ''
    }));

    // Handle scroll to auto-select visible item on mobile
    useEffect(() => {
        const menu = menuRef.current;
        if (!menu) return;

        const handleScroll = () => {
            const menuRect = menu.getBoundingClientRect();
            const centerX = menuRect.left + menuRect.width / 2;

            // Find item closest to center
            const items = menu.querySelectorAll('.menu-item');
            let closestItem = null;
            let closestDistance = Infinity;

            items.forEach(item => {
                const itemRect = item.getBoundingClientRect();
                const itemCenterX = itemRect.left + itemRect.width / 2;
                const distance = Math.abs(centerX - itemCenterX);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestItem = item;
                }
            });

            if (closestItem) {
                const titleElement = closestItem.querySelector('.menu-title');
                if (titleElement) {
                    const title = titleElement.textContent;
                    if (title !== currentSlide) {
                        setCurrentSlide(title);
                    }
                }
            }
        };

        // Only add scroll listener on mobile
        if (window.innerWidth <= 768) {
            menu.addEventListener('scroll', handleScroll, { passive: true });
            return () => menu.removeEventListener('scroll', handleScroll);
        }
    }, [currentSlide]);

    return (
        <section id="highlight" className="highlight-section relative">
            {/* Bottom Left Ornament-19 */}
            <div className="absolute bottom-0 -left-16 w-64 h-64 md:-left-20 md:w-80 md:h-80 pointer-events-none opacity-100 z-0">
                <Image
                    src="/imgs/Ornaments-19.png"
                    alt="Bottom Left Ornament"
                    fill
                    className="object-contain"
                />
            </div>

            {/* Bottom Right Ornament-19 Mirrored */}
            <div className="absolute bottom-0 -right-16 w-64 h-64 md:-right-20 md:w-80 md:h-80 pointer-events-none opacity-100 z-0 scale-x-[-1]">
                <Image
                    src="/imgs/Ornaments-19.png"
                    alt="Bottom Right Ornament"
                    fill
                    className="object-contain"
                />
            </div>

            {/* Floating Ornaments - similar to Hero section */}
            <div className="absolute top-16 left-[20%] w-20 h-20 md:w-28 md:h-28 pointer-events-none opacity-100 animate-float z-10" style={{ animationDelay: '1s' }}>
                <Image src="/imgs/Ornaments-03.png" alt="Ornament" fill className="object-contain animate-pulse-slow" />
            </div>

            <div className="absolute top-20 right-[22%] w-20 h-20 md:w-28 md:h-28 pointer-events-none opacity-100 animate-float z-10" style={{ animationDelay: '2s' }}>
                <Image src="/imgs/Ornaments-04.png" alt="Ornament" fill className="object-contain animate-pulse-slow" />
            </div>

            <div className="absolute top-40 left-[8%] w-16 h-16 md:w-24 md:h-24 pointer-events-none opacity-90 animate-float z-10" style={{ animationDelay: '2.5s' }}>
                <Image src="/imgs/Ornaments-05.png" alt="Ornament" fill className="object-contain animate-pulse-slow" />
            </div>

            <div className="absolute top-32 right-[10%] w-16 h-16 md:w-24 md:h-24 pointer-events-none opacity-90 animate-float z-10" style={{ animationDelay: '3s' }}>
                <Image src="/imgs/Ornaments-05.png" alt="Ornament" fill className="object-contain animate-pulse-slow" />
            </div>

            <Cloud />
            <div className="container relative z-10">
                <h2>{data.title}</h2>
                <p>{data.description}</p>
                <div className="highlight-content">
                    <div className="highlight-menu" ref={menuRef}>
                        {data.aktivitas.map((item, index) => (
                            <div
                                key={index}
                                className={`menu-item ${currentSlide === item.title ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(item.title)}
                            >
                                <div className={`indicator ${currentSlide === item.title ? 'active' : 'inactive'}`}></div>
                                <div className={`menu-title ${currentSlide === item.title ? 'active' : 'inactive'}`}>
                                    {item.title}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="highlight-image">
                        {dataAktivitas.map((item, index) => (
                            <div key={index} className={`highlight-slide ${currentSlide === item.title ? 'active' : ''}`}>
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="highlight-img"
                                />
                                {item.description && (
                                    <div className="highlight-desc">
                                        {item.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Highlight;