"use client"
import React, { useEffect, useRef } from 'react';
import Image from "next/image";

const RunningText = () => {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    let position = 0;
    const speed = 0.5; // pixels per frame

    const animate = () => {
      position -= speed;
      if (position <= -5400) { // 8 batiks × 675px
        position = 0;
      }
      if (container) {
        container.style.transform = `translateX(${position}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="running-text-container bg-[#0394BF] relative overflow-hidden">
      <div ref={scrollRef} className="flex" style={{ willChange: 'transform' }}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex-shrink-0">
            <Image
              src={`/batik-1.svg`}
              alt={`batik-divider-${index}`}
              width={675}
              height={72}
              className={`hidden md:block ${index % 2 === 1 ? 'scale-x-[-1]' : ''}`}
            />
            <Image
              src={`/batik-1.svg`}
              alt={`batik-divider-${index}`}
              width={675}
              height={50}
              className={`md:hidden ${index % 2 === 1 ? 'scale-x-[-1]' : ''}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RunningText;
