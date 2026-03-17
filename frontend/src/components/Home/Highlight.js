"use client"

import { useState } from 'react';
import Image from 'next/image';
import './Highlight.scss';
import Cloud from '../Cloud';
const Highlight = ({ data }) => {
    const [currentSlide, setCurrentSlide] = useState(data.aktivitas[0].title);
    const dataAktivitas = data.aktivitas.map((item) => ({
        title: item.title,
        image: item.image
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
                            <div key={index} className="menu-item">
                                <div className={`indicator ${currentSlide === item.title ? 'active' : 'inactive'}`}></div>
                                <div 
                                    onClick={() => setCurrentSlide(item.title)} 
                                    className={`menu-title ${currentSlide === item.title ? 'active' : 'inactive'}`}
                                >
                                    {item.title}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="highlight-image">
                        {dataAktivitas.map((item, index) => (
                            <Image 
                                key={index} 
                                src={item.image} 
                                alt={item.title} 
                                fill 
                                className={currentSlide === item.title ? 'active' : 'inactive'} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Highlight;