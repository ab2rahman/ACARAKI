"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

const Header = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const activeSection = useIntersectionObserver();

    useEffect(() => {
        const controlHeader = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                setIsVisible(false); // Scrolling down
            } else {
                setIsVisible(true); // Scrolling up
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', controlHeader);

        return () => {
            window.removeEventListener('scroll', controlHeader);
        };
    }, [lastScrollY]);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobileMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.hamburger-button')) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMobileMenuOpen]);

    const navItems = [
        {
            label: "Acara",
            href: "/#acara",
        },
        {
            label: "Kompetisi",
            href: "/#kompetisi",
        },
        {
            label: "Event Package",
            href: "/#tiket",
        },
        {
            label: "Galeri",
            href: "/#galeri",
        },
        {
            label: "Registrasi",
            href: "/member",
        },
        // {
        //     label: "Games",
        //     href: "/estafet-permainan-nusantara",
        // },
    ];

    const isActive = (href) => {
        return activeSection === href.replace('#', '');
    };

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${lastScrollY > 0 ? 'bg-black/60' : ''} ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="container sm:py-[23px] py-[10px]">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="relative md:min-w-[250px] min-w-[150px] md:w-[250px] w-[150px] md:h-[75px] h-[45px]">
                            <Image src="/imgs/Logo-Atas-01.png" alt="Logo" fill />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className={`hidden md:flex items-center gap-6 rounded-[14px] ${lastScrollY === 0 ? 'bg-black/50' : ''} py-[13px] px-[20px]`}>
                            {navItems.map((item) => (
                                <Link 
                                    href={item.href} 
                                    key={item.label} 
                                    className={`2xl:text-[16px]/[24px] lg:text-[14px] text-[12px]/[18px] font-bold transition-colors duration-300 ${
                                        isActive(item.href) 
                                            ? 'text-[#FCA311]' 
                                            : 'text-white hover:text-[#FCA311]'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link href="https://go.tiketapasaja.com/ajfnovember" target="_blank" className="flex items-center gap-[14px] 2xl:py-[14px] lg:py-[12px] py-[10px] 2xl:px-6 lg:px-[16px] px-[12px] bg-[#FCA311] text-black hover:bg-white hover:text-black transition-all duration-300 rounded-[11px] border border-solid border-white font-bold group">
                                <svg xmlns="http://www.w3.org/2000/svg" width={25} height={24} viewBox="0 0 25 24" fill="none">
                                    <path d="M15.5 5V7M15.5 11V13M15.5 17V19M5.5 5H19.5C20.0304 5 20.5391 5.21071 20.9142 5.58579C21.2893 5.96086 21.5 6.46957 21.5 7V10C20.9696 10 20.4609 10.2107 20.0858 10.5858C19.7107 10.9609 19.5 11.4696 19.5 12C19.5 12.5304 19.7107 13.0391 20.0858 13.4142C20.4609 13.7893 20.9696 14 21.5 14V17C21.5 17.5304 21.2893 18.0391 20.9142 18.4142C20.5391 18.7893 20.0304 19 19.5 19H5.5C4.96957 19 4.46086 18.7893 4.08579 18.4142C3.71071 18.0391 3.5 17.5304 3.5 17V14C4.03043 14 4.53914 13.7893 4.91421 13.4142C5.28929 13.0391 5.5 12.5304 5.5 12C5.5 11.4696 5.28929 10.9609 4.91421 10.5858C4.53914 10.2107 4.03043 10 3.5 10V7C3.5 6.46957 3.71071 5.96086 4.08579 5.58579C4.46086 5.21071 4.96957 5 5.5 5Z" className="stroke-black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Beli Tiket
                            </Link>
                        </nav>
                        <div className="relative md:min-w-[250px] min-w-[150px] md:w-[250px] w-[150px] md:h-[75px] h-[45px]"></div>
                        {/* Mobile Menu Button */}
                        <button className="md:hidden hamburger-button p-[5.71px] bg-[#FCA311] rounded-[8px]"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width={29} height={28} viewBox="0 0 29 28" fill="none">
                                <path d="M6.42883 19.7142H15.5717M6.42883 13.9999H22.4288M13.286 8.28564H22.4288" stroke="white" strokeWidth="2.28571" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>
            {/* Mobile Navigation Drawer */}
            <div className="mobile-menu-overlay fixed top-0 left-0 w-full h-full bg-black/50 z-40 transition-opacity duration-300 ease-in-out md:hidden"
                style={{
                    opacity: isMobileMenuOpen ? 1 : 0,
                    pointerEvents: isMobileMenuOpen ? 'auto' : 'none'
                }}
            ></div>
            <div
                className={`mobile-menu h-screen fixed top-0 right-0 sm:w-[280px] w-[calc(100%-90px)] bg-[#FCA311] transform transition-transform duration-300 ease-in-out z-50 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <button 
                    className="absolute top-6 right-6 text-black hover:text-[#FCA311] transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <div className="flex flex-col items-end h-full pt-20 px-6">
                    {navItems.map((item) => (
                        <Link
                            href={item.href}
                            key={item.label}
                            className={`text-lg font-bold sm:py-3 py-1 transition-colors duration-300 ${
                                isActive(item.href)
                                    ? 'text-white'
                                    : 'text-black hover:text-white'
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href="https://go.tiketapasaja.com/ajfnovember"
                        target="_blank"
                        className="flex items-center gap-[14px] py-3 px-4 bg-black text-white hover:bg-white hover:text-black transition-all duration-300 rounded-[11px] border border-solid border-white font-bold mt-4 w-full justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={25} height={24} viewBox="0 0 25 24" fill="none">
                            <path d="M15.5 5V7M15.5 11V13M15.5 17V19M5.5 5H19.5C20.0304 5 20.5391 5.21071 20.9142 5.58579C21.2893 5.96086 21.5 6.46957 21.5 7V10C20.9696 10 20.4609 10.2107 20.0858 10.5858C19.7107 10.9609 19.5 11.4696 19.5 12C19.5 12.5304 19.7107 13.0391 20.0858 13.4142C20.4609 13.7893 20.9696 14 21.5 14V17C21.5 17.5304 21.2893 18.0391 20.9142 18.4142C20.5391 18.7893 20.0304 19 19.5 19H5.5C4.96957 19 4.46086 18.7893 4.08579 18.4142C3.71071 18.0391 3.5 17.5304 3.5 17V14C4.03043 14 4.53914 13.7893 4.91421 13.4142C5.28929 13.0391 5.5 12.5304 5.5 12C5.5 11.4696 5.28929 10.9609 4.91421 10.5858C4.53914 10.2107 4.03043 10 3.5 10V7C3.5 6.46957 3.71071 5.96086 4.08579 5.58579C4.46086 5.21071 4.96957 5 5.5 5Z" className="stroke-white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Beli Tiket
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Header;