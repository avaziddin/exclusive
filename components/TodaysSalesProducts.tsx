"use client"

import Image from 'next/image';
import React, { useRef } from 'react';

const data = Array(20).fill(1); // Пример данных

const TodaysSalesProducts: React.FC = () => {
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
        <div className="relative">
            {/* Кнопка "Влево" */}
            <div className="">
                <button
                    onClick={() => scroll("left")}
                    className="absolute top-[-8%] right-10 z-10 mr-[20px] p-[10px] bg-gray-100 text-white w-[45px] h-[45px] rounded-full flex items-center justify-center transform -translate-y-1/2 hover:bg-gray-200"
                >
                    <Image src="/images/arrow.svg" alt='arrow' width={35} height={25} />
                </button>

                <button
                    onClick={() => scroll("right")}
                    className="absolute top-[-8%] right-0 rotate-180 z-10 p-[10px] bg-gray-100 text-white w-[45px] h-[45px] rounded-full flex items-center justify-center transform -translate-y-1/2 hover:bg-gray-200"
                >
                    <Image src="/images/arrow.svg" alt='arrow' width={35} height={25} />
                </button>
            </div>

            {/* Список товаров */}
            <div
                ref={containerRef}
                className="flex max-w-full overflow-x-auto scrollbar-hidden gap-[2%] scroll-smooth"
            >
                {data.map((_, index) => (
                    <div
                        key={index}
                        className="whitespace-nowrap min-w-[21%] h-fit mb-[50px]"
                    >
                        <div className="hover:bg-gray-100 group rounded-lg w-fit pb-[20px] transition-[.1s]">
                            <div className="mb-[10px] relative rounded-xl">
                                <div className="absolute cursor-pointer top-[5%] p-[7px] pt-[8px] flex items-center justify-center rounded-full right-[3%] bg-white">
                                    <Image
                                        src="/images/heart.svg"
                                        alt="heart"
                                        width={20}
                                        height={20}
                                    />
                                </div>
                                <div className="absolute cursor-pointer top-[19%] p-[7px] pt-[8px] flex items-center justify-center rounded-full right-[3%] bg-white">
                                    <Image
                                        src="/images/eye.svg"
                                        alt="eye"
                                        width={20}
                                        height={20}
                                    />
                                </div>
                                <div className="px-[10px] py-[3px] bg-red-500 rounded-lg absolute top-[2%] left-[2%]">
                                    <span>-40%</span>
                                </div>
                                <Image
                                    className="w-content h-[35vh] rounded-lg object-cover"
                                    src="/images/prod.svg"
                                    alt="product"
                                    width={500}
                                    height={300}
                                />
                                <div className="w-full cursor-pointer flex justify-center items-center py-[10px] rounded-b-lg bg-black text-white absolute bottom-0 opacity-0 group-hover:opacity-100 transition">
                                    <span>Add To Cart</span>
                                </div>
                            </div>
                            <h1 className="text-black font-medium mb-[10px] px-[10px]">
                                HAVIT HV-G92 Gamepad
                            </h1>
                            <div className="flex font-medium gap-[10px] px-[10px] mb-[10px]">
                                <span className="text-red-500">$120</span>
                                <span className="text-gray-400 line-through">
                                    $160
                                </span>
                            </div>
                            <div className="flex items-center px-[10px] gap-[7px]">
                                <div className="flex items-center gap-[7px]">
                                    <Image
                                        src="/images/YellowStar.svg"
                                        alt="rating"
                                        width={20}
                                        height={20}
                                    />
                                    <Image
                                        src="/images/YellowStar.svg"
                                        alt="rating"
                                        width={20}
                                        height={20}
                                    />
                                    <Image
                                        src="/images/YellowStar.svg"
                                        alt="rating"
                                        width={20}
                                        height={20}
                                    />
                                    <Image
                                        src="/images/YellowStar.svg"
                                        alt="rating"
                                        width={20}
                                        height={20}
                                    />
                                    <Image
                                        src="/images/YellowStar.svg"
                                        alt="rating"
                                        width={20}
                                        height={20}
                                    />
                                </div>
                                <span className="flex justify-center items-center text-gray-400">
                                    (99)
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Кнопка "Вправо" */}

        </div>
    );
};

export default TodaysSalesProducts;
