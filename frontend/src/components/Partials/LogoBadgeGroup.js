"use client";

import Image from "next/image";

const LogoBadgeGroup = ({ images = [] }) => {
  const defaultImages = [
    { src: "/imgs/logo-gp-jamu-name.png", alt: "GP Jamu" },
    { src: "/imgs/logo-acaraki-cap-badak-transparent.png", alt: "Acaraki" },
    { src: "/imgs/logo-bpom.png", alt: "BPOM" },
  ];

  const logos = images.length > 0 ? images : defaultImages;

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      {logos.map((img, index) => (
        <div
          key={index}
          className="
            flex items-center justify-center
            h-[40px] md:h-[75px]
            px-2 md:px-4
            rounded-b-xl
            bg-gradient-to-b from-[#f3e6cf] to-[#d6b98b]
            shadow-inner
          "
        >
          <Image
            src={img.src}
            alt={img.alt || `logo-${index}`}
            width={300}
            height={100}
            className="h-[28px] md:h-[60px] w-auto object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default LogoBadgeGroup;