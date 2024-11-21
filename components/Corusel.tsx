"use client"

import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const Slider: React.FC = () => {
  const slides = [
    { id: 1, src: '/images/banner.svg', alt: 'Slide 1' },
    { id: 2, src: '/images/banner.svg', alt: 'Slide 2' },
    { id: 3, src: '/images/banner.svg', alt: 'Slide 3' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Автоматическое переключение слайдов
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3500); // 3 секунды между слайдами
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className=" relative w-full h-[50vh] overflow-hidden">
      {/* Слайды */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0">
            <Image
              width={800}
              height={400}
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Круглые индикаторы */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'
              }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
