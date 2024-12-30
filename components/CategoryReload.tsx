"use client";

import { useAppContext } from '@/context';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

interface CategoryesProps {
    translation: any;
    lang: any;
}

const CategoryReload: React.FC<CategoryesProps> = ({ translation, lang }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { dataCat } = useAppContext();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

    const handleCategoryClick = (category: string) => {
        // Сохраняем выбранную категорию в localStorage
        setSelectedCategory(category);
        localStorage.setItem("category", category);
        localStorage.setItem("type", "");
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

            {/* Список категорий */}
            <div
                ref={containerRef}
                className="flex min-w-full overflow-x-auto mb-[50px] border-b border-gray-300 pb-[20px] scrollbar-hidden pt-[30px] gap-[2%]"
            >
                {dataCat.map((item: any) => (
                    <Link 
                    key={item._id}
                    className='w-[15%]'
                    href={"/allProd"}>

                        <div
                            onClick={() => handleCategoryClick(item.titles.en)} // Передаем ID категории
                            className={`whitespace-nowrap group flex gap-[5%] active:bg-red-500 flex-shrink-0 transition-[.2s] justify-center flex-col items-center w-full h-[20vh]  border rounded-lg border-gray-300 mb-[50px] ${selectedCategory === item.titles.en ? 'bg-red-500 text-white' : 'bg-white'
                                }`} // Добавляем стиль для выбранной категории
                        >
                            <Image className='w-[35%] object-cover h-[10vh]' src={item.image[0]} alt="category" width={300} height={50} />

                            <span className={`text-[20px] ${selectedCategory === item.titles.en ? 'text-white' : 'text-black'} group-active:text-white transition-[.2s]`}>
                                {item.titles[lang]}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryReload;
