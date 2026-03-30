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
                const response = await axios.get(`${API_URL}/gallery`, { timeout: 5000 });
                if (response.data.status === 'success') {
                    setGalleries(response.data.data);
                    setError(null);
                } else {
                    throw new Error('API returned error');
                }
            } catch (err) {
                console.log('API not available, using fallback data');
                // Use fallback data from home.json with proper slugs
                const fallbackGalleries = data?.links?.map((link, index) => {
                    // Generate slug from title (e.g., "Galeri aJF Sarinah - 22 Juni 2025" -> "ajf-sarinah-22-juni-2025")
                    const slug = link.title
                        .toLowerCase()
                        .replace(/^galeri /i, '')
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-|-$/g, '');

                    return {
                        id: index + 1,
                        title: link.title,
                        slug: slug,
                        url: `/gallery/${slug}`,
                        cover_image_url: data?.galleries?.[index]?.image || null,
                        description: data?.galleries?.[index]?.description || null,
                        items_count: 0
                    };
                }) || [];
                setGalleries(fallbackGalleries);
                setError(null);
            } finally {
                setLoading(false);
            }
        };

        fetchGalleries();
    }, [API_URL, data]);

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

                {!loading && galleries.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px] items-start">
                        {galleries.slice(0, slice).map((gallery, index) => (
                            <Link
                                href={gallery.url || `/gallery/${gallery.slug}`}
                                key={gallery.id}
                                target={gallery.url?.includes('http') ? '_blank' : '_self'}
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
                                        {gallery.items_count > 0 && (
                                            <span className="gallery-count text-xs opacity-60">
                                                {gallery.items_count} images
                                            </span>
                                        )}
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

                {!loading && galleries.length === 0 && (
                    <div className="text-white text-center opacity-60">No galleries available</div>
                )}
            </div>
        </section>
    )
}

export default Galleries;
