import Link from "next/link";
export default function NotFound() {
    return <section className="flex flex-col items-center gap-y-10 justify-center h-[calc(100vh-108px)] bg-[#FCA311]">
        <h1 className="font-bold text-[100px]">404</h1>
        <p className="text-[20px]">Halaman tidak ditemukan</p>
        <Link href="/" className="rounded-[0px_31px] border border-[#000] bg-[#FFF] text-black hover:bg-white hover:text-black transition-all duration-300 font-bold justify-center w-fit py-[17px] px-[32px]">Kembali ke Beranda</Link> 
    </section>;
}