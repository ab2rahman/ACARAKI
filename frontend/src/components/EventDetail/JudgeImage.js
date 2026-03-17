import Image from "next/image";

const JudgeImage = ({ image }) => {
    return (
        <div className="judge-image relative aspect-[1/1] pt-[16px] px-[19px]">
            <div className="judge-image-content relative w-full aspect-[373/338]">
                <Image src={image} alt="judge" fill className="object-cover" />
            </div>
            <div className="judge-frame absolute w-full h-full top-0 left-0">
                <Image src={`/imgs/frame.svg`} alt="judge" fill className="object-cover" />
            </div>
            <div className="absolute bottom-[-4%] right-[-10%] w-[55%] aspect-[227.24/116.72]">
                <Image src={`/imgs/frame-orn.svg`} alt="judge" fill className="object-contain" />
            </div>
        </div>
    );
}

export default JudgeImage;