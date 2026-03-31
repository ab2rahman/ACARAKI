import Background from "@/components/Background";
import Cloud from '../Cloud';
import Image from 'next/image';

const Rundown = ({ data }) => {
    const { title, stages } = data;

    // Support both `days` array and legacy single-day flat structure
    const days = data.days || [{
        subtitle: data.subtitle,
        banner: data.banner,
        headerTitle: data.headerTitle,
        schedule: data.schedule
    }];

    return (
        <section id="rundown" className="rundown-section relative overflow-hidden">
            {/* Top Left Ornament - Mirrored */}
            <div className="absolute -top-16 left-0 w-48 h-48 md:w-64 md:h-64 pointer-events-none opacity-100 scale-x-[-1] z-10">
                <Image
                    src="/imgs/Ornaments-17.png"
                    alt="Top Left Ornament"
                    fill
                    className="object-contain"
                />
            </div>

            {/* Top Right Ornament */}
            <div className="absolute -top-20 right-0 w-64 h-64 md:w-80 md:h-80 pointer-events-none opacity-100 z-10">
                <Image
                    src="/imgs/Ornaments-17.png"
                    alt="Top Right Ornament"
                    fill
                    className="object-contain"
                />
            </div>

            {/* Bottom Left Ornament - Extended */}
            <div className="absolute bottom-0 -left-20 w-96 h-96 md:-left-32 md:w-[500px] md:h-[500px] pointer-events-none opacity-100 z-10">
                <Image
                    src="/imgs/Ornaments-19.png"
                    alt="Bottom Left Ornament"
                    fill
                    className="object-contain"
                />
            </div>

            {/* Bottom Right Ornament - Mirrored Extended */}
            <div className="absolute bottom-0 -right-16 w-80 h-80 md:-right-24 md:w-96 md:h-96 pointer-events-none opacity-100 scale-x-[-1] z-10">
                <Image
                    src="/imgs/Ornaments-19.png"
                    alt="Bottom Right Ornament"
                    fill
                    className="object-contain"
                />
            </div>

            <Cloud />
            <div className="container relative z-20">
                <div className="flex flex-col gap-2 items-center text-center mb-8">
                    <h2 className="font-display">{title}</h2>
                </div>

                <div className="flex flex-col gap-12">
                    {days.map((day, dayIndex) => (
                        <div key={dayIndex}>
                            {day.subtitle && (
                                <p className="text-[18px] sm:text-[20px]/[normal] text-center mb-6 font-medium text-[#5C4033]">
                                    {day.subtitle}
                                </p>
                            )}
                            <Background>
                                {day.banner && (
                                    <div className="rundown-banner">
                                        <span>{day.banner.text}</span>
                                        <strong>{day.banner.time}</strong>
                                        {day.banner.venue && <span className="venue">{day.banner.venue}</span>}
                                    </div>
                                )}

                                {day.headerTitle && (
                                    <div className="rundown-header">
                                        <h3>{day.headerTitle}</h3>
                                    </div>
                                )}

                                <div className="rundown-table-wrapper">
                                    <table className="rundown-table">
                                        <thead>
                                            <tr>
                                                <th className="col-time">TIME DUR</th>
                                                {stages.map((stage, i) => (
                                                    <th key={i} className={`col-stage col-${stage.key}`}>
                                                        {stage.label}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {day.schedule.map((slot, i) => (
                                                <tr key={i} className={slot.isFullRow ? 'full-row' : ''}>
                                                    <td className="col-time">
                                                        <span className="time-text">{slot.time}</span>
                                                        {slot.duration && (
                                                            <span className="duration-text">{slot.duration}</span>
                                                        )}
                                                    </td>
                                                    {slot.isFullRow ? (
                                                        <td colSpan={stages.length} className="full-row-cell">
                                                            {slot.fullRowText}
                                                        </td>
                                                    ) : (
                                                        stages.map((stage, j) => {
                                                            const cell = slot[stage.key];
                                                            // Skip cells covered by a rowspan above
                                                            if (cell === '__skip__') return null;
                                                            // Object cell = has rowspan and/or colspan
                                                            if (cell && typeof cell === 'object') {
                                                                return (
                                                                    <td key={j}
                                                                        {...(cell.rowspan ? { rowSpan: cell.rowspan } : {})}
                                                                        {...(cell.colspan ? { colSpan: cell.colspan } : {})}
                                                                        className={`col-stage col-${stage.key}${cell.rowspan ? ' merged-cell' : ''}${cell.colspan ? ' full-row-cell' : ''}`}
                                                                    >
                                                                        {cell.text || '—'}
                                                                    </td>
                                                                );
                                                            }
                                                            return (
                                                                <td key={j} className={`col-stage col-${stage.key}`}>
                                                                    {cell || '—'}
                                                                </td>
                                                            );
                                                        })
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Background>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Rundown;
