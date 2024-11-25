"use client"

import Image from 'next/image';
import React, { useRef, useState } from 'react';

interface CategoryesProps {
    translation: any
}

// Состояние для отслеживания фона

// Данные категорий с картинками для темного и светлого фона
const data = [
    { id: 1, name: 'Phones', darkImage: '/images/phone_black.svg', lightImage: '/images/phone_white.svg' },
    { id: 2, name: 'Phones', darkImage: '/images/phone_black.svg', lightImage: '/images/phone_white.svg' },
    { id: 3, name: 'Phones', darkImage: '/images/phone_black.svg', lightImage: '/images/phone_white.svg' },
    { id: 3, name: 'Phones', darkImage: '/images/phone_black.svg', lightImage: '/images/phone_white.svg' },
    { id: 3, name: 'Phones', darkImage: '/images/phone_black.svg', lightImage: '/images/phone_white.svg' },
    { id: 3, name: 'Phones', darkImage: '/images/phone_black.svg', lightImage: '/images/phone_white.svg' },
    { id: 3, name: 'Phones', darkImage: '/images/phone_black.svg', lightImage: '/images/phone_white.svg' },
    { id: 3, name: 'Phones', darkImage: '/images/phone_black.svg', lightImage: '/images/phone_white.svg' },
    { id: 3, name: 'Phones', darkImage: '/images/phone_black.svg', lightImage: '/images/phone_white.svg' },
    { id: 3, name: 'Phones', darkImage: '/images/phone_black.svg', lightImage: '/images/phone_white.svg' },
    { id: 3, name: 'Phones', darkImage: '/images/phone_black.svg', lightImage: '/images/phone_white.svg' },
    { id: 3, name: 'Phones', darkImage: '/images/phone_black.svg', lightImage: '/images/phone_white.svg' },
]

// Функция для переключения фона

const CategoryReload: React.FC<CategoryesProps> = ({ translation }) => {
    const [isDarkBackground, setIsDarkBackground] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);



    // Функция для прокрутки на 50% ширины контейнера
    const scroll = (direction: "left" | "right") => {
        if (containerRef.current) {
            const scrollAmount =
                direction === "left"
                    ? -containerRef.current.clientWidth / 1.5
                    : containerRef.current.clientWidth / 1.5;

            containerRef.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="relative z-0">
            <div className="mb-[50px]">
                <div className="flex mb-[20px] gap-[10px] items-center ">
                    <div className="w-[20px] h-[40px] rounded-lg bg-red-500"></div>
                    <h1 className="text-[17px] font-semibold text-red-500">{translation.main.categoryes}</h1>
                </div>
                <h1 className="text-[36px] font-semibold text-black">{translation.main.browse}</h1>
                {/* Кнопка "Влево" */}
                <div className="">
                    <button
                        onClick={() => scroll("left")}
                        className="absolute top-[20%] right-10 z-10 mr-[20px] p-[10px] bg-gray-100 text-white w-[45px] h-[45px] rounded-full flex items-center justify-center transform -translate-y-1/2 hover:bg-gray-200"
                    >
                        <Image src="/images/arrow.svg" alt='arrow' width={35} height={25} />
                    </button>

                    <button
                        onClick={() => scroll("right")}
                        className="absolute top-[20%] right-0 rotate-180 z-10 p-[10px] bg-gray-100 text-white w-[45px] h-[45px] rounded-full flex items-center justify-center transform -translate-y-1/2 hover:bg-gray-200"
                    >
                        <Image src="/images/arrow.svg" alt='arrow' width={35} height={25} />
                    </button>
                </div>
            </div>

            {/* Список товаров */}
            <div
                ref={containerRef}
                className="flex min-w-full overflow-x-auto mb-[50px] border-b border-gray-300 pb-[20px] scrollbar-hidden pt-[30px] gap-[2%]"
            >
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="whitespace-nowrap group flex gap-[5%] active:bg-red-500 flex-shrink-0 transition-[.2s] justify-center flex-col items-center w-[15%] h-[20vh] bg-white border rounded-lg border-gray-300 mb-[50px]"
                    >
                        <Image className='w-[35%] object-cover h-fit' src='/images/phone_black.svg' alt="phone" width={70} height={100} />

                        <span className='text-black group-active:text-white transition-[.2s] text-[20px]'>{item.name}</span>
                    </div>
                ))}
            </div>

            {/* Кнопка "Вправо" */}

        </div>
    );
};

export default CategoryReload;
