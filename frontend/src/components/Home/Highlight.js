"use client"

import { useState } from 'react';
import Image from 'next/image';
import './Highlight.scss';
import Cloud from '../Cloud';
const Highlight = ({ data }) => {
    const [currentSlide, setCurrentSlide] = useState(data.aktivitas[0].title);
    const dataAktivitas = data.aktivitas.map((item) => ({
        title: item.title,
        image: item.image,
        description: item.description || ''
    }));


    return (
        <section id="highlight" className="highlight-section relative">
            <Cloud />
            <div className="container">
                <h2>{data.title}</h2>
                <p>{data.description}</p>
                <div className="highlight-content">
                    <div className="highlight-menu">
                        {data.aktivitas.map((item, index) => (
                            <div
                                key={index}
                                className={`menu-item ${currentSlide === item.title ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(item.title)}
                            >
                                <div className={`indicator ${currentSlide === item.title ? 'active' : 'inactive'}`}></div>
                                <div className={`menu-title ${currentSlide === item.title ? 'active' : 'inactive'}`}>
                                    {item.title}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="highlight-image">
                        {dataAktivitas.map((item, index) => (
                            <div key={index} className={`highlight-slide ${currentSlide === item.title ? 'active' : ''}`}>
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="highlight-img"
                                />
                                {item.description && (
                                    <div className="highlight-desc">
                                        {item.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Highlight;