"use client";
import Link from "next/link";
import Image from "next/image";
import Cloud from '../Cloud';
import { useState, useEffect } from "react";
import axios from "axios";

const Galleries = ({ data }) => {
    const [slice, setSlice] = useState(4);
    const [galleries, setGalleries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchGalleries = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/gallery`);
                if (response.data.status === 'success') {
                    setGalleries(response.data.data);
                } else {
                    setError('Failed to fetch galleries');
                }
            } catch (err) {
                console.error('Error fetching galleries:', err);
                setError('Failed to fetch galleries');
            } finally {
                setLoading(false);
            }
        };

        fetchGalleries();
    }, [API_URL]);

    const handleAllGalleries = () => {
        setSlice(galleries.length);
    }

    return (
        <section className="galleries-section relative" id="galeri">
            <Cloud />
            <div className="container flex flex-col 2xl:gap-[40px] gap-[30px] relative">
                <h2 className="text-white max-w-[700px]">{data.title}</h2>
                <h2 className="text-white max-w-[700px]">{data.subtitle}</h2>

                {/* API Galleries */}
                {loading && (
                    <div className="text-white text-center">Loading galleries...</div>
                )}

                {error && (
                    <div className="text-red-400 text-center">{error}</div>
                )}

                {!loading && !error && galleries.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px] items-start">
                        {galleries.slice(0, slice).map((gallery, index) => (
                            <Link 
                            href={`/gallery/${gallery.slug}`} 
                            key={gallery.id} 
                            className="link-gallery grid grid-cols-[1fr_auto] items-center gap-4"
                        >
                            <div className="flex items-start gap-4">
                            {gallery.cover_image_url && (
                                <div className="gallery-cover-image shrink-0 w-[150px] h-[150px]">
                                    <Image
                                        src={gallery.cover_image_url}
                                        alt={gallery.title}
                                        width={150}
                                        height={150}
                                        className="rounded-lg object-cover w-full h-full"
                                    />
                                </div>
                            )}
                                <div className="gallery-info flex-grow">
                                    <h3 className="gallery-title font-bold break-words whitespace-normal">{gallery.title}</h3>
                                    {gallery.description && (
                                        <p className="gallery-description text-sm opacity-80 whitespace-normal">{gallery.description}</p>
                                    )}
                                    <span className="gallery-count text-xs opacity-60">
                                        {gallery.items_count} images
                                    </span>
                                </div>
                            </div>
                        </Link>
                        ))}
                        
                        {slice < galleries.length && (
                            <button 
                                onClick={handleAllGalleries}
                                className="link-gallery bg-transparent border border-white text-white hover:bg-white hover:text-black transition-colors"
                            >
                                Show All Galleries ({galleries.length - slice} more)
                            </button>
                        )}
                    </div>
                )}

                {!loading && !error && galleries.length === 0 && (
                    <div className="text-white text-center opacity-60">No galleries available</div>
                )}
            </div>
        </section>
    )
}

export default Galleries;