import { useState, useEffect } from 'react';

const useIntersectionObserver = (options = {}) => {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, {
            rootMargin: '-50% 0px -50% 0px', // This will trigger when the section is in the middle of the viewport
            ...options
        });

        // Observe all sections
        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, [options]);

    return activeSection;
};

export default useIntersectionObserver; 