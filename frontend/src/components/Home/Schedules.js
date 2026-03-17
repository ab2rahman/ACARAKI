import Background from "@/components/Background";
import Image from "next/image";
import Cloud from '../Cloud';
const Schedules = ({ data }) => {
    return (
        <section id="acara" className="schedules-section relative">
            <Cloud />
            <div className="container">
                <div className="flex flex-col gap-6 max-w-[1060px] mb-[20px]">
                    <h2>{data.title}</h2>
                    <p className="text-[20px]/[normal]">{data.description}</p>
                </div>
                <div className="schedules">
                    {data.schedules.map((schedule, index) => (
                        <Background key={index}>
                            <div className="schedule-title">
                                <span>{schedule.date}</span>
                                <strong>{schedule.title}</strong>
                            </div>
                            <div className="rundown schedule">
                                {schedule.rundown.map((item, index) => (
                                    <div className="item" key={index}>
                                        <div className="flex flex-col sm:flex-row gap-y-2">
                                            <span className="title">{item.title}</span>
                                            <span className="line-gap">
                                            </span>
                                            <span className="time">{item.time}</span>
                                        </div>
                                        <span>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </Background>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Schedules;