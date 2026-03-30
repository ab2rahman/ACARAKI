import Link from "next/link";
import Image from "next/image";
import Cloud from '../Cloud';

const Tickets = ({ data }) => {
    const ticketData = data?.tickets || [];

    if (!ticketData || ticketData.length === 0) {
        return null;
    }

    return (
        <section id="tiket" className="tickets-section relative">
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

            {/* Floating Ornaments - different positions from Highlight */}
            <div className="absolute top-12 left-[15%] w-20 h-20 md:w-28 md:h-28 pointer-events-none opacity-100 animate-float z-10" style={{ animationDelay: '0.5s' }}>
                <Image src="/imgs/Ornaments-04.png" alt="Ornament" fill className="object-contain animate-pulse-slow" />
            </div>

            <div className="absolute top-16 right-[18%] w-20 h-20 md:w-28 md:h-28 pointer-events-none opacity-100 animate-float z-10" style={{ animationDelay: '1.5s' }}>
                <Image src="/imgs/Ornaments-03.png" alt="Ornament" fill className="object-contain animate-pulse-slow" />
            </div>

            <div className="absolute top-36 right-[8%] w-16 h-16 md:w-24 md:h-24 pointer-events-none opacity-90 animate-float z-10" style={{ animationDelay: '2s' }}>
                <Image src="/imgs/Ornaments-05.png" alt="Ornament" fill className="object-contain animate-pulse-slow" />
            </div>

            <div className="absolute top-32 left-[8%] w-16 h-16 md:w-24 md:h-24 pointer-events-none opacity-90 animate-float z-10" style={{ animationDelay: '2.5s' }}>
                <Image src="/imgs/Ornaments-05.png" alt="Ornament" fill className="object-contain animate-pulse-slow" />
            </div>

            <Cloud />
            <div className="container relative z-10">
                <h2 className="text-center text-white mb-8">Tiket Festival</h2>
                <div className="tickets">
                    {ticketData.map((ticket, index) => (
                        <div className="ticket" key={index}>
                            <div className="title">{ticket.category}</div>
                            {ticket.description && (
                                <div className="description">{ticket.description}</div>
                            )}
                            <ul className="flex flex-col gap-[10px] mb-4">
                                {ticket.options.map((option, idx) => (
                                    <li key={idx} className="ticket-option">
                                        <div className="option-header">
                                            <span className="option-name">{option.name}</span>
                                            <span className="option-price">{option.price}</span>
                                        </div>
                                        {option.inclusions && (
                                            <div className="option-inclusions">{option.inclusions}</div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <Link href={ticket.url || "#"} target="_blank" className="buy-ticket flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
                                    <path d="M13 5v2"/>
                                    <path d="M13 17v2"/>
                                    <path d="M13 11v2"/>
                                </svg>
                                Beli Tiket
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Tickets;
