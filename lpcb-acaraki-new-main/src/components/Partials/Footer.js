import Link from "next/link";

const Footer = () => {
    const navigation = [
        {
            title: 'Home',
            href: '/'
        },
        // {
        //     title: 'About us',
        //     href: '/about'
        // },
        // {
        //     title: 'Contact',
        //     href: '/contact'
        // }
    ];
    return (
        <footer className="bg-[#FFF3E0] md:py-8 py-6">
            <div className="container">
                <div className="flex flex-col md:flex-row md:gap-4 gap-6 items-center justify-between">
                    <div className="flex flex-row gap-4">
                        {navigation.map((item, index) => (
                            <div className="flex flex-row gap-4 font-inter text-[14px]/[normal] text-black" key={index}>
                                <Link href={item.href} key={index}>{item.title}</Link>
                                {index !== navigation.length - 1 && <span className="opacity-40">/</span>}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-row gap-6 md:bg-[#FCA311] bg-[black] rounded-[7px] items-center px-4 py-2">
                        <div className="flex flex-row gap-4 items-center">
                            
                            <Link href="https://www.instagram.com/festivaljamunusantara" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                    <path d="M13.8542 5.646H13.8621M5.54171 2.0835H13.4584C15.6445 2.0835 17.4167 3.8557 17.4167 6.04183V13.9585C17.4167 16.1446 15.6445 17.9168 13.4584 17.9168H5.54171C3.35558 17.9168 1.58337 16.1446 1.58337 13.9585V6.04183C1.58337 3.8557 3.35558 2.0835 5.54171 2.0835ZM12.6667 9.50141C12.7644 10.1603 12.6519 10.8332 12.3451 11.4244C12.0383 12.0156 11.5529 12.495 10.958 12.7945C10.363 13.0939 9.68881 13.1982 9.0312 13.0924C8.3736 12.9865 7.7661 12.6761 7.29512 12.2051C6.82414 11.7341 6.51366 11.1266 6.40784 10.469C6.30203 9.81139 6.40626 9.13716 6.70572 8.54221C7.00517 7.94725 7.4846 7.46187 8.07582 7.1551C8.66704 6.84833 9.33993 6.73579 9.99879 6.8335C10.6709 6.93315 11.293 7.24632 11.7735 7.72674C12.2539 8.20716 12.567 8.82935 12.6667 9.50141Z" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>                         
                        </div>
                        {/* <div className="w-[1px] h-[20px] bg-[#565551]"></div>
                        <Link href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M19.8142 5.41682C20.6764 5.64909 21.3541 6.32682 21.5832 7.18591C22 8.745 22 12 22 12C22 12 22 15.255 21.5832 16.8141C21.3509 17.6764 20.6732 18.3541 19.8142 18.5832C18.2552 19 12 19 12 19C12 19 5.74801 19 4.18581 18.5832C3.32358 18.3509 2.64588 17.6732 2.4168 16.8141C2 15.255 2 12 2 12C2 12 2 8.745 2.4168 7.18591C2.64906 6.32364 3.32676 5.64591 4.18581 5.41682C5.74801 5 12 5 12 5C12 5 18.2552 5 19.8142 5.41682ZM15.1976 12L10.0019 15.0005V8.99955L15.1976 12Z" fill="white" />
                            </svg>
                        </Link> */}
                    </div>
                    <div className="font-inter text-[14px]/[normal] text-black">© {new Date().getFullYear()} — Copyright</div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;