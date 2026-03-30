import Image from "next/image";

const Cloud = () => {
    return (
        <div className="absolute md:top-[-40px] top-[-20px] md:right-[-40px] right-[-20px] md:w-[240px] w-[150px] md:h-[103px] h-[80px] z-[10] animate-float">
            <Image src={`/imgs/cloud.png`} alt="gallery-bg" fill objectFit="contain" className="animate-pulse-slow" />
        </div>
    );
};

export default Cloud;