"use client"

import Image from 'next/image';
import React, { ReactNode } from 'react';

const handleScrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth", // Плавная прокрутка
    });
};


const ScrollToTop: React.FC = () => {


    return (
        <div className="xs:hidden w-full flex justify-end pb-[2%]">
            <button
                onClick={handleScrollToTop}
                className="p-[10px] rotate-[90deg] bg-gray-100 text-white w-[45px] h-[45px] rounded-full flex items-center justify-center hover:bg-gray-200"
            >
                <Image src="/images/arrow.svg" alt="arrow" width={35} height={25} />
            </button>
        </div>
    );
};

export default ScrollToTop;
