import Banner from "./Banner";
import Judges from "./Judges";
import Mechanism from "./Mechanism";
import "./event-detail.scss";
import Image from "next/image";

export default function EventDetail({data}) {
    return (
        <section className="event-detail">
            <Banner data={data} />
            <div className="container">
                <Judges data={data.judges} />
                {data.timeline && 
                    <div className="relative w-full py-5 sm:py-10">
                        <Image src={data.timeline} alt="timeline" className="w-full !relative h-auto" fill />
                    </div>
                }
                <Mechanism data={data} />
                {data.finalist && data.finalist !== null && 
                    <div className="finalist sm:pt-[38px] pt-[30px] sm:pb-[100px] pb-[50px] text-center">
                        <h2 className="sm:mb-[50px] mb-[20px]">Finalis Kompetisi</h2>
                        <div className="relative w-full">
                            <Image src={data.finalist} alt="timeline" className="w-full !relative h-auto" fill />
                        </div>
                    </div>
                }
            </div>
        </section>
    );
}

