import Link from "next/link";
import Image from "next/image";

const Tickets = ({ festival, data }) => {
    // Use festival data if available, otherwise use data prop
    const ticketData = festival?.tickets || data?.tickets;
    const title = festival?.ticket_title || data?.title;
    const description = festival?.ticket_lead || data?.description;
    const period = festival?.sales_period || data?.period;

    // Don't render if no ticket data
    if (!ticketData || ticketData.length === 0) {
        return null;
    }

    return (
        <section id="tiket" className="tickets-section">
            <div className="container flex flex-col md:flex-row justify-between">
                <div>
                    <h2 className="text-white">{title}</h2>
                    <p className="text-white text-[20px]/[normal]">{description}</p>
                    <div className="period">
                        <strong>Periode Penjualan Tiket</strong>
                        <span>{period}</span>
                    </div>
                </div>
                <div className="tickets">
                    {ticketData.map((ticket, index) => (
                        <div className="ticket" key={index}>
                            <div className="title">{ticket.title}</div>
                            <div className="description">{ticket.description || ticket.subtitle}</div>
                            <div className="price">Rp {ticket.price}</div>
                            <div className="term relative">
                                <div className="absolute top-0 left-0 w-full h-full">
                                    <Image src={`/imgs/bg-t.png`} alt={`bg term`} fill />
                                </div>
                                <div className="relative">
                                    {ticket.term || ticket.information}
                                </div>
                            </div>
                            <ul className="flex flex-col gap-[15px]">
                                {(ticket.packages || []).map((item, index) => {
                                    return <li key={index} className="flex items-start gap-2">
                                        <div className="bg-[#FCA311] rounded-full flex items-center justify-center min-w-5 h-5">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                                <path d="M5.27264 8.62682L7.97273 11.3269L13.3716 5.92737M2.09082 8.62682L4.79091 11.3269M10.1905 5.92737L8.13627 8" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>

                                        {typeof item === 'string' ? item : item.item || item}
                                    </li>
                                })}
                            </ul>
                            <Link href={ticket.url} target="_blank" className="buy-ticket group">
                                <svg xmlns="http://www.w3.org/2000/svg" width={25} height={24} viewBox="0 0 25 24" fill="none">
                                <path d="M15.5 5V7M15.5 11V13M15.5 17V19M5.5 5H19.5C20.0304 5 20.5391 5.21071 20.9142 5.58579C21.2893 5.96086 21.5 6.46957 21.5 7V10C20.9696 10 20.4609 10.2107 20.0858 10.5858C19.7107 10.9609 19.5 11.4696 19.5 12C19.5 12.5304 19.7107 13.0391 20.0858 13.4142C20.5391 13.7893 20.9696 14 21.5 14V17C21.5 17.5304 21.2893 18.0391 20.9142 18.4142C20.5391 18.7893 20.9696 19 19.5 19H5.5C4.96957 19 4.46086 18.7893 4.08579 18.4142C3.71071 18.7893 3.5 17.5304 3.5 17V14C4.03043 14 4.53914 13.7893 4.91421 13.4142C5.28929 13.0391 5.5 12.5304 5.5 12C5.5 11.4696 5.28929 10.9609 4.91421 10.5858C4.53914 10.2107 4.03043 10 3.5 10V7C3.5 6.46957 3.71071 5.96086 4.08579 5.58579C4.46086 5.21071 4.96957 5 5.5 5Z" className="stroke-black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
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
